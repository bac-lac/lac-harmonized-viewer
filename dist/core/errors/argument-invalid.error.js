var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ArgumentInvalidError = /** @class */ (function (_super) {
    __extends(ArgumentInvalidError, _super);
    function ArgumentInvalidError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain
        _this.name = ArgumentInvalidError.name; // stack traces display correctly now 
        return _this;
    }
    return ArgumentInvalidError;
}(Error));
//# sourceMappingURL=argument-invalid.error.js.map