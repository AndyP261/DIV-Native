import React from 'react';
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
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { colors } from '../theme/theme';

export default function LandingScreen() {
  const navigation = useNavigation();

  const features = [
    {
      icon: 'shield-checkmark',
      title: 'Secure Storage',
      description: 'Your documents are encrypted and stored securely with bank-level security.',
    },
    {
      icon: 'cloud-upload',
      title: 'Easy Upload',
      description: 'Upload your identity documents in PDF or image format with just a few clicks.',
    },
    {
      icon: 'camera',
      title: 'Document Scanner',
      description: 'Use your camera to scan physical documents directly into the app.',
    },
    {
      icon: 'people',
      title: 'Verified Identity',
      description: 'Government-approved platform for Cameroonian identity document management.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logo}>
              <LinearGradient
                colors={[colors.cameroonGreen, colors.cameroonRed]}
                style={styles.logoGradient}
              >
                <Ionicons name="shield-checkmark" size={24} color="white" />
              </LinearGradient>
              <Text style={styles.logoText}>Cameroon ID Vault</Text>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('SignIn' as never)}
              >
                <Text style={styles.headerButtonText}>Sign In</Text>
              </TouchableOpacity>
              <Button
                title="Get Started"
                onPress={() => navigation.navigate('SignUp' as never)}
                size="small"
              />
            </View>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Secure Your{'\n'}
            <Text style={styles.heroTitleHighlight}>Cameroon Identity</Text>
            {'\n'}Documents
          </Text>
          <Text style={styles.heroDescription}>
            The official digital vault for Cameroonian citizens to store, manage, and access their identity documents securely from anywhere.
          </Text>
          <View style={styles.heroButtons}>
            <Button
              title="Create Account"
              onPress={() => navigation.navigate('SignUp' as never)}
              size="large"
            />
            <Button
              title="Learn More"
              onPress={() => navigation.navigate('LearnMore' as never)}
              variant="outline"
              size="large"
            />
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.features}>
          <Text style={styles.sectionTitle}>Why Choose Cameroon ID Vault?</Text>
          <Text style={styles.sectionDescription}>
            A modern, secure solution for managing your important identity documents with government-grade security.
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon as any} size={24} color={colors.primary} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={[colors.cameroonGreen, colors.cameroonRed]}
          style={styles.cta}
        >
          <Text style={styles.ctaTitle}>Ready to Secure Your Documents?</Text>
          <Text style={styles.ctaDescription}>
            Join the digital revolution and keep your identity documents safe and accessible.
          </Text>
          <Button
            title="Get Started Today"
            onPress={() => navigation.navigate('SignUp' as never)}
            variant="secondary"
            size="large"
            style={styles.ctaButton}
          />
        </LinearGradient>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoGradient: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 40,
  },
  heroTitleHighlight: {
    color: colors.primary,
  },
  heroDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  features: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    alignItems: 'center',
    padding: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  cta: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: 'white',
  },
});