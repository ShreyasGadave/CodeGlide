import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'BarChart3' },
    { name: 'Skills', href: '/skills', icon: 'Code2' },
    { name: 'Career Path', href: '/career', icon: 'TrendingUp' },
    { name: 'Community', href: '/community', icon: 'Users' },
  ];

  const moreMenuItems = [
    { name: 'Settings', href: '/settings', icon: 'Settings' },
    { name: 'Help Center', href: '/help', icon: 'HelpCircle' },
    { name: 'Documentation', href: '/docs', icon: 'BookOpen' },
    { name: 'API', href: '/api', icon: 'Code' },
  ];

  const handleNavClick = (href) => {
    console.log(`Navigating to: ${href}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-md' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                <Icon name="Code2" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground tracking-tight">
                CodeMinder Pro
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                v2.1.0
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.name}
                onClick={() => handleNavClick(item?.href)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 group"
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className="group-hover:text-primary transition-colors duration-200" 
                />
                <span>{item?.name}</span>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg animate-fade-in">
                  <div className="py-2">
                    {moreMenuItems?.map((item) => (
                      <button
                        key={item?.name}
                        onClick={() => handleNavClick(item?.href)}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors duration-200"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Live Activity Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-success">
                247 online
              </span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200">
              <Icon name="Bell" size={20} />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning text-warning-foreground text-xs font-bold rounded-full flex items-center justify-center">
                3
              </div>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-foreground">Alex Chen</div>
                <div className="text-xs text-muted-foreground">Senior Developer</div>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">AC</span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md animate-slide-up">
            <div className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.name}
                  onClick={() => handleNavClick(item?.href)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </button>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {moreMenuItems?.map((item) => (
                  <button
                    key={item?.name}
                    onClick={() => handleNavClick(item?.href)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;