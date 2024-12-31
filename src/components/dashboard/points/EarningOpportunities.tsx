import React from 'react';
import { Gift, Users, ShoppingBag, Star } from 'lucide-react';
import { Button } from '../../ui/Button';

const opportunities = [
  {
    icon: ShoppingBag,
    title: 'Make a Purchase',
    description: 'Earn 1 point for every $1 spent',
    points: '1x Points',
    action: 'Shop Now'
  },
  {
    icon: Users,
    title: 'Refer a Friend',
    description: 'Get 500 points for each successful referral',
    points: '500 Points',
    action: 'Invite Friends'
  },
  {
    icon: Star,
    title: 'Write a Review',
    description: 'Share your experience and earn points',
    points: '100 Points',
    action: 'Write Review'
  },
  {
    icon: Gift,
    title: 'Birthday Bonus',
    description: 'Double points during your birthday month',
    points: '2x Points',
    action: 'Learn More'
  }
];

export function EarningOpportunities() {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Ways to Earn</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opportunity, index) => (
          <div 
            key={index}
            className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <opportunity.icon className="h-6 w-6 text-gray-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-1">
                  {opportunity.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {opportunity.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-medium">
                    {opportunity.points}
                  </span>
                  <Button variant="secondary" size="sm">
                    {opportunity.action}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}