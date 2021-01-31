import React from 'react';
import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { StyleSheet, View } from 'react-native';

const TensorCamera = cameraWithTensors(Camera);

const AnalysisScreen = () => {

const handleCameraStream = (images, updatePreview, gl) => {
  const loop = async () => {
    const nextImageTensor = images.next().value

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

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%'
  }
});

export default AnalysisScreen;