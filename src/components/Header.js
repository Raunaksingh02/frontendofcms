import React from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react';

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>EduTech</h1>
        <nav style={styles.nav}>
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button style={styles.button}>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button style={{ ...styles.button, ...styles.primaryButton }}>
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e0e0e0',
    padding: '1rem 0',
    marginBottom: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #333',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  primaryButton: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
  },
};

export default Header;
