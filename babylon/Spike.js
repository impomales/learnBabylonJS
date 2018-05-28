import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Spikes extends GameObject {
  constructor(game, number) {
    super("spike", game);

    this.number = number;
    this.sharpPart = BABYLON.Mesh.CreateCylinder(
      "cylinder",
      0.5,
      0.5,
      0.5,
      6,
      1,
      this.getScene()
    );
    this.sharpPart.parent = this;
  }

  updateMaterial(material) {
    this.sharpPart.material = material;
  }

  delete() {
    this.dispose();
  }
}
