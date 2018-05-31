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

    const animationBox = new BABYLON.Animation(
      "keyAnim",
      "rotation.y",
      10,
      BABYLON.Animation._ANIMATIONTYPE_FLOAT,
      BABYLON.Animation._ANIMATIONLOOPMODE_RELATIVE
    );

    const keys = [
      {
        frame: 0,
        value: 0
      },
      {
        frame: 15,
        value: Math.PI / 2
      },
      {
        frame: 30,
        value: Math.PI
      },
      {
        frame: 45,
        value: 3 * Math.PI / 2
      },
      {
        frame: 60,
        value: 2 * Math.PI
      }
    ];

    animationBox.setKeys(keys);
    this.animations.push(animationBox);
    game.scene.beginAnimation(this, 0, 60, true, 1.0);

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
