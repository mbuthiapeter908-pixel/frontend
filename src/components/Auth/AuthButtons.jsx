import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import CustomSignIn from './CustomSignIn';
import CustomSignUp from './CustomSignUp';
import Button from '../UI/Button';

const AuthButtons = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <SignedOut>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowSignIn(true)}
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setShowSignUp(true)}
            >
              Get Started
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/dashboard'}
            >
              Dashboard
            </Button>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-blue-200 rounded-xl",
                  userButtonPopoverCard: "rounded-2xl border border-gray-200 shadow-2xl"
                }
              }}
            />
          </div>
        </SignedIn>
      </div>

      {/* Custom Modals */}
      {showSignIn && <CustomSignIn onClose={() => setShowSignIn(false)} />}
      {showSignUp && <CustomSignUp onClose={() => setShowSignUp(false)} />}
    </>
  );
};

export default AuthButtons;