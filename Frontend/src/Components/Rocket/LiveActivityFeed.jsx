import { useState, useEffect } from 'react';
import Icon from '../../RocketUI/components/AppIcon.jsx'

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const mockActivities = [
    {
      id: 1,
      type: 'achievement',
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      action: 'earned React Expert badge',
      details: 'Completed advanced React patterns course',
      timestamp: new Date(Date.now() - 120000),
      icon: 'Award',
      color: 'text-yellow-400'
    },
    {
      id: 2,
      type: 'discussion',
      user: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      action: 'shared solution in JavaScript Arena',
      details: 'Two Sum problem - O(n) solution with HashMap',
      timestamp: new Date(Date.now() - 300000),
      icon: 'MessageSquare',
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'skill',
      user: 'Alex Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      action: 'leveled up TypeScript skills',
      details: 'Advanced from Intermediate to Expert level',
      timestamp: new Date(Date.now() - 480000),
      icon: 'TrendingUp',
      color: 'text-green-400'
    },
    {
      id: 4,
      type: 'mentorship',
      user: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      action: 'started mentoring session',
      details: 'Career transition guidance for junior developers',
      timestamp: new Date(Date.now() - 600000),
      icon: 'Users',
      color: 'text-purple-400'
    },
    {
      id: 5,
      type: 'challenge',
      user: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      action: 'completed Algorithm Challenge',
      details: 'Binary Tree Traversal - Perfect score in 15 minutes',
      timestamp: new Date(Date.now() - 720000),
      icon: 'Zap',
      color: 'text-orange-400'
    },
    {
      id: 6,
      type: 'interview',
      user: 'Lisa Zhang',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      action: 'aced mock interview',
      details: 'Google-style technical interview simulation',
      timestamp: new Date(Date.now() - 900000),
      icon: 'MessageSquare',
      color: 'text-cyan-400'
    },
    {
      id: 7,
      type: 'community',
      user: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      action: 'helped 5 developers today',
      details: 'Answered questions in React and Node.js forums',
      timestamp: new Date(Date.now() - 1080000),
      icon: 'Heart',
      color: 'text-pink-400'
    },
    {
      id: 8,
      type: 'career',
      user: 'Nina Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      action: 'updated career roadmap',
      details: 'Set goal: Senior Full Stack Developer by 2025',
      timestamp: new Date(Date.now() - 1200000),
      icon: 'Compass',
      color: 'text-indigo-400'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        ...mockActivities?.[Math.floor(Math.random() * mockActivities?.length)],
        id: Date.now(),
        timestamp: new Date()
      };
      
      setActivities(prev => [newActivity, ...prev?.slice(0, 7)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getActivityTypeLabel = (type) => {
    const labels = {
      achievement: 'Achievement',
      discussion: 'Discussion',
      skill: 'Skill Progress',
      mentorship: 'Mentorship',
      challenge: 'Challenge',
      interview: 'Interview',
      community: 'Community',
      career: 'Career'
    };
    return labels?.[type] || 'Activity';
  };

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <h2 className="text-3xl text-gray-500 font-bold text-foreground">
                Live Community Activity
              </h2>
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
            <p className="text-lg text-gray-500 text-muted-foreground">
              See what developers are achieving right now on CodeMinder Pro
            </p>
          </div>

          {/* Activity Feed */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Feed Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <Icon name="Activity" size={20} className="text-primary" />
                <span className="font-semibold text-foreground text-gray-600">Recent Activity</span>
                <span className="text-sm text-muted-foreground">
                  ({activities?.length} updates)
                </span>
              </div>
              
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name={isVisible ? "EyeOff" : "Eye"} size={16} />
                <span>{isVisible ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            {/* Activity List */}
            {isVisible && (
              <div className="max-h-96 overflow-y-auto">
                {activities?.map((activity, index) => (
                  <div
                    key={activity?.id}
                    className={`flex items-start space-x-4 p-6 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-200 ${
                      index === 0 ? 'animate-fade-in' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                        <img
                          src={activity?.avatar}
                          alt={activity?.user}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-foreground">
                          {activity?.user}
                        </span>
                        <span className="text-muted-foreground">
                          {activity?.action}
                        </span>
                        <div className={`flex items-center space-x-1 ${activity?.color}`}>
                          <Icon name={activity?.icon} size={14} />
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity?.details}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{formatTimeAgo(activity?.timestamp)}</span>
                        <span className="px-2 py-1 bg-muted/50 rounded-full">
                          {getActivityTypeLabel(activity?.type)}
                        </span>
                      </div>
                    </div>

                    {/* Activity Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center ${activity?.color}`}>
                      <Icon name={activity?.icon} size={16} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Feed Footer */}
            <div className="p-6 bg-muted/20 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span>247 developers online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MessageSquare" size={14} />
                    <span>1,234 discussions today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={14} />
                    <span>89 achievements earned</span>
                  </div>
                </div>
                
                <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                  View All Activity →
                </button>
              </div>
            </div>
          </div>

          {/* Join Community CTA */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-3 px-6 py-3  border border-primary/20 rounded-full">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="text-primary font-medium">
                Join 50,000+ developers accelerating their careers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivityFeed;