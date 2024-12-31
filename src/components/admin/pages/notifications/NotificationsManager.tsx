import React, { useState } from 'react';
import { NotificationsHeader } from './NotificationsHeader';
import { NotificationsList } from './NotificationsList';
import { NotificationForm } from './NotificationForm';
import { useNotifications } from './hooks/useNotifications';
import { useAuthContext } from '../../../auth/AuthProvider';
import type { Notification } from './types/notifications';

export function NotificationsManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const { notifications, loading, createNotification, updateNotification, sendNotification, deleteNotification, refetch } = useNotifications();
  const { user } = useAuthContext();

  const handleCreateNotification = async (formData) => {
    try {
      await createNotification({
        ...formData,
        status: 'draft',
        created_by: user?.id
      });
      setShowForm(false);
      await refetch();
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  };

  const handleEditNotification = async (formData) => {
    if (!editingNotification) return;
    try {
      await updateNotification(editingNotification.id, formData);
      setEditingNotification(null);
      await refetch();
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  };

  const handleSendNotification = async (id: string) => {
    try {
      await sendNotification(id);
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <NotificationsHeader onNewNotification={() => setShowForm(true)} />
      <NotificationsList 
        notifications={notifications}
        onSendNotification={handleSendNotification}
        onEditNotification={setEditingNotification}
        onDeleteNotification={handleDeleteNotification}
      />
      {(showForm || editingNotification) && (
        <NotificationForm
          onSubmit={editingNotification ? handleEditNotification : handleCreateNotification}
          onCancel={() => {
            setShowForm(false);
            setEditingNotification(null);
          }}
          initialData={editingNotification || undefined}
        />
      )}
    </div>
  );
}