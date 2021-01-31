export async function getStartPose(){
	let ready = false;
	let curPose;
	let startPose;

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
}

export function squatReps(refPose, top){
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