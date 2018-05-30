import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Key extends GameObject {
  constructor(game, number) {
    super("key", game);
    this.number = number;
    this.spike = null;

    const key = BABYLON.Mesh.CreateTorus(
      "key",
      0.75,
      0.25,
      10,
      this.getScene()
    );
    key.parent = this;
    game.shadows.getShadowMap().renderList.push(key);
  }

  link(spike) {
    this.spike = spike;
  }

  static delete() {
    this.spike.delete();
    this.dispose();
  }
}
