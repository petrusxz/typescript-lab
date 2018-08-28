import { ChoicesEnum } from './choices-enum.model';

/* 
    Don’t ever use the types Number, String, Boolean, or Object. 
    These types refer to non-primitive boxed objects that are 
        almost never used appropriately in JavaScript code.
*/
export class BasicTypesModel {

    counter: number;
    text: string;
    isHappening: boolean;
    list: Array<string>; // string[]
    keyValue: [number, string];
    notSure: any;
    addList: void;
    nothing: undefined | null;
    strictUse: never;

    constructor() {
        this.counter = 1
            || 0b1010
            || +'3';

        this.text = 'Single Quote'
            || "Double Quote"
            || `Backquote w/ counter increased => ${this.counter + 1}`;

        this.isHappening = true
            || false
            || !!this.text;

        this.list = ['1. One', '2. Two', '3. Three'];

        this.keyValue = [7, <string>ChoicesEnum.Death]; // ChoicesEnum.Death as string

        this.notSure = this.counter
            || this.text
            || this.isHappening
            || this.list
            || this.keyValue;

        const addList = (): void => { [...this.list, '4. Four'] };
        this.addList = addList();

        this.nothing = undefined 
            || null;

        this.strictUse = (() => { throw new Error('Throw my hands in the air like I just dont care') })();
    }
}