<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Unit;
use App\Models\Cls;

class AddUnitCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $splFileObject = new \SplFileObject(__DIR__ . '/csv/units.csv');

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

            $classKey = trim($row[7]);
            $cls = Cls::where('key', $classKey)->first();

            $record = Unit::create([
                'name' => trim($row[1]),
                'key' => trim($row[2]),
                'is_avator' => trim($row[3]),
                'is_servant' => trim($row[4]),
                'gender' => trim($row[5]),
                'is_child' => trim($row[6]),
                'class' => trim($row[7]),
                'class_id' => $cls->id,
                'growth_rate_hp' => trim($row[9]),
                'growth_rate_str' => trim($row[10]),
                'growth_rate_mag' => trim($row[11]),
                'growth_rate_skl' => trim($row[12]),
                'growth_rate_spd' => trim($row[13]),
                'growth_rate_lck' => trim($row[14]),
                'growth_rate_def' => trim($row[15]),
                'growth_rate_res' => trim($row[16]),
                'max_str' => trim($row[17]),
                'max_mag' => trim($row[18]),
                'max_skl' => trim($row[19]),
                'max_spd' => trim($row[20]),
                'max_lck' => trim($row[21]),
                'max_def' => trim($row[22]),
                'max_res' => trim($row[23]),
            ]);
            $record->id = trim($row[0]);
            $record->save();
        }
    }
}
