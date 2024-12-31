import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase';
import type { Notification } from '../types/notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('member_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async (notification: Omit<Notification, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('member_notifications')
        .insert([notification])
        .select()
        .single();

      if (error) throw error;
      setNotifications(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  };

  const updateNotification = async (id: string, updates: Partial<Notification>) => {
    try {
      const { data, error } = await supabase
        .from('member_notifications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setNotifications(prev => prev.map(n => n.id === id ? data : n));
      return data;
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  };

  const sendNotification = async (id: string) => {
    try {
      // First, get the notification details
      const { data: notification, error: fetchError } = await supabase
        .from('member_notifications')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Get target users based on tiers
      const { data: targetUsers, error: usersError } = await supabase
        .from('member_profiles')
        .select('id')
        .in('current_tier', notification.target_audience);

      if (usersError) throw usersError;

      // Create notification recipients
      const recipients = targetUsers.map(user => ({
        notification_id: id,
        user_id: user.id
      }));

      const { error: recipientsError } = await supabase
        .from('notification_recipients')
        .insert(recipients);

      if (recipientsError) throw recipientsError;

      // Update notification status to sent
      const { data: updatedNotification, error: updateError } = await supabase
        .from('member_notifications')
        .update({ 
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Update local state
      setNotifications(prev => 
        prev.map(n => n.id === id ? updatedNotification : n)
      );

      return updatedNotification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('member_notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  };

  return {
    notifications,
    loading,
    createNotification,
    updateNotification,
    sendNotification,
    deleteNotification,
    refetch: fetchNotifications,
  };
}