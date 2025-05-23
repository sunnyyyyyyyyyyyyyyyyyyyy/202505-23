let facemesh;
let video;
let predictions = [];
let points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
              76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];

function setup() {
  createCanvas(640, 480).parent('canvas-container');
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  stroke(255, 105, 180);
  strokeWeight(15);
  noFill();

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const index = points[i];
      if (keypoints[index]) {
        const [x, y] = keypoints[index];
        vertex(x, y);
      }
    }
    endShape(CLOSE);
  }
}
