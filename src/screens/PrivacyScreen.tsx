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

export default function PrivacyScreen() {
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
              <Ionicons name="lock-closed" size={32} color="white" />
            </LinearGradient>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Introduction</Text>
              <Text style={styles.sectionText}>
                The Government of Cameroon ("we," "us," or "our") operates the Cameroon ID Vault platform ("Service") to provide secure digital storage and management of official identity documents for Cameroonian citizens.
              </Text>
              <Text style={styles.sectionText}>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. We are committed to protecting your privacy and ensuring the security of your personal information in accordance with Cameroon data protection laws.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Information We Collect</Text>
              
              <Text style={styles.subsectionTitle}>Personal Information</Text>
              <Text style={styles.sectionText}>
                When you register for an account, we collect:
              </Text>
              <Text style={styles.bulletPoint}>• Full name as it appears on official documents</Text>
              <Text style={styles.bulletPoint}>• Email address</Text>
              <Text style={styles.bulletPoint}>• Phone number</Text>
              <Text style={styles.bulletPoint}>• National ID number</Text>
              <Text style={styles.bulletPoint}>• Date of birth</Text>
              <Text style={styles.bulletPoint}>• Address information</Text>

              <Text style={styles.subsectionTitle}>Document Information</Text>
              <Text style={styles.sectionText}>
                When you upload documents, we collect:
              </Text>
              <Text style={styles.bulletPoint}>• Digital copies of your identity documents</Text>
              <Text style={styles.bulletPoint}>• Document metadata (file size, type, upload date)</Text>
              <Text style={styles.bulletPoint}>• Verification status and related information</Text>

              <Text style={styles.subsectionTitle}>Technical Information</Text>
              <Text style={styles.sectionText}>
                We automatically collect:
              </Text>
              <Text style={styles.bulletPoint}>• IP address and location data</Text>
              <Text style={styles.bulletPoint}>• Device information</Text>
              <Text style={styles.bulletPoint}>• App usage patterns</Text>
              <Text style={styles.bulletPoint}>• Log files and crash reports</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
              <Text style={styles.sectionText}>
                We use your information for the following purposes:
              </Text>
              <Text style={styles.bulletPoint}>• Providing and maintaining the Service</Text>
              <Text style={styles.bulletPoint}>• Verifying your identity and documents</Text>
              <Text style={styles.bulletPoint}>• Processing document verification requests</Text>
              <Text style={styles.bulletPoint}>• Communicating with you about your account</Text>
              <Text style={styles.bulletPoint}>• Improving our services and user experience</Text>
              <Text style={styles.bulletPoint}>• Complying with legal obligations</Text>
              <Text style={styles.bulletPoint}>• Preventing fraud and ensuring security</Text>
              <Text style={styles.bulletPoint}>• Providing customer support</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Data Security</Text>
              <Text style={styles.sectionText}>
                We implement comprehensive security measures to protect your information:
              </Text>
              
              <Text style={styles.subsectionTitle}>Technical Safeguards</Text>
              <Text style={styles.bulletPoint}>• 256-bit SSL/TLS encryption for data transmission</Text>
              <Text style={styles.bulletPoint}>• AES-256 encryption for data storage</Text>
              <Text style={styles.bulletPoint}>• Multi-factor authentication requirements</Text>
              <Text style={styles.bulletPoint}>• Regular security audits and penetration testing</Text>
              <Text style={styles.bulletPoint}>• Secure data centers with physical access controls</Text>

              <Text style={styles.subsectionTitle}>Administrative Safeguards</Text>
              <Text style={styles.bulletPoint}>• Background checks for all personnel with data access</Text>
              <Text style={styles.bulletPoint}>• Role-based access controls</Text>
              <Text style={styles.bulletPoint}>• Regular staff training on data protection</Text>
              <Text style={styles.bulletPoint}>• Incident response procedures</Text>
              <Text style={styles.bulletPoint}>• Data retention and disposal policies</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Your Rights</Text>
              <Text style={styles.sectionText}>
                Under Cameroon data protection laws, you have the following rights:
              </Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Access:</Text> Request copies of your personal information</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Rectification:</Text> Request correction of inaccurate information</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Erasure:</Text> Request deletion of your information (subject to legal requirements)</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Portability:</Text> Request transfer of your data to another service</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Objection:</Text> Object to certain types of processing</Text>
              <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Restriction:</Text> Request limitation of processing in certain circumstances</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Contact Information</Text>
              <Text style={styles.sectionText}>
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactText}><Text style={styles.bold}>Data Protection Officer</Text></Text>
                <Text style={styles.contactText}>Email: privacy@cameroon-idvault.gov.cm</Text>
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
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
  bold: {
    fontWeight: 'bold',
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
    marginBottom: 4,
  },
});