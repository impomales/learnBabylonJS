import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

const W = 87,
  A = 65,
  S = 83,
  D = 68;

export default class Player extends GameObject {
  constructor(game) {
    super("player", game);
    // physics body.
    this.body = null;
    // can move in two directions.
    this.directions = [0, 0];
    // can rotate in two directions.
    this.rotations = [0, 0];

    const vertexData = BABYLON.VertexData.CreateSphere(
      15,
      0.75,
      BABYLON.Mesh.DEFAULTSIDE
    );
    vertexData.applyToMesh(this);
    const dot = BABYLON.Mesh.CreateSphere("face", 32, 0.25);
    dot.parent = this;
    dot.position.z += 0.5;

    const material = new BABYLON.StandardMaterial(
      "playerMaterial",
      this.getScene()
    );
    material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    material.alpha = 0.1;
    const color = new BABYLON.Color3(1, 0, 0);

    material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    material.emissiveFresnelParameters.bias = 0.6;
    material.emissiveFresnelParameters.power = 2;
    material.emissiveFresnelParameters.leftColor = BABYLON.Color3.Black();
    material.emissiveFresnelParameters.rightColor = color;
    material.opacityFresnelParameters = new BABYLON.FresnelParameters();
    material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
    material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

    this.material = material;

    game.shadows.getShadowMap().renderList.push(this);

    const _this = this;
    this.getScene().registerBeforeRender(() => {
      if (this.position.y < -10) {
        _this.game.reset();
      }

      _this.move();
    });

    window.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case W:
          _this.directions[1] = 1;
          break;
        case A:
          _this.rotations[0] = 1;
          break;
        case S:
          _this.directions[0] = 1;
          break;
        case D:
          _this.rotations[1] = 1;
          break;
        default:
      }
    });

    window.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case A:
        case D:
          _this.rotations = [0, 0];
          break;
        case W:
        case S:
          _this.directions = [0, 0];
          break;
        default:
      }
    });
  }

  move() {
    if (this.directions[0]) this._moveTo(-1);
    if (this.directions[1]) this._moveTo(1);
    if (this.rotations[0]) this.rotation.y -= Math.PI / 32;
    if (this.rotations[1]) this.rotation.y += Math.PI / 32;
  }

  // move locally instead of globally.
  _moveTo(step) {
    this.computeWorldMatrix();
    const vector = new BABYLON.Vector3(0, 0, step);
    const matrix = this.getWorldMatrix();
    const vector2 = BABYLON.Vector3.TransformCoordinates(vector, matrix);
    vector2.subtractInPlace(this.position);
    vector2.normalize().scaleInPlace(0.05);
    this.position.addInPlace(vector2);
  }

}
