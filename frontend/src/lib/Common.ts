export function myRound(value: number, index: number = 2): number{
    return Math.round(value * Math.pow(10, index)) / Math.pow(10, index);
}