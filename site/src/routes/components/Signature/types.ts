
export interface RopeFrame{
    frame:number;
    strokeWidth:number;
    color?:string;
}
export interface RopeAnimation{
    cycleSize:number;
    frame:RopeFrame[];
}