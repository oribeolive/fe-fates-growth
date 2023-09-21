<?php

namespace App\Http\Controllers;

use App\Models\UnitBaseStat;
use Illuminate\Http\Request;

class UnitBaseStatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $unitBaseStats = UnitBaseStat::with('unit'/**/ ,'unit.cls.upper_classes' /**/)->where('is_visible', true)->get();
        return response()->json($unitBaseStats);
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
    public function show(UnitBaseStat $unitBaseStat)
    {
        $unitBaseStat->load('unit', 'unit.cls.upper_classes');
        $result = $unitBaseStat->is_visible ? $unitBaseStat : null;
        return response()->json($result);
    }

    /**
     * Display the specified resource.
     */
    public function showByKey($key, $suffix = null)
    {
        $query = UnitBaseStat::with('unit')->where('key', $key);
        if ($suffix) {
            $query->where('suffix', $suffix);
        }
        $unitBaseStat = $query->first();
        return response()->json($unitBaseStat);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UnitBaseStat $unitBaseStat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UnitBaseStat $unitBaseStat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UnitBaseStat $unitBaseStat)
    {
        //
    }
}
