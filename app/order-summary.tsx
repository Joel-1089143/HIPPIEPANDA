import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  MapPin,
  Clock,
  Check,
} from 'lucide-react-native';

export default function OrderSummaryScreen() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [selectedDelivery, setSelectedDelivery] = useState('now');

  const orderItems = [
    { name: 'Hyderabadi Biryani', quantity: 2, price: 299 },
    { name: 'Paneer Tikka', quantity: 1, price: 199 },
    { name: 'Masala Chai', quantity: 3, price: 49 },
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: Smartphone },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'netbanking', name: 'Net Banking', icon: Building },
    { id: 'cod', name: 'Cash on Delivery', icon: MapPin },
  ];

  const deliveryTimes = [
    { id: 'now', label: 'Now', time: '25-30 mins' },
    { id: 'lunch', label: 'Lunch', time: '12:00 PM - 1:00 PM' },
    { id: 'evening', label: 'Evening', time: '6:00 PM - 7:00 PM' },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 29;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Mock order placement
    router.push('/(tabs)');
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
        <Text style={styles.title}>Order Summary</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {orderItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Time</Text>
          <View style={styles.deliveryOptions}>
            {deliveryTimes.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.deliveryOption,
                  selectedDelivery === option.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedDelivery(option.id)}
              >
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryLabel}>{option.label}</Text>
                  <Text style={styles.deliveryTime}>{option.time}</Text>
                </View>
                {selectedDelivery === option.id && (
                  <Check size={20} color="#6366f1" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <MapPin size={20} color="#6366f1" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Hostel Room 204</Text>
              <Text style={styles.addressDetails}>
                University Campus, Block A, New Delhi - 110001
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.paymentInfo}>
                  <method.icon size={20} color="#6366f1" />
                  <Text style={styles.paymentName}>{method.name}</Text>
                </View>
                {selectedPayment === method.id && (
                  <Check size={20} color="#6366f1" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Summary</Text>
          <View style={styles.billSummary}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Subtotal</Text>
              <Text style={styles.billValue}>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValue}>₹{deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.billRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderButtonText}>
            Place Order • ₹{total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  deliveryOptions: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
  },
  deliveryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedOption: {
    backgroundColor: '#f0f0ff',
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  addressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  addressDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  changeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
  },
  paymentMethods: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginLeft: 12,
  },
  billSummary: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  billValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  placeOrderButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  placeOrderButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});