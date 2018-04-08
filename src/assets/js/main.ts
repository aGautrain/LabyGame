import { Entity, LiveEntity, HeroEntity } from './Entity.class';

let antoine: HeroEntity = new HeroEntity(0,0,"Darkoeur",75);
console.log(antoine.toString());
console.log("can die : " + antoine.canDie());

let entity: Entity = new Entity(3,3, "tree");
console.log("tree can die : " + entity.canDie());

console.log(antoine);
