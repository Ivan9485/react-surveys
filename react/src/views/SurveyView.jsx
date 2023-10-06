import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import { PhotoIcon, TrashIcon, LinkIcon } from "@heroicons/react/24/outline";
import TButton from "../Components/core/TButton";
import axiosClient from '../axios.js'
import { useNavigate, useParams } from "react-router-dom";
import SurveyQuestions from "../Components/core/SurveyQuestions";
import {v4 as uuidv4} from "uuid";
import { useStateContext } from "../contexts/ContextProvider";


export default function SurveyView() {
  
  const navigate = useNavigate();
  const {id} = useParams();
  const {showToast} = useStateContext();
  const [survey,setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  })
  const [error,setError] = useState("");
  const[loading, setLoading] = useState(false)
  
  const onImageChoose = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSurvey({
        ...survey,
        image:file,
        image_url:reader.result
      })
      ev.target.value = ""
    }
    
    reader.readAsDataURL(file);

  }
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = { ...survey };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/survey/${id}`, payload);
    } else {
      res = axiosClient.post("/survey", payload);
    }

    res
      .then((res) => {
        console.log(res);
        navigate("/surveys");
        if (id) {
          showToast("The survey was updated");
        } else {
          showToast("The survey was created");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
        console.log(err, err.response);
      });
  };

  function onQuestionsUpdate(questions) {
    setSurvey({
      ...survey,
      questions,
    });
  }

  const addQuestion = () => {
 
    survey.questions.push({
      id: uuidv4(),
      type: "text",
      question: "",
      description: "",
      data: {},
    })
    setSurvey({...survey})

  };

  const onDelete = ()=> {
    
  }

  useEffect(()=>{
    if (id) {
      setLoading(true)
      axiosClient.get(`/survey/${id}`).then(({data})=> {
        setSurvey(data.data);
        setLoading(false)
      })
    }
  },[])

  

  return (
    <PageComponent
    buttons={(
      <div className="flex gap-6">
      <TButton color="green" href={`/survey/public/${survey.slug}`}>
        <LinkIcon className="h-4 w-4 mr-2" />
        Publick Link
      </TButton>
      <TButton color="red" onClick={onDelete}>
      <TrashIcon className="h-4 w-4 mr-2" />
      Delete Survey
    </TButton>
    </div>
    )}
    title={!id ? 'Create new Survey' : 'Update Survey'}>
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (<form action="#" method="POST" onSubmit={onSubmit}>
      {error && (<div className="bg-red-500 text-white py-3 px-3 rounded-lg z-30">{error}</div>)}
      <div className="shadow sm:overflow-hidden sm:rounded-md">

   

      <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
      
      {/* IMAGE */}
      <div>
      <label className="block text-sm font-medium text-gray-700">
        Photo
      </label>
      <div className="mt-1 flex items-center">
      {survey.image_url && (
        <img src={survey.image_url} alt="" className="w-32 h-32 object-cover" />
      )}
      {!survey.image_url && (
        <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
          <PhotoIcon className="w-8 h-8" />
        </span>
      )}
      <button type="button" className="relative m1-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <input type="file" className="absolute left-0 top-0 right-0 bottom-0 opacity-0" onChange={onImageChoose} />
        Change
      </button>
      </div>
      </div>
      {/* IMAGE */}

      {/* TITLE  */}
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Survey Title
        </label>
        <input type="text" name="title" id="title" value={survey.title} placeholder="Survey Title"
        onChange={(ev)=>setSurvey({...survey,title:ev.target.value})}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-s focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"/>
      </div>
      {/* TITLE */}
      {/* DESCRIPTION */}
      <div className="col-span-6 sm:col-span-3">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea name="description" id="description" value={survey.description} placeholder="Describe your survey"
        onChange={(ev)=>setSurvey({...survey,description:ev.target.value})}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-s focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"></textarea>
      </div>
      {/* EXPIRE DATE */}
      <div className="col-span-6 sm:col-span-3">
      <label htmlFor="expire_date" className="block text-sm font-medium text-gray-700">
          Expire Date
        </label>
        <input type="date" name="expire_date" id="expire_date" value={survey.expire_date} 
        onChange={(ev)=>setSurvey({...survey,expire_date:ev.target.value})}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-s focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"/>
      </div>
      {/* ACTIVE */}
      <div className="flex items-start">
        <div className="flex h-5 items-center">
         <input type="checkbox" name="status" id="status" checked={survey.status} 
        onChange={(ev)=>setSurvey({...survey,status:ev.target.checked})}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/> 
        </div>
        <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
        Active
        </label>
        <p>Wheter to make survey publicly available</p>
        </div>
      </div>
     <button type="button" onClick={addQuestion}>Add Question</button>
      <SurveyQuestions questions={survey.questions} onQuestionsUpdate={onQuestionsUpdate}/>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <TButton>
          Save
        </TButton>
      </div>
      </div>
      </form>)}
    </PageComponent>
  )
}