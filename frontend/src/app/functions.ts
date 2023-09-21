import UnitType from "./types/UnitType";
import ClassType from "./types/ClassType";
import UnitBaseStatType from "./types/UnitBaseStatType";
import StatsType from "./types/StatsType";
import LvClassType from "./types/LvClassType";
import StrengthType, { StrengthStatsType } from "./types/StrengthType";

export const makeBaseMaxStats = ({unit, strengthStats, parents, grandParents}: 
    {unit:UnitType, strengthStats: StrengthStatsType, parents: {fixed: UnitType | null, selected: UnitType | null}, 
    grandParents?: {fixed: UnitType | null, selected: UnitType | null}}) => 
{
    let selectedParentBaseMaxStats: StatsType = {hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0,};
    let childBonus = 0;
    if (parents.selected) {
        selectedParentBaseMaxStats.str = parents.selected.max_str;
        selectedParentBaseMaxStats.mag = parents.selected.max_mag;
        selectedParentBaseMaxStats.skl = parents.selected.max_skl;
        selectedParentBaseMaxStats.spd = parents.selected.max_spd;
        selectedParentBaseMaxStats.lck = parents.selected.max_lck;
        selectedParentBaseMaxStats.def = parents.selected.max_def;
        selectedParentBaseMaxStats.res = parents.selected.max_res;
        childBonus = 1;
        if (grandParents && grandParents.fixed) {
            selectedParentBaseMaxStats = makeBaseMaxStats({unit: parents.selected, strengthStats: strengthStats, parents: grandParents});
            childBonus = 0;
        }
    }
    // father + mother
    const childMaxStats: StatsType = {hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0,};
    if (parents.fixed && parents.selected) {
        childMaxStats.str = parents.fixed.max_str + selectedParentBaseMaxStats.str + (parents.selected.is_avator || parents.fixed.is_avator ? strengthStats.max_str : 0) + childBonus;
        childMaxStats.mag = parents.fixed.max_mag + selectedParentBaseMaxStats.mag + (parents.selected.is_avator || parents.fixed.is_avator ? strengthStats.max_mag : 0) + childBonus;
        childMaxStats.skl = parents.fixed.max_skl + selectedParentBaseMaxStats.skl + (parents.selected.is_avator || parents.fixed.is_avator ? strengthStats.max_skl : 0) + childBonus;
        childMaxStats.spd = parents.fixed.max_spd + selectedParentBaseMaxStats.spd + (parents.selected.is_avator || parents.fixed.is_avator ? strengthStats.max_spd : 0) + childBonus;
        childMaxStats.lck = parents.fixed.max_lck + selectedParentBaseMaxStats.lck + (parents.selected.is_avator || parents.fixed.is_avator ? strengthStats.max_lck : 0) + childBonus;
        childMaxStats.def = parents.fixed.max_def + selectedParentBaseMaxStats.def + (parents.selected.is_avator || parents.fixed.is_avator ? strengthStats.max_def : 0) + childBonus;
        childMaxStats.res = parents.fixed.max_res + selectedParentBaseMaxStats.res + (parents.selected.is_avator || parents.fixed.is_avator ? strengthStats.max_res : 0) + childBonus;
    }
    const baseMaxStats = {
        hp: 0,
        str: unit.max_str + (unit.is_avator ? strengthStats.max_str : 0) + childMaxStats.str,
        mag: unit.max_mag + (unit.is_avator ? strengthStats.max_mag : 0) + childMaxStats.mag,
        skl: unit.max_skl + (unit.is_avator ? strengthStats.max_skl : 0) + childMaxStats.skl,
        spd: unit.max_spd + (unit.is_avator ? strengthStats.max_spd : 0) + childMaxStats.spd,
        lck: unit.max_lck + (unit.is_avator ? strengthStats.max_lck : 0) + childMaxStats.lck,
        def: unit.max_def + (unit.is_avator ? strengthStats.max_def : 0) + childMaxStats.def,
        res: unit.max_res + (unit.is_avator ? strengthStats.max_res : 0) + childMaxStats.res,
    };
    return baseMaxStats;
};

