"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityType;
(function (EntityType) {
    EntityType[EntityType["Hero"] = 1] = "Hero";
    EntityType[EntityType["Monster"] = 2] = "Monster";
    EntityType[EntityType["Lootable"] = 3] = "Lootable";
    EntityType[EntityType["Unknown"] = 4] = "Unknown";
})(EntityType || (EntityType = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Down"] = 3] = "Down";
    Direction[Direction["Left"] = 4] = "Left";
})(Direction || (Direction = {}));
class Entity {
    constructor(x, y, name) {
        this.coords = {
            posX: x,
            posY: y
        };
        this.name = name;
    }
    canDie() {
        return false;
    }
    canMove() {
        return false;
    }
}
exports.Entity = Entity;
class LiveEntity extends Entity {
    constructor(x, y, name, hp) {
        super(x, y, name);
        this.hp = hp;
    }
    canDie() {
        return true;
    }
}
exports.LiveEntity = LiveEntity;
class HeroEntity extends LiveEntity {
    constructor(x, y, name, hp) {
        super(x, y, name, hp);
        this.type = EntityType.Hero;
    }
    canMove() {
        return true;
    }
    move(dir) {
        switch (dir) {
            case Direction.Up:
                this.coords.posY--;
                break;
            case Direction.Right:
                this.coords.posX++;
                break;
            case Direction.Down:
                this.coords.posY++;
                break;
            case Direction.Left:
                this.coords.posX--;
                break;
        }
        return true;
    }
    toString() {
        return `${this.name} (${this.hp}HP) : ${this.coords}`;
    }
}
exports.HeroEntity = HeroEntity;
