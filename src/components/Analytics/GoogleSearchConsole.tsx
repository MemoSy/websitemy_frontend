import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleSearchConsoleProps {
  verificationCode?: string;
}

const GoogleSearchConsole: React.FC<GoogleSearchConsoleProps> = ({ 
  verificationCode 
}) => {
  if (!verificationCode) {
    return null;
  }

  return (
    <Helmet>
      <meta name="google-site-verification" content={verificationCode} />
    </Helmet>
  );
};

export default GoogleSearchConsole;
