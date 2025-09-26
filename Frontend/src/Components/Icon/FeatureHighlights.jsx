import React from 'react';
import Icon from './AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: "Target",
      title: "ATS Compatibility Score",
      description: "Get a detailed percentage score showing how well your resume passes through Applicant Tracking Systems"
    },
    {
      icon: "Search",
      title: "Keyword Analysis",
      description: "Identify missing keywords and optimize your resume for specific job categories and roles"
    },
    {
      icon: "TrendingUp",
      title: "Improvement Suggestions",
      description: "Receive personalized recommendations to enhance your resume\'s effectiveness and appeal"
    },
    {
      icon: "Briefcase",
      title: "Job Recommendations",
      description: "Discover relevant job opportunities that match your skills and target role preferences"
    }
  ];

  return (
    <div className="max-w-5xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Why Choose Our ATS Resume Analyzer?
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Our AI-powered platform helps job seekers optimize their resumes for better ATS compatibility and increased job search success
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features?.map((feature, index) => (
          <div 
            key={index}
            className="bg-card shadow border border-border rounded-xl p-6 text-center hover:shadow-card-md transition-all duration-300 hover:border-primary/30"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name={feature?.icon} size={24} color="black" />
            </div>
            
            <h3 className="font-semibold text-gray-700 mb-2">
              {feature?.title}
            </h3>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
        <div className="text-center pt-8 space-y-4">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={16} className="text-green-700" />
                  <span>Secure File Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={16} className="text-blue-700" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} className="text-gray-700" />
                  <span>Trusted by 10,000+ Job Seekers</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-700">
                Your resume data is processed securely and never stored permanently
              </p>
            </div>
    </div>
  );
};

export default FeatureHighlights;