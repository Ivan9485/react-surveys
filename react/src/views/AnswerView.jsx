import { useState,useEffect } from "react";
import axiosClient from "../axios";
import { useParams } from "react-router-dom";
import QuestionDisplay from "../Components/QuestionDisplay";

const AnswerView = () => {
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const [data,setData] = useState({});

  useEffect(()=>{
    setLoading(true);
    axiosClient.get(`/dashboard/view-answers/${id}`).then((res)=> {
      setLoading(false);
      setData(res.data);
      return res;
    }).catch((error)=> {
      setLoading(false);
      return error;
    })
  },[])
  console.log('Estado actual de "data":', data);
  return (


    <section className="w-full">
    <div className="text-center text-3xl font-bold p-4 w-full shadow-md">Your Survey Answers</div>
    <div className="flex justify-center">

      <QuestionDisplay data={data} key={data.id}/>

    </div>
    </section>
  )
}
export default AnswerView