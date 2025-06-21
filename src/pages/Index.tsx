
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Calendar, User, Users, Search, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "AI-Powered MRI Diagnosis",
      description: "Advanced AI analysis of brain scans for early detection of neurological conditions"
    },
    {
      icon: Calendar,
      title: "Doctor Appointments",
      description: "Easy booking system to connect with specialized neurologists and oncologists"
    },
    {
      icon: Users,
      title: "Anonymous Community",
      description: "Safe space for patients to share experiences and support each other"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Patient",
      content: "BrainTech.Ai helped me get an early diagnosis that changed my treatment path. The community support has been invaluable."
    },
    {
      name: "Dr. James Wilson",
      role: "Neurologist",
      content: "The AI diagnostic tools provide excellent preliminary analysis, helping me make more informed decisions for my patients."
    },
    {
      name: "Maria Rodriguez",
      role: "Caregiver",
      content: "The platform's user-friendly interface made it easy for my elderly father to manage his appointments and connect with others."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart <span className="text-primary-600">Brain</span>care
              <br />
              <span className="text-secondary-600">AI Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced AI-powered healthcare platform for Alzheimer's and cancer patients. 
              Get accurate diagnoses, connect with specialists, and find community support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg rounded-xl medical-shadow"
              >
                Book Test Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50 px-8 py-4 text-lg rounded-xl"
              >
                Find a Doctor
                <User className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl medical-shadow flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-brain-pulse"></div>
                <p className="text-gray-600 text-lg">AI Brain Analysis Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive <span className="text-primary-600">Healthcare</span> Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with human expertise to provide 
              the best care for neurological and oncological conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 medical-shadow">
                <CardContent className="text-center p-0">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-primary-600">BrainTech.Ai</span>?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-700">Advanced AI algorithms trained on thousands of brain scans</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-700">Network of certified neurologists and oncologists</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-700">HIPAA-compliant platform ensuring complete privacy</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-medical-success rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-700">24/7 community support and resources</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl medical-shadow">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <p className="text-gray-600 mb-4">Diagnostic Accuracy</p>
              <div className="text-4xl font-bold text-secondary-600 mb-2">50K+</div>
              <p className="text-gray-600 mb-4">Patients Helped</p>
              <div className="text-4xl font-bold text-accent mb-2">1K+</div>
              <p className="text-gray-600">Expert Doctors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-primary-600">Community</span> Says
            </h2>
            <p className="text-xl text-gray-600">Real stories from patients and healthcare professionals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 medical-shadow">
                <CardContent className="p-0">
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                <span className="text-2xl font-bold">BrainTech.Ai</span>
              </div>
              <p className="text-gray-400">
                Advanced AI-powered healthcare platform for brain health and cancer care.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth" className="hover:text-white transition-colors">AI Diagnosis</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">Find Doctors</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@braintech.ai</li>
                <li>1-800-BRAIN-AI</li>
                <li>24/7 Emergency Line</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BrainTech.Ai. All rights reserved. | HIPAA Compliant Healthcare Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
