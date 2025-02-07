import React, { useEffect, useState } from 'react'
import './App.css'
import mockQuestions from './data'

function Quiz() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=10');
        if(!res.ok)throw new Error("Too many request")
        const data = await res.json();
        // console.log(data)
        // console.log(data.results)
        setQuestions(data.results);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching Questions , using mock data", error)
        setQuestions(mockQuestions);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectAnswer(answer);
    setShowAnswer(true);

    // if(answer===questions[currentQuestion].correct_answer){
    //   setScore((prev)=>prev+1)
    // }

    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
      setSelectAnswer(null);
      setShowAnswer(false);
    }, 1500)
  }

  const handleScore = (correct) => {
    // alert(correct)
    setScore(correct ? score + 1 : score)
  }

  const handleRestart =() =>{
    window.location.reload();
  }


  if (loading) {
    return <h3>Loading Questions ...</h3>
  }
  
  if (currentQuestion>=questions.length) {
    return (
      <div className='quiz-container '>
        <p className='quiz-header'>Quiz Quest</p>
        <p className='final-score'>Your Final Score: {score}/{questions.length}</p>
        <button className='restart-button' onClick={handleRestart}>Restart Quiz</button>
      </div>
    )
  }

  const question = questions[currentQuestion]
  // console.log(question)
  const answers = [...question.incorrect_answers, question.correct_answer].sort(()=>Math.random()-0.5);
  return (
    <div className='quiz-container '>
      <p className='quiz-header'>Quiz Quest</p>
      <p className='score-display'>Score: {score}</p>
      {
        <div>
          <p className='question-text'>{question.question}</p>
          <div className='answers-container'>
            {answers.map((ans, index) => (
              <button key={index}
                className={`answer-button ${showAnswer ? (ans === question.correct_answer ? 'correct' : (ans === selectAnswer ? 'incorrect' : '')) : ''}`}
                onClick={() => { handleAnswerClick(ans); handleScore(ans === question.correct_answer) }}
                disabled={showAnswer}
              >{ans}</button>
            ))}
          </div>
          {showAnswer &&
            <p className={`feedback ${selectAnswer === question.correct_answer ? 'correct-text' : 'incorrect-text'}`}>
              {selectAnswer === question.correct_answer ? 'Correct Answer !!!' : 'Incorect Answer'}
            </p>
          }
        </div>
      }
    </div>
  )
}

export default Quiz