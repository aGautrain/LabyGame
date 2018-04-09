import { Map } from './Map.class';

export interface Coords {
  posX: number;
  posY: number;
}

export enum EntityType {
  Hero = 1,
  Monster = 2,
  Lootable = 3,
  Unknown = 4
}

export enum Direction {
  Up = 1,
  Right = 2,
  Down = 3,
  Left = 4
}

export class Entity {
  protected coords: Coords;
  protected name: string;
  protected type: EntityType;
  protected sprite: HTMLImageElement;

  constructor(x: number, y: number, name: string, sprite: HTMLImageElement){
    this.coords = {
      posX: x,
      posY: y
    };
    this.name = name;
    this.sprite = sprite;
    this.type = EntityType.Unknown;
  }

  canDie(): boolean {
    return false;
  }

  canMove(): boolean {
    return false;
  }

  getSprite(): HTMLImageElement {
    return this.sprite;
  }

  getX(): number {
    return this.coords.posX;
  }

  getY(): number {
    return this.coords.posY;
  }

  paintUI(pencil: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
    // Nothing, must be overriden in sub-classes
  }
}

export class LiveEntity extends Entity {

  protected hp: number;
  protected moveSpeedMs: number;
  protected lastMove: number;
  protected moveCharges: number;
  protected moveChargesMax: number;
  protected viewDistance: number;

  constructor(x: number, y: number, name: string, hp: number, movemax: number, movespeed: number, view: number, sprite: HTMLImageElement) {
    super(x, y, name, sprite);
    this.hp = hp;
    this.moveSpeedMs = movespeed;
    this.lastMove = 0;
    this.moveCharges = movemax;
    this.moveChargesMax = movemax;
    this.viewDistance = view;
  }

  canDie(): boolean {
    return true;
  }

  gainMoveCharge(): void {
    if(this.moveCharges < this.moveChargesMax) {
      this.moveCharges++;
      console.log("gaining 1 move charge (current : " + this.moveCharges + "/" + this.moveChargesMax + ")");
    }
  }

  useMoveCharge(): void {
    if(this.moveCharges > 0){
      this.moveCharges--;
      this.lastMove = Date.now();
      console.log("using 1 move charge");
    }
  }

  getMissingCharges(): number {
    return this.moveChargesMax - this.moveCharges;
  }

  getViewDistance(): number {
    return this.viewDistance;
  }

  paintUI(pencil: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
    pencil.fillStyle = "#996633";
    pencil.beginPath();
    pencil.moveTo(x, (y+height-30));
    pencil.lineTo(x, (y+height));
    pencil.lineTo((x+30), (y+height));
    pencil.fill();

    pencil.fillStyle = "white";
    pencil.font = "16px Do Hyeon";
    pencil.fillText("" + this.moveCharges, x + 4, y + height - 4);
  }
}


export class HeroEntity extends LiveEntity {

  passiveDescription: string;

  constructor(x: number, y: number, name: string, passive: string, hp: number, movemax: number, movespeed: number, view: number, sprite: HTMLImageElement){
    super(x, y, name, hp, movemax, movespeed, view, sprite);
    this.type = EntityType.Hero;
    this.passiveDescription = passive;
  }

  canMove(): boolean {
    return this.moveCharges > 0;
  }

  move(dir: Direction): boolean {
    if(this.canMove()){
      const oldCoords : Coords = JSON.parse(JSON.stringify(this.coords));

      switch(dir){
        case Direction.Up:
          if(this.coords.posY > 0) this.coords.posY--;
          break;
        case Direction.Right:
          if(this.coords.posX < Map.width-1) this.coords.posX++;
          break;
        case Direction.Down:
          if(this.coords.posY < Map.height-1) this.coords.posY++;
          break;
        case Direction.Left:
          if(this.coords.posX > 0) this.coords.posX--;
          break;
      }

      if(this.coords.posY !== oldCoords.posY || this.coords.posX !== oldCoords.posX){
        // Moved successfully

        this.useMoveCharge();
        let dateUsed: number = Date.now();
        console.log("used " + dateUsed);
        setTimeout(() => {
          this.gainMoveCharge();
          let dateGained: number = Date.now();
          console.log("gained " + Date.now());
          console.log("delay " + (dateGained - dateUsed));
        }, (this.moveSpeedMs * this.getMissingCharges()));



        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  toString(): string {
    return `${this.name} (${this.hp}HP) : ${this.coords}`;
  }
}
