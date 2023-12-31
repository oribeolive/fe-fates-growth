import ClassType from "./ClassType";
type UnitType = {
    id: number,
    name: string,
    key: string,
    is_avator: boolean,
    is_servant: boolean,
    gender: number,
    is_child: boolean,
    class: string,
    growth_rate_hp: number,
    growth_rate_str: number,
    growth_rate_mag: number,
    growth_rate_skl: number,
    growth_rate_spd: number,
    growth_rate_lck: number,
    growth_rate_def: number,
    growth_rate_res: number,
    max_str: number,
    max_mag: number,
    max_skl: number,
    max_spd: number,
    max_lck: number,
    max_def: number,
    max_res: number,
    cls: ClassType,
};
export default UnitType;