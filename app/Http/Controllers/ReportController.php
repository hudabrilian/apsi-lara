<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\Inertia;

class ReportController extends Controller
{
     /**
     * Display the report form.
     */
    public function formIncident(): Response
    {
        return Inertia::render('LaporInsiden');
    }

    public function formWarning(): Response
    {
        return Inertia::render('LaporBahaya');
    }

    public function dataIncident(): Response
    {
        $reports = Report::with('files')->where('type', 'incident')->get()->map(function ($report) {
            $files = $report->files->map(function ($file) {
                return [
                    'id' => $file->id,
                    'file' => $file ? asset(Storage::url($file->file)) : null,
                ];
            });

            return [
                'id' => $report->id,
                'title' => $report->title,
                'description' => $report->description,
                'location' => $report->location,
                'files' => $files,
            ];
        });

        return Inertia::render('DataInsiden', [
            'type' => 'Insiden',
            'reports' => $reports
        ]);
    }

    public function dataWarning(): Response
    {
        $reports = Report::with('files')->where('type', 'warning')->get()->map(function ($report) {
            $files = $report->files->map(function ($file) {
                return [
                    'id' => $file->id,
                    'file' => $file ? asset(Storage::url($file->file)) : null,
                ];
            });

            return [
                'id' => $report->id,
                'title' => $report->title,
                'description' => $report->description,
                'location' => $report->location,
                'files' => $files,
            ];
        });

        return Inertia::render('DataInsiden', [
            'type' => 'Bahaya',
            'reports' => $reports
        ]);
    }

    public function dataActivity(): Response
    {
        $reports = Report::with('files')->where('type', 'activity')->get()->map(function ($report) {
            $files = $report->files->map(function ($file) {
                return [
                    'id' => $file->id,
                    'file' => $file ? asset(Storage::url($file->file)) : null,
                ];
            });

            return [
                'id' => $report->id,
                'title' => $report->title,
                'description' => $report->description,
                'location' => $report->location,
                'files' => $files,
            ];
        });

        return Inertia::render('DataInsiden', [
            'type' => 'Kegiatan',
            'reports' => $reports
        ]);
    }

    /**
     * Submit report.
     */
    public function submit(Request $request): RedirectResponse
    {
        $request->validate([
            'type' => ['required'],
            'title' => ['required'],
            'description' => ['required'],
            'location' => ['required'],
            'timeAt' => ['required'],
        ]);

        $user = auth()->user();

        // $user->reports()->create([
        //     'user_id' => auth()->user()->id,
        //     'type' => $request->type,
        //     'title' => $request->title,
        //     'description' => $request->description,
        //     'location' => $request->location,
        //     'timeAt' => $request->timeAt,
        // ]);

        $report = Report::create([
            'user_id' => $user->id,
            'type' => $request->type,
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'timeAt' => $request->timeAt,
        ]);

        if (!is_null($request->file)) {
            $path = $request->file('file')->storeAs('public/files', strtolower($report->id . '.' . str_replace(' ', '', $request->title)) . '.' . $request->file->getClientOriginalExtension());

            ReportFile::create([
                'report_id' => $report->id,
                'file' => $path,
            ]);
        }

        return Redirect::route('home')->with('message', 'Succesfully submit');
    }
}
