<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Parents;
use App\Models\Unit;

class AddParentCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $splFileObject = new \SplFileObject(__DIR__ . '/csv/parents.csv');

        $splFileObject->setFlags(
            \SplFileObject::READ_CSV |
            \SplFileObject::READ_AHEAD |
            \SplFileObject::SKIP_EMPTY |
            \SplFileObject::DROP_NEW_LINE
        );

        foreach ($splFileObject as $key => $row) {
            if ($key === 0) {
                continue;
            }
            if (trim($row[0]) == '') {
                continue;
            }

            $unitKey = trim($row[4]);
            $unit = Unit::where('key', $unitKey)->first();
            $fixedParentKey = trim($row[5]);
            $fixedParent = Unit::where('key', $fixedParentKey)->first();
            $possibleParentKey = trim($row[6]);
            $possibleParent = Unit::where('key', $possibleParentKey)->first();

            $record = Parents::create([
                'unit_id' => $unit->id,
                'fixed_parent' => $fixedParent->id,
                'possible_parent' => $possibleParent->id,
                'unit_key' => $unitKey,
                'fixed_parent_key' => $fixedParentKey,
                'possible_parent_key' => $possibleParentKey,
            ]);
            $record->id = trim($row[0]);
            $record->save();
        }
    }
}
