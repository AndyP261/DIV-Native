import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { colors } from '../theme/theme';
import Toast from 'react-native-toast-message';

interface UserDocument {
  id: string;
  title: string;
  description: string | null;
  file_type: string | null;
  file_size: number | null;
  verification_status: string | null;
  created_at: string;
}

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('SignIn' as never);
      return;
    }
    fetchDocuments();
  }, [user]);

  const fetchDocuments = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        Toast.show({
          type: 'error',
          text1: 'Error loading documents',
          text2: 'Failed to load your documents. Please try again.',
        });
      } else {
        setDocuments(data || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoadingDocuments(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully',
        text2: 'You have been securely logged out of your account.',
      });
      navigation.navigate('Landing' as never);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout failed',
        text2: 'Failed to log out. Please try again.',
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDocuments();
  };

  const stats = [
    { 
      label: 'Total Documents', 
      value: documents.length.toString(), 
      icon: 'document-text',
      color: colors.primary 
    },
    { 
      label: 'Verified Documents', 
      value: documents.filter(doc => doc.verification_status === 'verified').length.toString(), 
      icon: 'shield-checkmark',
      color: colors.success 
    },
    { 
      label: 'Pending Verification', 
      value: documents.filter(doc => doc.verification_status === 'pending').length.toString(), 
      icon: 'time',
      color: colors.warning 
    },
  ];

  const recentDocuments = documents.slice(0, 3);

  const userDisplayName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'User';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logo}>
            <LinearGradient
              colors={[colors.cameroonGreen, colors.cameroonRed]}
              style={styles.logoGradient}
            >
              <Ionicons name="shield-checkmark" size={20} color="white" />
            </LinearGradient>
            <Text style={styles.logoText}>Cameroon ID Vault</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate('UserProfile' as never)}
            >
              <Ionicons name="person" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome back, {userDisplayName}</Text>
          <Text style={styles.welcomeSubtitle}>
            Manage your identity documents securely and efficiently.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <View style={styles.statContent}>
                <View>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <Card style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionSubtitle}>
            Choose an action to manage your documents
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryAction]}
              onPress={() => navigation.navigate('DocumentUpload' as never)}
            >
              <LinearGradient
                colors={[colors.cameroonGreen, colors.primary]}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="cloud-upload" size={24} color="white" />
                <Text style={styles.actionButtonText}>Upload Document</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('DocumentScanner' as never)}
            >
              <View style={styles.actionButtonContent}>
                <Ionicons name="camera" size={24} color={colors.primary} />
                <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                  Scan Document
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('DocumentGallery' as never)}
            >
              <View style={styles.actionButtonContent}>
                <Ionicons name="eye" size={24} color={colors.primary} />
                <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                  View Documents
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Recent Documents */}
        <Card style={styles.recentDocuments}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recent Documents</Text>
              <Text style={styles.sectionSubtitle}>
                Your recently uploaded documents
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('DocumentGallery' as never)}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {loadingDocuments ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Loading documents...</Text>
            </View>
          ) : recentDocuments.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-text" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyStateTitle}>No documents yet</Text>
              <Text style={styles.emptyStateText}>Upload your first document to get started</Text>
            </View>
          ) : (
            <View style={styles.documentsList}>
              {recentDocuments.map((doc, index) => (
                <View key={index} style={styles.documentItem}>
                  <View style={styles.documentIcon}>
                    <Ionicons name="document-text" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{doc.title}</Text>
                    <Text style={styles.documentMeta}>
                      {doc.file_type || 'Document'} • {new Date(doc.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.documentStatus}>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: doc.verification_status === 'verified' ? colors.success : colors.warning }
                    ]}>
                      <Text style={styles.statusText}>
                        {doc.verification_status === 'verified' ? 'Verified' : 'Pending'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
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
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  stats: {
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    padding: 20,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActions: {
    padding: 20,
    marginBottom: 24,
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
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  primaryAction: {
    marginBottom: 8,
  },
  actionButtonGradient: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  actionButtonContent: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  recentDocuments: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  documentsList: {
    gap: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  documentIcon: {
    width: 40,
    height: 40,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  documentMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  documentStatus: {
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});