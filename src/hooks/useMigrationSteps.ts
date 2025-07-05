import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';

export const useMigrationSteps = (projectId: string) => {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      fetchMigrationSteps();
      
      // Subscribe to real-time updates
      const subscription = db.subscribeToMigrationSteps(projectId, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setSteps(prev => prev.map(step => 
            step.id === payload.new.id ? payload.new : step
          ));
        } else if (payload.eventType === 'INSERT') {
          setSteps(prev => [...prev, payload.new].sort((a, b) => a.step_order - b.step_order));
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [projectId]);

  const fetchMigrationSteps = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.getMigrationSteps(projectId);
      if (error) throw error;
      setSteps(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createMigrationStep = async (stepData: any) => {
    try {
      const { data, error } = await db.createMigrationStep({
        ...stepData,
        project_id: projectId,
      });
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateMigrationStep = async (stepId: string, updates: any) => {
    try {
      const { data, error } = await db.updateMigrationStep(stepId, updates);
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    steps,
    loading,
    error,
    createMigrationStep,
    updateMigrationStep,
    refetch: fetchMigrationSteps,
  };
};