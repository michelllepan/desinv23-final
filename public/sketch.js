import {Sun, Cloud1, Cloud2} from "./modules/grabbable.js";
import {Hands} from "./modules/hands.js";

const CAP_WIDTH = 1200;					// capture video width
const CAP_HEIGHT = 900;					// capture video height

// define sun attributes
const SUN_SPEED = 0.4;
const SUN_SIZE = 300;

// define cloud 1 attributes
const CLOUD1_SPEED = -0.3;
const CLOUD1_SIZE = 300;

// define cloud 2 attributes
const CLOUD2_SPEED = 0.2;
const CLOUD2_SIZE = 400;

// define camera feed, hand position, and object variables
let capture;
let handsfree, hands;
let imgHandOpen, imgHandClosed, imgHandPoint;
let objects = [];

window.setup = function() {
  	createCanvas(windowWidth, windowHeight);
	
	// create video capture
	capture = createCapture(VIDEO);
	capture.size(CAP_WIDTH, CAP_HEIGHT);
	capture.hide();
  
	// initialize Handsfree library to detect one hand
  	handsfree = new Handsfree({
		showDebug: true,
		hands: {
			enabled: true,
			maxNumHands: 2,
			minDetectionConfidence: 0.7,
		}
	});
	hands = new Hands(handsfree, convertHandPos);

	// TODO: load different images for left hand
	imgHandOpen = loadImage("./assets/hand_open.svg");
	imgHandClosed = loadImage("./assets/hand_closed.svg");
	imgHandPoint = loadImage("./assets/hand_point.svg");
	
	// initialize object positions
	// TODO: transform coordinates before making objects
	objects.push(new Sun(5/6 * CAP_WIDTH, 1/4 * CAP_HEIGHT, createVector(SUN_SPEED, 0), 1/2 * SUN_SIZE));
	objects.push(new Cloud1(1/6 * CAP_WIDTH, 1/3 * CAP_HEIGHT, createVector(CLOUD1_SPEED, 0), 1/2 * CLOUD1_SIZE));
	objects.push(new Cloud2(1/3 * CAP_WIDTH, 5/6 * CAP_HEIGHT, createVector(CLOUD2_SPEED, 0), 1/2 * CLOUD2_SIZE));
}


window.draw = function() {
  	background(0);
	
	// flip video feed horizontally so user sees a mirror image, and position at the center of the screen
	scale(-1, 1);
	image(capture, -windowWidth/2 - CAP_WIDTH/2, windowHeight/2 - CAP_HEIGHT/2, CAP_WIDTH, CAP_HEIGHT);
	scale(-1, 1);

	hands.update();

	for (let object of objects) {
		object.updatePos(hands.left);
		object.updatePos(hands.right);
		object.draw();
	}

	hands.draw(getHandImage);
}

function getHandImage(gesture) {
	switch (gesture) {
		case "grab": return imgHandClosed;
		case "poke": return imgHandPoint;
		default: return imgHandOpen;
	} 
}

function convertHandPos(pos) {
	if (pos) {
		return createVector(
			-pos.x*CAP_WIDTH + windowWidth/2 + CAP_WIDTH/2,
			pos.y*CAP_HEIGHT + windowHeight/2 - CAP_HEIGHT/2,
		);
	} else {
		return null;
	}
}