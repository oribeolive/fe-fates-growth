import UnitType from './UnitType';
type UnitBaseStatType = {
    id: number,
    name: string,
    key: string,
    suffix: string,
    lv: number,
    hp: number,
    str: number,
    mag: number,
    skl: number,
    spd: number,
    lck: number,
    def: number,
    res: number,
    unit: UnitType,
    parents?: {
        fixed: UnitType | null,
        possible: UnitType[]
    }
};
export default UnitBaseStatType;