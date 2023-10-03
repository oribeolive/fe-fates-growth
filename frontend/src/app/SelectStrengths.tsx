'use client'

import StrengthType from "./types/StrengthType";

export default function SelectStrengths({strengths, isStrength, selected, selectStrength}: 
    {strengths: StrengthType[], isStrength: boolean, selected: number, selectStrength: (id: number, isStrength: boolean) => void}) 
{

    const handleSelectStrength = (e: { target: HTMLSelectElement } ) => {
        const id = parseInt(e.target.value);
        // const isStrength = e.target.dataset.isStrength == '1';
        selectStrength(id, isStrength);
    };
    const label = isStrength ? 'カムイの長所' : '短所';
    const elementId = isStrength ? 'strength' : 'weakness';
    return (
        <>
            <label htmlFor={elementId} className="mr-2 block">{label}</label>
            <select 
                onChange={handleSelectStrength} 
                // data-is-strength="1"
                id={elementId}
                value={selected}
                className="mr-5 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                data-testid={`${elementId}-select`}
            >
                {strengths.map((strength: StrengthType) => {
                    return (
                        <option key={strength.key} value={strength.id} data-testid={`${elementId}-select-${strength.key}`}>
                            {strength.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
}