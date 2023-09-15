<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UnitBaseStat;
use App\Models\Unit;

class AddUnitBaseStatCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $splFileObject = new \SplFileObject(__DIR__ . '/csv/unit_base_stats.csv');

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

            $unitKey = trim($row[3]);
            $unit = Unit::where('key', $unitKey)->first();

            $record = UnitBaseStat::create([
                'name' => trim($row[1]),
                'unit_id' => $unit->id,
                'key' => trim($row[3]),
                'suffix' => trim($row[4]),
                'is_visible' => trim($row[5]),
                'lv' => trim($row[6]),
                'hp' => trim($row[7]),
                'str' => trim($row[8]),
                'mag' => trim($row[9]),
                'skl' => trim($row[10]),
                'spd' => trim($row[11]),
                'lck' => trim($row[12]),
                'def' => trim($row[13]),
                'res' => trim($row[14]),
            ]);
            $record->id = trim($row[0]);
            $record->save();
        }
    }
}
