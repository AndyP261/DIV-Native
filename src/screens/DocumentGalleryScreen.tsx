import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
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

interface UserDocument {
  id: string;
  title: string;
  description: string | null;
  file_type: string | null;
  file_size: number | null;
  verification_status: string | null;
  created_at: string;
}

export default function DocumentGalleryScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<UserDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, filterStatus]);

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
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.file_type || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(doc => doc.verification_status === filterStatus);
    }

    setFilteredDocuments(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDocuments();
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'verified':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'rejected':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const renderDocument = ({ item }: { item: UserDocument }) => (
    <Card style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <View style={styles.documentIcon}>
          <Ionicons name="document-text" size={24} color={colors.primary} />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.verification_status) }]}>
          <Text style={styles.statusText}>
            {item.verification_status || 'pending'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.documentTitle}>{item.title}</Text>
      <Text style={styles.documentType}>{item.file_type || 'Document'}</Text>
      
      <View style={styles.documentMeta}>
        <Text style={styles.metaText}>Size: {formatFileSize(item.file_size)}</Text>
        <Text style={styles.metaText}>
          Uploaded: {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.documentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color={colors.primary} />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download" size={16} color={colors.primary} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

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

      <View style={styles.content}>
        <Text style={styles.title}>Document Gallery</Text>
        <Text style={styles.subtitle}>
          View and manage all your uploaded documents
        </Text>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <Input
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search documents..."
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {[
            { key: 'all', label: 'All Documents' },
            { key: 'verified', label: 'Verified' },
            { key: 'pending', label: 'Pending' },
            { key: 'rejected', label: 'Rejected' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                filterStatus === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setFilterStatus(filter.key)}
            >
              <Text style={[
                styles.filterButtonText,
                filterStatus === filter.key && styles.filterButtonTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Documents List */}
        {loading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Loading documents...</Text>
          </View>
        ) : filteredDocuments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyStateTitle}>No documents found</Text>
            <Text style={styles.emptyStateText}>
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Upload your first document to get started.'
              }
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredDocuments}
            renderItem={renderDocument}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.documentsContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 20,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 48,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  filterButtonTextActive: {
    color: 'white',
  },
  documentsContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  documentCard: {
    flex: 1,
    margin: 4,
    padding: 16,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  documentIcon: {
    width: 48,
    height: 48,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  documentType: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  documentMeta: {
    marginBottom: 12,
  },
  metaText: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  documentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 18,
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
});