<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;

class LogLoginLockout
{
    public function handle(Lockout $event): void
    {
        if (! $event->request instanceof LoginRequest) {
            return;
        }

        $request = $event->request;
        $throttleKey = $request->throttleKey();

        Log::warning('Login rate limit exceeded.', [
            'email' => $request->string('email')->toString(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'attempts' => RateLimiter::attempts($throttleKey),
            'lockout_seconds' => RateLimiter::availableIn($throttleKey),
        ]);
    }
}
