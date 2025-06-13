
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { colors } from '../theme/theme';
import Toast from 'react-native-toast-message';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function DocumentUploadScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [documentData, setDocumentData] = useState({
    title: '',
    description: '',
    category: 'identity',
  });

  const categories = [
    { value: 'identity', label: 'Identity Documents' },
    { value: 'education', label: 'Educational Certificates' },
    { value: 'medical', label: 'Medical Records' },
    { value: 'financial', label: 'Financial Documents' },
    { value: 'legal', label: 'Legal Documents' },
    { value: 'other', label: 'Other' },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadDocument(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick document',
      });
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Required',
          text2: 'Please grant camera roll permissions to upload images',
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadDocument(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick image',
      });
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Required',
          text2: 'Please grant camera permissions to take photos',
        });
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadDocument(result.assets[0]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to take photo',
      });
    }
  };

  const uploadDocument = async (file: any) => {
    if (!user || !documentData.title.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please provide a document title before uploading',
      });
      return;
    }

    setUploading(true);

    try {
      // Create file path
      const fileExt = file.name?.split('.').pop() || file.uri.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, {
          uri: file.uri,
          type: file.mimeType || 'application/octet-stream',
          name: fileName,
        } as any);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save document metadata to database
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          title: documentData.title,
          description: documentData.description,
          category: documentData.category,
          file_path: filePath,
          file_url: publicUrl,
          file_type: file.mimeType || 'application/octet-stream',
          file_size: file.size || 0,
        });

      if (dbError) {
        throw dbError;
      }

      Toast.show({
        type: 'success',
        text1: 'Upload Successful',
        text2: 'Your document has been uploaded securely',
      });

      // Reset form
      setDocumentData({
        title: '',
        description: '',
        category: 'identity',
      });

      // Navigate back to dashboard to see the updated list
      navigation.navigate('Dashboard' as never);

    } catch (error) {
      console.error('Error uploading document:', error);
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: 'Failed to upload document. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  const showUploadOptions = () => {
    Alert.alert(
      'Upload Document',
      'Choose how you want to add your document',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Pick Document File', onPress: pickDocument },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
            <Text style={styles.backButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.card}>
          <View style={styles.titleSection}>
            <Ionicons name="cloud-upload" size={48} color={colors.primary} />
            <Text style={styles.title}>Upload Document</Text>
            <Text style={styles.subtitle}>
              Securely store your important documents in your personal vault
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Document Title *"
              value={documentData.title}
              onChangeText={(value) => setDocumentData(prev => ({ ...prev, title: value }))}
              placeholder="e.g., National ID Card"
            />

            <Input
              label="Description (Optional)"
              value={documentData.description}
              onChangeText={(value) => setDocumentData(prev => ({ ...prev, description: value }))}
              placeholder="Brief description of the document"
              multiline
              numberOfLines={3}
            />

            <View style={styles.categorySection}>
              <Text style={styles.categoryLabel}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.value}
                    style={[
                      styles.categoryItem,
                      documentData.category === category.value && styles.categoryItemSelected
                    ]}
                    onPress={() => setDocumentData(prev => ({ ...prev, category: category.value }))}
                  >
                    <Text style={[
                      styles.categoryText,
                      documentData.category === category.value && styles.categoryTextSelected
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              title={uploading ? "Uploading..." : "Choose Document to Upload"}
              onPress={showUploadOptions}
              disabled={uploading || !documentData.title.trim()}
              style={styles.uploadButton}
            />
          </View>

          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
            <Text style={styles.securityText}>
              All documents are encrypted and stored securely. Only you can access your files.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    color: colors.primary,
    fontSize: 16,
  },
  card: {
    padding: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  categoryItemSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.text,
  },
  categoryTextSelected: {
    color: 'white',
  },
  uploadButton: {
    marginTop: 16,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}10`,
    padding: 12,
    borderRadius: 8,
  },
  securityText: {
    marginLeft: 8,
    fontSize: 12,
    color: colors.primary,
    flex: 1,
  },
});
