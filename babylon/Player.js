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

    const _this = this;
    this.getScene().registerBeforeRender(() => {
      if (_this.position.y < -10) {
        _this.game.reset();
      }
    });
  }
}
