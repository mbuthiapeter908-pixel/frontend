// Inside the component, add state for both modals
const [showSignIn, setShowSignIn] = useState(false);
const [showSignUp, setShowSignUp] = useState(false);

// Update the modals to pass switch functions
{showSignIn && (
  <CustomSignIn 
    onClose={() => setShowSignIn(false)}
    switchToSignUp={() => {
      setShowSignIn(false);
      setShowSignUp(true);
    }}
  />
)}

{showSignUp && (
  <CustomSignUp 
    onClose={() => setShowSignUp(false)}
    switchToSignIn={() => {
      setShowSignUp(false);
      setShowSignIn(true);
    }}
  />
)}