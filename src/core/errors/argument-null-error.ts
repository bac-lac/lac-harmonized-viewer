class ArgumentNullError extends InvalidArgumentError {
    constructor(argument?: string) {
        super(argument);
        // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = ArgumentNullError.name; // stack traces display correctly now 
    }
}