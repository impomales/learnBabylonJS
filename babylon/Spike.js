import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Spikes extends GameObject {
  constructor(game, number) {
    super("spikes", game);

    this.number = number;
    // this.sharpPart = BABYLON.Mesh.CreateCylinder(
    //   "cylinder",
    //   0.5,
    //   0.5,
    //   0.5,
    //   6,
    //   1,
    //   this.getScene()
    // );

    game.assets.spikes.meshes.forEach(mesh => {
      const clone = mesh.clone();
      clone.isVisible = true;
      clone.parent = this;
    });
    game.shadows.getShadowMap().renderList.push(this.sharpPart);
  }

  updateMaterial(material) {
    this.sharpPart.material = material;
  }

  delete() {
    this.dispose();
  }
}
