/*************** start of code adapted from coding train / ditto sketch ***************/
// coding train: https://thecodingtrain.com/challenges/36-blobby
// ditto sketch: https://openprocessing.org/sketch/744859 (Roni Kaufman)
function drawFace(t) {
  // left eye
  noFill();
  beginShape();
  let eyeX = width / 2 - 15 + 15 * noise(t);
  let eyeY = height / 2 - 55 + 15 * noise(t + 1);
  let eyeCtrlX = eyeX - 15;
  let eyeCtrlY = eyeY + 15;
  let eyeEndX = eyeX - 30;
  let eyeEndY = eyeY;
  vertex(eyeX, eyeY);
  quadraticVertex(eyeCtrlX, eyeCtrlY, eyeEndX, eyeEndY);
  endShape();

  // right eye
  beginShape();
  eyeX = width / 2 + 5 + 15 * noise(t + 2);
  eyeY = height / 2 - 55 + 15 * noise(t + 3);
  eyeCtrlX = eyeX + 15;
  eyeCtrlY = eyeY + 15;
  eyeEndX = eyeX + 30;
  eyeEndY = eyeY;
  vertex(eyeX, eyeY);
  quadraticVertex(eyeCtrlX, eyeCtrlY, eyeEndX, eyeEndY);
  endShape();

  // mouth
  noFill();
  beginShape();
  vertex(width/2 - 46 + 10*noise(t+4), height/2 - 50 + 10*noise(t+5) + 20);
  quadraticVertex(width/2 - 15 + 50*noise(t+6), 
                  height/2 - 40 + 50*noise(t+9) + 20,
                  width/2 + 40 + 10*noise(t+8), 
                  height/2 - 50 + 10*noise(t+9) + 20);
  endShape();
  noStroke();
}

function blob(size, xCenter, yCenter, k, t) {
  beginShape();
  for (let i = 0; i < n; i++) {
    let theta = i * step;
    let r1, r2;
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
    let r = size[i] + noise(k * r1, k * r2, t) * (2/3) * size[i];
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}
/*************** end of code adapted from coding train / ditto sketch ***************/