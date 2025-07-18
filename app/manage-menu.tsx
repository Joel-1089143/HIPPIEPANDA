import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard as Edit, Trash2, Plus, Star, Search, Filter, Grid2x2 as Grid, List } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function ManageMenuScreen() {
  const router = useRouter();
  const { menuItems, categories, deleteMenuItem, deleteCategory, isDarkMode } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const filteredItems = menuItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleDeleteItem = (id: number, name: string) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMenuItem(id);
            Alert.alert('Success', 'Item deleted successfully!');
          },
        },
      ]
    );
  };

  const handleDeleteCategory = (category: string) => {
    const itemsInCategory = menuItems.filter(item => item.category === category);
    
    if (itemsInCategory.length > 0) {
      Alert.alert(
        'Cannot Delete Category',
        `There are ${itemsInCategory.length} items in this category. Please remove all items first.`
      );
      return;
    }

    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete the "${category}" category?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCategory(category);
            Alert.alert('Success', 'Category deleted successfully!');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={isDarkMode ? ['#1e293b', '#334155'] : ['#ffffff', '#f8fafc']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <AnimatedButton
            onPress={() => router.back()}
            style={[styles.backButton, isDarkMode && styles.darkBackButton]}
          >
            <ArrowLeft size={22} color={isDarkMode ? "#ffffff" : "#1f2937"} />
          </AnimatedButton>
          <View style={styles.headerTitle}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>Manage Menu</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubText]}>
              {filteredItems.length} of {menuItems.length} items
            </Text>
          </View>
          <AnimatedButton
            onPress={() => router.push('/add-menu-item')}
            style={[styles.addButton, isDarkMode && styles.darkAddButton]}
          >
            <Plus size={20} color="#6366f1" />
          </AnimatedButton>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, isDarkMode && styles.darkSearchBar]}>
            <Search size={18} color="#64748b" />
            <TextInput
              style={[styles.searchInput, isDarkMode && styles.darkText]}
              placeholder="Search menu items..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.filterControls}>
            <AnimatedButton
              onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              style={[styles.viewToggle, isDarkMode && styles.darkViewToggle]}
            >
              {viewMode === 'grid' ? (
                <List size={16} color="#6366f1" />
              ) : (
                <Grid size={16} color="#6366f1" />
              )}
            </AnimatedButton>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {['All', ...categories].map((category) => (
            <AnimatedButton
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategoryChip,
                isDarkMode && styles.darkCategoryChip,
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.selectedCategoryChipText,
                  isDarkMode && styles.darkText,
                ]}
              >
                {category}
              </Text>
            </AnimatedButton>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredItems.length === 0 ? (
          <View style={[styles.emptyContainer, isDarkMode && styles.darkCard]}>
            <LinearGradient
              colors={['#f1f5f9', '#e2e8f0']}
              style={styles.emptyGradient}
            >
              <Plus size={64} color="#cbd5e1" />
              <Text style={[styles.emptyTitle, isDarkMode && styles.darkText]}>
                {menuItems.length === 0 ? 'No menu items yet' : 'No items found'}
              </Text>
              <Text style={[styles.emptySubtitle, isDarkMode && styles.darkSubText]}>
                {menuItems.length === 0 
                  ? 'Add your first menu item to get started'
                  : 'Try adjusting your search or filters'
                }
              </Text>
              {menuItems.length === 0 && (
                <AnimatedButton
                  onPress={() => router.push('/add-menu-item')}
                  style={styles.addFirstItemButton}
                >
                  <LinearGradient
                    colors={['#6366f1', '#8b5cf6']}
                    style={styles.addFirstItemGradient}
                  >
                    <Plus size={18} color="#ffffff" />
                    <Text style={styles.addFirstItemText}>Add Menu Item</Text>
                  </LinearGradient>
                </AnimatedButton>
              )}
            </LinearGradient>
          </View>
        ) : (
          <View style={viewMode === 'grid' ? styles.menuGrid : styles.menuList}>
            {filteredItems.map((item) => (
              <AnimatedButton
                key={item.id}
                style={[
                  viewMode === 'grid' ? styles.menuGridItem : styles.menuListItem,
                  isDarkMode && styles.darkCard
                ]}
                onPress={() => {}}
              >
                <Image source={{ uri: item.imageUrl }} style={
                  viewMode === 'grid' ? styles.gridItemImage : styles.listItemImage
                } />
                <View style={styles.itemInfo}>
                  <View style={styles.itemHeader}>
                    <Text style={[styles.itemName, isDarkMode && styles.darkText]} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.vegIndicator}>
                      <View
                        style={[
                          styles.vegDot,
                          { backgroundColor: item.isVeg ? '#10b981' : '#ef4444' },
                        ]}
                      />
                    </View>
                  </View>
                  <Text style={[styles.itemCategory, isDarkMode && styles.darkSubText]}>
                    {item.category}
                  </Text>
                  <Text 
                    style={[styles.itemDescription, isDarkMode && styles.darkSubText]} 
                    numberOfLines={viewMode === 'grid' ? 2 : 1}
                  >
                    {item.description}
                  </Text>
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color="#fbbf24" fill="#fbbf24" />
                      <Text style={[styles.ratingText, isDarkMode && styles.darkSubText]}>4.8</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.itemActions}>
                  <AnimatedButton style={styles.editButton}>
                    <Edit size={16} color="#6366f1" />
                  </AnimatedButton>
                  <AnimatedButton
                    style={styles.deleteItemButton}
                    onPress={() => handleDeleteItem(item.id, item.name)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </AnimatedButton>
                </View>
              </AnimatedButton>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  darkContainer: {
    backgroundColor: '#0f172a',
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkBackButton: {
    backgroundColor: '#1e293b',
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  darkText: {
    color: '#f1f5f9',
  },
  darkSubText: {
    color: '#94a3b8',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkAddButton: {
    backgroundColor: '#1e293b',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  darkSearchBar: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    marginLeft: 12,
    letterSpacing: 0.2,
  },
  filterControls: {
    flexDirection: 'row',
    gap: 8,
  },
  viewToggle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkViewToggle: {
    backgroundColor: '#1e293b',
  },
  categoriesContainer: {
    paddingBottom: 4,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkCategoryChip: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  selectedCategoryChip: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  categoryChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    letterSpacing: 0.2,
  },
  selectedCategoryChipText: {
    color: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuList: {
    gap: 16,
  },
  menuGridItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: (width - 60) / 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  menuListItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#1e293b',
  },
  gridItemImage: {
    width: '100%',
    height: 100,
  },
  listItemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    flex: 1,
    letterSpacing: 0.2,
  },
  vegIndicator: {
    width: 14,
    height: 14,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  itemCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  itemDescription: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginBottom: 8,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    letterSpacing: 0.2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginLeft: 4,
  },
  itemActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  deleteItemButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyGradient: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
    borderRadius: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  emptySubtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  addFirstItemButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  addFirstItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  addFirstItemText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
});