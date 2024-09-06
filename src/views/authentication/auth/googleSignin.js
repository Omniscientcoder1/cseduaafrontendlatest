import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebaseConfig'; // Ensure you have the correct firebaseConfig path
import { signInWithPopup } from 'firebase/auth';
import Dashboard from 'src/views/dashboard/Dashboard';

function SignIn() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);  // Set loading to true while sign-in is processing

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        user.getIdToken().then((idToken) => {
          // Send the token to your Django backend for verification
          fetch('http://localhost:8000/google-signin/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                console.error('Error:', data.error);
              } else {
                console.log('Sign-in successful:', data);
                // Store user information and token (if needed)
                setValue(user.email);
                localStorage.setItem('email', user.email);
                localStorage.setItem('token', data.token); // Store token for future API requests
              }
            })
            .catch((error) => {
              console.error('Error during Google Sign-In:', error);
            })
            .finally(() => {
              setLoading(false);  // Stop loading once the process is complete
            });
        });
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
        setLoading(false);  // Stop loading if there is an error
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  return (
    <div>
      {value ? (
        <Dashboard />
      ) : (
        <div>
          <button onClick={handleClick} disabled={loading}>
            {loading ? 'Signing in...' : 'Signin With Google'}
          </button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
