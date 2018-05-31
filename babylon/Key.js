import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Key extends GameObject {
  constructor(game, number) {
    super("key", game);
    this.number = number;
    this.spike = null;

    game.assets.key.meshes.forEach(mesh => {
      const clone = mesh.clone();
      clone.isVisible = true;
      game.shadows.getShadowMap().renderList.push(clone);
      clone.parent = this;
    });
    this.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
  }

  link(spike) {
    this.spike = spike;
  }

  static delete() {
    this.spike.delete();
    this.dispose();
  }
}
