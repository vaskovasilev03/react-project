import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("0 лева");

  const data = [
    {
      id: 1,
      question: "Кой е Мохамед Салах, за когото гласуваха над 1 милион души на изборите в Египет, без изобщо да е кандидат?",
      answers: [
        {
          text: "Религиозен водач",
          correct: false,
        },
        {
          text: "Футболист на Ливърпул",
          correct: true,
        },
        {
          text: "Дюнерджия от Кайро",
          correct: false,
        },
        {
          text: "Политически затворник",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "В какъв цвят светят неоновите лампи?",
      answers: [
        {
          text: "виолетов",
          correct: false,
        },
        {
          text: "червен",
          correct: false,
        },
        {
          text: "черен",
          correct: true,
        },
        {
          text: "син",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Какво е „полента“?",
      answers: [
        {
          text: "Бъркани яйца",
          correct: false,
        },
        {
          text: "Пататник",
          correct: false,
        },
        {
          text: "Качамак",
          correct: true,
        },
        {
          text: "Лучник",
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "100 лева" },
        { id: 2, amount: "200 лева" },
        { id: 3, amount: "300 лева" },
        { id: 4, amount: "500 лева" },
        { id: 5, amount: "1.000 лева" },
        { id: 6, amount: "2.000 лева" },
        { id: 7, amount: "4.000 лева" },
        { id: 8, amount: "8.000 лева" },
        { id: 9, amount: "16.000 лева" },
        { id: 10, amount: "32.000 лева" },
        { id: 11, amount: "64.000 лева" },
        { id: 12, amount: "125.000 лева" },
        { id: 13, amount: "250.000 лева" },
        { id: 14, amount: "500.000 лева" },
        { id: 15, amount: "1.000.000 лева" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
