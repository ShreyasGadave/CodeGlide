import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [terminalText, setTerminalText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const terminalLines = [
    '$ codeminder --init',
    'Initializing CodeMinder Pro...',
    'Analyzing skill progression...',
    '✓ JavaScript: Level 8 → Level 9 (+12%)',
    '✓ React: Level 7 → Level 8 (+15%)',
    '✓ Node.js: Level 6 → Level 7 (+18%)',
    'Career trajectory: +$15K potential',
    'Next milestone: Senior Developer',
    '$ Ready to accelerate your journey?'
  ];

  useEffect(() => {
    const typeText = () => {
      if (currentLine < terminalLines?.length) {
        const line = terminalLines?.[currentLine];
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (charIndex <= line?.length) {
            setTerminalText(prev => {
              const lines = prev?.split('\n');
              lines[currentLine] = line?.substring(0, charIndex);
              return lines?.join('\n');
            });
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setCurrentLine(prev => prev + 1);
            }, 500);
          }
        }, 50);
      }
    };

    const timer = setTimeout(typeText, currentLine * 800);
    return () => clearTimeout(timer);
  }, [currentLine]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleStartAssessment = () => {
    console.log('Starting free assessment');
  };

  const handleExplorePaths = () => {
    console.log('Exploring career paths');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_50%)] opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                <Icon name="Zap" size={16} />
                <span>AI-Powered Career Acceleration</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Coding
                <span className="block gradient-text">
                  Challenges into
                </span>
                <span className="block text-accent">
                  Career Victories
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Join 50+ developers who've accelerated their careers with intelligent skill tracking, AI mentorship, and community-driven growth.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={handleStartAssessment}
                className="btn-glow"
              >
                Start Free Assessment
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="TrendingUp"
                iconPosition="left"
                onClick={handleExplorePaths}
              >
                Explore Career Paths
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">$25K</div>
                <div className="text-sm text-muted-foreground">Avg Salary Boost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">94%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Terminal */}
          <div className="relative">
            <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-slate-400 font-mono">
                  CodeMinder Terminal
                </div>
                <div className="w-16"></div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm min-h-[400px]">
                <pre className="text-green-400 whitespace-pre-wrap">
                  {terminalText}
                  {showCursor && <span className="terminal-cursor">|</span>}
                </pre>
              </div>
            </div>

            {/* Floating Progress Cards */}
            <div className="absolute -right-4 top-8 bg-card border border-border rounded-lg p-4 shadow-lg animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Skill Progress</div>
                  <div className="text-xs text-muted-foreground">+15% this week</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-8 bg-card border border-border rounded-lg p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Community</div>
                  <div className="text-xs text-muted-foreground">247 online now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;