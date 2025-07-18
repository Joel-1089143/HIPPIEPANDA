import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Moon, Sun, Bell, Shield, Globe, Palette, Database, CircleHelp as HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useAppContext();

  const settingSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: isDarkMode ? Moon : Sun,
          label: 'Dark Mode',
          hasSwitch: true,
          value: isDarkMode,
          onToggle: toggleDarkMode,
          description: 'Switch between light and dark themes',
        },
        {
          icon: Palette,
          label: 'Theme Customization',
          onPress: () => Alert.alert('Theme Customization', 'Advanced theme options coming soon!'),
          description: 'Customize colors and appearance',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          hasSwitch: true,
          value: true,
          onToggle: () => {},
          description: 'Receive push notifications on your device',
        },
        {
          icon: Bell,
          label: 'Email Notifications',
          hasSwitch: true,
          value: false,
          onToggle: () => {},
          description: 'Receive notifications via email',
        },
      ],
    },
    {
      title: 'Security & Privacy',
      items: [
        {
          icon: Shield,
          label: 'Privacy Settings',
          onPress: () => Alert.alert('Privacy Settings', 'Manage your privacy preferences'),
          description: 'Control your data and privacy',
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          icon: Database,
          label: 'Clear Cache',
          onPress: () => {
            Alert.alert(
              'Clear Cache',
              'This will clear temporary files and may improve performance. Continue?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', onPress: () => Alert.alert('Success', 'Cache cleared successfully!') },
              ]
            );
          },
          description: 'Free up storage space',
        },
      ],
    },
    {
      title: 'Language & Region',
      items: [
        {
          icon: Globe,
          label: 'Language',
          value: 'English',
          onPress: () => Alert.alert('Language', 'Language selection coming soon!'),
          description: 'Choose your preferred language',
        },
      ],
    },
    {
      title: 'Support & About',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          onPress: () => Alert.alert('Help & Support', 'Contact our support team for assistance'),
          description: 'Get help and contact support',
        },
        {
          icon: Info,
          label: 'About Hippie Panda',
          onPress: () => Alert.alert('About', 'Hippie Panda v1.0.0\nGreat Vibes, Food and Music'),
          description: 'App version and information',
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/welcome'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <AnimatedButton
          onPress={() => router.back()}
          style={[styles.backButton, isDarkMode && styles.darkBackButton]}
        >
          <ArrowLeft size={24} color={isDarkMode ? "#ffffff" : "#1f2937"} />
        </AnimatedButton>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkSectionTitle]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContent, isDarkMode && styles.darkSectionContent]}>
              {section.items.map((item, itemIndex) => (
                <AnimatedButton
                  key={itemIndex}
                  onPress={item.onPress}
                  style={[
                    styles.settingItem,
                    isDarkMode && styles.darkSettingItem,
                  ]}
                  disabled={item.hasSwitch}
                >
                  <View style={styles.settingLeft}>
                    <View style={[
                      styles.settingIcon,
                      isDarkMode && styles.darkSettingIcon,
                    ]}>
                      <item.icon 
                        size={20} 
                        color={isDarkMode ? "#8b5cf6" : "#6366f1"} 
                      />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[
                        styles.settingLabel,
                        isDarkMode && styles.darkSettingLabel,
                      ]}>
                        {item.label}
                      </Text>
                      <Text style={[
                        styles.settingDescription,
                        isDarkMode && styles.darkSettingDescription,
                      ]}>
                        {item.description}
                      </Text>
                      {item.value && !item.hasSwitch && (
                        <Text style={[styles.settingValue, isDarkMode && styles.darkSettingValue]}>
                          {item.value}
                        </Text>
                      )}
                    </View>
                  </View>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ 
                        false: isDarkMode ? '#374151' : '#e5e7eb', 
                        true: isDarkMode ? '#8b5cf6' : '#6366f1' 
                      }}
                      thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
                    />
                  ) : (
                    <ChevronRight 
                      size={20} 
                      color={isDarkMode ? "#6b7280" : "#9ca3af"} 
                    />
                  )}
                </AnimatedButton>
              ))}
            </View>
          </View>
        ))}

        <AnimatedButton
          onPress={handleLogout}
          style={[styles.logoutButton, isDarkMode && styles.darkLogoutButton]}
        >
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </AnimatedButton>
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
    backgroundColor: '#f9fafb',
  },
  darkHeader: {
    backgroundColor: '#111827',
  },
  backButton: {
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
  darkBackButton: {
    backgroundColor: '#374151',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  darkTitle: {
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
    marginRight: 16,
  },
  darkSettingIcon: {
    backgroundColor: '#374151',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  darkSettingLabel: {
    color: '#ffffff',
  },
  settingDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 16,
  },
  darkSettingDescription: {
    color: '#9ca3af',
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginTop: 4,
  },
  darkSettingValue: {
    color: '#8b5cf6',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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