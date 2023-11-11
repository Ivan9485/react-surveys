import { useState } from "react";

const QuestionDisplay = ({data}) => {

  const [isQuestionOpen, setIsQuestionOpen] = useState([]);

  // const ToggleQuestion = (index) => {
  //   if (isQuestionOpen.includes(index)) {
  //     setIsQuestionOpen(isQuestionOpen.filter((index)=>))
  //   }
  // }

  return (
    <>
    {data.myAnswers && data.myAnswers.length > 0 ? (
    
        <div>
          {data.myAnswers.map((question, index) => (
              // Question card
            <div className="flex flex-col rounded-md bg-slate-400 my-4 text-center w-[600px] h-[400px] items-center" key={index}>
              {/* Parte de arriba tarjeta */}
              <div className="p-4">
            <p className="font-bold">Question: {question.question}</p>
            <p className="">{question.answers.length} respuestas</p>
              </div>
            <div className="flex flex-col font-bold bg-white shadow-md border-2 w-full h-full p-1 overflow-auto ">
              {question.answers.map((answer,index)=>(
                <p className="bg-slate-200 rounded-md p-1" key={index}>{answer}</p>
              ))}
            </div>
            
            
            </div>
          ))}
        </div>
      ) : (
        <p>No hay respuestas disponibles.</p>
      )}
    </>
  )
}
export default QuestionDisplay