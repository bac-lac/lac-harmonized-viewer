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
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        console.log("A car was created!");
        return _this;
    }
    Car.prototype.connectedCallback = function () {
        console.log("A car was added to the DOM");
    };
    Car.prototype.disconnectedCallback = function () {
        console.log("hey! someone removed me from the DOM!");
    };
    return Car;
}(HTMLElement));
//# sourceMappingURL=topbar.element.js.map