import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  CreditCard,
  Calendar,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  Star,
  Clock,
  TrendingUp,
  Zap,
  Gift,
  Bell,
} from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { menuItems, cartItems, isDarkMode } = useAppContext();

  // Show only first 3 menu items for preview
  const todaysMenu = menuItems.slice(0, 3);
  const totalOrders = cartItems.length;
  const totalSpent = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const quickActions = [
    {
      title: 'Order Now',
      subtitle: 'Browse menu',
      icon: Zap,
      color: '#6366f1',
      onPress: () => router.push('/(tabs)/menu'),
    },
    {
      title: 'My Orders',
      subtitle: 'Track orders',
      icon: Clock,
      color: '#10b981',
      onPress: () => router.push('/(tabs)/cart'),
    },
    {
      title: 'Rewards',
      subtitle: 'Earn points',
      icon: Gift,
      color: '#f59e0b',
      onPress: () => router.push('/subscription'),
    },
    {
      title: 'Support',
      subtitle: 'Get help',
      icon: Bell,
      color: '#ec4899',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={isDarkMode ? ['#4c1d95', '#6b21a8', '#7c3aed'] : ['#6366f1', '#8b5cf6', '#a855f7']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good Morning! 👋</Text>
              <Text style={styles.subtitle}>Ready for some delicious food?</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#ffffff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.contentContainer}>
          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <AnimatedButton
                  key={index}
                  onPress={action.onPress}
                  style={[styles.quickActionCard, isDarkMode && styles.darkCard]}
                >
                  <LinearGradient
                    colors={[`${action.color}20`, `${action.color}10`]}
                    style={styles.quickActionIcon}
                  >
                    <action.icon size={24} color={action.color} />
                  </LinearGradient>
                  <Text style={[styles.quickActionTitle, isDarkMode && styles.darkText]}>{action.title}</Text>
                  <Text style={[styles.quickActionSubtitle, isDarkMode && styles.darkSubText]}>{action.subtitle}</Text>
                </AnimatedButton>
              ))}
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsSection}>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, isDarkMode && styles.darkCard]}>
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6']}
                  style={styles.statIcon}
                >
                  <TrendingUp size={20} color="#ffffff" />
                </LinearGradient>
                <Text style={[styles.statNumber, isDarkMode && styles.darkText]}>{totalOrders}</Text>
                <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>Total Orders</Text>
              </View>
              
              <View style={[styles.statCard, isDarkMode && styles.darkCard]}>
                <LinearGradient
                  colors={['#10b981', '#06b6d4']}
                  style={styles.statIcon}
                >
                  <CreditCard size={20} color="#ffffff" />
                </LinearGradient>
                <Text style={[styles.statNumber, isDarkMode && styles.darkText]}>₹{totalSpent}</Text>
                <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>Total Spent</Text>
              </View>
            </View>
          </View>

          {/* Meal Plan Status */}
          <View style={[styles.mealPlanCard, isDarkMode && styles.darkCard]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Meal Plan Status</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Not Active</Text>
              </View>
            </View>
            
            <View style={styles.planDetails}>
              <View style={styles.planItem}>
                <Calendar size={18} color="#6366f1" />
                <Text style={[styles.planLabel, isDarkMode && styles.darkSubText]}>Current Plan</Text>
                <Text style={[styles.planValue, isDarkMode && styles.darkText]}>None</Text>
              </View>
              
              <View style={styles.planItem}>
                <Star size={18} color="#f59e0b" />
                <Text style={[styles.planLabel, isDarkMode && styles.darkSubText]}>Student Discount</Text>
                <Text style={styles.discountValue}>20% OFF</Text>
              </View>
            </View>

            <AnimatedButton
              onPress={() => router.push('/subscription')}
              style={styles.upgradeButton}
            >
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.upgradeGradient}
              >
                <Text style={styles.upgradeText}>Choose a Plan</Text>
                <ChevronRight size={18} color="#ffffff" />
              </LinearGradient>
            </AnimatedButton>
          </View>

          {/* Today's Menu Preview */}
          <View style={styles.menuSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Today's Specials</Text>
              <AnimatedButton
                onPress={() => router.push('/(tabs)/menu')}
                style={styles.seeAllButton}
              >
                <Text style={styles.seeAllText}>View All</Text>
                <ChevronRight size={16} color="#6366f1" />
              </AnimatedButton>
            </View>

            {todaysMenu.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuScroll}>
                {todaysMenu.map((item) => (
                  <AnimatedButton
                    key={item.id}
                    onPress={() => router.push('/(tabs)/menu')}
                    style={[styles.menuCard, isDarkMode && styles.darkCard]}
                  >
                    <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
                    <View style={styles.menuOverlay}>
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={styles.menuGradient}
                      >
                        <View style={styles.menuInfo}>
                          <Text style={styles.menuName}>{item.name}</Text>
                          <View style={styles.menuFooter}>
                            <Text style={styles.menuPrice}>₹{item.price}</Text>
                            <View style={styles.menuRating}>
                              <Star size={12} color="#fbbf24" />
                              <Text style={styles.ratingText}>4.8</Text>
                            </View>
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </AnimatedButton>
                ))}
              </ScrollView>
            ) : (
              <View style={[styles.emptyMenuCard, isDarkMode && styles.darkCard]}>
                <Text style={[styles.emptyMenuText, isDarkMode && styles.darkSubText]}>
                  No menu items available yet. Check back soon for delicious options!
                </Text>
                <AnimatedButton
                  onPress={() => router.push('/(tabs)/menu')}
                  style={styles.browseButton}
                >
                  <Text style={styles.browseButtonText}>Browse Menu</Text>
                </AnimatedButton>
              </View>
            )}
          </View>
        </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#e5e7eb',
    letterSpacing: 0.2,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  quickActionsSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  darkText: {
    color: '#f1f5f9',
  },
  darkSubText: {
    color: '#94a3b8',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#1e293b',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  statsSection: {
    marginBottom: 28,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: (width - 60) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  mealPlanCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    letterSpacing: 0.2,
  },
  statusBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  planDetails: {
    marginBottom: 20,
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginLeft: 12,
    flex: 1,
  },
  planValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  discountValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  upgradeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  upgradeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  upgradeText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginRight: 8,
    letterSpacing: 0.2,
  },
  menuSection: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginRight: 4,
    letterSpacing: 0.2,
  },
  menuScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  menuCard: {
    width: 180,
    height: 140,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  menuOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  menuGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuInfo: {
    padding: 16,
  },
  menuName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  menuFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuPrice: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  menuRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginLeft: 4,
  },
  emptyMenuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyMenuText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  browseButton: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  browseButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
});