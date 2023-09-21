'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import { myRound } from "@/lib/Common";
import UnitBaseStatType from "./types/UnitBaseStatType";
import UnitType from "./types/UnitType";
import ClassType from "./types/ClassType";
import StrengthType from "./types/StrengthType";
import StatsType from "./types/StatsType";
import LvClassType from "./types/LvClassType";
import ParentType from "./types/ParentType";
import SelectStrengths from "./SelectStrengths";
import SelectClass from "./SelectClass";
import SelectParents from "./SelectParents";
import { makeBaseGrowthRates, makeBaseMaxStats, sumGrowthRatesOfUnitAndClass, sumMaxStatsOfUnitAndClass, getUnitById, 
    getSelectedClassByLv, chooseUpperClass, makeStrengthStats } from "./functions";
import TableRow from "./TableRow";

export type StatsRowType = { 
    lv: number, 
    displayLv: number,
    class: ClassType, 
    gender: number,
    isUpper: boolean,
    unit: UnitBaseStatType,
    pp: ClassType,
    mp: ClassType | null,
    isMax: StatsType,
    aptitude: boolean,
} & StatsType;
  
export type CheckedAptitudeType = {
    lv: number,
    checked: boolean,
};

export type ParentUnitsType = {
    fixed: UnitType | null,
    possible: UnitType[],
};

