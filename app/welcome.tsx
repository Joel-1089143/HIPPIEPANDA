import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { 
  Users, 
  Heart, 
  Clock, 
  Star, 
  Sparkles, 
  Music, 
  Coffee, 
  Shield, 
  Zap, 
  Gift,
  User,
  UserCheck,
  ArrowUp,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Animation refs
  const logoScale = useRef(new Animated.Value(1)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const benefits = [
    {
      icon: Clock,
      title: 'Real-time Balance',
      description: 'Track meal credits instantly with live updates and smart notifications',
      color: '#6366f1',
      gradient: ['#6366f1', '#8b5cf6'],
      bgGradient: ['#6366f115', '#8b5cf608'],
    },
    {
      icon: Heart,
      title: 'Smart Recommendations',
      description: 'AI-powered food suggestions based on your taste preferences and dietary needs',
      color: '#ec4899',
      gradient: ['#ec4899', '#f97316'],
      bgGradient: ['#ec489915', '#f9731608'],
    },
    {
      icon: Users,
      title: 'Order History',
      description: 'View, rate and reorder your favorite meals with just one tap',
      color: '#10b981',
      gradient: ['#10b981', '#06b6d4'],
      bgGradient: ['#10b98115', '#06b6d408'],
    },
    {
      icon: Star,
      title: 'Exclusive Rewards',
      description: 'Student-only deals, loyalty points & cashback on every order',
      color: '#f59e0b',
      gradient: ['#f59e0b', '#eab308'],
      bgGradient: ['#f59e0b15', '#eab30808'],
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Bank-grade security with multiple payment options and instant refunds',
      color: '#8b5cf6',
      gradient: ['#8b5cf6', '#6366f1'],
      bgGradient: ['#8b5cf615', '#6366f108'],
    },
    {
      icon: Zap,
      title: 'Quick Delivery',
      description: 'Express delivery within 15-20 minutes to your hostel or campus',
      color: '#06b6d4',
      gradient: ['#06b6d4', '#0ea5e9'],
      bgGradient: ['#06b6d415', '#0ea5e908'],
    },
  ];

  useEffect(() => {
    // Logo pulsing animation
    const logoAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Floating elements animation
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    logoAnimation.start();
    floatingAnimation.start();

    return () => {
      logoAnimation.stop();
      floatingAnimation.stop();
    };
  }, []);

  const handleGoogleLogin = () => {
    router.replace('/(tabs)');
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(offsetY > 300);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const nextBenefit = () => {
    setCurrentBenefitIndex((prev) => (prev + 1) % benefits.length);
  };

  const prevBenefit = () => {
    setCurrentBenefitIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const FloatingIcon = ({ icon: Icon, style, delay = 0 }: any) => {
    const animatedStyle = {
      transform: [
        {
          translateY: floatingAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -10],
          }),
        },
        {
          rotate: floatingAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '5deg'],
          }),
        },
      ],
      opacity: floatingAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 0.6, 0.3],
      }),
    };

    return (
      <Animated.View style={[style, animatedStyle]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.floatingIconContainer}
        >
          <Icon size={18} color="rgba(255,255,255,0.6)" />
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Music Toggle */}
        <TouchableOpacity
          style={styles.musicToggle}
          onPress={() => setIsMusicEnabled(!isMusicEnabled)}
        >
          {isMusicEnabled ? (
            <Volume2 size={20} color="#ffffff" />
          ) : (
            <VolumeX size={20} color="rgba(255,255,255,0.6)" />
          )}
        </TouchableOpacity>

        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          bounces={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Floating Background Elements */}
          <View style={styles.floatingElements}>
            <FloatingIcon icon={Music} style={[styles.floatingIcon, { top: 80, left: 30 }]} />
            <FloatingIcon icon={Coffee} style={[styles.floatingIcon, { top: 120, right: 40 }]} />
            <FloatingIcon icon={Sparkles} style={[styles.floatingIcon, { top: 180, left: width * 0.7 }]} />
            <FloatingIcon icon={Gift} style={[styles.floatingIcon, { top: 240, left: 50 }]} />
          </View>

          {/* Enhanced Header Section */}
          <View style={styles.header}>
            <Animated.View 
              style={[
                styles.logoContainer,
                { transform: [{ scale: logoScale }] }
              ]}
            >
              <View style={styles.logoWrapper}>
                <Image
                  source={require('../assets/images/Screenshot 2025-06-17 134520.png')}
                  style={styles.logo}
                />
                <View style={styles.logoGlow} />
                <View style={styles.logoPulse} />
              </View>
            </Animated.View>
            
            <View style={styles.brandSection}>
              <Text style={styles.title}>Hippie Panda</Text>
              <Text style={styles.subtitle}>Great Vibes, Food & Music</Text>
            </View>
          </View>

          {/* Enhanced Login Section */}
          <View style={styles.authSection}>
            <Text style={styles.authTitle}>Ready to join the vibe?</Text>
            
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/login')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ffffff', '#f8fafc']}
                style={styles.buttonGradient}
              >
                <View style={styles.buttonIcon}>
                  <User size={20} color="#6366f1" />
                </View>
                <Text style={styles.primaryButtonText}>Login as Student</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4285f4', '#34a853']}
                style={styles.buttonGradient}
              >
                <View style={styles.buttonIcon}>
                  <Text style={styles.googleIcon}>G</Text>
                </View>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => router.push('/(tabs)')}
              activeOpacity={0.7}
            >
              <UserCheck size={18} color="#ffffff" />
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>

          {/* Enhanced Benefits Section with Carousel */}
          <View style={styles.benefitsSection}>
            <View style={styles.benefitsHeader}>
              <Text style={styles.benefitsTitle}>Why Students Love Us</Text>
              <Text style={styles.benefitsSubtitle}>Everything you need for the perfect dining experience</Text>
            </View>
            
            {/* Benefit Carousel */}
            <View style={styles.carouselContainer}>
              <TouchableOpacity style={styles.carouselButton} onPress={prevBenefit}>
                <ChevronLeft size={20} color="#ffffff" />
              </TouchableOpacity>
              
              <View style={styles.benefitCardContainer}>
                <LinearGradient
                  colors={benefits[currentBenefitIndex].bgGradient}
                  style={styles.benefitCard}
                >
                  <LinearGradient
                    colors={benefits[currentBenefitIndex].gradient}
                    style={styles.benefitIcon}
                  >
                    <benefits[currentBenefitIndex].icon size={28} color="#ffffff" />
                  </LinearGradient>
                  <Text style={styles.benefitTitle}>{benefits[currentBenefitIndex].title}</Text>
                  <Text style={styles.benefitDescription}>
                    {benefits[currentBenefitIndex].description}
                  </Text>
                </LinearGradient>
              </View>
              
              <TouchableOpacity style={styles.carouselButton} onPress={nextBenefit}>
                <ChevronRight size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Carousel Indicators */}
            <View style={styles.carouselIndicators}>
              {benefits.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.indicator,
                    index === currentBenefitIndex && styles.activeIndicator,
                  ]}
                  onPress={() => setCurrentBenefitIndex(index)}
                />
              ))}
            </View>

            {/* All Benefits Grid (Compact) */}
            <View style={styles.allBenefitsGrid}>
              {benefits.map((benefit, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.miniCard,
                    index === currentBenefitIndex && styles.activeMiniCard,
                  ]}
                  onPress={() => setCurrentBenefitIndex(index)}
                >
                  <LinearGradient
                    colors={benefit.bgGradient}
                    style={styles.miniCardGradient}
                  >
                    <View style={[styles.miniIcon, { backgroundColor: benefit.color }]}>
                      <benefit.icon size={16} color="#ffffff" />
                    </View>
                    <Text style={styles.miniCardText}>{benefit.title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Admin Access Section */}
          <View style={styles.adminSection}>
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => router.push('/admin')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.adminGradient}
              >
                <Shield size={18} color="#ffffff" />
                <Text style={styles.adminButtonText}>Admin Dashboard</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Footer Quote */}
          <View style={styles.footerQuote}>
            <Text style={styles.quoteText}>✨ Where every meal is a celebration ✨</Text>
          </View>
        </ScrollView>

        {/* Back to Top Button */}
        {showBackToTop && (
          <TouchableOpacity style={styles.backToTop} onPress={scrollToTop}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.backToTopGradient}
            >
              <ArrowUp size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  musicToggle: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 1,
  },
  floatingIcon: {
    position: 'absolute',
  },
  floatingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
    zIndex: 2,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoWrapper: {
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  logoGlow: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 58,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: -1,
  },
  logoPulse: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    borderRadius: 66,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    zIndex: -2,
  },
  brandSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#f1f5f9',
    letterSpacing: 0.3,
  },
  authSection: {
    marginBottom: 50,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  googleButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIcon: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6366f1',
    letterSpacing: 0.3,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  guestButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  benefitsSection: {
    marginBottom: 40,
  },
  benefitsHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
  benefitsSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    textAlign: 'center',
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  carouselButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  benefitCardContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  benefitCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  benefitIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  benefitTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#ffffff',
    width: 24,
  },
  allBenefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  miniCard: {
    width: (width - 72) / 3,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeMiniCard: {
    transform: [{ scale: 1.05 }],
  },
  miniCardGradient: {
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  miniIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  miniCardText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  adminSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  adminButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  adminGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  adminButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  footerQuote: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  quoteText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  backToTop: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  backToTopGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});