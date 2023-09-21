
import { StatsRowType, CheckedAptitudeType } from "./Contents";
import ClassType from "./types/ClassType";
import { myRound } from "@/lib/Common";
import SelectClass from "./SelectClass";
type handlerType = (id: number, lv: number) => void;
type handler2Type = (e: { target: HTMLInputElement } ) => void;
export default function TableRow({row, classes, selectParallel, selectMaster, handleCheckAptitude}: 
    {row: StatsRowType, classes: ClassType[], 
        selectParallel: handlerType, selectMaster: handlerType, handleCheckAptitude: handler2Type}) {
    return (
            <tr className="odd:bg-red-50 odd:dark:bg-violet-950 text-center" data-testid={`lv${row.lv}`}>
                <td className="">{row.displayLv}</td>
                <td className={row.isMax.hp ? 'text-green-500' : ''} data-testid={`lv${row.lv}-hp`}>{myRound(row.hp)}</td>
                <td className={row.isMax.str ? 'text-green-500' : ''} data-testid={`lv${row.lv}-str`}>{myRound(row.str)}</td>
                <td className={row.isMax.mag ? 'text-green-500' : ''} data-testid={`lv${row.lv}-mag`}>{myRound(row.mag)}</td>
                <td className={row.isMax.skl ? 'text-green-500' : ''} data-testid={`lv${row.lv}-skl`}>{myRound(row.skl)}</td>
                <td className={row.isMax.spd ? 'text-green-500' : ''} data-testid={`lv${row.lv}-spd`}>{myRound(row.spd)}</td>
                <td className={row.isMax.lck ? 'text-green-500' : ''} data-testid={`lv${row.lv}-lck`}>{myRound(row.lck)}</td>
                <td className={row.isMax.def ? 'text-green-500' : ''} data-testid={`lv${row.lv}-def`}>{myRound(row.def)}</td>
                <td className={row.isMax.res ? 'text-green-500' : ''} data-testid={`lv${row.lv}-res`}>{myRound(row.res)}</td>
                <td className="" data-testid={`lv${row.lv}-sum`}>{myRound(row.hp + row.str + row.mag + row.skl + row.spd + row.lck + row.def + row.res)}</td>
                <td className="w-40">
                    <SelectClass classes={classes} row={row} handler={selectParallel} /> 
                </td>
                <td className="w-36">
                    {row.lv >= 10 && row.lv <= 20 && !row.isUpper && 
                        <SelectClass classes={classes} row={row} isMp={true} handler={selectMaster} /> 
                    }
                </td>
                <td className="">
                    <input className="" key={`aptitude-${row.lv}`} checked={row.aptitude} type="checkbox" name="aptitude" value={row.lv} onChange={handleCheckAptitude} data-testid={`aptitude-${row.lv}`} />
                </td>
            </tr>
            );
            }