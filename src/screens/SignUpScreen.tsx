import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { colors } from '../theme/theme';
import Toast from 'react-native-toast-message';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.nationalId || !formData.password || 
        !formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill in all required fields',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Passwords do not match. Please try again.',
      });
      return;
    }

    if (!agreeToTerms) {
      Toast.show({
        type: 'error',
        text1: 'Terms Required',
        text2: 'Please agree to the terms and conditions.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.phone,
        formData.nationalId
      );
      
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: error.message || 'Failed to create account. Please try again.',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Account Created Successfully!',
          text2: 'Please check your email to verify your account.',
        });
        navigation.navigate('SignIn' as never);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <Card style={styles.card}>
          <View style={styles.header}>
            <LinearGradient
              colors={[colors.cameroonGreen, colors.cameroonRed]}
              style={styles.logoGradient}
            >
              <Ionicons name="shield-checkmark" size={24} color="white" />
            </LinearGradient>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join Cameroon ID Vault to secure your identity documents
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <Input
                label="First Name *"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                style={styles.halfInput}
              />
              <Input
                label="Last Name *"
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                style={styles.halfInput}
              />
            </View>

            <Input
              label="Email Address *"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Phone Number *"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
              placeholder="+237 XXX XXX XXX"
            />

            <Input
              label="National ID Number *"
              value={formData.nationalId}
              onChangeText={(value) => handleInputChange('nationalId', value)}
            />

            <View style={styles.passwordContainer}>
              <Input
                label="Password *"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <Input
                label="Confirm Password *"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                {agreeToTerms && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxText}>
                I agree to the{' '}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('Terms' as never)}
                >
                  Terms of Service
                </Text>
                {' '}and{' '}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('Privacy' as never)}
                >
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            <Button
              title={isLoading ? "Creating Account..." : "Create Account"}
              onPress={handleSignUp}
              disabled={isLoading}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate('SignIn' as never)}
              >
                Sign in here
              </Text>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    marginLeft: 8,
    color: colors.primary,
    fontSize: 16,
  },
  card: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoGradient: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 40,
    padding: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});