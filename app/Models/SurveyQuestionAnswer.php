<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionAnswer extends Model
{
    use HasFactory;

    // PORQUE SE AGREGA FILLABLE??????????
    protected $fillable = ['survey_question_id','survey_answer_id','answer'];
}
