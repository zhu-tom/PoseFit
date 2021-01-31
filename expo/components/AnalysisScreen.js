import React, { useCallback } from 'react';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';

const TensorCamera = cameraWithTensors(Camera);
const scaleFactor = 0.50;
const flipHorizontal = false;
const outputStride = 16;

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

const AnalysisScreen = ({navigation, route}) => {
  const [tfReady, setTfReady] = React.useState(false);
  //const [net, setNet] = React.useState(null);

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
  }, [])

  const handleCameraStream = async (images, updatePreview, gl) => {
    const net = await posenet.load({
      architecture: 'MobileNetV1',
      outputStride,
      inputResolution: {height: 600, width: 350},
      multiplier: 0.75,
    });
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (nextImageTensor.shape) {
        nextImageTensor.height = nextImageTensor.shape[0];
        //console.log(nextImageTensor.shape);
        nextImageTensor.width = nextImageTensor.shape[1];
        try {
          const pose = await net.estimateSinglePose(nextImageTensor, scaleFactor, flipHorizontal, outputStride);
          console.log(pose && convertToMl5(pose));

        } catch {
          console.log("error");
        }
      }
      //
      // do something with tensor here
      //

      // if autorender is false you need the following two lines.
      // updatePreview();
      // gl.endFrameEXP();
    
      requestAnimationFrame(loop);
    }
    loop();
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

  return <View>
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
    zIndex: 2,
    fontSize: 50,
  }
});

export default AnalysisScreen;