<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\CcPath;
use App\Models\Cls;

class AddCcPathCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $splFileObject = new \SplFileObject(__DIR__ . '/csv/cc_paths.csv');

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

            $lowerClassKey = trim($row[3]);
            $lowerClass = Cls::where('key', $lowerClassKey)->first();
            $upperClassKey = trim($row[4]);
            $upperClass = Cls::where('key', $upperClassKey)->first();

            $record = CcPath::create([
                'lower_class_id' => $lowerClass->id,
                'upper_class_id' => $upperClass->id,
                'lower_class_key' => $lowerClassKey,
                'upper_class_key' => $upperClassKey,
            ]);
            $record->id = trim($row[0]);
            $record->save();
        }
    }
}
