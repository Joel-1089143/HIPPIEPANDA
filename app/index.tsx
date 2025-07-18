import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to welcome screen on app start
    router.replace('/welcome');
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1',
  },
});