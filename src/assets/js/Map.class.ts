import { Entity } from './Entity.class';

export class Map {
  entities: Array<Entity>;
  width: number;
  height: number;
  constructor(w: number, h: number){
    this.width = w;
    this.height = h;
    this.entities = new Array<Entity>(0);
  }
}
