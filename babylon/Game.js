import * as BABYLON from "babylonjs";
import Player from "./Player";
import Level from "./Level";

const levels = [
  [
    [0, 0, "S", 0, -1, "-"],
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
    this.assets = {};
    this.currentLevel = 0;
    this.player = null;
    this.level = null;

    // load assets
    const loader = this._loadAssets();
    const _this = this;
    // game initialization.

    // game loop.
    loader.onFinish = () => {
      _this._initGame();
      _this.engine.runRenderLoop(() => {
        _this.scene.render();
      });
    };

    // collison testing.
    this.scene.registerBeforeRender(() => {
      this.checkCollisions();
    });
  }
  // creates scene, camera, and light.
  _initScene(engine) {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      1,
      1,
      10,
      new BABYLON.Vector3(2.5, 0, -3),
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

    // skybox -- looks ugly so it's commented out
    // const skybox = BABYLON.Mesh.CreateBox("skybox", 100.0, scene);
    // const skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    //   "/skybox/water",
    //   scene
    // );

    // skybox.material = skyboxMaterial;

    // physics
    scene
      .enablePhysics
      // new BABYLON.Vector3(0, -9.8, 0),
      // new BABYLON.OimoJSPlugin()
      ();
    return scene;
  }

  reset() {
    this.player.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());
    this.player.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
    this.player.rotationQuaternion.copyFromFloats(0, 0, 0, 1);
    this.player.position = this.level.start.position.clone();
    this.player.position.y = 2;
  }

  gameWon() {
    // show text or whatever.
    document.getElementById("win").style.opacity = 1;
  }

  checkCollisions() {
    // if player spiked.
    if (this.level.canKill(this.player)) {
      this.reset();
    }
    // if level finished.
    if (this.level.hasApple(this.player)) {
      this.gameWon();
    }
    // if collide with key, remove spike.
    this.level.hasKey(this.player);
  }

  _initGame() {
    this.player = new Player(this);
    this.level = Level.FromInts(levels[this.currentLevel], this);
    this.player.position = this.level.start.position.clone();
    this.player.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    this.player.position.y = 2;
  }

  _loadAssets() {
    const loader = new BABYLON.AssetsManager(this.scene);
    loader.loadingUIBackgroundColor = "#2c2b29";
    const animsKey = {};
    animsKey.idle = { from: 0, to: 80, speed: 1, loop: true };

    const toLoad = [
      {
        name: "spikes",
        folder: "/",
        filename: "spikes.babylon"
      },
      {
        name: "key",
        folder: "/",
        filename: "key-pickup.babylon",
        anims: animsKey
      },
      {
        name: "apple",
        folder: "/",
        filename: "fruit.babylon",
        anims: animsKey
      }
    ];
    const _this = this;
    toLoad.forEach(tl => {
      const task = loader.addMeshTask(tl.name, "", tl.folder, tl.filename);
      task.onSuccess = t => {
        t.loadedMeshes.forEach(mesh => {
          mesh.isVisible = false;
        });
        _this.assets[t.name] = { meshes: t.loadedMeshes, anims: tl.anims };
      };
    });

    loader.load();

    return loader;
  }
}
