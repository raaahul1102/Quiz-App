import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../componenets/Timer';
import QuestionNavigator from '../componenets/QuestionNavigator';


function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());

  // Fetch the questions from Open Trivia DB
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=15');
        const data = await res.json();

        // Format questions
        const formatted = data.results.map((q) => {
          const allOptions = [q.correct_answer, ...q.incorrect_answers];
          const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
          return {
            question: decodeEntities(q.question),
            correctAnswer: decodeEntities(q.correct_answer),
            options: shuffledOptions.map(decodeEntities),
          };
        });
        setQuestions(formatted);
        setUserAnswers(Array(15).fill(undefined));
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestions();
  }, []);

  // Track question visitation
  useEffect(() => {
    if (!visitedQuestions.includes(currentQuestionIndex)) {
      setVisitedQuestions([...visitedQuestions, currentQuestionIndex]);
    }
  }, [currentQuestionIndex, visitedQuestions]);

  const handleAnswerChange = (e) => {
    const selectedOption = e.target.value;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    setAttemptedQuestions((prev) => new Set(prev.add(currentQuestionIndex)));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitQuiz = () => {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('questions', JSON.stringify(questions));
    navigate('/results');
  };

  const handleTimeUp = () => {
    handleSubmitQuiz();
  };

  function decodeEntities(encodedString) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(encodedString, 'text/html').body.textContent;
    return decodedString;
  }

  if (questions.length === 0) {
    return <div style={styles.loading}>Loading questions...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Quiz Application</h2>
        <Timer initialMinutes={30} onTimeUp={handleTimeUp} />
        <button onClick={handleSubmitQuiz} style={styles.submitButton}>
          Submit Quiz
        </button>
      </div>

      <div style={styles.mainLayout}>
        <div style={styles.navigator}>
          <QuestionNavigator
            totalQuestions={questions.length}
            currentIndex={currentQuestionIndex}
            visitedQuestions={visitedQuestions}
            attemptedQuestions={attemptedQuestions}
            goToQuestion={goToQuestion}
          />
        </div>

        <div style={styles.questionSection}>
          <div style={styles.questionCard}>
            <h3 style={styles.questionText}>
              {`Q${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`}
            </h3>
            <div style={styles.options}>
              {questions[currentQuestionIndex].options.map((opt, i) => (
                <label key={i} style={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={opt}
                    checked={userAnswers[currentQuestionIndex] === opt}
                    onChange={handleAnswerChange}
                  />
                  {opt}
                </label>
              ))}
            </div>
            <div style={styles.navButtons}>
              {currentQuestionIndex > 0 && (
                <button onClick={handlePrev} style={styles.navButton}>
                  Previous
                </button>
              )}
              {currentQuestionIndex < questions.length - 1 && (
                <button onClick={handleNext} style={styles.navButton}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#FF6347',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  mainLayout: {
    display: 'flex',
    gap: '20px',
    flexDirection: 'column',
    marginTop: '20px',
  },
  navigator: {
    flex: '0.3',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  questionSection: {
    flex: '0.7',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  questionCard: {
    marginBottom: '20px',
  },
  questionText: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  optionLabel: {
    fontSize: '16px',
    cursor: 'pointer',
  },
  navButtons: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px',
    padding: '50px',
  },
  '@media (max-width: 768px)': {
    container: {
      padding: '10px',
    },
    mainLayout: {
      flexDirection: 'column',
      gap: '20px',
    },
    navigator: {
      flex: 'none',
      width: '100%',
    },
    questionSection: {
      flex: 'none',
      width: '100%',
    },
  },
};

