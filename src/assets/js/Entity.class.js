"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Map_class_1 = require("./Map.class");
var EntityType;
(function (EntityType) {
    EntityType[EntityType["Hero"] = 1] = "Hero";
    EntityType[EntityType["Monster"] = 2] = "Monster";
    EntityType[EntityType["Lootable"] = 3] = "Lootable";
    EntityType[EntityType["Unknown"] = 4] = "Unknown";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Down"] = 3] = "Down";
    Direction[Direction["Left"] = 4] = "Left";
})(Direction = exports.Direction || (exports.Direction = {}));
class Entity {
    constructor(x, y, name, sprite) {
        this.coords = {
            posX: x,
            posY: y
        };
        this.name = name;
        this.sprite = sprite;
        this.type = EntityType.Unknown;
    }
    canDie() {
        return false;
    }
    canMove() {
        return false;
    }
    getSprite() {
        return this.sprite;
    }
    getX() {
        return this.coords.posX;
    }
    getY() {
        return this.coords.posY;
    }
    paintUI(pencil, x, y, width, height) {
        // Nothing, must be overriden in sub-classes
    }
}
exports.Entity = Entity;
class LiveEntity extends Entity {
    constructor(x, y, name, hp, movemax, movespeed, sprite) {
        super(x, y, name, sprite);
        this.hp = hp;
        this.moveSpeedMs = movespeed;
        this.lastMove = 0;
        this.moveCharges = movemax;
        this.moveChargesMax = movemax;
    }
    canDie() {
        return true;
    }
    gainMoveCharge() {
        if (this.moveCharges < this.moveChargesMax) {
            this.moveCharges++;
            console.log("gaining 1 move charge (current : " + this.moveCharges + "/" + this.moveChargesMax + ")");
        }
    }
    useMoveCharge() {
        if (this.moveCharges > 0) {
            this.moveCharges--;
            this.lastMove = Date.now();
            console.log("using 1 move charge");
        }
    }
    getMissingCharges() {
        return this.moveChargesMax - this.moveCharges;
    }
    paintUI(pencil, x, y, width, height) {
        pencil.fillStyle = "#996633";
        pencil.beginPath();
        pencil.moveTo(x, (y + height - 30));
        pencil.lineTo(x, (y + height));
        pencil.lineTo((x + 30), (y + height));
        pencil.fill();
        pencil.fillStyle = "white";
        pencil.font = "16px Do Hyeon";
        pencil.fillText("" + this.moveCharges, x + 4, y + height - 4);
    }
}
exports.LiveEntity = LiveEntity;
class HeroEntity extends LiveEntity {
    constructor(x, y, name, passive, hp, movemax, movespeed, sprite) {
        super(x, y, name, hp, movemax, movespeed, sprite);
        this.type = EntityType.Hero;
        this.passiveDescription = passive;
    }
    canMove() {
        return this.moveCharges > 0;
    }
    move(dir) {
        if (this.canMove()) {
            const oldCoords = JSON.parse(JSON.stringify(this.coords));
            switch (dir) {
                case Direction.Up:
                    if (this.coords.posY > 0)
                        this.coords.posY--;
                    break;
                case Direction.Right:
                    if (this.coords.posX < Map_class_1.Map.width - 1)
                        this.coords.posX++;
                    break;
                case Direction.Down:
                    if (this.coords.posY < Map_class_1.Map.height - 1)
                        this.coords.posY++;
                    break;
                case Direction.Left:
                    if (this.coords.posX > 0)
                        this.coords.posX--;
                    break;
            }
            if (this.coords.posY !== oldCoords.posY || this.coords.posX !== oldCoords.posX) {
                // Moved successfully
                this.useMoveCharge();
                let dateUsed = Date.now();
                console.log("used " + dateUsed);
                setTimeout(() => {
                    this.gainMoveCharge();
                    let dateGained = Date.now();
                    console.log("gained " + Date.now());
                    console.log("delay " + (dateGained - dateUsed));
                }, (this.moveSpeedMs * this.getMissingCharges()));
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    toString() {
        return `${this.name} (${this.hp}HP) : ${this.coords}`;
    }
}
exports.HeroEntity = HeroEntity;
