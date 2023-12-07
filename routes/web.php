<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/document', function () {
    return Inertia::render('Document');
})->name('document');

Route::get('/data-insiden', [ReportController::class, 'dataIncident'])->name('data.insiden');
Route::get('/data-bahaya', [ReportController::class, 'dataWarning'])->name('data.bahaya');
Route::get('/data-kegiatan', [ReportController::class, 'dataActivity'])->name('data.kegiatan');

Route::get('/lapor-insiden', [ReportController::class, 'formIncident'])->middleware(['auth'])->name('lapor.insiden');
Route::get('/lapor-bahaya', [ReportController::class, 'formWarning'])->middleware(['auth'])->name('lapor.bahaya');
Route::post('/lapor', [ReportController::class, 'submit'])->middleware(['auth'])->name('lapor.submit');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
