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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { colors } from '../theme/theme';
import Toast from 'react-native-toast-message';

export default function SignInScreen() {
  const navigation = useNavigation();
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill in all fields',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Sign In Failed',
          text2: error.message || 'Please check your credentials and try again.',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: 'You have been signed in successfully.',
        });
        navigation.navigate('Dashboard' as never);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Email Required',
        text2: 'Please enter your email address to reset your password.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Reset Failed',
          text2: error.message || 'Failed to send reset email. Please try again.',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Reset Email Sent!',
          text2: 'Check your email for password reset instructions.',
        });
        setShowForgotPassword(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowForgotPassword(false)}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
            <Text style={styles.backButtonText}>Back to Sign In</Text>
          </TouchableOpacity>

          <Card style={styles.card}>
            <View style={styles.header}>
              <LinearGradient
                colors={[colors.cameroonGreen, colors.cameroonRed]}
                style={styles.logoGradient}
              >
                <Ionicons name="shield-checkmark" size={24} color="white" />
              </LinearGradient>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </View>

            <View style={styles.form}>
              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
              />

              <Button
                title={isLoading ? "Sending..." : "Send Reset Email"}
                onPress={handleForgotPassword}
                disabled={isLoading}
                style={styles.submitButton}
              />
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to access your secure document vault
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />

            <View style={styles.passwordContainer}>
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
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

            <View style={styles.formOptions}>
              <TouchableOpacity
                onPress={() => setShowForgotPassword(true)}
              >
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button
              title={isLoading ? "Signing in..." : "Sign In"}
              onPress={handleSignIn}
              disabled={isLoading}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate('SignUp' as never)}
              >
                Create one here
              </Text>
            </Text>
          </View>

          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
            <Text style={styles.securityText}>
              Your data is protected with bank-level encryption and multi-factor authentication.
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
    justifyContent: 'center',
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
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 40,
    padding: 4,
  },
  formOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    color: colors.primary,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
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