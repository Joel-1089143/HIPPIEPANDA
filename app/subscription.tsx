import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Star, Calendar, Users } from 'lucide-react-native';

export default function SubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('two-meals');

  const plans = [
    {
      id: 'one-meal',
      name: 'One Meal',
      price: 1299,
      period: 'month',
      popular: false,
      features: [
        '2 meals/day (Breakfast + Lunch)',
        'Monday to Friday access',
        'Basic menu selection',
        'Mobile app access',
        'Customer support',
      ],
      description: 'Perfect for students with light appetite',
    },
    {
      id: 'two-meals',
      name: 'Two Meals',
      price: 1999,
      period: 'month',
      popular: true,
      features: [
        '3 meals/day (All meals)',
        'All-week access (7 days)',
        'Premium menu options',
        'Priority customer support',
        'Meal customization',
        'Free delivery',
      ],
      description: 'Most popular choice for active students',
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 2999,
      period: 'month',
      popular: false,
      features: [
        'Unlimited meals',
        'All-week access (7 days)',
        'Premium + exclusive dishes',
        'Priority customer support',
        'Meal customization',
        'Free delivery',
        'Guest meal vouchers (5/month)',
        'Nutrition tracking',
      ],
      description: 'Complete food solution for serious foodies',
    },
  ];

  const handleSubscribe = () => {
    router.push('/order-summary');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Subscription Plans</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Choose Your Perfect Plan</Text>
          <Text style={styles.headerSubtitle}>
            Enjoy great food with flexible meal plans designed for students
          </Text>
        </View>

        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.selectedPlan,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <LinearGradient
                  colors={['#f59e0b', '#f97316']}
                  style={styles.popularGradient}
                >
                  <Star size={12} color="#ffffff" />
                  <Text style={styles.popularText}>Most Popular</Text>
                </LinearGradient>
              </View>
            )}
            
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{plan.price}</Text>
                <Text style={styles.period}>/{plan.period}</Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color="#10b981" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {selectedPlan === plan.id && (
              <View style={styles.selectedIndicator}>
                <View style={styles.selectedDot} />
                <Text style={styles.selectedText}>Selected</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Why Choose Our Plans?</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Calendar size={20} color="#6366f1" />
              <Text style={styles.benefitText}>Flexible scheduling</Text>
            </View>
            <View style={styles.benefitItem}>
              <Users size={20} color="#6366f1" />
              <Text style={styles.benefitText}>Student-friendly pricing</Text>
            </View>
            <View style={styles.benefitItem}>
              <Star size={20} color="#6366f1" />
              <Text style={styles.benefitText}>Quality guaranteed</Text>
            </View>
          </View>
        </View>

        <View style={styles.subscribeContainer}>
          <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
            <Text style={styles.subscribeButtonText}>
              Subscribe to {plans.find(p => p.id === selectedPlan)?.name}
            </Text>
          </TouchableOpacity>
          <Text style={styles.subscribeNote}>
            Cancel anytime. No hidden fees. First week free!
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerInfo: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 24,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  selectedPlan: {
    borderColor: '#6366f1',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    zIndex: 1,
  },
  popularGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
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
    marginBottom: 20,
  },
  planName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    maxWidth: 200,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
  },
  period: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginLeft: 12,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
    marginRight: 8,
  },
  selectedText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366f1',
  },
  benefitsSection: {
    marginVertical: 32,
  },
  benefitsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  benefitsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  benefitItem: {
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  subscribeContainer: {
    alignItems: 'center',
  },
  subscribeButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  subscribeNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
  },
});