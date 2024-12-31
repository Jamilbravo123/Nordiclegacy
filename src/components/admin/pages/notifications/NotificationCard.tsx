import React from 'react';
import { Bell, Clock, Users, Edit2, Trash2, Send } from 'lucide-react';
import type { Notification } from './types/notifications';
import { formatDate } from '../../../../utils/dateUtils';
import { Button } from '../../../ui/Button';

interface NotificationCardProps {
  notification: Notification;
  onSend?: (id: string) => Promise<void>;
  onEdit?: (notification: Notification) => void;
  onDelete?: (id: string) => Promise<void>;
}

export function NotificationCard({ notification, onSend, onEdit, onDelete }: NotificationCardProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = async () => {
    if (!onSend) return;
    try {
      setIsLoading(true);
      await onSend(notification.id);
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    try {
      setIsLoading(true);
      await onDelete(notification.id);
    } catch (error) {
      console.error('Error deleting notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gray-800 rounded-lg">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">
              {notification.title}
            </h3>
            <p className="text-gray-400 mb-4">{notification.message}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {formatDate(notification.scheduled_for)}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {notification.target_audience.join(', ')}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                notification.status === 'sent' 
                  ? 'bg-green-400/10 text-green-400'
                  : 'bg-gray-800 text-gray-400'
              }`}>
                {notification.status}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {notification.status === 'draft' && (
            <>
              <Button
                variant="secondary"
                onClick={handleSend}
                disabled={isLoading}
                className="flex items-center gap-2 bg-transparent hover:bg-white/10"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </Button>
              <button 
                onClick={() => onEdit?.(notification)}
                disabled={isLoading}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </>
          )}
          <button 
            onClick={handleDelete}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}