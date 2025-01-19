import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save email and navigate to quiz page
    localStorage.setItem('userEmail', email);
    navigate('/quiz');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to the Quiz!</h1>
        <p style={styles.subtitle}>Test your knowledge and have fun!</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="email" style={styles.label}>
          
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartPage;

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '20px',
      backgroundImage: 'url(./quiz.jpg)', // Correct way to set the background image
      backgroundSize: 'cover', // Ensures the image covers the whole container
      backgroundPosition: 'center', // Centers the image within the container
    },
  

  card: {
    backgroundColor: '#fff',
    padding: '30px 40px',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'left',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#007BFF',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },


  
};
