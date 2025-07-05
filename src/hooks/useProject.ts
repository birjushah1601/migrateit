import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useProject = (projectId?: string) => {
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get single project
  useEffect(() => {
    if (projectId && user) {
      fetchProject(projectId);
    }
  }, [projectId, user]);

  // Get user's projects
  useEffect(() => {
    if (user && !projectId) {
      fetchUserProjects();
    }
  }, [user, projectId]);

  const fetchProject = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await db.getProject(id);
      if (error) throw error;
      setProject(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProjects = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await db.getUserProjects(user.id);
      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: any) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      const { data, error } = await db.createProject({
        ...projectData,
        user_id: user.id,
      });
      if (error) throw error;
      
      // Refresh projects list
      await fetchUserProjects();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, updates: any) => {
    setLoading(true);
    try {
      const { data, error } = await db.updateProject(id, updates);
      if (error) throw error;
      
      setProject(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    project,
    projects,
    loading,
    error,
    createProject,
    updateProject,
    refetch: projectId ? () => fetchProject(projectId) : fetchUserProjects,
  };
};