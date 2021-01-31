import React, { useCallback } from 'react';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { ExerciseEnum } from '../enum';

const TensorCamera = cameraWithTensors(Camera);
const scaleFactor = 0.50;
const flipHorizontal = false;
const outputStride = 16;
// let mPose = null;

const convertToMl5 = (data) => {
  data.keypoints.forEach(item => {
    data[item.part] = {
      x: item.position.x,
      y: item.position.y,
      score: item.score,
    }
  });
  return data;
}

const getStartPose = async (ex, images, net) => {
	let ready = false;
	let startPose;

	if(ex == ExerciseEnum["Squats"]){
		await new Promise((resolve, reject) => {
		// 	let cntdn = setInterval(async () => { 
			console.log("Get in position and raise your right hand above your head to begin.");
			
			requestAnimationFrame(async function initLoop(){
				const nextImageTensor = images.next().value;
				nextImageTensor.height = nextImageTensor.shape[0];
				// console.log(nextImageTensor.shape);
				nextImageTensor.width = nextImageTensor.shape[1];
				
				const pose = await net.estimateSinglePose(nextImageTensor, scaleFactor, flipHorizontal, outputStride);
				let mPose = convertToMl5(pose);
				// console.log(mPose.nose);

				if(mPose.score > 0.75 && mPose.keypoints.length == 17){
					let curPose = mPose;
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

				if(!ready)
					requestAnimationFrame(initLoop);
				else
					resolve(true);
			});
			// }, 500);
		});

		console.log("Get ready, starting timer in...");
		console.log(3);
		let i = 0;
		let promise = new Promise((resolve, reject) => {
			let countdown = setInterval(async () => {
				if(i < 2){
					console.log(2-i);
				} else{
					console.log("GO!");
					resolve(startPose);
					clearInterval(countdown);
				}
	
				if(i == 1){
					requestAnimationFrame(async () => {
						const nextImageTensor = images.next().value;
						nextImageTensor.height = nextImageTensor.shape[0];
						// console.log(nextImageTensor.shape);
						nextImageTensor.width = nextImageTensor.shape[1];

						let s = await net.estimateSinglePose(nextImageTensor, scaleFactor, flipHorizontal, outputStride);
						startPose = convertToMl5(s);
					});
				}
	
				i += 1;
			}, 1000);
		})

		return promise;
	} else{
		return null;
	}
}

const squatReps = (refPose, curPose, top) => {
	if(curPose.score > 0.75){
		// let diff = Math.abs(curPose.rightShoulder.x - curPose.leftShoulder.x) * 0.20;
		// if(Math.abs(curPose.rightAnkle.x - curPose.leftAnkle.x) >= Math.abs(curPose.rightShoulder.x - curPose.leftShoulder.x) - diff){
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
	
				if(curPose.leftHip.y <= lDiff + refPose.leftHip.y && curPose.rightHip.y <= rDiff + refPose.rightHip.y){
					return true;
				}
				else{
					return false;
				}
			}
		// } else{
		// 	console.log("Your feet are too close together.");
		// 	return false;
		// }
	} else{
		console.log("Error, cannot detect pose.");
		return false;
	}
}

const AnalysisScreen = ({navigation, route}) => {
  const [tfReady, setTfReady] = React.useState(false);
  //const [net, setNet] = React.useState(null);
  const [isRep, setIsRep] = React.useState(false);

  React.useEffect(() => {
    console.log("effect");
    const waitForTf = async () => {
      await tf.ready();
      // const thenet = await posenet.load({
      //   architecture: 'MobileNetV1',
      //   outputStride,
      //   inputResolution: {height: 600, width: 350},
      //   multiplier: 0.75,
      // });
      setTfReady(true);
      //setNet(thenet);
      console.log("all ready")
    }
    waitForTf();
  }, []);

  const handleCameraStream = async (images, updatePreview, gl) => {
    // const loop = async () => {
			const net = await posenet.load({
				architecture: 'MobileNetV1',
				outputStride,
				inputResolution: {height: 600, width: 350},
				multiplier: 0.75,
			});

      if (tfReady && net !== null) {
				let ex = route.params.ex;
				let count = 0;
				let refPose = await getStartPose(ex, images, net);
				// console.log(refPose);

				let top = true;
				let half;

				let endTime = new Date();
				endTime.setSeconds(endTime.getSeconds() + 60);
				// console.log(endTime);

				console.log(count);

				requestAnimationFrame(async function countLoop(){
					if(Date.now() < endTime){
						const nextImageTensor = images.next().value;
						nextImageTensor.height = nextImageTensor.shape[0];
						// console.log(nextImageTensor.shape);
						nextImageTensor.width = nextImageTensor.shape[1];
				
						let c = await net.estimateSinglePose(nextImageTensor, scaleFactor, flipHorizontal, outputStride);
						const curPose = convertToMl5(c);
					// let countdown = setInterval(async () => { 
						if(ex == ExerciseEnum["Squats"]){
							half = squatReps(refPose, curPose, top);
						}

						if(half == true){
							// console.log("hey");
							top = !top;
							if(top == true){
                count += 1;
                setIsRep(true);
                setTimeout(() => {
                  setIsRep(false);
                }, 1000);
								console.log(count);
							}
						}

						requestAnimationFrame(countLoop);
					} else{ 
						console.log("Times up!");
						// clearInterval(countdown);
					} 
				// }, 500);
				});
      }
    // }
    // loop();
  }


  // Currently expo does not support automatically determining the
  // resolution of the camera texture used. So it must be determined
  // empirically for the supported devices and preview size.

  let textureDims;
  if (Platform.OS === 'ios') {
  textureDims = {
    height: 1920,
    width: 1080,
  };
  } else {
  textureDims = {
    height: 1200,
    width: 1600,
  };
  }

  return <View style={styles.cameraView}>
    <View style={{
    position: 'absolute',
    zIndex: 10000,
    borderColor: 'green',
    borderWidth: 5,
    height,
    width,
    display: isRep ? "flex" : "none"
  }}></View>
    <TensorCamera
    // Standard Camera props
    style={styles.camera}
    zoom={0}
    type={Camera.Constants.Type.front}
    // Tensor related props
    cameraTextureHeight={textureDims.height}
    cameraTextureWidth={textureDims.width}
    resizeHeight={200}
    resizeWidth={152}
    resizeDepth={3}
    onReady={handleCameraStream}
    autorender={true}
    />
  </View>
}

const {height, width} = Dimensions.get("window");

const styles = StyleSheet.create({
  camera: {
    zIndex: 1,
    width,
    height,
  },
  cameraView: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  score: {
    position: 'absolute',
    zIndex: 10000,
    borderColor: 'green',
    borderWidth: 5,
    height,
    width
  }
});

export default AnalysisScreen;