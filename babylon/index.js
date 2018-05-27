import * as BABYLON from "babylonjs";

window.addEventListener("DOMContentLoaded", () => {
  // engine set up
  const canvas = document.getElementById("gameCanvas");
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  // camera set up
  const camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(5, 5, -5),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());

  // ambient light
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  const cube = BABYLON.Mesh.CreateBox("myBox", 1, scene);

  // render loop.
  engine.runRenderLoop(() => {
    scene.render();
  });
});
