<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Post;

class PostApiTest extends TestCase
{
    use RefreshDatabase;

    // 投稿テスト
    public function test_can_create_post()
    {
        $data = [
            'title' => 'テストタイトル',
            'content' => 'テストコンテンツ',
        ];

        $response = $this->postJson('/api/posts', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment($data);

        $this->assertDatabaseHas('posts', $data);
    }

    // 一覧取得テスト
    public function test_can_get_posts()
    {
        Post::factory()->count(3)->create();

        $response = $this->getJson('/api/posts');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    // 編集テスト
    public function test_can_update_post()
    {
        $post = Post::factory()->create();

        $update = [
            'title' => '更新タイトル',
            'content' => '更新コンテンツ',
        ];

        $response = $this->putJson("/api/posts/{$post->id}", $update);

        $response->assertStatus(200)
                 ->assertJsonFragment($update);

        $this->assertDatabaseHas('posts', $update);
    }

    // 削除テスト
    public function test_can_delete_post()
    {
        $post = Post::factory()->create();

        $response = $this->deleteJson("/api/posts/{$post->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    // 必須項目テスト
    public function test_validation_errors_on_create()
    {
        $response = $this->postJson('/api/posts', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title', 'content']);
    }

    // 取得テスト
    public function test_can_get_specified_posts()
    {
        // Arrange: 投稿を1件作成
        $post = Post::factory()->create([
            'title' => 'テストタイトル',
            'content' => 'テスト内容',
        ]);

        // Act: APIで取得
        $response = $this->getJson("/api/posts/{$post->id}");

        // Assert: 正常なレスポンスか & データが一致するか
        $response
            ->assertOk()
            ->assertJson([
                'id' => $post->id,
                'title' => 'テストタイトル',
                'content' => 'テスト内容',
            ]);
    }

    // 存在しない投稿取得時テスト
    public function test_return_404_not_exist_post()
    {
        $response = $this->getJson('/api/posts/9999');

        $response->assertNotFound();
    }
}
