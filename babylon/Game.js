import * as BABYLON from "babylonjs";
import Player from "./Player";
import Level from "./Level";

const levels = [
  [
    ["S", 0, 0, 0, -1, "-"],
    [1, "-", "-", "-", "-", "-"],
    [0, "-", 0, 0, -2, "-"],
    [0, 0, 0, "-", "-", "-"],
    ["-", "-", 2, 0, 0, "F"]
  ]
];

export default class Game {
  // creates engine and inits all members to default values.
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId);
    this.engine = new BABYLON.Engine(canvas, true);

    this.scene = this._initScene(this.engine);
    // this.scene.debugLayer.show();
    this.assets = [];
    this.currentLevel = 0;
    this.player = null;
    this.level = null;

    // game initialization.
    this._initGame();

    // game loop.
    const _this = this;
    this.engine.runRenderLoop(() => {
      _this.scene.render();
    });
  }
  // creates scene, camera, and light.
  _initScene(engine) {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(2.5, 6, -6.5),
      scene
    );
    camera.rotation = new BABYLON.Vector3(Math.PI / 3.5, 0, 0);
    camera.attachControl(engine.getRenderingCanvas());
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;

    // directional light and shadows
    const dl = new BABYLON.DirectionalLight(
      "dir",
      new BABYLON.Vector3(1, -1, -0.5),
      scene
    );
    dl.position = new BABYLON.Vector3(0, 40, 0);
    this.shadows = new BABYLON.ShadowGenerator(1024, dl);
    this.shadows.useBlurExponentialShadowMap = true;
    this.shadows.setTransparencyShadow(true);

    // skybox
    const skybox = BABYLON.Mesh.CreateBox("skybox", 100.0, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "/skybox/water",
      scene
    );

    skybox.material = skyboxMaterial;
    return scene;
  }

  _initGame() {
    this.player = new Player(this);
    this.level = Level.FromInts(levels[this.currentLevel], this);
    this.player.position = this.level.start.position.clone();
    this.player.position.y = 2;
  }
}
