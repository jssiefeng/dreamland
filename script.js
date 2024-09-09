// blob variables
let t = 0;
let step = 0.01;
let n;
let size = 100;
let myColor;
let radiusDist = [];

// assets
let printOn, printOff, print;
let cloud;
let font;
let audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8;
let audioFiles = [];

// logic calculations
let xPosition1;
let xPosition2;
let speed;
let opac = 255;
let modalVisible = true;
let printVisible = true;
let currentAudioIndex = 0;
let txt = " ";
let statusTxt = " ";

function preload() {
  // preload audio
  audio1 = loadSound('on.mp3');
  audio2 = loadSound('feather.mp3');
  audio3 = loadSound('sinking.mp3');
  audio4 = loadSound('thefluffy.mp3');
  audio5 = loadSound('return.mp3');
  audio6 = loadSound('picture.mp3');
  audio7 = loadSound('whenever.mp3');
  audio8 = loadSound('remember.mp3');
  audioFiles.push(audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8);

  // preload text
  font = loadFont('bold.ttf'); // DM Sans Medium

  // preload graphic assets
  printOn = loadImage('print-on.svg');
  printOff = loadImage('print-off.svg');
  print = printOn;
  modal = loadImage('modal.svg');
  day = loadImage('clouds-day.svg');
  night = loadImage('clouds-night.svg');
  cloud = day;
  music = loadSound('In_Dreamland_by_Chillpeach.mp3');
  print = loadImage('fingerprint.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 90);
  n = floor((2 * PI) / step);
  radiusDist.length = n;
  radiusDist.fill(size);
  originalRadius = [...radiusDist]; // logic from GPT
  radiusModified = false;
  textFont(font);
  xPosition1 = width;
  xPosition2 = width + cloud.width;
  speed = 2;
  music.setVolume(0.1);
  music.rate(0.9);
}

function draw() {
  // reset blend mode changes from previous loop
  blendMode(BLEND);

  // change background color depending on which clouds are shown
  if (cloud === day) {
    background(90, 190, 235);
  } else {
    background(0, 90, 170);
  }

  // display two sets of clouds
  image(cloud, xPosition1, height / 2 - 400);
  image(cloud, xPosition2, height / 2 - 400);

  /*************** start of code adapted from ChatGPT ***************/
  // move clouds to the left
  xPosition1 -= speed;
  xPosition2 -= speed;
  // reset position of first set, to the right of second set
  if (xPosition1 < -cloud.width) {
    xPosition1 = xPosition2 + cloud.width;
  }
  // reset position of second set, to the right of first set
  if (xPosition2 < -cloud.width) {
    xPosition2 = xPosition1 + cloud.width;
  }
  /*************** end of code adapted from ChatGPT ***************/

  /*************** start of code adapted from ChatGPT ***************/
  // since radius is multiple values, loop through all the array values of radius and decrease them
  if (radiusModified) {
    for (let i = 0; i < radiusDist.length; i++) {
      if (radiusDist[i] / 1.002 >= originalRadius[i]) {
        radiusDist[i] /= 1.002;
      }
    }
    opac = 255; // Set opac to 100 when shrinking the blob
  } else {
    // Increase radiusDist values
    for (let i = 0; i < radiusDist.length; i++) {
      if (radiusDist[i] * 1.002 <= originalRadius[i] * 1.3) {
        radiusDist[i] *= 1.002; // Increase each radius value by the same amount if within limit
      }
    }
    opac = Math.max(opac - 0.5, 120); // Decrease opac by 0.5 each frame, with a minimum of 90
  }
  /*************** end of code adapted from ChatGPT ***************/


  // change blending mode of blob depending on day/night
  if (cloud === day) {
    blendMode(ADD);
  } else {
    blendMode(DIFFERENCE);
  }



  noStroke();
  fill(215, 250, 0); // green color for DIFFERENCE mode (night)
  /*************** start of code adapted from coding train / ditto sketch ***************/
  // coding train: https://thecodingtrain.com/challenges/36-blobby
  // ditto sketch: https://openprocessing.org/sketch/744859 (Roni Kaufman)
  blob(radiusDist, width / 2, height / 2, 0.7, t); // blob function

  // change blending mode of face depend on day/night
  if (cloud === day) {
    blendMode(BLEND);
  } else {
    blendMode(DIFFERENCE);
  }

  size = 100 + 50 * sin(t);
  t += 0.005;
  fill(100);
  strokeWeight(2);
  stroke(100);
  drawFace(t);
  /*************** end of code adapted from coding train / ditto sketch ***************/

  // display the current line of the meditation script
  blendMode(BLEND);
  textSize(30);
  textAlign(CENTER, CENTER);
  fill(255);
  strokeWeight(10);
  text(txt, width / 2, height - 100);

  // display the status of current actions at the top
  textSize(20);
  textAlign(CENTER, TOP);
  text(statusTxt, width / 2, 50);

  // if FINGERPRINT piece hasn't been activated, show the button
  if (printVisible) {
    image(print, width / 2 - 250, height - 200);
  }

  // if CLOUD piece hasn't been activated, show a modal
  if (modalVisible) {
    fill(90, 190, 235);
    rect(0, 0, width, height);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Put the cloud piece in to start.", width / 2, height - 100);
    textSize(16);
    text("(Music: In Dreamland by Chillpeach)", width / 2, height - 70);
    image(modal, width / 2 - 330, height / 2 - 150);
  }
}


function keyPressed() {
  if (key === ' ') {
    // CLOUD piece - starts the experience and hides modal
    modalVisible = false;
    if (music.isPlaying()) {
      return;
    }
    music.play();
    music.loop();
    music.setVolume(0);

  } else if (keyCode === LEFT_ARROW) {
    // DIAL piece - changes the radius of the blob
    radiusModified = !radiusModified; // logic adapted from GPT
    if (!radiusModified) { // logic adapted from GPT
      opac = 255; // retired opacity change feature
    }
  } else if (keyCode === UP_ARROW) {
    // SLIDER piece - changes from day to night
    if (cloud === day) {
      cloud = night;
      background(0, 90, 170);
    } else {
      cloud = day;
      background(90, 190, 235);
    }

  } else if (keyCode === RIGHT_ARROW) {
    // VOLUME piece - ambient music toggle
    if (music.getVolume() === 0) {
      music.setVolume(0.1);
      statusTxt = "MUSIC ON";
    } else {
      music.setVolume(0);
      statusTxt = "MUSIC OFF";
    }

  } else if (keyCode === DOWN_ARROW) {
    // FINGERPRINT piece - show next line of meditation script
    printVisible = false;
    if (keyCode === DOWN_ARROW) {
      /*************** start of code adapted from ChatGPT ***************/
      if (audioFiles.some(audio => audio.isPlaying())) {
        return;
      }
      // iterate through the audio files array
      // also run update text function based on the array position
      audioFiles[currentAudioIndex].play();
      updateText(currentAudioIndex);
      // move to the next audio file
      currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
      /*************** end of code adapted from ChatGPT ***************/
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// meditation script lines
function updateText(index) {
  switch (index) {
    case 0:
      txt = "You are on a white fluffy cloud, high in the sky on a beautiful day.";
      break;
    case 1:
      txt = "You are floating peacefully on that white fluffy cloud, moving very slowly. You are as light as a feather.";
      break;
    case 2:
      txt = "Imagine that you are sinking deeper and deeper into that cloud…so the cloud is all around you.";
      break;
    case 3:
      txt = "The fluffy cloud holds you safely…floating across the sky.";
      break;
    case 4:
      txt = "Anytime you feel like you need to calm down and relax, remember that you can return to your very own cloud.";
      break;
    case 5:
      txt = "If you were angry, you can picture yourself moving from hot to cold on the thermometer.";
      break;
    case 6:
      txt = "Whenever you need to cool off, move from hot to cool on the thermometer.";
      break;
    case 7:
      txt = "Remember that you can return to your very own cloud, whenever you feel like you need to calm down and relax.";
      break;
    default:
      txt = ""; // text if index is out of range
  }
}
