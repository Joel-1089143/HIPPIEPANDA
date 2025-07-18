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
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateCartQuantity, removeFromCart, isDarkMode } = useAppContext();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 29;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <LinearGradient
          colors={isDarkMode ? ['#1e293b', '#334155'] : ['#ffffff', '#f8fafc']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>Cart</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubText]}>Your order summary</Text>
          </View>
        </LinearGradient>

        <View style={styles.emptyContainer}>
          <LinearGradient
            colors={['#f1f5f9', '#e2e8f0']}
            style={styles.emptyGradient}
          >
            <ShoppingBag size={80} color="#cbd5e1" />
            <Text style={[styles.emptyTitle, isDarkMode && styles.darkText]}>Your cart is empty</Text>
            <Text style={[styles.emptySubtitle, isDarkMode && styles.darkSubText]}>
              Add some delicious items from our menu to get started
            </Text>
            <AnimatedButton
              onPress={() => router.push('/(tabs)/menu')}
              style={styles.browseButton}
            >
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.browseGradient}
              >
                <Text style={styles.browseButtonText}>Browse Menu</Text>
                <ArrowRight size={16} color="#ffffff" />
              </LinearGradient>
            </AnimatedButton>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <LinearGradient
        colors={isDarkMode ? ['#1e293b', '#334155'] : ['#ffffff', '#f8fafc']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>Cart</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubText]}>
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.cartContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cartItems}>
          {cartItems.map((item) => (
            <View key={item.id} style={[styles.cartItem, isDarkMode && styles.darkCard]}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, isDarkMode && styles.darkText]} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={[styles.itemCategory, isDarkMode && styles.darkSubText]}>
                  {item.category}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  <View style={styles.vegIndicator}>
                    <View
                      style={[
                        styles.vegDot,
                        { backgroundColor: item.isVeg ? '#10b981' : '#ef4444' },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.itemControls}>
                <AnimatedButton
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <Trash2 size={16} color="#ef4444" />
                </AnimatedButton>
                
                <View style={[styles.quantityContainer, isDarkMode && styles.darkQuantityContainer]}>
                  <AnimatedButton
                    onPress={() => updateCartQuantity(item.id, item.quantity - 1)}
                    style={[styles.quantityButton, isDarkMode && styles.darkQuantityButton]}
                  >
                    <Minus size={14} color="#6366f1" />
                  </AnimatedButton>
                  
                  <Text style={[styles.quantityText, isDarkMode && styles.darkText]}>
                    {item.quantity}
                  </Text>
                  
                  <AnimatedButton
                    onPress={() => updateCartQuantity(item.id, item.quantity + 1)}
                    style={[styles.quantityButton, isDarkMode && styles.darkQuantityButton]}
                  >
                    <Plus size={14} color="#6366f1" />
                  </AnimatedButton>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Order Summary */}
      <LinearGradient
        colors={isDarkMode ? ['#1e293b', '#334155'] : ['#ffffff', '#f8fafc']}
        style={styles.summaryContainer}
      >
        <View style={styles.summaryContent}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isDarkMode && styles.darkSubText]}>Subtotal</Text>
            <Text style={[styles.summaryValue, isDarkMode && styles.darkText]}>₹{subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isDarkMode && styles.darkSubText]}>Delivery Fee</Text>
            <Text style={[
              styles.summaryValue, 
              deliveryFee === 0 && styles.freeDelivery,
              isDarkMode && styles.darkText
            ]}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
            </Text>
          </View>
          
          {deliveryFee === 0 && (
            <Text style={styles.freeDeliveryNote}>🎉 Free delivery on orders above ₹500</Text>
          )}
          
          <View style={[styles.divider, isDarkMode && styles.darkDivider]} />
          
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, isDarkMode && styles.darkText]}>Total</Text>
            <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
          </View>
        </View>

        <AnimatedButton
          onPress={() => router.push('/order-summary')}
          style={styles.checkoutButton}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <ArrowRight size={18} color="#ffffff" />
          </LinearGradient>
        </AnimatedButton>
      </LinearGradient>
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
    paddingHorizontal: 24,
    paddingTop: 20,
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
    marginTop: 4,
    letterSpacing: 0.2,
  },
  darkText: {
    color: '#f1f5f9',
  },
  darkSubText: {
    color: '#94a3b8',
  },
  cartContainer: {
    flex: 1,
  },
  cartItems: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#1e293b',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  itemCategory: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
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
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemControls: {
    alignItems: 'center',
    marginLeft: 16,
  },
  removeButton: {
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  darkQuantityContainer: {
    backgroundColor: '#334155',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  darkQuantityButton: {
    backgroundColor: '#475569',
  },
  quantityText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginHorizontal: 12,
    letterSpacing: 0.2,
  },
  summaryContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryContent: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    letterSpacing: 0.2,
  },
  summaryValue: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    letterSpacing: 0.2,
  },
  freeDelivery: {
    color: '#10b981',
  },
  freeDeliveryNote: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10b981',
    textAlign: 'right',
    marginTop: -8,
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  darkDivider: {
    backgroundColor: '#334155',
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    letterSpacing: 0.3,
  },
  checkoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginRight: 8,
    letterSpacing: 0.3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyGradient: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
    borderRadius: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 8,
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
  browseButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  browseGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  browseButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginRight: 8,
    letterSpacing: 0.3,
  },
});