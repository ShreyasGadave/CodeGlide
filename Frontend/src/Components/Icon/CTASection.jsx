import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const stats = [
    { value: "50,000+", label: "Active Developers", icon: "Users" },
    { value: "2,500+", label: "Coding Problems", icon: "Code" },
    { value: "85%", label: "Success Rate", icon: "TrendingUp" },
    { value: "24/7", label: "Community Support", icon: "MessageCircle" }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-warning/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container-brand relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat?.icon} size={24} color="white" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your{' '}
            <span className="text-gradient">Coding Career?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands of developers who have accelerated their careers with CodoGlide. 
            Start your personalized coding journey today and unlock your full potential.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="xl" 
              className="gradient-primary hover:shadow-brand-lg hover:-translate-y-1 transition-all duration-300"
              iconName="Rocket"
              iconPosition="left"
            >
              Start Free Journey
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-success" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Brain" size={32} color="white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              AI-Powered Learning
            </h3>
            <p className="text-muted-foreground text-sm">
              Personalized recommendations and intelligent progress tracking for optimal learning outcomes.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={32} color="white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Vibrant Community
            </h3>
            <p className="text-muted-foreground text-sm">
              Connect with peers, find mentors, and share knowledge in our supportive developer community.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-warning rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Trophy" size={32} color="white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Proven Results
            </h3>
            <p className="text-muted-foreground text-sm">
              Track your progress with detailed analytics and celebrate milestones on your coding journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;