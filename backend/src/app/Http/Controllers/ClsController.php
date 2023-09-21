<?php

namespace App\Http\Controllers;

use App\Models\Cls;
use Illuminate\Http\Request;

class ClsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clses = Cls::with('upper_classes')->where('is_visible', true)->get();
        return response()->json($clses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cls $cls)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cls $cls)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cls $cls)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cls $cls)
    {
        //
    }
}
