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
import { Card } from '../components/ui/Card';
import { colors } from '../theme/theme';

export default function TermsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <View style={styles.titleSection}>
            <LinearGradient
              colors={[colors.cameroonGreen, colors.cameroonRed]}
              style={styles.logoGradient}
            >
              <Ionicons name="document-text" size={32} color="white" />
            </LinearGradient>
            <Text style={styles.title}>Terms of Service</Text>
            <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
              <Text style={styles.sectionText}>
                By accessing and using the Cameroon ID Vault platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </Text>
              <Text style={styles.sectionText}>
                This Service is operated by the Government of Cameroon through its authorized digital identity management platform. The Service is designed to provide secure digital storage and management of official Cameroonian identity documents.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Eligibility</Text>
              <Text style={styles.sectionText}>
                This Service is available exclusively to:
              </Text>
              <Text style={styles.bulletPoint}>• Citizens of Cameroon with valid national identity documents</Text>
              <Text style={styles.bulletPoint}>• Individuals who are 18 years of age or older</Text>
              <Text style={styles.bulletPoint}>• Legal residents of Cameroon with proper documentation</Text>
              <Text style={styles.bulletPoint}>• Authorized representatives acting on behalf of eligible individuals with proper legal documentation</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Account Registration and Security</Text>
              <Text style={styles.sectionText}>
                To use this Service, you must create an account by providing accurate, current, and complete information including:
              </Text>
              <Text style={styles.bulletPoint}>• Valid email address</Text>
              <Text style={styles.bulletPoint}>• National ID number</Text>
              <Text style={styles.bulletPoint}>• Phone number</Text>
              <Text style={styles.bulletPoint}>• Full legal name as it appears on official documents</Text>
              <Text style={styles.sectionText}>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Document Upload and Verification</Text>
              <Text style={styles.sectionText}>
                Users may upload the following types of official documents:
              </Text>
              <Text style={styles.bulletPoint}>• National Identity Card (CNI)</Text>
              <Text style={styles.bulletPoint}>• Birth Certificate</Text>
              <Text style={styles.bulletPoint}>• Passport</Text>
              <Text style={styles.bulletPoint}>• Driver's License</Text>
              <Text style={styles.bulletPoint}>• Academic Certificates</Text>
              <Text style={styles.bulletPoint}>• Professional Licenses</Text>
              <Text style={styles.bulletPoint}>• Marriage Certificate</Text>
              <Text style={styles.bulletPoint}>• Other government-issued documents</Text>
              <Text style={styles.sectionText}>
                All uploaded documents undergo a verification process. You agree that only authentic, unaltered documents will be uploaded. Uploading fraudulent or falsified documents is strictly prohibited and may result in account termination and legal action.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Data Privacy and Security</Text>
              <Text style={styles.sectionText}>
                We implement industry-standard security measures to protect your personal information and documents:
              </Text>
              <Text style={styles.bulletPoint}>• 256-bit SSL encryption for data transmission</Text>
              <Text style={styles.bulletPoint}>• Advanced encryption for document storage</Text>
              <Text style={styles.bulletPoint}>• Multi-factor authentication</Text>
              <Text style={styles.bulletPoint}>• Regular security audits and monitoring</Text>
              <Text style={styles.bulletPoint}>• Compliance with Cameroon data protection laws</Text>
              <Text style={styles.sectionText}>
                Your personal information will only be shared with authorized government agencies and institutions as required by law or for official verification purposes.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Contact Information</Text>
              <Text style={styles.sectionText}>
                If you have any questions about these Terms of Service, please contact us at:
              </Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactText}>Email: legal@cameroon-idvault.gov.cm</Text>
                <Text style={styles.contactText}>Phone: +237 XXX XXX XXX</Text>
                <Text style={styles.contactText}>Address: Ministry of Digital Economy, Yaoundé, Cameroon</Text>
              </View>
            </View>
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
  scrollContent: {
    padding: 20,
  },
  card: {
    padding: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoGradient: {
    width: 64,
    height: 64,
    borderRadius: 16,
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
  lastUpdated: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  content: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  bulletPoint: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginLeft: 8,
  },
  contactInfo: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  contactText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 4,
  },
});