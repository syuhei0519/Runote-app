<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    // 一覧
    public function index(): JsonResponse
    {
        return response()->json(Post::all());
    }

    // 🟢 登録
    public function store(Request $request)
    {
        Log::info('Request received', $request->all());

        $validated = $request->validate([
            'title' => 'required|string|min:1|max:255',
            'content' => 'required|string|min:1|max:255',
        ]);

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    // 取得
    public function show($id)
    {
        return Post::findOrFail($id);
    }

    // 🟡 更新
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|min:1|max:255',
            'content' => 'required|string|min:1|max:255',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    // 🔴 削除
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Deleted'], 204);
    }
}
