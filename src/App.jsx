// import React, { useState } from "react";
// import data from "./json/questions.json";
// import { useEffect } from "react";
// import "./App.css";

// function Quiz() {
//   // Initialize state with the data directly
//   const [currentQuestion, setCurrentQuestion] = useState(data);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [options, setOptions] = useState([]);
//   const [buttonValue, setButtonValue] = useState("");
//   const [score, setScore] = useState(0);
//   const [difficulty, setDifficulty] = useState("");

//   const question = currentQuestion[currentIndex];
//   const option = [question.correct_answer, ...question.incorrect_answers];

//   useEffect(() => {
//     const level = question.difficulty;

//     if (level === "easy") {
//       setDifficulty("★☆☆");
//     } else if (level === "medium") {
//       setDifficulty("★★☆");
//     } else if (level === "hard") {
//       setDifficulty("★★★");
//     } else {
//       setDifficulty("No Difficulty");
//     }
//   }, [question.difficulty]);

//   const QuestionProgressBar = () => {
//     const widthPercentage = ((currentIndex + 1) / currentQuestion.length) * 100;

//     return (
//       <>
//         <div
//           className="question-percentage-bar"
//           style={{ width: `${widthPercentage}%` }}
//         ></div>
//       </>
//     );
//   };

//   const ScoreProgressBar = () => {
//     const widthPercentage = (score / currentQuestion.length) * 100;

//     return (
//       <>
//         <div
//           className="score-percentage-bar"
//           style={{ width: `${widthPercentage}%` }}
//         ></div>
//       </>
//     );
//   };

//   const CheckButtonText = (e) => {
//     const buttonValue = e.target.textContent;
//     setButtonValue(buttonValue);
//   };

//   const ChangeQuestionIndex = () => {
//     if (question.correct_answer === buttonValue) {
//       setScore(score + 1);
//     }
//     if (currentIndex + 1 < currentQuestion.length) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       alert("Quiz Is Over Your Score is " + score);
//       setScore(0);
//       setCurrentIndex(0);
//     }

//     setCurrentIndex(currentIndex + 1);
//   };
//   return (
//     <>
//       <h1>Quiz App</h1>
//       <h5>
//         {currentIndex + 1} Out Of {currentQuestion.length} Questions
//       </h5>
//       {/* QUESTION PROGRESS BAR  */}

//       <QuestionProgressBar />
//       <p>Difficulty Level :{difficulty}</p>
//       {/* render the question by index */}

//       {currentQuestion.length > 0 && (
//         <>
//           <p>{currentQuestion[currentIndex].category}</p>

//           <p>
//             Q {currentIndex + 1}: {currentQuestion[currentIndex].question}
//           </p>
//         </>
//       )}
//       <div>
//         {option.map((item, index) => {
//           return (
//             <>
//               <button onClick={CheckButtonText} key={index}>
//                 {item}
//               </button>
//             </>
//           );
//         })}
//       </div>
//       {/* NEXT BUTTON  */}

//       <button onClick={ChangeQuestionIndex}>Next</button>

//       {/* CALL THE SCORE PROGRESS BAR  */}
//       <ScoreProgressBar />
//     </>
//   );
// }

// export default Quiz;
import React, { useState, useEffect } from "react";
import data from "./json/questions.json";
import "./App.css";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonValue, setButtonValue] = useState("");
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  const question = currentQuestion[currentIndex];
  const option = [question.correct_answer, ...question.incorrect_answers];

  useEffect(() => {
    const level = question.difficulty;
    if (level === "easy") setDifficulty("★☆☆");
    else if (level === "medium") setDifficulty("★★☆");
    else if (level === "hard") setDifficulty("★★★");
    else setDifficulty("No Difficulty");
  }, [question.difficulty]);

  const QuestionProgressBar = () => (
    <div
      className="question-percentage-bar"
      style={{ width: `${((currentIndex + 1) / currentQuestion.length) * 100}%` }}
    />
  );

  const ScoreProgressBar = () => (
    <div
      className="score-percentage-bar"
      style={{ width: `${(score / currentQuestion.length) * 100}%` }}
    />
  );

  const CheckButtonText = (e) => setButtonValue(e.target.textContent);

  const ChangeQuestionIndex = () => {
    if (question.correct_answer === buttonValue) setScore(score + 1);
    
    if (currentIndex + 1 < currentQuestion.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(`Quiz Over! Final Score: ${score}/${currentQuestion.length}`);
      setScore(0);
      setCurrentIndex(0);
    }
    setButtonValue("");
  };

  return (
    <div className="quiz-container">
      <header>
        <h1>Quiz App</h1>
        <div className="progress-container">
          <h5 className="question-count">
            {currentIndex + 1} of {currentQuestion.length} Questions
          </h5>
          <div className="progress-bar">
            <QuestionProgressBar />
          </div>
        </div>
      </header>

      <div className="quiz-content">
        <div className="difficulty-section">
          <p className="difficulty">{difficulty} Difficulty</p>
          <p className="category">{question.category}</p>
        </div>

        <div className="question-section">
          <p className="question-text">
            Q{currentIndex + 1}: {question.question}
          </p>
        </div>

  <div className="options-container">
  {[...option].sort(() => Math.random() - 0.5).map((item, index) => (
    <button
      className={`option-btn ${buttonValue === item ? "selected" : ""}`}
      onClick={CheckButtonText}
      key={index}
    >
      {item}
    </button>
  ))}
</div>


        <div className="navigation">
          <button className="next-btn" onClick={ChangeQuestionIndex}>
            {currentIndex === currentQuestion.length - 1 ? "Finish Quiz" : "Next Question →"}
          </button>
        </div>

        {/* Enhanced Score Card with Progress Bar */}
        <div className="score-card">
          <div className="score-header">
            <h3>Your Progress</h3>
            <span className="score-percentage">
              {Math.round((score / currentQuestion.length) * 100)}%
            </span>
          </div>
          <div className="score-bar-container">
            <ScoreProgressBar />
          </div>
          <div className="score-stats">
            <p>Correct: {score}</p>
            <p>Total: {currentQuestion.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
