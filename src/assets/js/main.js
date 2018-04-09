"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_class_1 = require("./Entity.class");
const Luke_class_1 = require("./Luke.class");
const Map_class_1 = require("./Map.class");
const Vue = require("./lib/vue.min.js");
const lukeSprite = document.getElementById('lukeSprite');
let mainChar = new Luke_class_1.HeroLuke(2, 2, lukeSprite);
// Initializing Map
const canvas = document.getElementById('mainScene');
const map = new Map_class_1.Map(canvas, 10, 10, mainChar);
map.append(mainChar);
document.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
        // ARROW KEYS
        case 38:
            mainChar.move(Entity_class_1.Direction.Up);
            break;
        case 39:
            mainChar.move(Entity_class_1.Direction.Right);
            break;
        case 40:
            mainChar.move(Entity_class_1.Direction.Down);
            break;
        case 37:
            mainChar.move(Entity_class_1.Direction.Left);
            break;
        // ZQSD KEYS
        case 81:
            mainChar.move(Entity_class_1.Direction.Left);
            break;
        case 90:
            mainChar.move(Entity_class_1.Direction.Up);
            break;
        case 68:
            mainChar.move(Entity_class_1.Direction.Right);
            break;
        case 83:
            mainChar.move(Entity_class_1.Direction.Down);
            break;
    }
});
canvas.addEventListener('mousemove', function (e) {
    map.hover(e.x - canvas.offsetLeft, e.y - canvas.offsetTop);
});
canvas.addEventListener('mouseout', function (e) {
    map.unselect();
});
let gameLoop = () => {
    map.paint();
    requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);
// Linking model to view with Vue.js
const vm = new Vue({
    el: "#charSheet",
    data: mainChar
});
