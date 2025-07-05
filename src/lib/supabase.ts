import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },
  
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // Projects
  createProject: async (projectData: any) => {
    return await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();
  },
  
  getProject: async (projectId: string) => {
    return await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
  },
  
  updateProject: async (projectId: string, updates: any) => {
    return await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();
  },
  
  getUserProjects: async (userId: string) => {
    return await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },
  
  // Analysis Results
  saveAnalysisResults: async (projectId: string, analysisData: any) => {
    return await supabase
      .from('analysis_results')
      .upsert({
        project_id: projectId,
        data: analysisData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
  },
  
  getAnalysisResults: async (projectId: string) => {
    return await supabase
      .from('analysis_results')
      .select('*')
      .eq('project_id', projectId)
      .single();
  },
  
  // Migration Steps
  createMigrationStep: async (stepData: any) => {
    return await supabase
      .from('migration_steps')
      .insert(stepData)
      .select()
      .single();
  },
  
  updateMigrationStep: async (stepId: string, updates: any) => {
    return await supabase
      .from('migration_steps')
      .update(updates)
      .eq('id', stepId)
      .select()
      .single();
  },
  
  getMigrationSteps: async (projectId: string) => {
    return await supabase
      .from('migration_steps')
      .select('*')
      .eq('project_id', projectId)
      .order('step_order');
  },
  
  // Validation Results
  saveValidationResults: async (projectId: string, validationData: any) => {
    return await supabase
      .from('validation_results')
      .upsert({
        project_id: projectId,
        data: validationData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
  },
  
  getValidationResults: async (projectId: string) => {
    return await supabase
      .from('validation_results')
      .select('*')
      .eq('project_id', projectId)
      .single();
  },
  
  // Real-time subscriptions
  subscribeToProject: (projectId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`project-${projectId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'projects',
          filter: `id=eq.${projectId}`
        }, 
        callback
      )
      .subscribe();
  },
  
  subscribeToMigrationSteps: (projectId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`migration-steps-${projectId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'migration_steps',
          filter: `project_id=eq.${projectId}`
        }, 
        callback
      )
      .subscribe();
  }
};