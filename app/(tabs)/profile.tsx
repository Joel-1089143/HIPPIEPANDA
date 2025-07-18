import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Bell,
  Shield,
  Settings,
  MapPin,
  CreditCard,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', onPress: () => {} },
        { icon: Mail, label: 'Change Email', onPress: () => {} },
        { icon: Phone, label: 'Update Phone', onPress: () => {} },
        { icon: Calendar, label: 'Membership Details', onPress: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: Bell, 
          label: 'Notifications', 
          hasSwitch: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        { 
          icon: isDarkMode ? Moon : Sun, 
          label: 'Dark Mode', 
          hasSwitch: true,
          value: isDarkMode,
          onToggle: setIsDarkMode,
        },
        { 
          icon: Shield, 
          label: 'Biometric Login', 
          hasSwitch: true,
          value: biometricEnabled,
          onToggle: setBiometricEnabled,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        { icon: MapPin, label: 'Delivery Addresses', onPress: () => {} },
        { icon: CreditCard, label: 'Payment Methods', onPress: () => {} },
        { 
          icon: Settings, 
          label: 'App Settings', 
          onPress: () => router.push('/settings'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, isDarkMode && styles.darkHeader]}>
          <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Profile</Text>
        </View>

        <View style={[styles.profileCard, isDarkMode && styles.darkProfileCard]}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, isDarkMode && styles.darkProfileName]}>John Doe</Text>
            <Text style={[styles.profileEmail, isDarkMode && styles.darkProfileEmail]}>john.doe@university.edu</Text>
            <Text style={[styles.profilePhone, isDarkMode && styles.darkProfilePhone]}>+91 98765 43210</Text>
            <View style={styles.membershipBadge}>
              <Text style={styles.membershipText}>Premium Member</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.editButton, isDarkMode && styles.darkEditButton]}>
            <Text style={[styles.editButtonText, isDarkMode && styles.darkEditButtonText]}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, isDarkMode && styles.darkStatCard]}>
            <Text style={[styles.statNumber, isDarkMode && styles.darkStatNumber]}>47</Text>
            <Text style={[styles.statLabel, isDarkMode && styles.darkStatLabel]}>Orders</Text>
          </View>
          <View style={[styles.statCard, isDarkMode && styles.darkStatCard]}>
            <Text style={[styles.statNumber, isDarkMode && styles.darkStatNumber]}>₹3,245</Text>
            <Text style={[styles.statLabel, isDarkMode && styles.darkStatLabel]}>Total Spent</Text>
          </View>
          <View style={[styles.statCard, isDarkMode && styles.darkStatCard]}>
            <Text style={[styles.statNumber, isDarkMode && styles.darkStatNumber]}>4.8</Text>
            <Text style={[styles.statLabel, isDarkMode && styles.darkStatLabel]}>Rating</Text>
          </View>
        </View>

        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkSectionTitle]}>{section.title}</Text>
            <View style={[styles.sectionContent, isDarkMode && styles.darkSectionContent]}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[styles.settingItem, isDarkMode && styles.darkSettingItem]}
                  onPress={item.onPress}
                  disabled={item.hasSwitch}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, isDarkMode && styles.darkSettingIcon]}>
                      <item.icon size={20} color={isDarkMode ? "#8b5cf6" : "#6366f1"} />
                    </View>
                    <Text style={[styles.settingLabel, isDarkMode && styles.darkSettingLabel]}>{item.label}</Text>
                  </View>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: isDarkMode ? '#374151' : '#e5e7eb', true: isDarkMode ? '#8b5cf6' : '#6366f1' }}
                      thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
                    />
                  ) : (
                    <ChevronRight size={20} color={isDarkMode ? "#6b7280" : "#9ca3af"} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.subscriptionButton, isDarkMode && styles.darkSubscriptionButton]}
          onPress={() => router.push('/subscription')}
        >
          <Text style={styles.subscriptionButtonText}>Manage Subscription</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, isDarkMode && styles.darkLogoutButton]}
          onPress={() => router.replace('/welcome')}
        >
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  darkHeader: {
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  darkTitle: {
    color: '#ffffff',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  darkProfileCard: {
    backgroundColor: '#1f2937',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    alignSelf: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  darkProfileName: {
    color: '#ffffff',
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  darkProfileEmail: {
    color: '#9ca3af',
  },
  profilePhone: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 12,
  },
  darkProfilePhone: {
    color: '#9ca3af',
  },
  membershipBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membershipText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  editButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  darkEditButton: {
    backgroundColor: '#374151',
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366f1',
  },
  darkEditButtonText: {
    color: '#8b5cf6',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkStatCard: {
    backgroundColor: '#1f2937',
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  darkStatNumber: {
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  darkStatLabel: {
    color: '#9ca3af',
  },
  section: {
    marginBottom: 16,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  darkSectionTitle: {
    color: '#ffffff',
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  darkSectionContent: {
    backgroundColor: '#1f2937',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  darkSettingItem: {
    borderBottomColor: '#374151',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  darkSettingIcon: {
    backgroundColor: '#374151',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
  },
  darkSettingLabel: {
    color: '#ffffff',
  },
  subscriptionButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  darkSubscriptionButton: {
    backgroundColor: '#8b5cf6',
  },
  subscriptionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  darkLogoutButton: {
    backgroundColor: '#1f2937',
    borderColor: '#7f1d1d',
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginLeft: 8,
  },
});