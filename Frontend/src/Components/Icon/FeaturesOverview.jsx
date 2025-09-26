import React from 'react';
import Icon from './AppIcon';
import Button from './Button';

const FeaturesOverview = () => {
  const features = [
    {
      id: 1,
      icon: "Code",
      title: "Question Tracker",
      description: "Interactive coding problem management with difficulty progression and personalized learning paths.",
      stats: "2,500+ Problems",
      color: "from-blue-500 to-blue-600",
      href: "/practice"
    },
    {
      id: 2,
      icon: "User",
      title: "Profile Dashboard",
      description: "Comprehensive skill visualization and career milestone tracking with detailed analytics.",
      stats: "Real-time Progress",
      color: "from-yellow-300 to-yellow-200",
      href: "/progress"
    },
    {
      id: 3,
      icon: "Brain",
      title: "AI Interview Prep",
      description: "Simulated technical interviews with real-time feedback and personalized improvement suggestions.",
      stats: "95% Success Rate",
      color: "from-purple-500 to-purple-600",
      href: "/interview-prep"
    },
    {
      id: 4,
      icon: "Users",
      title: "Community Hub",
      description: "Peer interaction, knowledge sharing, collaborative learning, and mentorship opportunities.",
      stats: "Active Community",
      color: "from-accent to-warning",
      href: "/community"
    }
  ];

  return (
    <section className="section-padding max-w-5xl mx-auto ">
      <div className="container-brand">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need to <span className="text-gradient">Excel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and resources designed to accelerate your coding journey and career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-5">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group bg-card rounded-xl p-6 shadow-subtle hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-2 border border-border"
            >
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-r ${feature?.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature?.icon} size={24} color="white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {feature?.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary">
                  {feature?.stats}
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                />
              </div>

             
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesOverview;