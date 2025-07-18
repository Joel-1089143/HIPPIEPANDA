import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, DollarSign, Tag, FileText, Image as ImageIcon } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import AnimatedButton from '@/components/AnimatedButton';

export default function AddMenuItemScreen() {
  const router = useRouter();
  const { categories, addMenuItem, addCategory, isDarkMode } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || 'Biryani',
    price: '',
    description: '',
    imageUrl: '',
    isVeg: true,
  });
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
      setShowAddCategory(false);
      Alert.alert('Success', 'Category added successfully!');
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Use a default image if none provided
    const imageUrl = formData.imageUrl || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1';

    addMenuItem({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      description: formData.description,
      imageUrl,
      isVeg: formData.isVeg,
    });

    Alert.alert(
      'Success',
      `${formData.name} has been added to the menu!`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <AnimatedButton
          onPress={() => router.back()}
          style={[styles.backButton, isDarkMode && styles.darkBackButton]}
        >
          <ArrowLeft size={24} color={isDarkMode ? "#ffffff" : "#1f2937"} />
        </AnimatedButton>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Add Menu Item</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.form, isDarkMode && styles.darkCard]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Item Name *</Text>
            <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
              <Tag size={20} color="#6b7280" />
              <TextInput
                style={[styles.input, isDarkMode && styles.darkText]}
                placeholder="Enter dish name"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <AnimatedButton
                    key={category}
                    style={[
                      styles.categoryChip,
                      formData.category === category && styles.selectedCategoryChip,
                      isDarkMode && styles.darkCategoryChip,
                    ]}
                    onPress={() => handleInputChange('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        formData.category === category && styles.selectedCategoryChipText,
                        isDarkMode && styles.darkText,
                      ]}
                    >
                      {category}
                    </Text>
                  </AnimatedButton>
                ))}
                <AnimatedButton
                  style={[styles.addCategoryChip, isDarkMode && styles.darkAddCategoryChip]}
                  onPress={() => setShowAddCategory(true)}
                >
                  <Plus size={16} color="#6366f1" />
                  <Text style={styles.addCategoryText}>Add</Text>
                </AnimatedButton>
              </View>
            </ScrollView>
            
            {showAddCategory && (
              <View style={styles.addCategorySection}>
                <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
                  <TextInput
                    style={[styles.input, isDarkMode && styles.darkText]}
                    placeholder="New category name"
                    placeholderTextColor="#9ca3af"
                    value={newCategory}
                    onChangeText={setNewCategory}
                  />
                </View>
                <View style={styles.categoryActions}>
                  <AnimatedButton
                    onPress={handleAddCategory}
                    style={styles.addCategoryButton}
                  >
                    <Text style={styles.addCategoryButtonText}>Add Category</Text>
                  </AnimatedButton>
                  <AnimatedButton
                    onPress={() => {
                      setShowAddCategory(false);
                      setNewCategory('');
                    }}
                    style={[styles.cancelButton, isDarkMode && styles.darkCancelButton]}
                  >
                    <Text style={[styles.cancelButtonText, isDarkMode && styles.darkText]}>Cancel</Text>
                  </AnimatedButton>
                </View>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Price (₹) *</Text>
            <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
              <DollarSign size={20} color="#6b7280" />
              <TextInput
                style={[styles.input, isDarkMode && styles.darkText]}
                placeholder="Enter price"
                placeholderTextColor="#9ca3af"
                value={formData.price}
                onChangeText={(value) => handleInputChange('price', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Description *</Text>
            <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
              <FileText size={20} color="#6b7280" />
              <TextInput
                style={[styles.input, styles.textArea, isDarkMode && styles.darkText]}
                placeholder="Describe the dish"
                placeholderTextColor="#9ca3af"
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Image URL (Optional)</Text>
            <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
              <ImageIcon size={20} color="#6b7280" />
              <TextInput
                style={[styles.input, isDarkMode && styles.darkText]}
                placeholder="Enter image URL"
                placeholderTextColor="#9ca3af"
                value={formData.imageUrl}
                onChangeText={(value) => handleInputChange('imageUrl', value)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Dietary Type</Text>
            <View style={styles.dietaryContainer}>
              <AnimatedButton
                style={[
                  styles.dietaryOption,
                  formData.isVeg && styles.selectedDietaryOption,
                  isDarkMode && styles.darkDietaryOption,
                ]}
                onPress={() => handleInputChange('isVeg', true)}
              >
                <View style={[styles.vegIndicator, { backgroundColor: '#10b981' }]} />
                <Text style={[
                  styles.dietaryText,
                  formData.isVeg && styles.selectedDietaryText,
                  isDarkMode && styles.darkText,
                ]}>
                  Vegetarian
                </Text>
              </AnimatedButton>
              
              <AnimatedButton
                style={[
                  styles.dietaryOption,
                  !formData.isVeg && styles.selectedDietaryOption,
                  isDarkMode && styles.darkDietaryOption,
                ]}
                onPress={() => handleInputChange('isVeg', false)}
              >
                <View style={[styles.vegIndicator, { backgroundColor: '#ef4444' }]} />
                <Text style={[
                  styles.dietaryText,
                  !formData.isVeg && styles.selectedDietaryText,
                  isDarkMode && styles.darkText,
                ]}>
                  Non-Vegetarian
                </Text>
              </AnimatedButton>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomContainer, isDarkMode && styles.darkCard]}>
        <AnimatedButton style={styles.submitButton} onPress={handleSubmit}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.submitButtonText}>Add to Menu</Text>
        </AnimatedButton>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#1f2937',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  darkInputContainer: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    marginLeft: 12,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  darkCategoryChip: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  selectedCategoryChip: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  selectedCategoryChipText: {
    color: '#ffffff',
  },
  addCategoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0ff',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  darkAddCategoryChip: {
    backgroundColor: '#374151',
  },
  addCategoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginLeft: 4,
  },
  addCategorySection: {
    marginTop: 12,
  },
  categoryActions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  addCategoryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addCategoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  darkCancelButton: {
    backgroundColor: '#374151',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
  },
  dietaryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dietaryOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  darkDietaryOption: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  selectedDietaryOption: {
    backgroundColor: '#f0f0ff',
    borderColor: '#6366f1',
  },
  vegIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  dietaryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  selectedDietaryText: {
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
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
});