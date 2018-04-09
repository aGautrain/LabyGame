import { HeroEntity } from './Entity.class';


// let mainChar: HeroEntity = new HeroEntity(0,0,"Luke Skywalker", "Luke is able to repair almost every device for half the cost needed", 75, 4, 2000,lukeSprite);
export class HeroLuke extends HeroEntity {
  constructor(x: number, y: number, sprite: HTMLImageElement){
    super(
      x,
      y,
      "Luke SkyWalker",
      "Luke is able to repair almost every device for half the cost needed",
      75,
      3,
      1000,
      sprite
    );
  }
}
