"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_class_1 = require("./Entity.class");
let antoine = new Entity_class_1.HeroEntity(0, 0, "Darkoeur", 75);
console.log(antoine.toString());
console.log("can die : " + antoine.canDie());
let entity = new Entity_class_1.Entity(3, 3, "tree");
console.log("tree can die : " + entity.canDie());
console.log(antoine);
