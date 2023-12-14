<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Models\Document;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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

Route::get('/sertifikasi-k3', function () {
    return Inertia::render('Sertifikasi');
})->name('sertifikasi.k3');

Route::get('/audit-k3', function () {
    return Inertia::render('Audit');
})->name('audit.k3');

Route::get('/document', [DocumentController::class, 'showBerkas'])->middleware(['auth'])->name('document');
Route::post('/document', [DocumentController::class, 'showBerkas'])->middleware(['auth'])->name('document.search');
Route::get('/tambah-dokumen', [DocumentController::class, 'tambahBerkas'])->middleware(['auth'])->name('tambah.dokumen');
Route::post('/tambah-dokumen', [DocumentController::class, 'store'])->middleware(['auth'])->name('store.dokumen');

Route::get('/data-insiden', [ReportController::class, 'dataIncident'])->name('data.insiden');
Route::get('/data-bahaya', [ReportController::class, 'dataWarning'])->name('data.bahaya');
Route::get('/data-kegiatan', [ReportController::class, 'dataActivity'])->name('data.kegiatan');
Route::get('/report/{report}', [ReportController::class, 'reportInformation'])->name('data.informasi');

Route::get('/lapor-insiden', [ReportController::class, 'formIncident'])->middleware(['auth'])->name('lapor.insiden');
Route::get('/lapor-bahaya', [ReportController::class, 'formWarning'])->middleware(['auth'])->name('lapor.bahaya');
Route::get('/lapor-kegiatan', [ReportController::class, 'formActivity'])->middleware(['auth'])->name('lapor.kegiatan');
Route::post('/lapor', [ReportController::class, 'submit'])->middleware(['auth'])->name('lapor.submit');
Route::delete('/lapor/{report}/delete', [ReportController::class, 'remove'])->middleware(['auth'])->name('lapor.delete');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
