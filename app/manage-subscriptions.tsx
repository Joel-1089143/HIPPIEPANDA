import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard as Edit, Trash2, Plus, DollarSign, Users, Star } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

export default function ManageSubscriptionsScreen() {
  const router = useRouter();
  const { subscriptionPlans, updateSubscriptionPlan, deleteSubscriptionPlan, isDarkMode } = useAppContext();

  const handleDeletePlan = (id: number, name: string, subscribers: number) => {
    if (subscribers > 0) {
      Alert.alert(
        'Cannot Delete Plan',
        `This plan has ${subscribers} active subscribers. Please migrate them to another plan first.`
      );
      return;
    }

    Alert.alert(
      'Delete Plan',
      `Are you sure you want to delete the "${name}" plan?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteSubscriptionPlan(id);
            Alert.alert('Success', 'Plan deleted successfully!');
          },
        },
      ]
    );
  };

  const handleEditPrice = (id: number, currentPrice: number) => {
    Alert.prompt(
      'Edit Price',
      'Enter the new price (₹):',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: (text) => {
            const newPrice = parseFloat(text || '0');
            if (newPrice > 0) {
              updateSubscriptionPlan(id, { price: newPrice });
              Alert.alert('Success', 'Price updated successfully!');
            } else {
              Alert.alert('Error', 'Please enter a valid price.');
            }
          },
        },
      ],
      'numeric',
      currentPrice.toString()
    );
  };

  const togglePopular = (id: number, currentPopular: boolean) => {
    updateSubscriptionPlan(id, { popular: !currentPopular });
  };

  const totalSubscribers = subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0);
  const totalRevenue = subscriptionPlans.reduce((sum, plan) => sum + (plan.price * plan.subscribers), 0);

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <AnimatedButton
          onPress={() => router.back()}
          style={[styles.backButton, isDarkMode && styles.darkBackButton]}
        >
          <ArrowLeft size={24} color={isDarkMode ? "#ffffff" : "#1f2937"} />
        </AnimatedButton>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Manage Subscriptions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, isDarkMode && styles.darkCard]}>
            <Text style={[styles.statNumber, isDarkMode && styles.darkText]}>
              {totalSubscribers}
            </Text>
            <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>Total Subscribers</Text>
          </View>
          <View style={[styles.statCard, isDarkMode && styles.darkCard]}>
            <Text style={[styles.statNumber, isDarkMode && styles.darkText]}>
              ₹{totalRevenue.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>Monthly Revenue</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Subscription Plans</Text>

          {subscriptionPlans.map((plan) => (
            <View key={plan.id} style={[styles.planCard, isDarkMode && styles.darkCard]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Star size={12} color="#ffffff" />
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={[styles.planName, isDarkMode && styles.darkText]}>{plan.name}</Text>
                  <Text style={[styles.planDescription, isDarkMode && styles.darkSubText]}>{plan.description}</Text>
                </View>
                <View style={styles.planActions}>
                  <AnimatedButton
                    style={styles.editButton}
                    onPress={() => handleEditPrice(plan.id, plan.price)}
                  >
                    <Edit size={16} color="#6366f1" />
                  </AnimatedButton>
                  <AnimatedButton
                    style={styles.deleteButton}
                    onPress={() => handleDeletePlan(plan.id, plan.name, plan.subscribers)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </AnimatedButton>
                </View>
              </View>

              <View style={styles.planDetails}>
                <View style={styles.priceContainer}>
                  <AnimatedButton
                    style={styles.priceButton}
                    onPress={() => handleEditPrice(plan.id, plan.price)}
                  >
                    <DollarSign size={16} color="#6366f1" />
                    <Text style={styles.price}>₹{plan.price}</Text>
                    <Text style={[styles.period, isDarkMode && styles.darkSubText]}>/{plan.period}</Text>
                  </AnimatedButton>
                </View>

                <View style={styles.subscribersContainer}>
                  <Users size={16} color="#10b981" />
                  <Text style={styles.subscribersText}>{plan.subscribers} subscribers</Text>
                </View>
              </View>

              <View style={styles.featuresContainer}>
                <Text style={[styles.featuresTitle, isDarkMode && styles.darkText]}>Features:</Text>
                {plan.features.slice(0, 3).map((feature, index) => (
                  <Text key={index} style={[styles.featureText, isDarkMode && styles.darkSubText]}>• {feature}</Text>
                ))}
                {plan.features.length > 3 && (
                  <Text style={styles.moreFeatures}>
                    +{plan.features.length - 3} more features
                  </Text>
                )}
              </View>

              <View style={styles.planControls}>
                <AnimatedButton
                  style={[styles.popularButton, plan.popular && styles.popularButtonActive]}
                  onPress={() => togglePopular(plan.id, plan.popular)}
                >
                  <Star size={16} color={plan.popular ? "#ffffff" : "#6366f1"} />
                  <Text style={[
                    styles.popularButtonText,
                    plan.popular && styles.popularButtonTextActive
                  ]}>
                    {plan.popular ? 'Remove Popular' : 'Mark Popular'}
                  </Text>
                </AnimatedButton>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkBackButton: {
    backgroundColor: '#374151',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  darkText: {
    color: '#ffffff',
  },
  darkSubText: {
    color: '#9ca3af',
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#1f2937',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  planActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    flex: 1,
  },
  priceButton: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#f0f0ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    marginLeft: 4,
  },
  period: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  subscribersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  subscribersText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  moreFeatures: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginTop: 4,
  },
  planControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  popularButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0ff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  popularButtonActive: {
    backgroundColor: '#6366f1',
  },
  popularButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366f1',
    marginLeft: 4,
  },
  popularButtonTextActive: {
    color: '#ffffff',
  },
});