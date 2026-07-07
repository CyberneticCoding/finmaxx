<?php

declare(strict_types=1);

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Log;

class UpdateLastLoginAt
{
    public function handle(Login $event): void
    {
        $user = $event->user;

        $user->forceFill([
            'last_login_at' => now(),
        ])->saveQuietly();

        Log::info('User successfully authenticated', [
            'user_id' => $user->id,
            'email' => $user->email,
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
