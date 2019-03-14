import * as BABYLON from 'babylonjs'
import { NetUtil } from './util/NetUtil';
import { DataPack } from './model/DataPack';
import { Zone } from './model/Zone';
import { Point } from './model/Point';
import { DrawablePanorama } from './drawable/DrawablePanorama';
import { DrawableFootprint } from './drawable/DrawableFootprint';

class App {
    private mCanvas: HTMLCanvasElement = null;
    private mEngine: BABYLON.Engine = null;

    private scene: BABYLON.Scene = null;
    private camera: BABYLON.UniversalCamera = null;
    private panorama: DrawablePanorama = null;
    private footprints: DrawableFootprint[] = [];
    private footprintSpriteManager: BABYLON.SpriteManager = null;

    private maps: Zone[] = [];

    constructor() {
        this.mCanvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.mEngine = new BABYLON.Engine(this.mCanvas, true);

        let scene: BABYLON.Scene = this.createScene();
        this.mEngine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => {
            this.mEngine.resize();
        });

        let self = this;
        scene.onPointerDown = function (evt) {
            var pickResult = scene.pickSprite(this.pointerX, this.pointerY);
            if (pickResult.hit) {
                self.onPickFootprint(pickResult.pickedSprite);
            }
        };

        this.loadData();
    }

    private createScene(): BABYLON.Scene {
        this.scene = new BABYLON.Scene(this.mEngine);
        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogDensity = 0.01;
        this.scene.fogStart = 5.0;
        this.scene.fogEnd = 200.0;
        this.scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);

        this.camera = new BABYLON.UniversalCamera("Camera", BABYLON.Vector3.Zero(), this.scene);
        this.camera.attachControl(this.mCanvas, true);
        this.camera.fov = Math.PI / 3;
        this.camera.maxZ = 1000;

        this.panorama = new DrawablePanorama(this.scene, this.camera);

        this.footprintSpriteManager = new BABYLON.SpriteManager("SpriteManager", "texture/footprint.png", 100, 512, this.scene);
        this.footprintSpriteManager.isPickable = true;

        return this.scene;
    }

    private loadData() {
        NetUtil.get("data/data.json", text => {
            const data = JSON.parse(text) as DataPack;
            this.maps = data.maps;

            const select = document.getElementById("mapSelect") as HTMLSelectElement;
            select.options.length = 0;
            for (let map of this.maps) {
                select.add(new Option(map.name, "" + map.id));
            }

            select.options[0].selected = true;
            select.onchange = ev => {
                for (let map of this.maps) {
                    if (("" + map.id) === select.options[select.selectedIndex].value) {
                        this.loadMap(map);
                        this.loadPoint(map.points[0]);
                        return;
                    }
                }
            };

            this.loadMap(this.maps[0]);
            this.loadPoint(this.maps[0].points[0]);
        });
    }

    private loadMap(map: Zone) {
        this.unloadFootprints();
        this.loadFootprints(map);
    }
    private loadPoint(point: Point) {
        this.panorama.unload();
        this.panorama.load(point);
        this.camera.position.x = point.x;
        this.camera.position.y = point.y;
        this.camera.position.z = point.z;

        this.footprintShowHide(point);
    }

    private footprintShowHide(point: Point) {
        for (let footprint of this.footprints) {
            if (footprint.point === point) {
                footprint.sprite.isVisible = false;
            } else {
                footprint.sprite.isVisible = true;
                footprint.update(point);
            }
        }
    }

    private onPickFootprint(sprite: BABYLON.Sprite) {
        for (let footprint of this.footprints) {
            if (footprint.sprite === sprite) {
                this.loadPoint(footprint.point);
                break;
            }
        }
    }

    private loadFootprints(map: Zone) {
        for (let point of map.points) {
            this.footprints.push(new DrawableFootprint(point, this.scene, this.footprintSpriteManager));
        }
    }
    private unloadFootprints() {
        for (let footprint of this.footprints) {
            footprint.unload();
        }
        this.footprints = [];
    }

}
new App();