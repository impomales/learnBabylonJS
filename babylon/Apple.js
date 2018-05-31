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

    // animation
    const animationBox = new BABYLON.Animation(
      "appleAnim",
      "position.y",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keys = [
      {
        frame: 0,
        value: 1
      },
      {
        frame: 30,
        value: 1.25
      },
      {
        frame: 60,
        value: 1
      }
    ];

    animationBox.setKeys(keys);

    this.animations.push(animationBox);
    game.scene.beginAnimation(this, 0, 60, true, 1.0);

    this.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
  }
}
