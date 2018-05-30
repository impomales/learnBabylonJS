import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Apple extends GameObject {
  constructor(game) {
    super("apple", game);
    const apple = BABYLON.Mesh.CreateTorusKnot(
      "knot",
      0.25,
      0.05,
      64,
      64,
      2,
      3,
      this.getScene()
    );
    apple.parent = this;
    game.shadows.getShadowMap().renderList.push(apple);
  }
}
