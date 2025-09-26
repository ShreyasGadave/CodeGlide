import React from 'react';
import Icon from './AppIcon';
import Button from './Button';

const ValueProposition = () => {
  const audiences = [
    {
      id: 1,
      title: "Mid-Level Developers",
      subtitle: "2-5 years experience",
      icon: "Code2",
      description: "Structured career advancement and skill validation to reach senior positions faster.",
      benefits: [
        "Advanced coding challenges",
        "Career progression tracking",
        "Technical interview mastery",
        "Leadership skill development"
      ],
      cta: "Advance Your Career",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Bootcamp Graduates",
      subtitle: "Ready to launch careers",
      icon: "Rocket",
      description: "Portfolio development and interview preparation to land your first developer role.",
      benefits: [
        "Portfolio project guidance",
        "Interview preparation",
        "Industry best practices",
        "Peer networking opportunities"
      ],
      cta: "Launch Your Career",
      color: "from-primary to-secondary"
    },
    {
      id: 3,
      title: "Senior Developers",
      subtitle: "Industry veterans",
      icon: "Crown",
      description: "Mentoring opportunities and staying current with emerging technologies and trends.",
      benefits: [
        "Mentorship matching",
        "Emerging tech insights",
        "Thought leadership platform",
        "Expert community access"
      ],
      cta: "Share Your Expertise",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Career Changers",
      subtitle: "Transitioning to tech",
      icon: "RefreshCw",
      description: "Comprehensive learning paths and support for successful career transitions.",
      benefits: [
        "Structured learning paths",
        "Career transition support",
        "Industry insider knowledge",
        "Success story community"
      ],
      cta: "Start Your Transition",
      color: "from-accent to-warning"
    }
  ];

  return (
    <section className="section-padding mt-10 max-w-5xl mx-auto">
      <div className="container-brand">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tailored for Every <span className="text-gradient">Developer Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're advancing your career, launching into tech, or sharing expertise, 
            CodoGlide provides the right tools and community for your unique path.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          {audiences?.map((audience) => (
            <div
              key={audience?.id}
              className="bg-card rounded-xl p-4 shadow-subtle hover:shadow-brand-lg transition-all duration-300 border border-border group"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r ${audience?.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={audience?.icon} size={28} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {audience?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {audience?.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {audience?.description}
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {audience?.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={12} className="text-success" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button 
                variant="outline" 
                fullWidth
                className="group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary transition-all duration-300"
                iconName="ArrowRight"
                iconPosition="right"
              >
                {audience?.cta}
              </Button>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default ValueProposition;