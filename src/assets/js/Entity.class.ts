interface Coords {
  posX: number;
  posY: number;
}

enum EntityType {
  Hero = 1,
  Monster = 2,
  Lootable = 3,
  Unknown = 4
}

enum Direction {
  Up = 1,
  Right = 2,
  Down = 3,
  Left = 4
}

export class Entity {
  protected coords: Coords;
  protected name: string;
  protected type: EntityType;

  constructor(x: number, y: number, name: string){
    this.coords = {
      posX: x,
      posY: y
    };
    this.name = name;
  }

  canDie(): boolean {
    return false;
  }

  canMove(): boolean {
    return false;
  }

}

export class LiveEntity extends Entity {
  protected hp: number;
  constructor(x: number, y: number, name: string, hp: number) {
    super(x, y, name);
    this.hp = hp;
  }

  canDie(): boolean {
    return true;
  }
}


export class HeroEntity extends LiveEntity {
  constructor(x: number, y: number, name: string, hp: number){
    super(x, y, name, hp);
    this.type = EntityType.Hero;
  }

  canMove(): boolean {
    return true;
  }

  move(dir: Direction): boolean {
    switch(dir){
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

  toString(): string {
    return `${this.name} (${this.hp}HP) : ${this.coords}`;
  }
}
