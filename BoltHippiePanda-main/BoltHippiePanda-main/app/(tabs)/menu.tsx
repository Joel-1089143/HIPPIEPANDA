import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, ShoppingBag, Plus, Star, Heart, Clock } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function MenuScreen() {
  const { menuItems, categories, addToCart, isDarkMode } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const allCategories = ['All', ...categories];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: any) => {
    addToCart(item);
    Alert.alert(
      'Added to Cart! 🎉',
      `${item.name} has been added to your cart`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Header */}
      <LinearGradient
        colors={isDarkMode ? ['#1e293b', '#334155'] : ['#ffffff', '#f8fafc']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>Menu</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubText]}>
              {filteredItems.length} delicious items
            </Text>
          </View>
          <AnimatedButton
            onPress={() => {}}
            style={[styles.filterButton, isDarkMode && styles.darkFilterButton]}
          >
            <Filter size={20} color="#6366f1" />
          </AnimatedButton>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, isDarkMode && styles.darkSearchBar]}>
            <Search size={18} color="#64748b" />
            <TextInput
              style={[styles.searchInput, isDarkMode && styles.darkText]}
              placeholder="Search dishes, ingredients..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {allCategories.map((category) => (
          <AnimatedButton
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
              isDarkMode && styles.darkCategoryButton,
              selectedCategory === category && isDarkMode && styles.darkSelectedCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
                isDarkMode && styles.darkText,
                selectedCategory === category && isDarkMode && styles.selectedCategoryTextDark,
              ]}
            >
              {category}
            </Text>
          </AnimatedButton>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <ScrollView 
        contentContainerStyle={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={['#f1f5f9', '#e2e8f0']}
              style={styles.emptyGradient}
            >
              <ShoppingBag size={64} color="#cbd5e1" />
              <Text style={[styles.emptyTitle, isDarkMode && styles.darkText]}>
                {menuItems.length === 0 ? 'No menu items yet' : 'No items found'}
              </Text>
              <Text style={[styles.emptySubtitle, isDarkMode && styles.darkSubText]}>
                {menuItems.length === 0 
                  ? 'The admin will add delicious items soon!'
                  : 'Try adjusting your search or category filter'
                }
              </Text>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.menuGrid}>
            {filteredItems.map((item) => (
              <View key={item.id} style={[styles.menuCard, isDarkMode && styles.darkCard]}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.3)']}
                    style={styles.imageOverlay}
                  >
                    <AnimatedButton
                      onPress={() => toggleFavorite(item.id)}
                      style={styles.favoriteButton}
                    >
                      <Heart 
                        size={18} 
                        color={favorites.includes(item.id) ? "#ef4444" : "#ffffff"}
                        fill={favorites.includes(item.id) ? "#ef4444" : "transparent"}
                      />
                    </AnimatedButton>
                  </LinearGradient>
                </View>

                <View style={styles.itemContent}>
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
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>

                  <View style={styles.itemFooter}>
                    <View style={styles.priceSection}>
                      <Text style={styles.itemPrice}>₹{item.price}</Text>
                      <View style={styles.ratingContainer}>
                        <Star size={12} color="#fbbf24" fill="#fbbf24" />
                        <Text style={[styles.ratingText, isDarkMode && styles.darkSubText]}>4.8</Text>
                      </View>
                    </View>

                    <AnimatedButton
                      onPress={() => handleAddToCart(item)}
                      style={styles.addToCartButton}
                    >
                      <LinearGradient
                        colors={['#6366f1', '#8b5cf6']}
                        style={styles.addButtonGradient}
                      >
                        <Plus size={16} color="#ffffff" />
                        <Text style={styles.addToCartText}>Add</Text>
                      </LinearGradient>
                    </AnimatedButton>
                  </View>
                </View>
              </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  darkFilterButton: {
    backgroundColor: '#334155',
  },
  searchContainer: {
    paddingHorizontal: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  darkSearchBar: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    marginLeft: 12,
    letterSpacing: 0.2,
  },
  categoriesContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  categoriesContent: {
    paddingHorizontal: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
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
  darkCategoryButton: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  selectedCategory: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  darkSelectedCategory: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  categoryText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    letterSpacing: 0.2,
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  selectedCategoryTextDark: {
    color: '#ffffff',
  },
  menuContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: (width - 60) / 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  darkCard: {
    backgroundColor: '#1e293b',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 12,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemName: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    flex: 1,
    letterSpacing: 0.2,
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  itemDescription: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    lineHeight: 16,
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSection: {
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    marginBottom: 4,
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
  addToCartButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addToCartText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 4,
    letterSpacing: 0.3,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});