import * as BABYLON from "babylonjs";
import Player from "./Player";
export default class Game {
  // creates engine and inits all members to default values.
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId);
    this.engine = new BABYLON.Engine(canvas, true);

    this.scene = this._initScene(this.engine);
    this.assets = [];
    this.currentLevel = 1;
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
    return scene;
  }

  _initGame() {
    this.player = new Player(this);
    // this.level = Level.FromInts(levels[this.currentLevel], this);
    // this.player.position = this.level.start.position.clone();
    // this.player.position.y = 2;
    this.scene.debugLayer.show();
  }
}
