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
      "myFirstMaterial",
      this.getScene()
    );
    // color reflected from recieving light.
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // bright spot of light on shiny objects.
    material.specularColor = new BABYLON.Color3(1, 1, 1);
    material.specularPower = 100;
    // color reflected from surrounding scene's color.
    this.getScene().ambientColor = new BABYLON.Color3(0, 0.5, 0);
    material.ambientColor = new BABYLON.Color3(0, 0.5, 0);
    // color of object without any light source.
    material.emissiveColor = BABYLON.Color3.Purple();
    this.material = material;

    const _this = this;
    this.getScene().registerBeforeRender(() => {
      if (_this.position.y < -10) {
        _this.game.reset();
      }
    });
  }
}
