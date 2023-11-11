<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ViewAnswerController extends Controller
{
    public function index(Request $request, Survey $survey){
        $user = $request->user();
        $userId = $user->id;
        $surveys = Survey::where('user_id', $userId)
        ->where('id', $survey->id)
        ->with('retrieveQuestions.answers')
        ->get();

        $result = collect();

        foreach ($surveys as $survey) {
            foreach ($survey->retrieveQuestions as $question) {
                $result->push([
                    'question' => $question->question,
                    'id' => $question->id,
                    'type' => $question->type,
                    'answers' => $question->answers->pluck('answer')->all(),
                ]);
            }
        }


        return [
            'myAnswers'=> $result->all()
        ];
    }
}

