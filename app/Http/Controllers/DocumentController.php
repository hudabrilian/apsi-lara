<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function tambahBerkas(): Response
    {
        return Inertia::render('TambahBerkas');
    }

    public function showBerkas(Request $request): Response
    {
        if ($request->get('q')) {
            $q = trim($request->get('q'));
            $documents = Document::where('title', 'like', "%{$q}%")
                ->orderBy('created_at', 'desc')->get();
        } else {
            $q = '';
            
            $documents = Document::get()->map(function ($report) {
                return [
                    'id' => $report->id,
                    'title' => $report->title,
                    'description' => $report->description,
                    'file' => asset(Storage::url($report->file))
                ];
            });
        };
    
        return Inertia::render('Document', [
            'documents' => $documents
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required'],
            'description' => ['required'],
            'file' => ['required'],
        ]);

        $path = $request->file('file')->storeAs('public/files/document', strtolower('document.' . str_replace(' ', '', $request->title)) . '.' . $request->file->getClientOriginalExtension());

        Document::create([
            'title' => $request->title,
            'description' => $request->description,
            'file' => $path,
        ]);

        return Redirect::route('document')->with('message', 'Succesfully submit');
    }
}
