import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Users, ShoppingCart, Plus, Settings, Menu as MenuIcon, ChartBar as BarChart3, CreditCard, UserCheck, Package, Bell, Moon, Sun, Filter, Search, Calendar, DollarSign, Activity, Target, Zap } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const router = useRouter();
  const { menuItems, cartItems, subscriptionPlans, isDarkMode, toggleDarkMode } = useAppContext();
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalSubscribers = subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0);
  const totalRevenue = subscriptionPlans.reduce((sum, plan) => sum + (plan.price * plan.subscribers), 0);

  const overviewMetrics = [
    {
      title: 'Today\'s Orders',
      value: cartItems.length.toString(),
      change: '+12%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#6366f1',
      gradient: ['#6366f1', '#8b5cf6'],
      chartData: [20, 45, 28, 80, 99, 43, 50],
    },
    {
      title: 'Active Students',
      value: totalSubscribers.toString(),
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: '#10b981',
      gradient: ['#10b981', '#06b6d4'],
      chartData: [30, 40, 35, 50, 49, 60, 70],
    },
    {
      title: 'Menu Items',
      value: menuItems.length.toString(),
      change: '+5%',
      trend: 'up',
      icon: MenuIcon,
      color: '#f59e0b',
      gradient: ['#f59e0b', '#f97316'],
      chartData: [10, 20, 15, 25, 30, 35, 40],
    },
    {
      title: 'Monthly Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: '#8b5cf6',
      gradient: ['#8b5cf6', '#a855f7'],
      chartData: [100, 120, 140, 110, 160, 180, 200],
    },
  ];

  const quickActions = [
    {
      title: 'Add Menu Item',
      subtitle: 'Create new dish',
      icon: Plus,
      color: '#6366f1',
      status: 'NEW',
      onPress: () => router.push('/add-menu-item'),
    },
    {
      title: 'Manage Menu',
      subtitle: 'Edit existing items',
      icon: CreditCard,
      color: '#10b981',
      status: `${menuItems.length} items`,
      onPress: () => router.push('/manage-menu'),
    },
    {
      title: 'User Management',
      subtitle: 'Manage customers',
      icon: UserCheck,
      color: '#f59e0b',
      status: '3 pending',
      onPress: () => {},
    },
    {
      title: 'Order Management',
      subtitle: 'Track orders',
      icon: Package,
      color: '#ec4899',
      status: 'Live',
      onPress: () => {},
    },
    {
      title: 'Analytics',
      subtitle: 'View insights',
      icon: BarChart3,
      color: '#06b6d4',
      status: 'Updated',
      onPress: () => {},
    },
    {
      title: 'Notifications',
      subtitle: 'Send alerts',
      icon: Bell,
      color: '#8b5cf6',
      status: '5 sent',
      onPress: () => {},
    },
  ];

  const MiniChart = ({ data, color }: { data: number[], color: string }) => (
    <View style={styles.miniChart}>
      {data.map((value, index) => (
        <View
          key={index}
          style={[
            styles.chartBar,
            {
              height: (value / Math.max(...data)) * 20,
              backgroundColor: color,
              opacity: 0.7 + (value / Math.max(...data)) * 0.3,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={isDarkMode ? ['#1e1b4b', '#312e81', '#3730a3'] : ['#6366f1', '#8b5cf6', '#a855f7']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <AnimatedButton
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={22} color="#ffffff" />
            </AnimatedButton>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>Admin Dashboard</Text>
              <Text style={styles.subtitle}>Manage your restaurant</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <AnimatedButton
              onPress={toggleDarkMode}
              style={styles.themeButton}
            >
              {isDarkMode ? (
                <Sun size={20} color="#ffffff" />
              ) : (
                <Moon size={20} color="#ffffff" />
              )}
            </AnimatedButton>
            <AnimatedButton
              onPress={() => router.push('/settings')}
              style={styles.settingsButton}
            >
              <Settings size={20} color="#ffffff" />
            </AnimatedButton>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'menu', label: 'Menu', icon: MenuIcon },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((tab) => (
              <AnimatedButton
                key={tab.id}
                onPress={() => setSelectedTab(tab.id)}
                style={[
                  styles.tabButton,
                  selectedTab === tab.id && styles.activeTab,
                ]}
              >
                <tab.icon 
                  size={16} 
                  color={selectedTab === tab.id ? "#6366f1" : "rgba(255,255,255,0.7)"} 
                />
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.activeTabText,
                ]}>
                  {tab.label}
                </Text>
              </AnimatedButton>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Overview Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                📊 Today's Overview
              </Text>
              <Text style={[styles.sectionSubtitle, isDarkMode && styles.darkSubText]}>
                Real-time business metrics
              </Text>
            </View>
            <AnimatedButton style={[styles.filterButton, isDarkMode && styles.darkFilterButton]}>
              <Filter size={16} color="#6366f1" />
              <Text style={styles.filterText}>Filter</Text>
            </AnimatedButton>
          </View>
          
          <View style={styles.metricsGrid}>
            {overviewMetrics.map((metric, index) => (
              <AnimatedButton
                key={index}
                style={[styles.metricCard, isDarkMode && styles.darkCard]}
                onPress={() => {}}
              >
                <LinearGradient
                  colors={[`${metric.color}08`, `${metric.color}15`]}
                  style={styles.metricGradient}
                >
                  <View style={styles.metricHeader}>
                    <LinearGradient
                      colors={metric.gradient}
                      style={styles.metricIcon}
                    >
                      <metric.icon size={20} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.metricTrend}>
                      {metric.trend === 'up' ? (
                        <TrendingUp size={12} color="#10b981" />
                      ) : (
                        <TrendingDown size={12} color="#ef4444" />
                      )}
                      <Text style={[
                        styles.metricChange,
                        { color: metric.trend === 'up' ? '#10b981' : '#ef4444' }
                      ]}>
                        {metric.change}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.metricValue, isDarkMode && styles.darkText]}>
                    {metric.value}
                  </Text>
                  <Text style={[styles.metricTitle, isDarkMode && styles.darkSubText]}>
                    {metric.title}
                  </Text>
                  
                  <MiniChart data={metric.chartData} color={metric.color} />
                </LinearGradient>
              </AnimatedButton>
            ))}
          </View>
        </View>

        {/* Menu Management Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                🍽️ Menu Management
              </Text>
              <Text style={[styles.sectionSubtitle, isDarkMode && styles.darkSubText]}>
                Manage your restaurant menu
              </Text>
            </View>
          </View>
          
          <View style={styles.horizontalCards}>
            <AnimatedButton 
              style={[styles.managementCard, isDarkMode && styles.darkCard]}
              onPress={() => router.push('/add-menu-item')}
            >
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.cardGradient}
              >
                <Plus size={24} color="#ffffff" />
              </LinearGradient>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Add Menu Item</Text>
                <Text style={[styles.cardSubtitle, isDarkMode && styles.darkSubText]}>
                  Create new dishes
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>NEW</Text>
              </View>
            </AnimatedButton>
            
            <AnimatedButton 
              style={[styles.managementCard, isDarkMode && styles.darkCard]}
              onPress={() => router.push('/manage-menu')}
            >
              <LinearGradient
                colors={['#10b981', '#06b6d4']}
                style={styles.cardGradient}
              >
                <CreditCard size={24} color="#ffffff" />
              </LinearGradient>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Manage Menu</Text>
                <Text style={[styles.cardSubtitle, isDarkMode && styles.darkSubText]}>
                  Edit existing items
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#10b981' }]}>
                <Text style={styles.statusText}>{menuItems.length} items</Text>
              </View>
            </AnimatedButton>
          </View>
        </View>

        {/* Subscription Management Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                💳 Subscription Management
              </Text>
              <Text style={[styles.sectionSubtitle, isDarkMode && styles.darkSubText]}>
                Manage pricing and plans
              </Text>
            </View>
          </View>
          
          <AnimatedButton 
            style={[styles.subscriptionCard, isDarkMode && styles.darkCard]}
            onPress={() => router.push('/manage-subscriptions')}
          >
            <LinearGradient
              colors={isDarkMode ? ['#1f2937', '#374151'] : ['#ffffff', '#f8fafc']}
              style={styles.subscriptionGradient}
            >
              <View style={styles.subscriptionHeader}>
                <LinearGradient
                  colors={['#8b5cf6', '#a855f7']}
                  style={styles.subscriptionIcon}
                >
                  <Target size={24} color="#ffffff" />
                </LinearGradient>
                <View style={styles.subscriptionInfo}>
                  <Text style={[styles.subscriptionTitle, isDarkMode && styles.darkText]}>
                    Subscription Plans
                  </Text>
                  <Text style={[styles.subscriptionSubtitle, isDarkMode && styles.darkSubText]}>
                    {subscriptionPlans.length} active plans • ₹{totalRevenue.toLocaleString()} revenue
                  </Text>
                </View>
                <View style={styles.subscriptionStats}>
                  <Text style={styles.subscriberCount}>{totalSubscribers}</Text>
                  <Text style={[styles.subscriberLabel, isDarkMode && styles.darkSubText]}>subscribers</Text>
                </View>
              </View>
            </LinearGradient>
          </AnimatedButton>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                ⚡ Quick Actions
              </Text>
              <Text style={[styles.sectionSubtitle, isDarkMode && styles.darkSubText]}>
                Frequently used operations
              </Text>
            </View>
          </View>
          
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <AnimatedButton 
                key={index}
                style={[styles.actionCard, isDarkMode && styles.darkCard]}
                onPress={action.onPress}
              >
                <View style={styles.actionHeader}>
                  <LinearGradient
                    colors={[`${action.color}20`, `${action.color}30`]}
                    style={styles.actionIcon}
                  >
                    <action.icon size={18} color={action.color} />
                  </LinearGradient>
                  <View style={[styles.actionStatus, { backgroundColor: action.color }]}>
                    <Text style={styles.actionStatusText}>{action.status}</Text>
                  </View>
                </View>
                <Text style={[styles.actionTitle, isDarkMode && styles.darkText]}>
                  {action.title}
                </Text>
                <Text style={[styles.actionSubtitle, isDarkMode && styles.darkSubText]}>
                  {action.subtitle}
                </Text>
              </AnimatedButton>
            ))}
          </View>
        </View>

        {/* Performance Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                📈 Performance Insights
              </Text>
              <Text style={[styles.sectionSubtitle, isDarkMode && styles.darkSubText]}>
                Business analytics overview
              </Text>
            </View>
          </View>
          
          <View style={styles.insightsContainer}>
            <View style={[styles.insightCard, isDarkMode && styles.darkCard]}>
              <LinearGradient
                colors={['#10b981', '#06b6d4']}
                style={styles.insightGradient}
              >
                <Zap size={20} color="#ffffff" />
                <Text style={styles.insightTitle}>Peak Hours</Text>
                <Text style={styles.insightValue}>12 PM - 2 PM</Text>
                <Text style={styles.insightSubtext}>Highest order volume</Text>
              </LinearGradient>
            </View>
            
            <View style={[styles.insightCard, isDarkMode && styles.darkCard]}>
              <LinearGradient
                colors={['#f59e0b', '#f97316']}
                style={styles.insightGradient}
              >
                <Target size={20} color="#ffffff" />
                <Text style={styles.insightTitle}>Top Category</Text>
                <Text style={styles.insightValue}>Biryani</Text>
                <Text style={styles.insightSubtext}>Most ordered items</Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <AnimatedButton
        style={[styles.fab, isDarkMode && styles.darkFab]}
        onPress={() => router.push('/add-menu-item')}
      >
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.fabGradient}
        >
          <Plus size={24} color="#ffffff" />
        </LinearGradient>
      </AnimatedButton>
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
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabContainer: {
    paddingHorizontal: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 6,
    letterSpacing: 0.2,
  },
  activeTabText: {
    color: '#6366f1',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  darkText: {
    color: '#f1f5f9',
  },
  darkSubText: {
    color: '#94a3b8',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  darkFilterButton: {
    backgroundColor: '#1e293b',
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginLeft: 6,
    letterSpacing: 0.2,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  darkCard: {
    backgroundColor: '#1e293b',
  },
  metricGradient: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metricChange: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  metricTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
    gap: 2,
  },
  chartBar: {
    width: 3,
    borderRadius: 2,
    minHeight: 4,
  },
  horizontalCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  managementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    width: (width - 60) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
  },
  cardGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#6366f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  subscriptionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  subscriptionGradient: {
    padding: 24,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  subscriptionSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 18,
    letterSpacing: 0.1,
  },
  subscriptionStats: {
    alignItems: 'center',
  },
  subscriberCount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#8b5cf6',
    letterSpacing: 0.3,
  },
  subscriberLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    letterSpacing: 0.2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionStatus: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  actionStatusText: {
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  actionSubtitle: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 15,
    letterSpacing: 0.1,
  },
  insightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insightCard: {
    width: (width - 60) / 2,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  insightGradient: {
    padding: 20,
    alignItems: 'center',
  },
  insightTitle: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  insightValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  insightSubtext: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  darkFab: {
    shadowColor: '#6366f1',
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});