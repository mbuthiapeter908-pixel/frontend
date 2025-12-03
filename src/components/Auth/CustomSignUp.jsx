import React, { useState } from 'react';
import { useSignUp, useSignIn } from '@clerk/clerk-react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import Button from '../UI/Button';

const CustomSignUp = ({ onClose, switchToSignIn }) => {
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signIn } = useSignIn();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  // Handle email/password sign up
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    if (!signUpLoaded) {
      setError('Authentication system is loading...');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Create the sign up attempt
      await signUp.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        password: formData.password,
      });

      // Step 2: Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      
      // Move to verification step
      setVerificationStep(true);
      
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.errors?.[0]?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle verification code submission
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    
    if (!signUpLoaded) return;
    
    setLoading(true);
    setError('');

    try {
      // Complete the sign up with verification code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === 'complete') {
        // Sign up successful! Auto sign in
        await signIn.create({
          identifier: formData.email,
          password: formData.password,
        });
        
        // Close modal and redirect
        onClose();
        window.location.href = '/dashboard';
      }
      
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.errors?.[0]?.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Social sign up (Google, GitHub)
  const handleSocialSignUp = async (provider) => {
    if (!signUpLoaded) return;
    
    try {
      await signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      console.error('Social sign up error:', err);
      setError(`Failed to sign up with ${provider}. Please try again.`);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak' };
    if (password.length < 10) return { strength: 50, label: 'Fair' };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return { strength: 75, label: 'Good' };
    }
    return { strength: 100, label: 'Strong' };
  };

  // VERIFICATION STEP UI
  if (verificationStep) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Verify Your Email</h2>
                  <p className="text-gray-600 text-sm">
                    Check your email for verification code
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleVerifyEmail} className="p-6 space-y-6">
            <div>
              <p className="text-gray-700 mb-4">
                We sent a verification code to <strong>{formData.email}</strong>.
                Please enter it below to complete your registration.
              </p>
              
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-center text-lg tracking-widest"
                maxLength="6"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setVerificationStep(false)}
                className="border-2 border-gray-300 hover:border-gray-400"
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // SIGN UP FORM UI
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">Join JobHub</h2>
                <p className="text-gray-600 text-sm">Start your career journey today</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleEmailSignUp} className="p-6 space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getPasswordStrength(formData.password).strength < 50 ? 'bg-red-500' :
                    getPasswordStrength(formData.password).strength < 75 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${getPasswordStrength(formData.password).strength}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {getPasswordStrength(formData.password).label && 
                 `Password strength: ${getPasswordStrength(formData.password).label}`}
              </p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || !formData.agreeTerms}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 font-bold mt-4"
          >
            {loading ? 'Creating Account...' : '🚀 Create Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="px-6">
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or sign up with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </div>

        {/* Social Sign Up */}
        <div className="p-6 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleSocialSignUp('google')}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleSocialSignUp('github')}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              <img src="https://github.com/favicon.ico" alt="GitHub" className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="p-6 pt-0">
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={switchToSignIn}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomSignUp;