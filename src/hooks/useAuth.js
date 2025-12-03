import { useSignIn, useSignUp, useUser } from '@clerk/clerk-react';

export const useCustomAuth = () => {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { user, isLoaded: userLoaded } = useUser();

  const handleSignIn = async (email, password) => {
    if (!signInLoaded) return;
    
    try {
      const result = await signIn.create({
        identifier: email,
        password
      });
      
      if (result.status === 'complete') {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const handleSignUp = async (email, password, firstName, lastName) => {
    if (!signUpLoaded) return;
    
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName
      });
      
      if (result.status === 'complete') {
        // Sign up successful
        window.location.href = '/dashboard';
      } else if (result.status === 'missing_requirements') {
        // Need to verify email
        await signUp.prepareEmailAddressVerification();
        // Show verification component
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  return {
    user,
    isLoaded: userLoaded,
    signIn: handleSignIn,
    signUp: handleSignUp,
    isSignedIn: !!user
  };
};