import { useEffect, useState } from "react"
import PageComponent from "../components/PageComponent"
import axiosClient from '../axios'
import DashboardCard from "../Components/DashboardCard";
import TButton from "../Components/core/TButton";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState({});

  useEffect(()=>{
    setLoading(true);
    axiosClient.get(`/dashboard`).then((res)=> {
      setLoading(false);
      setData(res.data);
      console.log(res.data);
      return res;
    }).catch((error)=> {
      setLoading(false);
      return error;
    })
  },[])

  return (
    <PageComponent title="Dashboard">
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700
        )">
          <DashboardCard title="Total Surveys" className="order-1 lg:order-2"
          style={{animationDelay:'0.1s'}}>
          {data.totalSurveys}
          </DashboardCard>
          <DashboardCard title="Total Answers" className="order-2 lg:order-4"
          style={{animationDelay:'0.2s'}}>
          {data.totalAnswers}
          </DashboardCard>
          <DashboardCard title="Latest Survey" className="order-3 lg:order-1 row-span-2"
          style={{animationDelay:'0.1s'}}>
          {data.latestSurvey && (
            <div>
              <img src={data.latestSurvey.image_url}
              className="w-[240px] mx-auto" />
            <h3>{data.latestSurvey.title}</h3>
            <div className="flex justify-between text-sm mb-1">
              <div>Create Date:</div>
              <div>{data.latestSurvey.created_at}</div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <div>Expire Date:</div>
              <div>{data.latestSurvey.expire_date}</div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <div>Status:</div>
              <div>{data.latestSurvey.status ? "Active" : "Draft"}</div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <div>Answers:</div>
              <div>{data.latestSurvey.answers}</div>
            </div>
            <div>
              <TButton to={`/surveys/${data.latestSurvey.id}`} link>
                <PencilIcon className="w-5 h-5 mr-2" />Edit Survey
              </TButton>

              <TButton link>
                <EyeIcon className="w-5 h-5 mr-2" />View Answers
              </TButton>
            </div>
            </div>
          )}
          {!data.latestSurvey && (
            <div className="text-gray-600 text-center py-16"> you dont have any surveys yet</div>
          )}
          </DashboardCard>
          <DashboardCard title="Latest Answers" className="order-4 lg:order-3 row-span-2"
          style={{animationDelay:'0.3s'}}>
          {data.latestAnswers.length && (
            <div className="text-left">
              {data.latestAnswers.map((answer)=>(
                <a href="" key={answer.id} className="block p-2 hover:bg-gray-100/90">
                  <div className="font-semibold">{answer.survey.title}</div>
                  <small>
                    Answer made at:
                    <i className="font-semibold">{answer.end_date}</i>
                  </small>
                </a>
              ))}
            </div>
          )}
          {!data.latestAnswers.length && (
            <div className="text-gray-600 text-center py-16">You dont have answers yet</div>
          )}
          </DashboardCard>

        </div>
      )}
    </PageComponent>
  )

}