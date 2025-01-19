import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    const storedAnswers = localStorage.getItem('userAnswers');

    if (storedQuestions && storedAnswers) {
      const parsedQuestions = JSON.parse(storedQuestions);
      const parsedAnswers = JSON.parse(storedAnswers);

      setQuestions(parsedQuestions);
      setUserAnswers(parsedAnswers);

      // Calculate the score
      const calculatedScore = parsedQuestions.reduce((acc, question, index) => {
        return question.correctAnswer === parsedAnswers[index] ? acc + 1 : acc;
      }, 0);

      setScore(calculatedScore);
    }
  }, []);

  const handleRetakeQuiz = () => {
    // Clear localStorage and navigate back to start page
    localStorage.removeItem('questions');
    localStorage.removeItem('userAnswers');
    navigate('/');
  };

  if (questions.length === 0 || userAnswers.length === 0) {
    return <div style={styles.emptyState}>No results to display.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Quiz Results</h1>
          <p style={styles.score}>
            <strong>Your Score:</strong> <span style={styles.scoreHighlight}>{score}/15</span>
          </p>
        </div>

        <div style={styles.results}>
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index];
            const correct = q.correctAnswer === userAnswer;
            return (
              <div key={index} style={styles.resultItem}>
                <p style={styles.question}>
                  <strong>Q{index + 1}:</strong> {q.question}
                </p>
                <p style={styles.answer}>
                  <strong>Your Answer:</strong>{' '}
                  <span style={{ color: correct ? 'green' : 'red' }}>
                    {userAnswer ? userAnswer : 'Not Attempted'}
                  </span>
                </p>
                <p style={styles.correctAnswer}>
                  <strong>Correct Answer:</strong> {q.correctAnswer}
                </p>
                <hr style={styles.divider} />
              </div>
            );
          })}
        </div>

        <div style={styles.actions}>
          <button onClick={handleRetakeQuiz} style={styles.button}>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: 'url(./result.jpg)', // Background image for the entire page
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // Keeps the background fixed during scrolling
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  wrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight opacity to allow background image to show through
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '800px',
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
  },
  score: {
    fontSize: '20px',
    color: '#555',
  },
  scoreHighlight: {
    fontSize: '24px',
    color: '#007BFF',
  },
  results: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  resultItem: {
    marginBottom: '20px',
  },
  question: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  answer: {
    fontSize: '16px',
    marginBottom: '5px',
    color: '#444',
  },
  correctAnswer: {
    fontSize: '16px',
    color: '#008000',
  },
  divider: {
    margin: '10px 0',
    borderTop: '1px solid #ddd',
  },
  actions: {
    marginTop: '30px',
    textAlign: 'center',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  emptyState: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#666',
  },
};
