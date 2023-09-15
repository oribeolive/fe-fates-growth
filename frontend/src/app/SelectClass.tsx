'use client'
import ClassType from "./types/ClassType";
import { StatsRowType } from "./Contents";
export default function SelectClass({classes, isMp = false, row, handler}
    :{classes: ClassType[], isMp?: boolean, row: StatsRowType, handler: (lv: number, id: number) => void}) {
    function handleChange(e: { target: HTMLSelectElement }) {
        let id = parseInt(e.target.value);
        if (!id) id = 0;
        const lv = parseInt(e.target.options[e.target.selectedIndex].dataset.lv ?? '0');
        handler(lv, id);
    }
    const testId = (isMp ? 'mp' : 'pp') + row.lv + '-select';
    return (
        <>
        <select 
            onChange={handleChange} 
            value={isMp ? (row.mp ? row.mp.id : '') : row.pp.id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            data-testid={testId}
        >
            {
                isMp ? 
                <option key="0" value="" data-lv={row.lv} data-testid={`${testId}-0`}></option> 
                : ''
            }
            {classes.map((cls: ClassType) => {
                if (isMp) {
                    if (row.isUpper || !cls.is_upper_class) {
                        return null;
                    }
                } else {
                    // (higher than max level in lower class or lower than minimum level) and is not a servant
                    if (((row.lv > cls.max_lv && !cls.is_upper_class && !cls.is_special) || (row.lv < cls.min_lv)) && !row.unit.unit.is_servant) {
                        return null;
                    }
                    if (row.unit.unit.is_servant && !cls.is_upper_class && !cls.is_special) {
                        return null;
                    }
                }
                if ((row.gender == 1 && cls.gender == 2) || (row.gender == 2 && cls.gender == 1)) {
                    return null;
                }
                return (
                    <option key={cls.key} value={cls.id} data-lv={row.lv} data-testid={`${testId}-${cls.key}`}>
                        {cls.name}
                    </option>
                );
            })}
        </select>
        </>
    )
}
