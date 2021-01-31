import { getStartPose, squatReps } from "./squat";
const ExerciseEnum = Object.freeze({"squats":1, "jj":2, "pushups":3});

export async function startExercise(ex) {
	let count = 0;
	let refPose = await getStartPose();
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