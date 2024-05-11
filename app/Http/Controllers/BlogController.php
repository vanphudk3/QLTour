<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request )
    {
        $lang = $request->query('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $specialBlogs = Blog::orderBy('created_at', 'desc')->first();
        $specialBlogs->nameUser = $specialBlogs->user->name;
        $forcusBlogs = Blog::orderBy('created_at', 'desc')->take(3)->skip(1)->get();
        foreach($forcusBlogs as $key => $forcusBlog){
            $forcusBlogs[$key]->nameUser = $forcusBlog->user->name;
            $forcusBlogs[$key]->formartDate = Carbon::parse($forcusBlog->created_at)->format('d/m/Y');
        }
        $specialBlogs->formartDate = Carbon::parse($specialBlogs->created_at)->format('d/m/Y');
        $blogs = Blog::orderBy('created_at', 'desc')->take(6)->skip(4)->paginate(6) ->withQueryString();

        foreach($blogs as $key => $blog){
            $blogs[$key]->nameUser = $blog->user->name;
            $blogs[$key]->formartDate = Carbon::parse($blog->created_at)->format('d/m/Y');
        }
        return Inertia::render('Blog/Blog', compact('specialBlogs', 'forcusBlogs','blogs', 'lang', '_lang'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$slug)
    {
        $lang = $request->query('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $blog = Blog::where('slug', $slug)->first();
        $blog->nameUser = $blog->user->name;
        $relatedBlogs = Blog::where('id', '!=', $blog->id)->take(3)->get();
        $blog->formartDate = Carbon::parse($blog->created_at)->format('d/m/Y');
        
        return Inertia::render('Blog/Detail-Blog', compact('blog', 'relatedBlogs', 'lang', '_lang'));
    }

    public function getLanguage($lang)
    {
        $this->language = $lang??'en';
    
        // dd($this->language);
        $langFilePath = base_path('lang/' . $this->language . '/home.php');
        if (file_exists($langFilePath)) {
            $lang = include $langFilePath;
            $data = array();
            foreach ($lang as $key => $value) {
                $data[$key] = $value;
            }
            return $data;
        } else {
            return array();
        }
    }

}
