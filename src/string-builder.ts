export class StringBuilder {

    value: any;

    constructor(value: any) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

}