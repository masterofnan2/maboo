<?php

namespace App\Providers;

use App\Events\Transaction\OrderConfirmedEvent;
use App\Listeners\Product\HandleStock;
use App\Listeners\Transaction\RegisterSoldItems;
use App\Providers\Actions\UserActions;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(UserActions::class, fn() => new UserActions);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        Event::listen(OrderConfirmedEvent::class, [
            RegisterSoldItems::class,
            HandleStock::class,
        ]);
    }
}
