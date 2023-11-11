<?php

namespace App\Models;

use App\Models\SurveyQuestion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class SurveyQuestionAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['survey_question_id','survey_answer_id','answer','survey_id'];

    public function question()
{
    return $this->belongsTo(SurveyQuestion::class, 'id', 'survey_question_id');
}

}
