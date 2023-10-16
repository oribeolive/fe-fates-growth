'use client'

import StrengthType from "./types/StrengthType";
import UnitType from "./types/UnitType";
import { ParentUnitsType } from "./Contents";

export default function SelectParents({parents, selectedParent, selectParent, isGrand = false}: 
    {parents: ParentUnitsType, selectedParent: UnitType, selectParent: (id:number) => void, isGrand?: boolean}) 
{

    const handleSelectParent = (e: { target: HTMLSelectElement } ) => {
        const id = parseInt(e.target.value);
        // const isStrength = e.target.dataset.isStrength == '1';
        let parent: UnitType | null = null;
        for (const _parent of parents.possible) {
            if (_parent.id == id) {
                parent = _parent;
                break;
            }
        }
        selectParent(id);
    };
    const htmlId = (isGrand ? 'grand-' : '') + 'parent';
    return (
        <>
            <label htmlFor={htmlId} className="mr-2 block">{ isGrand ? '2代' : '' }親 {parents?.fixed?.name} x </label>
            <select 
                onChange={handleSelectParent} 
                data-is-strength="1"
                id={htmlId}
                value={selectedParent.id}
                className="mr-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                data-testid={htmlId + '-select'}
            >
                {parents.possible.map((parent: UnitType) => {
                    return (
                        <option key={parent.id} value={parent.id} data-testid={htmlId + '-select-' + parent.key}>
                            {parent.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
}