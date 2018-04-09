import { Entity, LiveEntity, HeroEntity, Direction } from './Entity.class';
import { HeroLuke } from './Luke.class';
import { Map } from './Map.class';

import * as Vue from './lib/vue.min.js';


const lukeSprite = <HTMLImageElement>document.getElementById('lukeSprite');

let mainChar: HeroEntity = new HeroLuke(2, 2, lukeSprite);

// Initializing Map
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('mainScene');
const map: Map = new Map(canvas, 10, 10);
map.append(mainChar);

document.addEventListener('keyup', function(e) {

  switch(e.keyCode){
    // ARROW KEYS
    case 38:
      mainChar.move(Direction.Up);
      break;
    case 39:
      mainChar.move(Direction.Right);
      break;
    case 40:
      mainChar.move(Direction.Down);
      break;
    case 37:
      mainChar.move(Direction.Left);
      break;
    // ZQSD KEYS
    case 81:
      mainChar.move(Direction.Left);
      break;
    case 90:
      mainChar.move(Direction.Up);
      break;
    case 68:
      mainChar.move(Direction.Right);
      break;
    case 83:
      mainChar.move(Direction.Down);
      break;
  }

});

canvas.addEventListener('mousemove', function(e) {
  map.hover(e.x - canvas.offsetLeft, e.y - canvas.offsetTop);
});

canvas.addEventListener('mouseout', function(e) {
  map.unselect();
})


let gameLoop = () => {
  map.paint();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// Linking model to view with Vue.js
const vm = new Vue({
  el: "#charSheet",
  data: mainChar
})
