<?php

namespace App\Http\Controllers;

use App\Models\BinhLuan;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ManagerBlogController extends Controller
{
    public function index(){
        $blogs = DB::table('blogs')
            ->join('users', 'users.id', '=', 'blogs.user_id')
            ->select('blogs.*', 'users.name')
            ->where('blogs.user_id', auth()->user()->id)
            ->orderBy('blogs.created_at', 'desc')
            ->paginate(10);
        // dd($blogs);
        return Inertia::render('ManagerBlog/Index', compact('blogs'));
    }

    public function create(){
        return Inertia::render('ManagerBlog/Create');
    }

    public function store(Request $request){
        try{
            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                // 'slug' => 'required',
            ]);
            $blog = new Blog();
            $blog->title = $request->title;
            $blog->content = $request->content;
            $blog->slug = Str::slug($request->title);
            if ($request->hasFile('image')) {
                $image = $request->image;
                // $filename = $img->store('blogs', 'public');
                $new_path = public_path('storage/blogs');
                $rename_img = time() . '_' . $image->getClientOriginalName();
                $image->move($new_path, $rename_img);
                $filePath = 'blogs/' . $rename_img;
                $blog->image = $filePath;
            }else{
                $blog->image = "";
            }
            $blog->user_id = auth()->user()->id;
            $blog->save();
    
            return redirect()->route('managerblog.index');
        }
        catch(\Exception $e){
            return redirect()->back()->with('errorBlog', $e->getMessage());
        }
    }

    public function edit($id){
        $blog = Blog::find($id);
        return Inertia::render('ManagerBlog/Edit', compact('blog'));
    }

    public function update(Request $request, $id){
        try{
            $request->validate([
                'title' => 'required',
                'content' => 'required',
                // 'slug' => 'required',
            ]);
    
            $blog = Blog::find($id);
            $blog->title = $request->title;
            $blog->content = $request->content;
            $blog->slug = Str::slug($request->title);
            $blog->image = $request->image;
            $blog->user_id = auth()->user()->id;
            if ($request->hasFile('image')) {
                $image = $request->image;
                $new_path = public_path('storage/blogs');
                $rename_img = time() . '_' . $image->getClientOriginalName();
                $image->move($new_path, $rename_img);
                $filePath = 'blogs/' . $rename_img;
                $blog->image = $filePath;
            }
            $blog->save();
            return redirect()->route('managerblog.index');
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }

    public function destroy($id){
        $blog = Blog::find($id);
        $blog->delete();
        return redirect()->route('managerblog.index');
    }
}
