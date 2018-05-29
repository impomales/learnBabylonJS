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
  }

  dispose() {
    this.blocks.forEach(block => block.dispose());
    this.keys.forEach(key => key.delete());
  }

  static _linkKeysToSpikes(level) {
    for (let k = 0; k < level.keys.length; k++) {
      const currentKey = level.keys[k];
      for (let s = 0; s < level.spikes.legnth; s++) {
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
      "https://images.unsplash.com/photo-1514544634146-c22702f74103?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f174a659a60eb8f1a9b926bf2ddfa3d&auto=format&fit=crop&w=2700&q=80",
      game.scene
    );
    groundMat.bumpTexture = new BABYLON.Texture(
      "https://images.unsplash.com/photo-1514544634146-c22702f74103?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f174a659a60eb8f1a9b926bf2ddfa3d&auto=format&fit=crop&w=2700&q=80",
      game.scene
    );
    groundMat.emissiveTexture = new BABYLON.Texture(
      "https://images.unsplash.com/photo-1514544634146-c22702f74103?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f174a659a60eb8f1a9b926bf2ddfa3d&auto=format&fit=crop&w=2700&q=80",
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
            apple.position = block.position.clone();
            apple.position.y = 1;
            level.finish = block;
          } else if (type !== Block.TYPES.NORMAL) {
            // either a spike or a key
            if (type > 0) {
              // spike
              const spike = new Spike(game, Math.abs(type));
              spike.position = new BABYLON.Vector3(x, 0.5, -z);
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
