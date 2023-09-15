<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Cls;

class AddClassCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $splFileObject = new \SplFileObject(__DIR__ . '/csv/classes.csv');

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

            $record = Cls::create([
                'name' => trim($row[1]),
                'key' => trim($row[2]),         
                'is_visible' => trim($row[3]),              
                'is_upper_class' => trim($row[4]),
                'is_special' => trim($row[5]),
                'gender' => trim($row[6]),
                'min_lv' => trim($row[7]),
                'max_lv' => trim($row[8]),
                'base_hp' => trim($row[9]),
                'base_str' => trim($row[10]),
                'base_mag' => trim($row[11]),
                'base_skl' => trim($row[12]),
                'base_spd' => trim($row[13]),
                'base_lck' => trim($row[14]),
                'base_def' => trim($row[15]),
                'base_res' => trim($row[16]),
                'growth_rate_hp' => trim($row[17]),
                'growth_rate_str' => trim($row[18]),
                'growth_rate_mag' => trim($row[19]),
                'growth_rate_skl' => trim($row[20]),
                'growth_rate_spd' => trim($row[21]),
                'growth_rate_lck' => trim($row[22]),
                'growth_rate_def' => trim($row[23]),
                'growth_rate_res' => trim($row[24]),
                'max_hp' => trim($row[25]),
                'max_str' => trim($row[26]),
                'max_mag' => trim($row[27]),
                'max_skl' => trim($row[28]),
                'max_spd' => trim($row[29]),
                'max_lck' => trim($row[30]),
                'max_def' => trim($row[31]),
                'max_res' => trim($row[32]),
            ]);
            $record->id = trim($row[0]);
            $record->save();
        }
    }
}
