import * as BABYLON from "babylonjs";

window.addEventListener("DOMContentLoaded", () => {
  // engine set up
  const canvas = document.getElementById("gameCanvas");
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  // debug inspector
  scene.debugLayer.show();
  scene.onPointerDown = (event, pickInfo) => {
    console.log(pickInfo);
  };

  // camera set up
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    45,
    45,
    10,
    new BABYLON.Vector3(0, 5, -15),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas);

  // ambient light
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, -1),
    scene
  );
  light.diffuse = BABYLON.Color3.Red();
  light.specular = BABYLON.Color3.Black();
  light.groundColor = BABYLON.Color3.Blue();

  const cubes = [];

  for (let i = -2; i <= 2; i++) {
    const cube = BABYLON.Mesh.CreateBox(`myBox${i + 2}`, 1, scene);
    cube.position = new BABYLON.Vector3(i * 2, 0, 0);
    cubes.push(cube);
  }

  // render loop.
  engine.runRenderLoop(() => {
    scene.render();
  });
});
