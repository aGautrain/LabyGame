import { Entity, Coords, HeroEntity } from './Entity.class';

export class Map {
  entities: Array<Entity>;
  static width: number;
  static height: number;

  static cellSelected: Coords;

  static owner: HeroEntity;

  canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement, w: number, h: number, own: HeroEntity){
    Map.width = w;
    Map.height = h;
    Map.cellSelected = null;
    Map.owner = own;
    this.entities = new Array<Entity>(0);
    this.canvas = canvas;
  }

  hover(x: number, y: number): void {
    console.log("x : " + x + " y : " + y);
    const widthPxPerCell: number = (this.canvas.width / Map.width);
    const heightPxPerCell: number = (this.canvas.height / Map.height);

    Map.cellSelected = {
      posX: Math.floor(x / widthPxPerCell),
      posY: Math.floor(y / heightPxPerCell)
    };
    console.log(Map.cellSelected);
  }

  unselect(): void {
    Map.cellSelected = null;
  }

  paint(): void {
    const pencil: CanvasRenderingContext2D = this.canvas.getContext("2d");
    const widthPxPerCell: number = (this.canvas.width / Map.width);
    const heightPxPerCell: number = (this.canvas.height / Map.height);

    for(let i: number = 0; i < Map.height; i++){
      for(let j: number = 0; j < Map.width; j++){
        ((j+i) % 2) === 0 ? pencil.fillStyle = "#e6f3ff" : pencil.fillStyle = "#cccccc";

        pencil.fillRect(j*widthPxPerCell, i*heightPxPerCell, widthPxPerCell, heightPxPerCell);

        if(Math.sqrt((Map.owner.getX() - j)*(Map.owner.getX() - j) + (Map.owner.getY() - i)*(Map.owner.getY() - i)) > Map.owner.getViewDistance()) {
          pencil.fillStyle = "rgba(100,100,100, 0.8)";
          pencil.fillRect(j*widthPxPerCell, i*heightPxPerCell, widthPxPerCell, heightPxPerCell);
        }
      }
    }

    for(let k: number = 0; k < this.entities.length; k++){
      // check entity euclidean distance relative to the map owner
      pencil.drawImage(this.entities[k].getSprite(), this.entities[k].getX()*widthPxPerCell, this.entities[k].getY()*heightPxPerCell, widthPxPerCell, heightPxPerCell);
      this.entities[k].paintUI(pencil, this.entities[k].getX()*widthPxPerCell, this.entities[k].getY()*heightPxPerCell, widthPxPerCell, heightPxPerCell);
    }
    if(Map.cellSelected !== null){
      pencil.fillStyle = "black";
      pencil.strokeRect(Map.cellSelected.posX*widthPxPerCell, Map.cellSelected.posY*heightPxPerCell, widthPxPerCell, heightPxPerCell);
    }
  }

  append(e: Entity): void {
    this.entities.push(e);
  }
}
