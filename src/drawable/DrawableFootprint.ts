import { Point } from "../model/Point";

export class DrawableFootprint {

    public readonly point: Point;
    public sprite: BABYLON.Sprite;

    public constructor(point: Point, scene: BABYLON.Scene, spriteManager: BABYLON.SpriteManager) {
        this.sprite = new BABYLON.Sprite("footprint", spriteManager);
        this.sprite.size = 10;
        this.sprite.position.x = point.x;
        this.sprite.position.y = point.y;
        this.sprite.position.z = point.z;
        this.sprite.isPickable = true;

        this.point = point;
    }

    public update(cameraPoint: Point) {
        let dx = cameraPoint.x - this.point.x;
        let dy = cameraPoint.y - this.point.y;
        let dz = cameraPoint.z - this.point.z;
        let length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        this.sprite.size = Math.sqrt(length / 16);
    }

    public unload() {
        if (this.sprite) {
            this.sprite.dispose();
            this.sprite = null;
        }
    }

}