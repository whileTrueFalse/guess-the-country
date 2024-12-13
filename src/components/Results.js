import React from "react";
import hiScore from "../images/undraw_winners.svg";

const Results = ({
  setIncorrect,
  setAnswered,
  setPoints,
  setClicked,
  points,
}) => {
  return (
    <div className="flex flex-col items-center p-10 gap-3">
      <img
        aria-hidden="true"
        src={hiScore}
        className="w-1/2"
        alt="A around the globe traveller"
      ></img>
      <h2 className="QuestionText text-3xl text-indigo-800 text-center font-extrabold pt-8  uppercase">
        Results
      </h2>
      <p>
        You got{" "}
        <span className="text-3xl text-green-400 font-bold">{points}</span>{" "}
        correct answers!
      </p>
      {/* Button resets stats and restarts game */}
      <button
        className="mt-10 w-1/2 border-2 border-indigo-800 p-3 text-indigo-800 rounded-xl cursor-pointer transition-all hover:bg-yellow-500 hover:border-yellow-500 hover:text-white"
        onClick={() => {
          setIncorrect(false);
          setAnswered(false);
          setPoints(0);
          setClicked(false);
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default Results;
