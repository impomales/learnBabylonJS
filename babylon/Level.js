import * as BABYLON from "babylonjs";
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

  static FromInts(matrix, game) {
    const level = new Level(game);
  }
}
