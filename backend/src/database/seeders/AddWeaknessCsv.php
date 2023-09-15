<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Weakness;

class AddWeaknessCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $splFileObject = new \SplFileObject(__DIR__ . '/csv/weaknesses.csv');

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

            $record = Weakness::create([
                'name' => trim($row[1]),
                'key' => trim($row[2]),
                'base_hp' => trim($row[3]),
                'base_str' => trim($row[4]),
                'base_mag' => trim($row[5]),
                'base_skl' => trim($row[6]),
                'base_spd' => trim($row[7]),
                'base_lck' => trim($row[8]),
                'base_def' => trim($row[9]),
                'base_res' => trim($row[10]),
                'growth_rate_hp' => trim($row[11]),
                'growth_rate_str' => trim($row[12]),
                'growth_rate_mag' => trim($row[13]),
                'growth_rate_skl' => trim($row[14]),
                'growth_rate_spd' => trim($row[15]),
                'growth_rate_lck' => trim($row[16]),
                'growth_rate_def' => trim($row[17]),
                'growth_rate_res' => trim($row[18]),
                'max_str' => trim($row[19]),
                'max_mag' => trim($row[20]),
                'max_skl' => trim($row[21]),
                'max_spd' => trim($row[22]),
                'max_lck' => trim($row[23]),
                'max_def' => trim($row[24]),
                'max_res' => trim($row[25]),
            ]);
            $record->id = trim($row[0]);
            $record->save();
        }
    }
}
