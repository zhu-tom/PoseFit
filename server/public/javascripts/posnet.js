// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

const ExerciseEnum = Object.freeze({"squats":1, "jj":2, "pushups":3});

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single', modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
		poses = results;

  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
	// select("#status").html("Model Loaded");
}

function draw() {
	image(video, 0, 0, width, height);
	// console.log(poses);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  if(poses.length > 0) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[0].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  if(poses.length > 0) {
    const skeleton = poses[0].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

async function getStartPose(ex){
	let ready = false;
	let curPose;
	let startPose;

	if(ex == ExerciseEnum.squats){
		console.log("Get in position and raise your right hand above your head to begin.");

		await new Promise((resolve, reject) => {
			let readyLoop = setInterval(() => {
				if(poses.length > 0 && poses[0].pose.score > 0.50 && poses[0].pose.keypoints.length == 17){
					curPose = poses[0].pose;
					if(Math.abs(curPose.rightAnkle.x - curPose.leftAnkle.x) >= Math.abs(curPose.rightShoulder.x - curPose.leftShoulder.x)){
						if(curPose.rightWrist.y < curPose.nose.y && curPose.score > 0.2){
							ready = true;
						}
					} else{
						console.log("Your feet must be shoulder width apart.");
					}
				} else{
					console.log("Error, cannot detect pose.");
				}
	
				if(ready){
					resolve(true);
					clearInterval(readyLoop);
				}
			}, 100);
		});

		console.log("Get ready, starting timer in...");
		console.log(3);
		let i = 0;
		let promise = new Promise((resolve, reject) => {
			let countdown = setInterval(() => {
				if(i < 2){
					console.log(2-i);
				} else{
					console.log("GO!");
					resolve(startPose);
					clearInterval(countdown);
				}
	
				if(i == 1){
					startPose = poses[0].pose;
				}
	
				i += 1;
			}, 1000);
		})

		return promise;
	} else{
		return null;
	}
}

async function startExercise(ex) {
	let count = 0;
	let refPose = await getStartPose(ex);
	console.log(refPose);
	let top = true;

	let endTime = new Date();
	endTime.setSeconds(endTime.getSeconds() + 60);
	// console.log(endTime);

	console.log(count);

	let countdown = setInterval(() => {
		if(Date.now() < endTime){ 
			let half;
			if(ex == ExerciseEnum.squats){
				half = squatReps(refPose, top);
			}

			if(half == true){
				// console.log("hey");
				top = !top;
				if(top == true){
					count += 1;
					console.log(count);
				}
			}
		} else{ 
			console.log("Times up!");
			clearInterval(countdown);
		} 
	}, 100);
}

function squatReps(refPose, top){
	if(poses.length > 0 && poses[0].pose.score > 0.50){
		const curPose = poses[0].pose;

		if(Math.abs(curPose.rightAnkle.x - curPose.leftAnkle.x) >= Math.abs(refPose.rightShoulder.x - refPose.leftShoulder.x)){
			if(top){
				let lDiff = curPose.leftKnee.y * 0.10;
				let rDiff = curPose.rightKnee.y * 0.10;
	
				//Assumes knees don't move vertically during reps
				if(curPose.leftHip.y >= curPose.leftKnee.y - lDiff && curPose.rightHip.y >= curPose.rightKnee.y - rDiff){
					return true;
				}
				else{
					return false;
				}
			} else{
				let lDiff = refPose.leftHip.y * 0.05;
				let rDiff = refPose.rightHip.y * 0.05;
	
				if(curPose.leftHip.y <= lDiff + refPose.leftHip.y &&
					 curPose.rightHip.y <= rDiff + refPose.rightHip.y){
				 return true;
			 }
			 else{
				 return false;
			 }
			}
		} else{
			console.log("Your feat are too close together.");
			return false;
		}
	} else{
		console.log("Error, cannot detect pose.");
		return false;
	}
}