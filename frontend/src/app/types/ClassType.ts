type ClassType = {
    id: number,
    name: string,
    key: string,
    is_upper_class: boolean,
    is_special: boolean,
    gender: number,
    min_lv: number,
    max_lv: number,
    base_hp: number,
    base_str: number,
    base_mag: number,
    base_skl: number,
    base_spd: number,
    base_lck: number,
    base_def: number,
    base_res: number,
    growth_rate_hp: number,
    growth_rate_str: number,
    growth_rate_mag: number,
    growth_rate_skl: number,
    growth_rate_spd: number,
    growth_rate_lck: number,
    growth_rate_def: number,
    growth_rate_res: number,
    max_hp: number,
    max_str: number,
    max_mag: number,
    max_skl: number,
    max_spd: number,
    max_lck: number,
    max_def: number,
    max_res: number,
    upper_classes: ClassType[],
};
export default ClassType;