import { TypesEnum } from "./types-enum.model";

export interface LogActionModel {
    readonly id: string;
    value: string;
    actionDate?: Date;
    type?: TypesEnum;
}