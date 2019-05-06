import * as BABYLON from 'babylonjs'
import { NetUtil } from './util/NetUtil';
import { DataPack } from './model/DataPack';
import { Zone } from './model/Zone';
import { Point } from './model/Point';
import { DrawablePanorama } from './drawable/DrawablePanorama';
import { DrawableFootprint } from './drawable/DrawableFootprint';

class App {
    private canvas: HTMLCanvasElement;
    private checkDeviceOrientation: HTMLInputElement;

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private cameraTouch: BABYLON.FreeCamera;
    private cameraOrientation: BABYLON.DeviceOrientationCamera;
    private panorama: DrawablePanorama;
    private footprints: DrawableFootprint[] = [];
    private footprintSpriteManager: BABYLON.SpriteManager;

    private maps: Zone[] = [];

    constructor() {
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.checkDeviceOrientation = document.getElementById('deviceOrientation') as HTMLInputElement;

        this.engine = new BABYLON.Engine(this.canvas, true, new BABYLON.NullEngineOptions, true);

        let scene: BABYLON.Scene = this.createScene();
        this.engine.runRenderLoop(() => {
            if (this.checkDeviceOrientation && this.checkDeviceOrientation.checked) {
                this.scene.activeCameras = [this.cameraOrientation];
            } else {
                this.scene.activeCameras = [this.cameraTouch];
            }
            this.cameraOrientation.setEnabled(this.checkDeviceOrientation.checked);
            this.cameraTouch.setEnabled(!this.checkDeviceOrientation.checked);
            scene.render();
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        scene.onPointerDown = evt => {
            var pickResult = scene.pickSprite(scene.pointerX, scene.pointerY);
            if (pickResult.hit) {
                this.onPickFootprint(pickResult.pickedSprite);
            }
        };

        this.loadData();
    }

    private createScene(): BABYLON.Scene {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogDensity = 0.01;
        this.scene.fogStart = 5.0;
        this.scene.fogEnd = 200.0;
        this.scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);

        this.cameraTouch = new BABYLON.FreeCamera("Camera", BABYLON.Vector3.Zero(), this.scene);
        this.cameraTouch.fov = Math.PI / 3;
        this.cameraTouch.attachControl(this.canvas, true);

        this.cameraOrientation = new BABYLON.DeviceOrientationCamera("Camera", BABYLON.Vector3.Zero(), this.scene);
        this.cameraOrientation.fov = Math.PI / 3;
        this.cameraOrientation.attachControl(this.canvas, true);

        this.cameraTouch.angularSensibility = -this.cameraTouch.angularSensibility;
        this.cameraOrientation.angularSensibility = -this.cameraOrientation.angularSensibility;

        this.scene.activeCameras = [this.cameraTouch];

        this.panorama = new DrawablePanorama(this.scene, this.cameraTouch);

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

        this.cameraTouch.position.x = point.x;
        this.cameraTouch.position.y = point.y;
        this.cameraTouch.position.z = point.z;
        this.cameraOrientation.position.x = point.x;
        this.cameraOrientation.position.y = point.y;
        this.cameraOrientation.position.z = point.z;

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
