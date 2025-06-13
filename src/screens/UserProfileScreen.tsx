
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
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

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  national_id: string | null;
}

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    phone: '',
    national_id: ''
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        Toast.show({
          type: 'error',
          text1: 'Error loading profile',
          text2: 'Failed to load your profile data.',
        });
      } else if (data) {
        setProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          national_id: data.national_id || ''
        });
      } else {
        // Create profile if it doesn't exist
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            phone: user.user_metadata?.phone || '',
            national_id: user.user_metadata?.national_id || ''
          });

        if (insertError) {
          console.error('Error creating profile:', insertError);
        } else {
          setProfile({
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            phone: user.user_metadata?.phone || '',
            national_id: user.user_metadata?.national_id || ''
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          national_id: profile.national_id,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      setIsEditing(false);
      Toast.show({
        type: 'success',
        text1: 'Profile updated',
        text2: 'Your profile information has been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: 'Failed to update your profile. Please try again.',
      });
    }
  };

  const userDisplayName = profile.first_name || profile.last_name 
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'User';

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
            <Text style={styles.backButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
            <Text style={styles.backButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(profile.first_name?.[0] || 'U')}{(profile.last_name?.[0] || '')}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userDisplayName}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Ionicons 
                name={isEditing ? "close" : "pencil"} 
                size={20} 
                color={colors.primary} 
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Personal Information */}
        <Card style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.sectionSubtitle}>
            Manage your personal details and contact information
          </Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <Input
                label="First Name"
                value={profile.first_name || ''}
                onChangeText={(value) => setProfile(prev => ({ ...prev, first_name: value }))}
                editable={isEditing}
                style={styles.halfInput}
              />
              <Input
                label="Last Name"
                value={profile.last_name || ''}
                onChangeText={(value) => setProfile(prev => ({ ...prev, last_name: value }))}
                editable={isEditing}
                style={styles.halfInput}
              />
            </View>

            <Input
              label="Email"
              value={user?.email || ''}
              editable={false}
              style={styles.disabledInput}
            />

            <Input
              label="Phone Number"
              value={profile.phone || ''}
              onChangeText={(value) => setProfile(prev => ({ ...prev, phone: value }))}
              editable={isEditing}
              keyboardType="phone-pad"
            />

            <Input
              label="National ID"
              value={profile.national_id || ''}
              onChangeText={(value) => setProfile(prev => ({ ...prev, national_id: value }))}
              editable={isEditing}
            />

            {isEditing && (
              <Button
                title="Save Changes"
                onPress={handleSave}
                style={styles.saveButton}
              />
            )}
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  profileCard: {
    margin: 20,
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  editButton: {
    padding: 8,
  },
  infoCard: {
    margin: 20,
    marginTop: 0,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  disabledInput: {
    opacity: 0.6,
  },
  saveButton: {
    marginTop: 8,
  },
});
