import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from '@clerk/clerk-react';
import Button from '../UI/Button';

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button 
              variant="primary" 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.location.href = '/dashboard'}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            Dashboard
          </Button>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow"
              }
            }}
          />
        </div>
      </SignedIn>
    </div>
  );
};

export default AuthButtons;