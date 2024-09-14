import React from 'react';

const EmailTemplate = ({ coderec }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <h1 style={{ color: '#4CAF50' }}>Hello,</h1>
    <p>Your verification code is: <strong style={{ fontSize: '1.2em', color: '#FF5722' }}>{coderec}</strong></p>
    <p>Thank you for using our service!</p>
  </div>
);

export default EmailTemplate;