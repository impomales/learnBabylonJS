import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

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
      if (_this.position.y < -10) {
        _this.game.reset();
      }
    });
  }
}
