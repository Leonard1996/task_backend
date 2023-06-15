"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rate = void 0;
const typeorm_1 = require("typeorm");
const ColumnNumericTransformer_1 = require("../utils/ColumnNumericTransformer");
const exchange_office_entity_1 = require("./exchange-office.entity");
let Rate = class Rate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rate.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rate.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", {
        precision: 10,
        scale: 4,
        transformer: new ColumnNumericTransformer_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Rate.prototype, "in", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", {
        precision: 10,
        scale: 4,
        transformer: new ColumnNumericTransformer_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Rate.prototype, "out", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", {
        precision: 25,
        scale: 10,
        transformer: new ColumnNumericTransformer_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Rate.prototype, "reseve", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp"),
    __metadata("design:type", Date)
], Rate.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => exchange_office_entity_1.ExchangeOffice, (exchangeOffice) => exchangeOffice.rates),
    __metadata("design:type", exchange_office_entity_1.ExchangeOffice)
], Rate.prototype, "exchangeOffice", void 0);
Rate = __decorate([
    (0, typeorm_1.Entity)("rates")
], Rate);
exports.Rate = Rate;
