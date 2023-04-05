<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $specialBlogs = Blog::orderBy('created_at', 'desc')->first();
        $specialBlogs->nameUser = $specialBlogs->user->name;
        $forcusBlogs = Blog::orderBy('created_at', 'desc')->take(3)->get();
        foreach($forcusBlogs as $key => $forcusBlog){
            $forcusBlogs[$key]->nameUser = $forcusBlog->user->name;
            $forcusBlogs[$key]->formartDate = Carbon::parse($forcusBlog->created_at)->format('d/m/Y');
        }
        $specialBlogs->formartDate = Carbon::parse($specialBlogs->created_at)->format('d/m/Y');
        $blogs = Blog::take(3)->paginate(10)->except($specialBlogs->id);
        return Inertia::render('Blog/Blog', compact('specialBlogs', 'forcusBlogs','blogs'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->first();
        $blog->nameUser = $blog->user->name;
        $blog->formartDate = Carbon::parse($blog->created_at)->format('d/m/Y');
        
        return Inertia::render('Blog/Detail-Blog', compact('blog'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        //
    }

    public function Trancate($string, $length){
        if(strlen($string) > $length){
            $string = substr($string, 0, $length) . '...';
        }
        return $string;
    }
}
