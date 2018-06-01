import * as BABYLON from "babylonjs";
import Block from "./Block";
import Apple from "./Apple";
import Spike from "./Spike";
import Key from "./Key";
/*
  S       - starting position
  F       - final position
  0       - empty block
  -       - no block at all
  Number  - spike
  -Number - correspoding key
*/
export default class Level {
  constructor(game) {
    this.scene = game.scene;
    this.game = game;

    // starting position.
    this.start = null;
    // keys of current level.
    this.keys = [];
    // spikes of current level.
    this.spikes = [];
    // level blocks.
    this.blocks = [];

    this.apple = null;
  }

  dispose() {
    this.blocks.forEach(block => block.dispose());
    this.keys.forEach(key => key.dispose());
    this.apple.dispose();
  }

  canKill(player) {
    let res = false;
    this.spikes.forEach(spike => {
      if (spike.intersectsMesh(player)) res = true;
    });
    return res;
  }

  hasKey(player) {
    this.keys.forEach(key => {
      if (key.intersectsMesh(player)) {
        this.spikes = this.spikes.filter(
          spike => spike.number !== key.spike.number
        );
        key.delete();
      }
    });
  }

  hasApple(player) {
    return this.apple.intersectsMesh(player);
  }

  static _linkKeysToSpikes(level) {
    for (let k = 0; k < level.keys.length; k++) {
      const currentKey = level.keys[k];
      for (let s = 0; s < level.spikes.length; s++) {
        const currentSpike = level.spikes[s];

        if (currentSpike.number === currentKey.number)
          currentKey.link(currentSpike);
      }
    }
  }

  static FromInts(matrix, game) {
    const level = new Level(game);
    const groundMat = new BABYLON.StandardMaterial("ground", game.scene);

    groundMat.diffuseTexture = new BABYLON.Texture(
      "/WoodPlanks.jpg",
      game.scene
    );

    for (let z = 0; z < matrix.length; z++) {
      for (let x = 0; x < matrix[z].length; x++) {
        const type = matrix[z][x];
        let block = null;

        if (type !== Block.TYPES.NOTHING) {
          block = new Block(x, z, game);
          block.material = groundMat;
          level.blocks.push(block);
          if (type === Block.TYPES.START) {
            level.start = block;
          } else if (type === Block.TYPES.FINISH) {
            const apple = new Apple(game);
            level.apple = apple;
            apple.position = block.position.clone();
            apple.position.y = 0.25;
            level.finish = block;
          } else if (type !== Block.TYPES.NORMAL) {
            // either a spike or a key
            if (type > 0) {
              // spike
              const spike = new Spike(game, Math.abs(type));
              spike.position = new BABYLON.Vector3(x, 0.51, -z);
              level.spikes.push(spike);
            } else {
              // key
              const key = new Key(game, Math.abs(type));
              key.position = new BABYLON.Vector3(x, 0.75, -z);
              level.keys.push(key);
            }
          }
        }
      }
    }

    Level._linkKeysToSpikes(level);

    return level;
  }
}
