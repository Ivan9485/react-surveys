import { useEffect, useState } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const QuestionDisplay = ({data}) => {
 

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
              {question.type === "radio" && (
                <>
                  {(() => {
                    const answerCounts = question.answers.reduce((acc, answer) => {
                      acc[answer] = (acc[answer] || 0) + 1;
                      return acc;
                    }, {});

                    const chartData = Object.entries(answerCounts).map(([name, value]) => ({ name, value }));

                    return (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    );
                  })()}
                </>
)}

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
QuestionDisplay.propTypes = {
  data: PropTypes.shape({
    myAnswers: PropTypes.array,
  }),
};

export default QuestionDisplay