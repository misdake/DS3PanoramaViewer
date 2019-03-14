import { Point } from "../model/Point";

const TEXTURE_FILE_NAMES = ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"];

export class DrawablePanorama {

    private skybox: BABYLON.Mesh;
    private skyboxMaterial: BABYLON.StandardMaterial;
    private scene: BABYLON.Scene;

    public constructor(scene: BABYLON.Scene, camera: BABYLON.Camera) {
        this.scene = scene;
        this.skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        this.skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        this.skybox.material = this.skyboxMaterial;
        this.skybox.infiniteDistance = true;
        this.skyboxMaterial.disableLighting = true;
        this.skyboxMaterial.fogEnabled = false;
    }

    public load(point: Point) {
        this.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(`data/${point.mapId}/${point.id}/`, this.scene, TEXTURE_FILE_NAMES);
        this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    }

    public unload() {
        if (this.skyboxMaterial.reflectionTexture) {
            this.skyboxMaterial.reflectionTexture.dispose();
            this.skyboxMaterial.reflectionTexture = null;
        }
    }

    // TODO load progress report
    // TODO transition event

}