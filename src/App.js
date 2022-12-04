import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import Quizform from "./Components/quizform";

function App() {
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  async function fetchQuestions() {
    const questions = await axios.get(
      "https://the-trivia-api.com/api/questions?limit=10"
    );

    questions.answers = questions.data.map((question) =>
      shuffle([...question.incorrectAnswers, question.correctAnswer])
    );
    setQuestions(questions);
    setScore(0);
    setCurrent(0);
  }

  // useEffect(() => {
  fetchQuestions();
  // }, []);

  function shuffle(array) {
    return array.sort(function () {
      return Math.random() - 0.5;
    });
  }

  return (
    <div className="container">
      <h1>Quiz</h1>
      <div className="quiz">
        {questions ? (
          current <= questions.data.length - 1 ? (
            <Quizform
              questions={questions}
              current={current}
              setCurrent={setCurrent}
              score={score}
              setScore={setScore}
            />
          ) : (
            <div className="final-screen">
              <h2>
                Your score is {score} of {questions.data.length} questions
              </h2>
              <button
                onClick={(e) => {
                  fetchQuestions();
                }}
              >
                Replay
              </button>
            </div>
          )
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default App;
