<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\extra_service;
use App\Models\LichTrinh;
use App\Models\LoaiTour;
use App\Models\Question;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $questions = Question::all();
        foreach($questions as $question){
            $question->answer = $this->Trancate($question->answer, 50);
        }
        return Inertia::render('Question/Index', compact('questions', 'categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        return Inertia::render('Question/Create', compact('categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required',
            'answer' => 'required',
        ]);

        Question::create([
            'question' => $request->question,
            'answer' => $request->answer,
        ]);

        return redirect()->route('question.index')
            ->with('success', 'Question created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        return Inertia::render('Question/Edit', compact('question', 'categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'question' => 'required',
            'answer' => 'required',
        ]);

        $question->update([
            'question' => $request->question,
            'answer' => $request->answer,
        ]);

        return redirect()->route('question.index')
            ->with('success', 'Question updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return redirect()->route('question.index');
    }

    public function Trancate($string, $length){
        if(strlen($string) > $length){
            $string = substr($string, 0, $length) . '...';
        }
        return $string;
    }
}
