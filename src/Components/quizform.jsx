import React, { useState } from "react";

function Quizform({ questions, current, setCurrent, score, setScore }) {
  const [radioValue, setRadioValue] = useState(null);
  const [clicked, setClicked] = useState(false);

  function showAnswers(answer) {
    if (clicked) {
      return answer === questions.data[current].correctAnswer
        ? { border: "2px solid green" }
        : { border: "2px solid red" };
    } else {
      return {};
    }
  }

  return (
    <>
      <span className="counter">
        {current + 1}/{questions.data.length}
      </span>
      <h2>{questions.data[current].question}</h2>
      <div className="answers">
        {questions.answers[current].map((answer, i) => {
          return (
            <div className="input-wrapper" key={i} style={showAnswers(answer)}>
              <label>
                <input
                  name="questions"
                  type="radio"
                  value={answer}
                  checked={radioValue === answer ? true : false}
                  disabled={clicked ? true : false}
                  onChange={(e) => {
                    setRadioValue(e.target.value);
                  }}
                />
                {answer}
              </label>
            </div>
          );
        })}
      </div>
      <button
        disabled={radioValue ? false : true}
        onClick={(e) => {
          setClicked(true);
          radioValue === questions.data[current].correctAnswer
            ? setScore(score + 1)
            : setScore(score);
          setRadioValue(null);
          setTimeout(() => {
            setClicked(false);
            setCurrent(current + 1);
          }, 1500);
        }}
      >
        Next
      </button>
    </>
  );
}

export default Quizform;