export default function Contents({units, classes, strengths, weaknesses, parents}:
    {units: UnitBaseStatType[], classes: ClassType[], strengths: StrengthType[], weaknesses: StrengthType[], parents: ParentType[]}) {

    const [rows, setRows] = useState<StatsRowType[]>([]);
    const [selectedUnit, setSelectedUnit] = useState<UnitBaseStatType | null>();
    const [selectedStrength, setSelectedStrength] = useState<StrengthType>(strengths[0]);
    const [selectedWeakness, setSelectedWeakness] = useState<StrengthType>(weaknesses[5]);
    const [selectedClasses, setSelectedClasses] = useState<LvClassType[]>();
    const [checkedAptitudes, setCheckedAptitudes] = useState<CheckedAptitudeType[]>();
    const [inputedBaseStats, setInputedBaseStats] = useState<StatsType>({hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0,});
    const [inputedMaxStats, setInputedMaxStats] = useState<StatsType>({hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0,});
    const [selectedParent, setSelectedParent] = useState<UnitType | null>(null);
    const [selectedGrandParent, setSelectedGrandParent] = useState<UnitType | null>(null);
    const [parentsParents, setParentsParents] = useState<ParentUnitsType>({fixed: null, possible: []});
    const [baseMaxStats, setBaseMaxStats] = useState<StatsType>();
    const [baseGrowthRates, setBaseGrowthRates] = useState<StatsType>();
    const [eternal, setEternal] = useState<number>(0);
    const unitSelectRef = useRef<HTMLSelectElement>(null);

    const handleSelectUnit = (e: { target: HTMLSelectElement }) => {
        const id = parseInt(e.target.value);
        fetchUnitData(id);
    };

    const fetchUnitData = async (id: number): Promise<void> => {
        if (id == 0) {
            setSelectedUnit(null)
            return;
        }
        // const unitData = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/unit_base_stats/' + id).then((res) => {
        //     if (!res.ok) {
        //       return [];
        //     }
        //     return res.json();
        // });

        const unitData = ((id: number, units: UnitBaseStatType[]) => {
            for (const unit of units) {
                if (unit.id == id) {
                    return unit
                }
            }
        })(id, units);

        if (!unitData) {
            return;
        }

        const parentUnits = makeParentUnits(unitData.unit.id, parents);
        setSelectedGrandParent(null);
        if (parentUnits.fixed) {
            unitData.parents = parentUnits;
            setSelectedParent(parentUnits.possible[0]);
        }
        setSelectedUnit(unitData);
        // setParentUnits(_parentUnit);

        let cls = unitData.unit.cls;
        let upperClass = chooseUpperClass({upperClasses: cls.upper_classes, unitGender: unitData.unit.gender});

        let minLv = cls.is_upper_class && !unitData.unit.is_servant ? unitData.lv + 20 : unitData.lv; // felicia & jacob
        let maxLv = cls.max_lv;
        const lvClasses = [];
        const aptitudes = [];
        const aptitude = unitData.key == 'mozu'; // mozu's default
        aptitudes.push({lv: 0, checked: aptitude}); // check all aptitude checkbox
        // make an array of default classes and aptitude checks from minimum level to level 40
        for (let i = minLv; i <= maxLv; i++) {
            const lvClass: LvClassType = {
                lv: i,
                class: cls,
            };
            if (i == maxLv && !cls.is_upper_class && upperClass) {
                cls = upperClass;
                maxLv = upperClass.max_lv;
                lvClass.master = upperClass;
            }
            lvClasses.push(lvClass);
            aptitudes.push({
                lv: i,
                checked: aptitude,
            });
        }

        setSelectedClasses(lvClasses);
        setCheckedAptitudes(aptitudes);
        setInputedBaseStats({hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0,});
        setInputedMaxStats({hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0,});
        setEternal(0);

    };

    const makeParentUnits = (unitId: number, parents: ParentType[], exceptAvator: boolean = false) => {
        const parentUnits: ParentUnitsType = {
            fixed: null,
            possible: [],
        };
        parents.forEach((element, _) => {
            if (element.unit_id == unitId) {
                if (!parentUnits.fixed) {
                    parentUnits.fixed = getUnitById(element.fixed_parent, units);
                }
                const unit = getUnitById(element.possible_parent, units);
                if (unit && !(exceptAvator && unit.is_avator)) {
                    parentUnits.possible.push(unit);
                }
            }
        });
        return parentUnits;
    };

    const selectStrength = (id: number, isStrengh: boolean) =>  {
        const additionalValues = isStrengh ? strengths : weaknesses;
        if (additionalValues.length == 0) return;
        let result = additionalValues[0];
        for (const additionalValue of additionalValues) {
            if (additionalValue.id == id) {
                result = additionalValue;
                break;
            }
        }
        if (isStrengh) {
            setSelectedStrength(result);
        } else {
            setSelectedWeakness(result);
        }
    };

    const selectParallel = (lv: number, id: number) => {
        if (!selectedClasses) return;
        const _selectedClasses = [...selectedClasses];
        let cls: ClassType|null = null;
        // get class by id
        for (let _cls of classes) {
            if (_cls.id == id) {
                cls = _cls;
            }
        }
        if (!cls) return;
        for (let i = 0; i < _selectedClasses.length; i++) {
            if (_selectedClasses[i].lv >= lv) {
                _selectedClasses[i].class = cls;
            }
            // lower class
            if (_selectedClasses[i].lv == cls.max_lv && !_selectedClasses[i].class.is_upper_class && !_selectedClasses[i].class.is_special) {
                break;
            }
        }
        setSelectedClasses(_selectedClasses);
    };

    const selectMaster = (lv: number, id: number) => {
        if (!selectedClasses) return;
        const _selectedClasses = [...selectedClasses];
        let cls: ClassType|null = null;
        // get class by id
        for (let _cls of classes) {
            if (_cls.id == id) {
                cls = _cls;
            }
        }
        for (let i = 0; i < _selectedClasses.length; i++) {
            // mp
            if (_selectedClasses[i].lv == lv) {
                _selectedClasses[i].master = cls;
            }
            // classes
            if (cls && _selectedClasses[i].lv >= cls.min_lv) {
                _selectedClasses[i].class = cls;
            }
        }
        setSelectedClasses(_selectedClasses);
    }

    const handleCheckAptitude = (e: { target: HTMLInputElement } ) => {
        const checked = e.target.checked;
        const lv = parseInt(e.target.value);
        if (lv == 0) {
            checkAllAptitudes(checked);
        } else {
            checkAptitude(lv, checked);
        }
    };

    const checkAptitude = (lv: number, checked: boolean) => {
        if (!checkedAptitudes) return;
        setCheckedAptitudes(checkedAptitudes.map((checkedAptitude) => {
            if (checkedAptitude.lv == lv) {
                checkedAptitude.checked = checked;
            }
            return checkedAptitude;
        }));
    };

    const checkAllAptitudes = (checked: boolean) => {
        if (!checkedAptitudes) return;
        setCheckedAptitudes(checkedAptitudes.map((checkedAptitude) => {
            checkedAptitude.checked = checked;
            return checkedAptitude;
        }));
    };

    const handleInputBaseStats = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        if (input.length == 0) {
            input = '0';
        }
        if (!input.match(/^\-?[\d]{1,2}(\.[\d]{1,2})?$/)) {
            return;
        }
        if (e.target.name in inputedBaseStats) {
            modifyAdditionalBaseStats(e.target.name as keyof StatsType, parseFloat(input));
        }
    };

    const modifyAdditionalBaseStats = (key: keyof StatsType, value: number) => {
        setInputedBaseStats({
            ...inputedBaseStats,
            [key]: value,
        });
    };

    const handleInputMaxStats = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name in inputedMaxStats) {
            modifyAdditionalMaxStats(e.target.name as keyof StatsType, parseInt(e.target.value));
        }
    };

    const modifyAdditionalMaxStats = (key: keyof StatsType, value: number) => {
        setInputedMaxStats({
            ...inputedMaxStats,
            [key]: value,
        });
    };

    const selectParent = (id: number) => {
        const parent = getUnitById(id, units);
        setSelectedParent(parent);
        if (parent && parent.is_child) {
            // console.log('select parent', parent)
            const parentUnits = makeParentUnits(parent.id, parents, true);
            setParentsParents(parentUnits);
            
            setSelectedGrandParent(parentUnits.possible[0]);
        } else {
            setParentsParents({
                fixed: null,
                possible: [],
            });
            setSelectedGrandParent(null);
        }
    };

    const selectGrandParent = (id: number) => {
        const parent = getUnitById(id, units);
        setSelectedGrandParent(parent);
    };

    const handleEP = () => {
        if (!selectedClasses) {
            return;
        }
        if (!checkedAptitudes) {
            return;
        }
        const selectedClass = selectedClasses[selectedClasses.length - 1];
        const checkedAptitude = checkedAptitudes[checkedAptitudes.length - 1];

        if (selectedClass.class.max_lv < 40) {
            return;
        }
        const newEternal = eternal + 5;

        for (let i = selectedClass.lv + 1; i <= selectedClass.lv + 5; i++) {
            selectedClasses.push({
                lv: i,
                class: selectedClass.class,
            });
            checkedAptitudes.push({
                lv: i,
                checked: checkedAptitude.checked,
            });
        }
        setEternal(newEternal);
        setSelectedClasses([...selectedClasses]);
        setCheckedAptitudes([...checkedAptitudes]);
    };

    const calculate = useCallback(() => {
        const unitData = selectedUnit;
        if (!unitData || !selectedClasses || !checkedAptitudes || !inputedBaseStats) {
            return;
        }

        const strengthStats = makeStrengthStats(selectedStrength, selectedWeakness);
        
        const baseStats: StatsType = {
            hp: unitData.hp + (unitData.unit.is_avator ? strengthStats.base_hp : 0) + inputedBaseStats.hp,
            str: unitData.str + (unitData.unit.is_avator ? strengthStats.base_str : 0) + inputedBaseStats.str,
            mag: unitData.mag + (unitData.unit.is_avator ? strengthStats.base_mag : 0) + inputedBaseStats.mag,
            skl: unitData.skl + (unitData.unit.is_avator ? strengthStats.base_skl : 0) + inputedBaseStats.skl,
            spd: unitData.spd + (unitData.unit.is_avator ? strengthStats.base_spd : 0) + inputedBaseStats.spd,
            lck: unitData.lck + (unitData.unit.is_avator ? strengthStats.base_lck : 0) + inputedBaseStats.lck,
            def: unitData.def + (unitData.unit.is_avator ? strengthStats.base_def : 0) + inputedBaseStats.def,
            res: unitData.res + (unitData.unit.is_avator ? strengthStats.base_res : 0) + inputedBaseStats.res,
        };
        const defaultClass = unitData.unit.cls;

        let minLv = defaultClass.is_upper_class && !unitData.unit.is_servant ? unitData.lv + 20 : unitData.lv;
        let maxLv = defaultClass.is_upper_class || defaultClass.is_special ? defaultClass.max_lv + eternal : defaultClass.max_lv;
        let rows: StatsRowType[] = [];
        let stats: StatsType;
        let cls: ClassType;

        const parents: {fixed: null | UnitType, selected: null | UnitType} = {
            fixed: null,
            selected: null,
        };
        const grandParents: {fixed: null | UnitType, selected: null | UnitType} = {
            fixed: null,
            selected: null,
        }
        if (unitData.parents) {
            parents.fixed = unitData.parents.fixed;
            parents.selected = selectedParent;
            if (parents.selected && parents.selected.is_child && parentsParents && parentsParents.fixed) {
                grandParents.fixed = parentsParents.fixed;
                grandParents.selected = selectedGrandParent;
            }
        }

        const _baseMaxStats = makeBaseMaxStats({unit: unitData.unit, strengthStats: strengthStats, parents: parents, grandParents: grandParents});
        setBaseMaxStats(_baseMaxStats);
        const _baseGrowthRates = makeBaseGrowthRates({unit: unitData.unit, strengthStats: strengthStats, parents: parents, grandParents: grandParents});
        setBaseGrowthRates(_baseGrowthRates);

        let prevClass = null;
        let skip = 0;
        for (let i = minLv; i <= maxLv; i++) {
            
            if (!selectedClasses) {
                return;
            }
            // when using a master seal at a level less than the max level
            if (skip > i) {
                continue;
            }
            let statsKey: keyof StatsType
            let aptitude = false;
            for (const checkedAptitude of checkedAptitudes) {
                if (checkedAptitude.lv == i) {
                    aptitude = checkedAptitude.checked;
                    break;
                }
            }
            // get a class from selected classes
            const selectedClass = getSelectedClassByLv(i, selectedClasses);
            
            if (!selectedClass) {
                return;
            }
            cls = selectedClass.class;
            maxLv = cls.is_upper_class || cls.is_special ? cls.max_lv + eternal : cls.max_lv; 
            
            // class is changed
            if (!Object.is(prevClass, selectedClass.class)) {
                prevClass = cls;
            }
            const maxStats = sumMaxStatsOfUnitAndClass({maxStats: _baseMaxStats, cls: cls, inputedMaxStats: inputedMaxStats});

            // growth rates
            const growthRates = sumGrowthRatesOfUnitAndClass({growthRates: _baseGrowthRates, cls: cls, aptitude: aptitude});
            
            // unit base stats + class base stats
            stats = {
                hp: baseStats.hp + cls.base_hp,
                str: baseStats.str + cls.base_str,
                mag: baseStats.mag + cls.base_mag,
                skl: baseStats.skl + cls.base_skl,
                spd: baseStats.spd + cls.base_spd,
                lck: baseStats.lck + cls.base_lck,
                def: baseStats.def + cls.base_def,
                res: baseStats.res + cls.base_res,
            };

            const isMax = {hp: 0, str: 0, mag: 0, skl: 0 ,spd: 0, lck: 0, def: 0, res: 0,};
            // adjust to max stats
            for (statsKey in baseStats) {
                if (stats[statsKey] >= maxStats[statsKey]) {
                    stats[statsKey] = maxStats[statsKey];
                    isMax[statsKey] = 1;
                }
                if (stats[statsKey] > 99) {
                    stats[statsKey] = 99;
                }
            }
            let pp = cls;
            let mp = null;
            if (selectedClasses) {
                for (let selectedClass of selectedClasses) {
                    if (selectedClass.lv == i) {
                        pp = selectedClass.class;
                        mp = selectedClass.master ?? null;
                        break;
                    }
                }
            }
            let row = {
                lv: i, 
                displayLv: cls.is_upper_class && !unitData.unit.is_servant ? i - 20 : i, 
                class: cls,
                gender: unitData.unit.gender,
                isUpper: cls.is_upper_class,
                unit: unitData,
                pp: pp,
                mp: mp,
                isMax: isMax,
                aptitude: aptitude,
                ...stats,
            };
            rows.push(row);
    
            // cc
            if (selectedClass.master) {
                // use master seal
                skip = selectedClass.master.min_lv;
                maxLv = selectedClass.master.max_lv;
            } else {
                // grow
                for (statsKey in baseStats) {
                    if (stats[statsKey] < maxStats[statsKey]) {
                        baseStats[statsKey] += growthRates[statsKey] / 100 
                    }
                }
            }   
        }

        setRows(rows);
    }, [selectedUnit, selectedStrength, selectedWeakness, selectedClasses, checkedAptitudes, inputedBaseStats, inputedMaxStats,
        selectedParent, selectedGrandParent, parentsParents, eternal]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    // trigger an unit select event at first time
    useEffect(() => {
        if (unitSelectRef.current) {
            unitSelectRef.current.dispatchEvent(new Event('change', {bubbles: true}))
        }
    }, []);


    return (
    <>
    <div className="my-4">
        <SelectStrengths strengths={strengths} isStrength={true} selected={selectedStrength.id} selectStrength={selectStrength} />
        <SelectStrengths strengths={weaknesses} isStrength={false} selected={selectedWeakness.id} selectStrength={selectStrength} />
    </div>
    <div className="mb-4">
    <label htmlFor="unit-select" className="mr-2">ユニット</label>
        <select 
            id="unit-select"
            onChange={handleSelectUnit} 
            value={selectedUnit?.id}
            className="mr-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={unitSelectRef}
            data-testid="unit-select"
        >
            {units.map((unit: UnitBaseStatType) => {
                return (
                    <option key={unit.key + unit.suffix} value={unit.id} data-testid={"unit-select-" + unit.key + unit.suffix}>
                        {unit.name}
                    </option>
                );
            })}
        </select>
        {
            selectedUnit?.parents && selectedParent ? 
            <SelectParents parents={selectedUnit.parents} selectedParent={selectedParent} selectParent={selectParent} /> 
            : ''
        }
        {
            parentsParents?.fixed && selectedGrandParent ? 
            <SelectParents parents={parentsParents} selectedParent={selectedGrandParent} selectParent={selectGrandParent} isGrand={true} /> 
            : ''
        }
</div>
{selectedUnit && 
<table className="table-auto ">
<thead>
    <tr className="bg-red-800 text-white dark:bg-violet-300 dark:text-black">
        <th>成長率・上限値</th>
        <th>HP</th>
        <th>力</th>
        <th>魔力</th>
        <th>技</th>
        <th>速さ</th>
        <th>幸運</th>
        <th>守備</th>
        <th>魔防</th>
        <th>合計</th>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <th>ユニット成長率</th>
        {baseGrowthRates ? Object.values(baseGrowthRates).map((value, i) => <td className="text-center" key={i}>{value}</td>): ''}
        <td className="text-center ">{baseGrowthRates ? Object.values(baseGrowthRates).map((value) => value).reduce((sum, num) => sum + num) : ''}</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr className="bg-red-50 dark:bg-violet-950">
        <th>ユニット上限値</th>
        {baseMaxStats ? Object.values(baseMaxStats).map((value, i) => <td className="text-center" key={i}>{value}</td>): ''}
        <td className="text-center ">{baseMaxStats ? Object.values(baseMaxStats).map((value) => value).reduce((sum, num) => sum + num) : ''}</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <th>基本値調整</th>
        {Object.entries(inputedBaseStats).map((entry, i) => {
            return (
                <th key={`add-bs-th-${i}`}>
                    <input type="number" value={entry[1]} name={entry[0]} step="any" onInput={handleInputBaseStats} className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="-99" max="99" />
                </th>
            );
        })}
        <th></th>
        <th></th>
        <th></th>
    </tr><tr>
        <th>上限値調整</th>
        {Object.entries(inputedMaxStats).map((entry, i) => {
            return (
                <th key={`add-ms-th-${i}`}>
                    {entry[0] != 'hp' ? 
                    <input type="number" value={entry[1]} name={entry[0]} onInput={handleInputMaxStats} className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" max="15" min="0" />
                    : ''}
                </th>
            );
        })}
        <th></th>
        <th></th>
        <th></th>
    </tr>
</thead>
<tbody>

    <tr className="bg-red-800 text-white dark:bg-violet-300 dark:text-black">
        <th>Lv</th>
        <th>HP</th>
        <th>力</th>
        <th>魔力</th>
        <th>技</th>
        <th>速さ</th>
        <th>幸運</th>
        <th>守備</th>
        <th>魔防</th>
        <th>合計</th>
        <th>クラス</th>
        <th>MP</th>
        <th>
            <label htmlFor="aptitude-0">良成長</label>
            {checkedAptitudes &&
            <input type="checkbox" name="aptitude" value="0" id="aptitude-0" checked={checkedAptitudes[0].checked} onChange={handleCheckAptitude} data-testid={`aptitude-0`} />} 
        </th>
    </tr>
    {rows.map((row: StatsRowType|undefined) => {
        return (
            row &&
            <TableRow key={row.lv} row={row} classes={classes} selectParallel={selectParallel} selectMaster={selectMaster} handleCheckAptitude={handleCheckAptitude} />
        )
    })}
    <tr className="bg-red-800 text-white dark:bg-violet-300 dark:text-black">
        <th>Lv</th>
        <th>HP</th>
        <th>力</th>
        <th>魔力</th>
        <th>技</th>
        <th>速さ</th>
        <th>幸運</th>
        <th>守備</th>
        <th>魔防</th>
        <th>合計</th>
        <th>クラス</th>
        <th>MP</th>
        <th>
            <label htmlFor="aptitude-0-2">良成長</label>
            {checkedAptitudes &&
            <input type="checkbox" name="aptitude" value="0" id="aptitude-0-2" checked={checkedAptitudes[0].checked} onChange={handleCheckAptitude} />} 
        </th>
    </tr>
    
</tbody>  
<tfoot>
    <tr><td colSpan={13} className="text-center py-2"><button className="bg-red-500 hover:bg-red-600 dark:bg-violet-600 dark:hover:bg-violet-500 text-white font-bold py-2 px-4 rounded" onClick={handleEP} data-testid="ep-button">Lv上限+5</button></td></tr>
</tfoot>
</table>
}
</>
    );
}