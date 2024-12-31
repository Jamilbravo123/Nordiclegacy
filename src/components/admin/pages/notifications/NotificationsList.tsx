import React from 'react';
import { NotificationCard } from './NotificationCard';
import type { Notification } from './types/notifications';

interface NotificationsListProps {
  notifications: Notification[];
  onSendNotification: (id: string) => Promise<void>;
  onEditNotification: (notification: Notification) => void;
  onDeleteNotification: (id: string) => Promise<void>;
}

export function NotificationsList({ 
  notifications,
  onSendNotification,
  onEditNotification,
  onDeleteNotification
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg">
        <p className="text-gray-400">No notifications available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard 
          key={notification.id} 
          notification={notification}
          onSend={onSendNotification}
          onEdit={onEditNotification}
          onDelete={onDeleteNotification}
        />
      ))}
    </div>
  );
}