import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { projectId, siteType } = await req.json()

    // Define migration steps based on site type
    const migrationSteps = siteType === 'static' 
      ? getStaticMigrationSteps() 
      : getDynamicMigrationSteps()

    // Create migration steps in database
    for (let i = 0; i < migrationSteps.length; i++) {
      await supabaseClient
        .from('migration_steps')
        .insert({
          project_id: projectId,
          step_name: migrationSteps[i].name,
          step_order: i + 1,
          status: 'pending'
        })
    }

    // Update project status
    await supabaseClient
      .from('projects')
      .update({ status: 'migrating' })
      .eq('id', projectId)

    // Start the migration process
    executeMigrationSteps(supabaseClient, projectId, migrationSteps)

    return new Response(
      JSON.stringify({ success: true, message: 'Migration started' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function getDynamicMigrationSteps() {
  return [
    { name: 'Create Backup', duration: 300000 },
    { name: 'Transfer Database', duration: 600000 },
    { name: 'Transfer Files', duration: 900000 },
    { name: 'Email Migration', duration: 300000 },
    { name: 'DNS Configuration', duration: 180000 },
    { name: 'SSL Certificate', duration: 240000 },
  ]
}

function getStaticMigrationSteps() {
  return [
    { name: 'Create Backup', duration: 180000 },
    { name: 'Code Modernization', duration: 480000 },
    { name: 'Transfer Files', duration: 360000 },
    { name: 'Performance Optimization', duration: 240000 },
    { name: 'DNS Configuration', duration: 180000 },
    { name: 'SSL Certificate', duration: 240000 },
  ]
}

async function executeMigrationSteps(supabaseClient: any, projectId: string, steps: any[]) {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    
    // Get the step from database
    const { data: stepData } = await supabaseClient
      .from('migration_steps')
      .select('*')
      .eq('project_id', projectId)
      .eq('step_order', i + 1)
      .single()

    if (!stepData) continue

    // Start the step
    await supabaseClient
      .from('migration_steps')
      .update({
        status: 'running',
        start_time: new Date().toISOString(),
        progress: 0
      })
      .eq('id', stepData.id)

    // Simulate step execution with progress updates
    const progressInterval = step.duration / 100
    for (let progress = 1; progress <= 100; progress++) {
      await new Promise(resolve => setTimeout(resolve, progressInterval))
      
      await supabaseClient
        .from('migration_steps')
        .update({ progress })
        .eq('id', stepData.id)
    }

    // Complete the step
    await supabaseClient
      .from('migration_steps')
      .update({
        status: 'completed',
        end_time: new Date().toISOString(),
        progress: 100
      })
      .eq('id', stepData.id)
  }

  // Update project status to completed
  await supabaseClient
    .from('projects')
    .update({ 
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('id', projectId)
}