/*
  # Migration Tool Database Schema

  1. New Tables
    - `projects` - Main migration projects
    - `analysis_results` - Site analysis data
    - `migration_steps` - Individual migration step tracking
    - `validation_results` - Post-migration validation data
    - `user_profiles` - Extended user information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Ensure data isolation between users

  3. Features
    - Real-time subscriptions for live progress updates
    - JSONB storage for flexible data structures
    - Comprehensive audit trail with timestamps
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  source_url text NOT NULL,
  site_type text CHECK (site_type IN ('dynamic', 'static')) NOT NULL,
  status text CHECK (status IN ('created', 'analyzing', 'analyzed', 'migrating', 'validating', 'completed', 'failed')) DEFAULT 'created',
  target_environment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Analysis results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Migration steps table
CREATE TABLE IF NOT EXISTS migration_steps (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  step_name text NOT NULL,
  step_order integer NOT NULL,
  status text CHECK (status IN ('pending', 'running', 'completed', 'failed', 'paused')) DEFAULT 'pending',
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_time timestamptz,
  end_time timestamptz,
  logs jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Validation results table
CREATE TABLE IF NOT EXISTS validation_results (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name text,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE migration_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for analysis_results
CREATE POLICY "Users can view own analysis results"
  ON analysis_results
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = analysis_results.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own analysis results"
  ON analysis_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = analysis_results.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own analysis results"
  ON analysis_results
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = analysis_results.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for migration_steps
CREATE POLICY "Users can view own migration steps"
  ON migration_steps
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = migration_steps.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own migration steps"
  ON migration_steps
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = migration_steps.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own migration steps"
  ON migration_steps
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = migration_steps.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for validation_results
CREATE POLICY "Users can view own validation results"
  ON validation_results
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = validation_results.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own validation results"
  ON validation_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = validation_results.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own validation results"
  ON validation_results
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = validation_results.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_analysis_results_project_id ON analysis_results(project_id);
CREATE INDEX IF NOT EXISTS idx_migration_steps_project_id ON migration_steps(project_id);
CREATE INDEX IF NOT EXISTS idx_migration_steps_status ON migration_steps(status);
CREATE INDEX IF NOT EXISTS idx_validation_results_project_id ON validation_results(project_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analysis_results_updated_at 
  BEFORE UPDATE ON analysis_results 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_migration_steps_updated_at 
  BEFORE UPDATE ON migration_steps 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_validation_results_updated_at 
  BEFORE UPDATE ON validation_results 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();