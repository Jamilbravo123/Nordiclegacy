import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase';
import type { AdminSettings } from '../types/settings';

export function useSettings() {
  const [settings, setSettings] = useState<AdminSettings>({
    systemName: '',
    supportEmail: '',
    maintenanceMode: false,
    twoFactorRequired: false,
    strongPasswordPolicy: true,
    sessionTimeout: 30,
    apiKey: '',
    webhookUrl: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single();

      if (error) throw error;
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<AdminSettings>) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update(updates)
        .eq('id', 1);

      if (error) throw error;
      setSettings(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  return {
    settings,
    loading,
    updateSettings
  };
}