import { registerUser, loginUser } from '@/api/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    specialty: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.email.includes('@')) {
      newErrors.push('Please enter a valid email address');
    }
    
    if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters long');
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }
    
    if (!isLogin && !formData.fullName.trim()) {
      newErrors.push('Full name is required');
    }
    
    if (!isLogin && role === 'doctor' && !formData.specialty.trim()) {
      newErrors.push('Specialty is required for doctors');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    let response;
    
    if (isLogin) {
      // Login
      response = await loginUser(formData.email, formData.password, role);
    } else {
      // Register
      const userData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role,
        ...(role === 'doctor' && { specialty: formData.specialty })
      };
      response = await registerUser(userData);
    }

    // Check if successful
    if (response.success) {
      // Navigate to appropriate dashboard
      switch (role) {
        case 'patient':
          navigate('/patient-dashboard');
          break;
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
      }
    } else {
      setErrors([response.message || 'Something went wrong']);
    }
  } catch (error: any) {
    setErrors([error.message || 'Network error. Please try again.']);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="medical-shadow border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your BrainTech.Ai account' : 'Join the BrainTech.Ai community'}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Select Your Role
              </label>
              <div className="flex gap-2">
                {(['patient', 'doctor', 'admin'] as const).map((r) => (
                  <Badge
                    key={r}
                    variant={role === r ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 capitalize ${
                      role === r 
                        ? 'bg-primary-500 hover:bg-primary-600' 
                        : 'hover:bg-primary-50'
                    }`}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </Badge>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="rounded-lg"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="rounded-lg"
                  />
                </div>
              )}

              {!isLogin && role === 'doctor' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Medical Specialty
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Neurology, Oncology"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    className="rounded-lg"
                  />
                </div>
              )}

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <ul className="text-sm text-red-600 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-3"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 hover:text-primary-700 text-sm transition-colors"
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
