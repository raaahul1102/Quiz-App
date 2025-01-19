import React from 'react';

function QuestionNavigator({
  totalQuestions,
  currentIndex,
  visitedQuestions,
  attemptedQuestions,
  goToQuestion,
}) {
  return (
    <div style={styles.navigatorContainer}>
      <h4>Question Navigator</h4>
      <div style={styles.numberGrid}>
        {[...Array(totalQuestions)].map((_, index) => {
          const isVisited = visitedQuestions.includes(index);
          const isAttempted = attemptedQuestions.has(index);
          const buttonStyle = {
            ...styles.questionNumber,
            backgroundColor: isAttempted ? '#90EE90' : isVisited ? '#d3d3d3' : '#fff',
            border: index === currentIndex ? '2px solid #000' : '1px solid #ccc',
          };
          return (
            <button
              key={index}
              style={buttonStyle}
              onClick={() => goToQuestion(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionNavigator;

const styles = {
  navigatorContainer: {
    width: '200px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
  },
  numberGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginTop: '10px',
  },
  questionNumber: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px',
  },
};
