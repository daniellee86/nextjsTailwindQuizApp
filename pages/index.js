import Head from 'next/head'
import { useState, useEffect } from 'react'
//
import questions from "../questions";
import react from 'react';


export default function Home() {
  //question state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //selected answers state
  const [selectedOptions, SetSelectedOptions] = useState([])
  //score state
  const [score, setScore] = useState(0);
  //display score state
  const [showScore, setShowScore] = useState(false);
  //play again button useEffect dependancy 
  const [playAgain, setPlayAgain] = useState(false)


  //functions to handle previous and next questions
  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues)
  }

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues)
  }

  //funtion to store selected options as an object in the selectedOptions state, which is an array. 
  const handleAnswerOption = (answer) => {
    //changes particular item in array depending on question number
    SetSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer})
    ]);

    //Spread operator to save selected option as all options including the addition or change above 
    SetSelectedOptions([...selectedOptions])

    //console logs selected options
    console.log(selectedOptions);
  }

  //function to calulate score based on answers
  const handleSubmitButton = () => {
    let newScore = 0;

    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
        answer.isCorrect &&
        answer.answer === selectedOptions[i]?.answerByUser &&
        (newScore +=1 )
      );
    }

    setScore(newScore);
    setShowScore(true);
  };

  useEffect(() => {
    setCurrentQuestion(0)
    SetSelectedOptions([])
    setScore(0)
    setShowScore(false)
    setPlayAgain(false)

  }, [playAgain])



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2' >
      <Head>
        <title>Quiz App</title>
      </Head>

     <div className='flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center'>

     {showScore ? (
      <div id='results' className='flex flex-col justify-around items-center h-1/2'>

       <div id='top' className='text-white flex flex-col items-center'>
         <h1 className='text-2xl'>
           { score >= 2 ? "well done" : "oh dear"}
         </h1>
         <p>
           {
             score >= 2? 
             "You did great, a little more research on Next.js and you will ace this quiz"
             :
             "Good effort but you have a long way to go before you are a Next.js master"
           }
         </p>
       </div>

       <div id='bottom'>
        <h1 className="text-3xl font-semibold text-center text-white">
         You scored {score} out of {questions.length}
        </h1>
        <button 
         onClick={() => setPlayAgain(true)}
         className="w-[49%] py-3 bg-indigo-600 rounded-lg text-white mt-10">
         Play Again?
        </button>
      </div>
   
      </div>
      ) : (
      <>
      <nav className='w-full flex justify-between p-5 text-white'>
        <h1 className='text-2xl'>Next.js Quiz</h1>
        <div id="questionWrapper" className='flex space-x-5'>
          <p className={`text-sm transition duration-500 ease-in-out ${currentQuestion + 1 === 1 ? 'text-red-500' : 'text-white'}`}>Question One</p>
          <p className={`text-sm transition duration-500 ease-in-out ${currentQuestion + 1 === 2 ? 'text-red-500' : 'text-white'}`}>Question Two</p>
          <p className={`text-sm transition duration-500 ease-in-out ${currentQuestion + 1 === 3 ? 'text-red-500' : 'text-white'}`}>Question Three</p>
          <p className={`text-sm transition duration-500 ease-in-out ${currentQuestion + 1 === 4 ? 'text-red-500' : 'text-white'}`}>Question Four</p>
        </div>
      </nav>


      <div className="flex flex-col items-start w-full">
       <h4 className="mt-10 text-xl text-white/60">Question {currentQuestion + 1} of {questions.length}</h4>
       <div className="mt-4 text-2xl text-white">
       {questions[currentQuestion].question}
       </div>
      </div>

      <div className="flex flex-col w-full">
      {questions[currentQuestion].answerOptions.map((answer, index) => (
       <div 
       key={index} 
       className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 
       border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
       onClick={(e) => handleAnswerOption(answer.answer)}
       >
        <input 
        type="radio"
        name={answer.answer}
        value={answer.answer}
        onChange={(e) => handleAnswerOption(answer.answer)}
        checked={
          answer.answer === selectedOptions[currentQuestion]?.answerByUser
        }
         className="w-6 h-6 bg-black" />
        <p className="ml-6 text-white">{answer.answer}</p>
       </div>
    ))}
    </div>

    <div className="flex justify-between w-full mt-4 text-white">
     <button 
     onClick={handlePrevious}
     className="w-[49%] py-3 bg-indigo-600 rounded-lg">Previous</button>

     {/* button with conditional onClick event and content  */}
     <button
      onClick={
      currentQuestion + 1 === questions.length ? handleSubmitButton : handleNext
      }
      className="w-[49%] py-3 bg-indigo-600 rounded-lg"
    >
     {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
    </button>
   </div>
  </>
  )
}


   </div>
</div>
  )
}

