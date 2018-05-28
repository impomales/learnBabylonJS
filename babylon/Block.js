import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Block extends GameObject {
  constructor(x, z, game) {
    super("block", game);
    const vertexData = BABYLON.VertexData.CreateBox(
      1,
      BABYLON.Mesh.DEFAULTSIDE
    );
    vertexData.applyToMesh(this);

    this.position.x = x;
    this.position.z = -z;
  }
}

Block.TYPES = {
  NOTHING: "-",
  NORMAL: 0,
  START: "S",
  FINISH: "F"
};
