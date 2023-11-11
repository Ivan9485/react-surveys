import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Surveys from "./views/Surveys"
import Login from "./views/Login"
import Signup from "./views/Signup"
import GuestLayout from "./Components/GuestLayout";
import DefaultLayout from "./Components/DefaultLayout";
import SurveyView from "./views/SurveyView";
import SurveyPublicView from "./views/SurveyPublicView";
import AnswerView from "./views/AnswerView";

const router = createBrowserRouter([


  
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path:'/dashboard',
        element: <Navigate to="/"/>
      },
      {
        path:'/dashboard/view-answers/:id',
        element: <AnswerView />
      },
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/surveys',
        element:<Surveys />
      },
      {
        path: '/surveys/create',
        element:<SurveyView />
      },
      {
        path:'/surveys/:id',
        element:<SurveyView />
      }
      
      
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children:[{
      path: '/login',
      element: <Login />
    },{
      path: '/signup',
      element: <Signup />
    }]
  },
  {
    path: '/survey/public/:slug',
    element:<SurveyPublicView />
  },

])

export default router;  