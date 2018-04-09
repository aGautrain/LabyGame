"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_class_1 = require("./Entity.class");
// let mainChar: HeroEntity = new HeroEntity(0,0,"Luke Skywalker", "Luke is able to repair almost every device for half the cost needed", 75, 4, 2000,lukeSprite);
class HeroLuke extends Entity_class_1.HeroEntity {
    constructor(x, y, sprite) {
        super(x, y, "Luke SkyWalker", "Luke is able to repair almost every device for half the cost needed", 75, 3, 1000, 4, sprite);
    }
}
exports.HeroLuke = HeroLuke;
