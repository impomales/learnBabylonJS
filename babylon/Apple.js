import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Apple extends GameObject {
  constructor(game) {
    super("apple", game);
    game.assets.apple.meshes.forEach(mesh => {
      const clone = mesh.clone();
      clone.isVisible = true;
      clone.parent = this;
      game.shadows.getShadowMap().renderList.push(clone);
    });

    this.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
  }
}
