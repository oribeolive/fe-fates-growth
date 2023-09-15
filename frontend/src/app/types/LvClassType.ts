import ClassType from "./ClassType";
type LvClassType = {
    lv: number,
    class: ClassType,
    master?: ClassType|null,
};
export default LvClassType;