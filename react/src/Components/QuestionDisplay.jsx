import { useEffect, useState } from "react"

const QuestionDisplay = ({data}) => {
  const [uniques, setUniques] = useState([])

  useEffect(()=>{
    if (!data.myAnswers) return;
    const countDict = data.myAnswers.reduce((acc,curr)=>{
      const {answers} = curr;
      acc[answers] = (acc[answers] || 0) + 1;
      return acc;
    }, {});

    const result = data.myAnswers.map((obj)=>({
      ...obj,
      count: countDict[obj.answers] || 0,
    }));
    console.log('este es el resultado',result);
    setUniques(result);
  },[data])
  console.log('my data is:',data);
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
              {question.type === "text" && (
                question.answers.map((answer,index)=>(
                <p className="bg-slate-200 rounded-md p-1 my-1" key={index}>{answer}</p>
              )))
              }
              {question.type === "select" && (
                question.answers.map((answer,index)=>(
                <p className="bg-slate-200 rounded-md p-1 my-1" key={index}>{answer}</p>
              )))
              }

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