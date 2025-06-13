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

export default function LearnMoreScreen() {
  const navigation = useNavigation();

  const features = [
    {
      icon: 'shield-checkmark',
      title: 'Bank-Level Security',
      description: 'Your documents are protected with 256-bit encryption and multi-factor authentication, the same security standards used by banks.',
    },
    {
      icon: 'checkmark-circle',
      title: 'Government Approved',
      description: 'Official platform approved by the Government of Cameroon for secure digital identity document management.',
    },
    {
      icon: 'phone-portrait',
      title: 'Mobile Accessible',
      description: 'Access your documents from any device, anywhere in the world with our mobile application.',
    },
    {
      icon: 'time',
      title: '24/7 Availability',
      description: 'Your documents are available whenever you need them, eliminating the need to carry physical copies.',
    },
    {
      icon: 'people',
      title: 'Trusted by Thousands',
      description: 'Join over 10,000 Cameroonian citizens who have already secured their identity documents digitally.',
    },
    {
      icon: 'flash',
      title: 'Instant Verification',
      description: 'Quick document verification process for government services, banking, and other official purposes.',
    },
  ];

  const benefits = [
    'Eliminate the risk of losing important documents',
    'Reduce time spent in government offices',
    'Access documents for emergency situations',
    'Environmentally friendly paperless solution',
    'Backup and restore capabilities',
    'Secure sharing with authorized institutions',
  ];

  const supportedDocuments = [
    'National Identity Card (CNI)',
    'Birth Certificate',
    'Passport',
    'Driver\'s License',
    'Academic Certificates',
    'Professional Licenses',
    'Marriage Certificate',
    'Death Certificate',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('SignUp' as never)}
            size="small"
          />
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Learn More About{'\n'}
            <Text style={styles.heroTitleHighlight}>Cameroon ID Vault</Text>
          </Text>
          <Text style={styles.heroDescription}>
            Discover how our secure digital platform is revolutionizing document management for Cameroonian citizens while ensuring the highest levels of security and accessibility.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.features}>
          <Text style={styles.sectionTitle}>Advanced Security Features</Text>
          <Text style={styles.sectionDescription}>
            Built with cutting-edge technology to protect your most important documents
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon as any} size={32} color={colors.primary} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefits}>
          <Text style={styles.sectionTitle}>Why Choose Digital Document Storage?</Text>
          <Text style={styles.sectionDescription}>
            Traditional paper documents are vulnerable to loss, damage, and theft. Our digital solution provides a secure, accessible, and environmentally friendly alternative.
          </Text>
          
          <Card style={styles.benefitsCard}>
            <View style={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </Card>

          <Card style={styles.documentsCard}>
            <Text style={styles.documentsTitle}>Supported Documents</Text>
            <View style={styles.documentsGrid}>
              {supportedDocuments.map((doc, index) => (
                <View key={index} style={styles.documentItem}>
                  <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
                  <Text style={styles.documentText}>{doc}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* How It Works */}
        <View style={styles.howItWorks}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <Text style={styles.sectionDescription}>
            Getting started with Cameroon ID Vault is simple and secure
          </Text>
          
          <View style={styles.stepsContainer}>
            {[
              {
                step: '1',
                title: 'Create Account',
                description: 'Sign up with your email and verify your Cameroonian identity with your national ID number.',
              },
              {
                step: '2',
                title: 'Upload Documents',
                description: 'Securely upload your identity documents using our encrypted upload system or document scanner.',
              },
              {
                step: '3',
                title: 'Access Anywhere',
                description: 'Access your verified documents from any device, anytime you need them for official purposes.',
              },
            ].map((item, index) => (
              <Card key={index} style={styles.stepCard}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDescription}>{item.description}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Security Information */}
        <LinearGradient
          colors={[colors.cameroonGreen, colors.cameroonRed]}
          style={styles.security}
        >
          <Text style={styles.securityTitle}>Your Security is Our Priority</Text>
          <Text style={styles.securityDescription}>
            We employ the same security measures used by international banks and government institutions to protect your sensitive information.
          </Text>
          
          <View style={styles.securityFeatures}>
            {[
              { icon: 'lock-closed', title: '256-bit Encryption', description: 'Military-grade encryption protects your data in transit and at rest' },
              { icon: 'shield-checkmark', title: 'Multi-Factor Authentication', description: 'Additional security layers ensure only you can access your documents' },
              { icon: 'people', title: 'Privacy Compliant', description: 'Fully compliant with Cameroon data protection and privacy laws' },
            ].map((item, index) => (
              <View key={index} style={styles.securityFeature}>
                <View style={styles.securityIcon}>
                  <Ionicons name={item.icon as any} size={32} color="white" />
                </View>
                <Text style={styles.securityFeatureTitle}>{item.title}</Text>
                <Text style={styles.securityFeatureDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* CTA Section */}
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Ready to Secure Your Documents?</Text>
          <Text style={styles.ctaDescription}>
            Join thousands of Cameroonian citizens who have already made the switch to secure digital document storage.
          </Text>
          <View style={styles.ctaButtons}>
            <Button
              title="Create Free Account"
              onPress={() => navigation.navigate('SignUp' as never)}
              size="large"
              style={styles.ctaButton}
            />
            <Button
              title="Sign In"
              onPress={() => navigation.navigate('SignIn' as never)}
              variant="outline"
              size="large"
              style={styles.ctaButton}
            />
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 36,
  },
  heroTitleHighlight: {
    color: colors.primary,
  },
  heroDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 24,
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
    width: 64,
    height: 64,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 32,
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
  benefits: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: colors.surface,
  },
  benefitsCard: {
    padding: 24,
    marginBottom: 24,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  documentsCard: {
    padding: 24,
  },
  documentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  documentsGrid: {
    gap: 12,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  },
  documentText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
  },
  howItWorks: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    alignItems: 'center',
    padding: 32,
  },
  stepNumber: {
    width: 64,
    height: 64,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  security: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  securityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  securityDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  securityFeatures: {
    gap: 32,
    width: '100%',
  },
  securityFeature: {
    alignItems: 'center',
  },
  securityIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  securityFeatureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  securityFeatureDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 18,
  },
  cta: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaButtons: {
    gap: 16,
    width: '100%',
  },
  ctaButton: {
    width: '100%',
  },
});