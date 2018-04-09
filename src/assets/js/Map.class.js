"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Map {
    constructor(canvas, w, h) {
        Map.width = w;
        Map.height = h;
        Map.cellSelected = null;
        this.entities = new Array(0);
        this.canvas = canvas;
    }
    hover(x, y) {
        console.log("x : " + x + " y : " + y);
        const widthPxPerCell = (this.canvas.width / Map.width);
        const heightPxPerCell = (this.canvas.height / Map.height);
        Map.cellSelected = {
            posX: Math.floor(x / widthPxPerCell),
            posY: Math.floor(y / heightPxPerCell)
        };
        console.log(Map.cellSelected);
    }
    unselect() {
        Map.cellSelected = null;
    }
    paint() {
        const pencil = this.canvas.getContext("2d");
        const widthPxPerCell = (this.canvas.width / Map.width);
        const heightPxPerCell = (this.canvas.height / Map.height);
        for (let i = 0; i < Map.height; i++) {
            for (let j = 0; j < Map.width; j++) {
                ((j + i) % 2) === 0 ? pencil.fillStyle = "#e6f3ff" : pencil.fillStyle = "#cccccc";
                pencil.fillRect(j * widthPxPerCell, i * heightPxPerCell, widthPxPerCell, heightPxPerCell);
            }
        }
        for (let k = 0; k < this.entities.length; k++) {
            pencil.drawImage(this.entities[k].getSprite(), this.entities[k].getX() * widthPxPerCell, this.entities[k].getY() * heightPxPerCell, widthPxPerCell, heightPxPerCell);
            this.entities[k].paintUI(pencil, this.entities[k].getX() * widthPxPerCell, this.entities[k].getY() * heightPxPerCell, widthPxPerCell, heightPxPerCell);
        }
        if (Map.cellSelected !== null) {
            pencil.fillStyle = "black";
            pencil.strokeRect(Map.cellSelected.posX * widthPxPerCell, Map.cellSelected.posY * heightPxPerCell, widthPxPerCell, heightPxPerCell);
        }
    }
    append(e) {
        this.entities.push(e);
    }
}
exports.Map = Map;
