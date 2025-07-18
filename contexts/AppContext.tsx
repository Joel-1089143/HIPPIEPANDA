import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  isVeg: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  popular: boolean;
  features: string[];
  description: string;
  subscribers: number;
}

interface AppContextType {
  // Menu Management
  menuItems: MenuItem[];
  categories: string[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: number, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: number) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  
  // Cart Management
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  
  // Subscription Management
  subscriptionPlans: SubscriptionPlan[];
  addSubscriptionPlan: (plan: Omit<SubscriptionPlan, 'id'>) => void;
  updateSubscriptionPlan: (id: number, plan: Partial<SubscriptionPlan>) => void;
  deleteSubscriptionPlan: (id: number) => void;
  
  // App State
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: number) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Menu State - Start with empty menu
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['Biryani', 'Snacks', 'Drinks', 'Desserts']);
  
  // Cart State - Start with empty cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Subscription State - Start with basic plans but 0 subscribers
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: 1,
      name: 'Basic Plan',
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
      subscribers: 0,
    },
    {
      id: 2,
      name: 'Premium Plan',
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
      subscribers: 0,
    },
    {
      id: 3,
      name: 'Ultimate Plan',
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
      subscribers: 0,
    },
  ]);
  
  // App State
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Welcome to Hippie Panda! 🎉',
      message: 'Explore our delicious menu and start ordering your favorite meals.',
      type: 'info',
      read: false,
      timestamp: new Date(),
    },
    {
      id: 2,
      title: 'Student Discount Available',
      message: 'Get 20% off on all subscription plans with your student ID.',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: 3,
      title: 'New Menu Items Added',
      message: 'Check out our latest additions to the menu in the Biryani section.',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
  ]);
  
  // Menu Management Functions
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now() + Math.random(), // Simple ID generation
    };
    setMenuItems(prev => [...prev, newItem]);
    
    // Add notification
    addNotification({
      title: 'New Menu Item Added',
      message: `${item.name} has been added to the ${item.category} section.`,
      type: 'success',
    });
  };
  
  const updateMenuItem = (id: number, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };
  
  const deleteMenuItem = (id: number) => {
    const item = menuItems.find(item => item.id === id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    // Also remove from cart if it exists
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    if (item) {
      addNotification({
        title: 'Menu Item Removed',
        message: `${item.name} has been removed from the menu.`,
        type: 'warning',
      });
    }
  };
  
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };
  
  const deleteCategory = (category: string) => {
    // Only delete if no items use this category
    const hasItems = menuItems.some(item => item.category === category);
    if (!hasItems) {
      setCategories(prev => prev.filter(cat => cat !== category));
    }
  };
  
  // Cart Management Functions
  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };
  
  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };
  
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Subscription Management Functions
  const addSubscriptionPlan = (plan: Omit<SubscriptionPlan, 'id'>) => {
    const newPlan: SubscriptionPlan = {
      ...plan,
      id: Date.now() + Math.random(),
      subscribers: 0, // Start with 0 subscribers
    };
    setSubscriptionPlans(prev => [...prev, newPlan]);
  };
  
  const updateSubscriptionPlan = (id: number, updates: Partial<SubscriptionPlan>) => {
    setSubscriptionPlans(prev => prev.map(plan =>
      plan.id === id ? { ...plan, ...updates } : plan
    ));
  };
  
  const deleteSubscriptionPlan = (id: number) => {
    setSubscriptionPlans(prev => prev.filter(plan => plan.id !== id));
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Notification Functions
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  const value: AppContextType = {
    // Menu
    menuItems,
    categories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addCategory,
    deleteCategory,
    
    // Cart
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    
    // Subscriptions
    subscriptionPlans,
    addSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    
    // App State
    isDarkMode,
    toggleDarkMode,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}