export const makeBaseGrowthRates = ({unit, strengthStats, parents, grandParents}: 
    {unit: UnitType, strengthStats: StrengthStatsType, parents: {fixed: UnitType | null, selected: UnitType | null}, 
    grandParents?: {fixed: UnitType | null, selected: UnitType | null}}) => 
{
    let selectedParentBaseGrowthRates: StatsType = {hp: 0, str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0,};
    if (parents.selected) {
        selectedParentBaseGrowthRates.hp = parents.selected.growth_rate_hp;
        selectedParentBaseGrowthRates.str = parents.selected.growth_rate_str;
        selectedParentBaseGrowthRates.mag = parents.selected.growth_rate_mag;
        selectedParentBaseGrowthRates.skl = parents.selected.growth_rate_skl;
        selectedParentBaseGrowthRates.spd = parents.selected.growth_rate_spd;
        selectedParentBaseGrowthRates.lck = parents.selected.growth_rate_lck;
        selectedParentBaseGrowthRates.def = parents.selected.growth_rate_def;
        selectedParentBaseGrowthRates.res = parents.selected.growth_rate_res;
        if (grandParents && grandParents.fixed) {
            selectedParentBaseGrowthRates = makeBaseGrowthRates({unit: parents.selected, strengthStats: strengthStats, parents: grandParents});
        }
    }
    const baseGrowthRates: StatsType = {
        hp: unit.growth_rate_hp,
        str: unit.growth_rate_str,
        mag: unit.growth_rate_mag,
        skl: unit.growth_rate_skl,
        spd: unit.growth_rate_spd,
        lck: unit.growth_rate_lck,
        def: unit.growth_rate_def,
        res: unit.growth_rate_res,
    };
    // (child + selectedParent) / 2
    if (parents.fixed && parents.selected) {
        baseGrowthRates.hp = (unit.growth_rate_hp + selectedParentBaseGrowthRates.hp + (parents.selected.is_avator ? strengthStats.growth_rate_hp : 0)) / 2;
        baseGrowthRates.str = (unit.growth_rate_str + selectedParentBaseGrowthRates.str + (parents.selected.is_avator ? strengthStats.growth_rate_str : 0)) / 2;
        baseGrowthRates.mag = (unit.growth_rate_mag + selectedParentBaseGrowthRates.mag + (parents.selected.is_avator ? strengthStats.growth_rate_mag : 0)) / 2;
        baseGrowthRates.skl = (unit.growth_rate_skl + selectedParentBaseGrowthRates.skl + (parents.selected.is_avator ? strengthStats.growth_rate_skl : 0)) / 2;
        baseGrowthRates.spd = (unit.growth_rate_spd + selectedParentBaseGrowthRates.spd + (parents.selected.is_avator ? strengthStats.growth_rate_spd : 0)) / 2;
        baseGrowthRates.lck = (unit.growth_rate_lck + selectedParentBaseGrowthRates.lck + (parents.selected.is_avator ? strengthStats.growth_rate_lck : 0)) / 2;
        baseGrowthRates.def = (unit.growth_rate_def + selectedParentBaseGrowthRates.def + (parents.selected.is_avator ? strengthStats.growth_rate_def : 0)) / 2;
        baseGrowthRates.res = (unit.growth_rate_res + selectedParentBaseGrowthRates.res + (parents.selected.is_avator ? strengthStats.growth_rate_res : 0)) / 2;
    } else if (unit.is_avator) {
        baseGrowthRates.hp += strengthStats.growth_rate_hp;
        baseGrowthRates.str += strengthStats.growth_rate_str;
        baseGrowthRates.mag += strengthStats.growth_rate_mag;
        baseGrowthRates.skl += strengthStats.growth_rate_skl;
        baseGrowthRates.spd += strengthStats.growth_rate_spd;
        baseGrowthRates.lck += strengthStats.growth_rate_lck;
        baseGrowthRates.def += strengthStats.growth_rate_def;
        baseGrowthRates.res += strengthStats.growth_rate_res;
    }
    return baseGrowthRates;
};

