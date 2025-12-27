import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {COLORS} from '@styles/colors';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Animation for text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
        MNMQ.com
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003b95',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
