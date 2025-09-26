import React, { useState } from 'react';
import Icon from '../../RocketUI/components/AppIcon';
import Button from '../../RocketUI/components/ui/Button';
import Input from '../../RocketUI/components/ui/Input';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Email submitted:', email);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }, 1500);
  };

  const handleStartAssessment = () => {
    console.log('Starting free assessment');
  };

  const handleViewDemo = () => {
    console.log('Viewing platform demo');
  };

  const benefits = [
    {
      icon: 'Zap',
      title: 'Instant Skill Assessment',
      description: 'Get personalized insights in under 10 minutes'
    },
    {
      icon: 'Users',
      title: 'Community Access',
      description: 'Connect with 50+ developers worldwide'
    },
    {
      icon: 'Bot',
      title: 'AI Mentorship',
      description: '24/7 personalized guidance and career advice'
    },
    {
      icon: 'Award',
      title: 'Achievement Tracking',
      description: 'Visual progress showcase for your portfolio'
    }
  ];

  return (
    <section className="py-20  relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Content */}
          <div className="mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#FFF045]/80 via-[#00CDD7]/80 to-[#2086D7]/80 border border-success/20 rounded-full text-sm font-medium text-success mb-6">
              <Icon name="CheckCircle" size={16} />
              <span>Free Forever • No Credit Card Required</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ready to
              <span className="block gradient-text">
                Accelerate Your
              </span>
              <span className="block text-accent">
                Coding Career?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 50+ developers who've transformed their careers with intelligent skill tracking, AI mentorship, and community-driven growth.
            </p>

          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 max-w-4xl gap-3 mb-16">
            {benefits?.map((benefit, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:bg-card/80 transition-all duration-300 card-hover"
              >
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {benefit?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit?.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success text-gray-700" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-success text-gray-700" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-success text-gray-700" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-success text-gray-700" />
              <span>50+ Developers Trust Us</span>
            </div>
          </div>

          {/* Final Encouragement */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="text-foreground font-medium">
                Your coding journey starts in less than 2 minutes
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              No setup required • Instant access to all features • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;