<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();

        // 環境変数を config() に反映
        config([
            'app.env' => env('APP_ENV', 'testing'),

            'database.default' => env('DB_CONNECTION', 'mysql'),
            'database.connections.mysql.host' => env('DB_HOST', '127.0.0.1'),
            'database.connections.mysql.port' => env('DB_PORT', '3306'),
            'database.connections.mysql.database' => env('DB_DATABASE', 'runote_test'),
            'database.connections.mysql.username' => env('DB_USERNAME', 'root'),
            'database.connections.mysql.password' => env('DB_PASSWORD', ''),

            'cache.default' => env('CACHE_DRIVER', 'array'),
            'queue.default' => env('QUEUE_CONNECTION', 'sync'),
            'session.driver' => env('SESSION_DRIVER', 'array'),
        ]);
    }
}