export const getUnitById = (id: number, units: UnitBaseStatType[]): UnitType | null => {
    if (!units) {
        return null;
    }
    for (const unit of units) {
        if (unit.unit.id == id) {
            return unit.unit;
        }
    }
    return null;
};

export const sumMaxStatsOfUnitAndClass = ({maxStats, cls, inputedMaxStats}: {maxStats: StatsType, cls: ClassType, inputedMaxStats: StatsType}) => 
{
    const _maxStats = {
        hp: cls.max_hp,
        str: maxStats.str + cls.max_str + inputedMaxStats.str,
        mag: maxStats.mag + cls.max_mag + inputedMaxStats.mag,
        skl: maxStats.skl + cls.max_skl + inputedMaxStats.skl,
        spd: maxStats.spd + cls.max_spd + inputedMaxStats.spd,
        lck: maxStats.lck + cls.max_lck + inputedMaxStats.lck,
        def: maxStats.def + cls.max_def + inputedMaxStats.def,
        res: maxStats.res + cls.max_res + inputedMaxStats.res,
    };
    // adjust to 99 if the numbers exceed 99
    Object.keys(_maxStats).forEach((key, i) => {
        if (_maxStats[key as keyof StatsType] > 99) {
            _maxStats[key as keyof StatsType] = 99;
        }
    })
    return _maxStats;
};
export const sumGrowthRatesOfUnitAndClass = ({growthRates, cls, aptitude}: {growthRates:StatsType, cls: ClassType, aptitude: boolean}) => 
{
    return {
       hp: growthRates.hp + cls.growth_rate_hp + (aptitude ? 10 : 0),
       str: growthRates.str + cls.growth_rate_str + (aptitude ? 10 : 0),
       mag: growthRates.mag + cls.growth_rate_mag + (aptitude ? 10 : 0),
       skl: growthRates.skl + cls.growth_rate_skl + (aptitude ? 10 : 0),
       spd: growthRates.spd + cls.growth_rate_spd + (aptitude ? 10 : 0),
       lck: growthRates.lck + cls.growth_rate_lck + (aptitude ? 10 : 0),
       def: growthRates.def + cls.growth_rate_def + (aptitude ? 10 : 0),
       res: growthRates.res + cls.growth_rate_res + (aptitude ? 10 : 0),
    };
};
export const chooseUpperClass = ({upperClasses, unitGender}: {upperClasses: ClassType[], unitGender: number}) => {
    let upperClass = null;
    if (upperClasses.length > 0) {
        for (let i = 0; i < upperClasses.length; i++) {
            if (upperClasses[i].gender == 0 || upperClasses[i].gender == unitGender) {
                upperClass = upperClasses[i];
                break;
            }
        }
    }
    return upperClass;
};

export const getSelectedClassByLv = (lv: number, selectedClasses: LvClassType[]) => {
    for (const selectedClass of selectedClasses) {
        if (selectedClass.lv == lv) {
            return selectedClass;
        }
    }
    return null;
};

export const makeStrengthStats = (strength: StrengthType, weakness: StrengthType): StrengthStatsType => {
    const _strength: StrengthStatsType = strength;
    const _weakness: StrengthStatsType = weakness;
    const strengthStats: StrengthStatsType = {base_hp: 0, base_str: 0, base_mag: 0,base_skl: 0, base_spd: 0,base_lck: 0,base_def: 0, base_res: 0,
        growth_rate_hp: 0,growth_rate_str: 0,growth_rate_mag: 0,growth_rate_skl: 0, growth_rate_spd: 0,growth_rate_lck: 0,growth_rate_def: 0,growth_rate_res: 0,
        max_str: 0,max_mag: 0,max_skl: 0,max_spd: 0,max_lck: 0, max_def: 0,max_res: 0,};
    Object.keys(strengthStats).forEach((key) => {
        strengthStats[key as keyof  StrengthStatsType] = _strength[key as keyof StrengthStatsType] + _weakness[key as keyof StrengthStatsType];
    });
    return strengthStats;
};