import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { colors } from '../theme/theme';
import Toast from 'react-native-toast-message';

export default function DocumentScannerScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef<Camera>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && !isScanning) {
      setIsScanning(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        Toast.show({
          type: 'success',
          text1: 'Document captured',
          text2: 'Review the captured document and save if satisfied.',
        });
        
        // Here you would typically navigate to a preview screen
        // For now, we'll just show success and go back
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
        
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Capture failed',
          text2: 'Failed to capture document. Please try again.',
        });
      } finally {
        setIsScanning(false);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.message}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Ionicons name="camera-off" size={64} color={colors.textSecondary} />
          <Text style={styles.message}>No access to camera</Text>
          <Text style={styles.submessage}>
            Please enable camera permissions in your device settings to scan documents.
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document Scanner</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          )}
        >
          <Ionicons name="camera-reverse" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          ratio="4:3"
        >
          <View style={styles.overlay}>
            {/* Scanning guidelines */}
            <View style={styles.scanFrame} />
            
            {/* Instructions */}
            <View style={styles.instructions}>
              <Text style={styles.instructionTitle}>Scanning Tips:</Text>
              <Text style={styles.instructionText}>• Ensure good lighting</Text>
              <Text style={styles.instructionText}>• Keep the document flat</Text>
              <Text style={styles.instructionText}>• Fill the frame with your document</Text>
              <Text style={styles.instructionText}>• Hold the camera steady</Text>
            </View>
          </View>
        </Camera>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlsContent}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={isScanning}
          >
            <View style={[styles.captureButtonInner, isScanning && styles.capturing]}>
              {isScanning ? (
                <Ionicons name="hourglass" size={32} color="white" />
              ) : (
                <Ionicons name="camera" size={32} color="white" />
              )}
            </View>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.captureText}>
          {isScanning ? 'Capturing...' : 'Tap to capture document'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
  submessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  backButton: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  scanFrame: {
    width: '80%',
    aspectRatio: 1.4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  instructions: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 32,
    alignItems: 'center',
  },
  controlsContent: {
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capturing: {
    backgroundColor: colors.warning,
  },
  captureText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});