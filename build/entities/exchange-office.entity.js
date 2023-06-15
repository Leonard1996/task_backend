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
exports.ExchangeOffice = void 0;
const typeorm_1 = require("typeorm");
const exchange_entitty_1 = require("./exchange.entitty");
const rate_entity_1 = require("./rate.entity");
let ExchangeOffice = class ExchangeOffice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExchangeOffice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExchangeOffice.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExchangeOffice.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exchange_entitty_1.Exchange, (exchange) => exchange.exchangeOffice),
    __metadata("design:type", Array)
], ExchangeOffice.prototype, "exchanges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rate_entity_1.Rate, (rate) => rate.exchangeOffice),
    __metadata("design:type", Array)
], ExchangeOffice.prototype, "rates", void 0);
ExchangeOffice = __decorate([
    (0, typeorm_1.Entity)("exchangeOffices")
], ExchangeOffice);
exports.ExchangeOffice = ExchangeOffice;
