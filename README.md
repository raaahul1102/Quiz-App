
# Quiz Application

A simple React-based quiz application that allows users to take a quiz, view their results, and retake the quiz. The quiz consists of 15 questions fetched from the Open Trivia Database.

## Features

- **Start Page**: Users enter their email to start the quiz.
- **Quiz Page**: Displays 15 questions with multiple-choice options, a timer counting down from 30 minutes, and a question navigation sidebar.
- **Results Page**: Displays the score and shows each question with the user's answer, correct answer, and a button to retake the quiz.
- **Responsive Design**: The application is designed to be responsive and works on both large and small screens.

## Technologies Used

- **React.js**: Frontend library for building the user interface.
- **React Router**: For routing between different pages (Start Page, Quiz Page, Results Page).
- **Open Trivia Database API**: Fetches quiz questions.
- **CSS Flexbox**: Used for creating responsive and flexible layouts.
- **Media Queries**: For mobile responsiveness.

## Getting Started

To run the application locally:

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

4. Open the application in your browser:

   ```
   http://localhost:3000
   ```

## How It Works

### 1. **Start Page**:
   - Users are prompted to enter their email address.
   - The email is stored in `localStorage` and the user is navigated to the quiz page.

### 2. **Quiz Page**:
   - The quiz page displays 15 multiple-choice questions fetched from the Open Trivia Database.
   - Users can select their answers, navigate through questions, and a timer counts down from 30 minutes.
   - Once the quiz is completed, the results are saved and the user is navigated to the Results Page.

### 3. **Results Page**:
   - Displays the user's score.
   - Shows each question, the user's answer, and the correct answer.
   - Provides a "Retake Quiz" button to start the quiz again.

### 4. **Timer**:
   - A 30-minute timer is displayed at the top of the quiz page.
   - If the timer runs out, the quiz is automatically submitted.

## Folder Structure

```
src/
├── components/
│   ├── QuestionNavigator.js  # Displays the question navigation panel
│   ├── Timer.js              # Timer component
├── pages/
│   ├── StartPage.js          # Landing page where the user enters their email
│   ├── QuizPage.js           # Page with the quiz questions
│   ├── ResultsPage.js        # Page displaying quiz results
├── App.js                    # Main entry point with routing logic
├── index.js                  # ReactDOM rendering entry point
```



