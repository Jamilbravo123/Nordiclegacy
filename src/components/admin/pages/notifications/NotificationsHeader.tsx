import React from 'react';
import { Bell, Plus } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface NotificationsHeaderProps {
  onNewNotification: () => void;
}

export function NotificationsHeader({ onNewNotification }: NotificationsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Notifications</h1>
        <p className="text-gray-400">Manage and send notifications to members</p>
      </div>
      <Button 
        onClick={onNewNotification}
        className="flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        New Notification
      </Button>
    </div>
  );
}