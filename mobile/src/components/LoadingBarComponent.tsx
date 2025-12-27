import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';

const LoadingBarComponent = () => {
  const translateX = useRef(new Animated.Value(-100)).current; // Vị trí ban đầu

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 400, // Di chuyển sang phải ngoài màn hình
        duration: 1000, // Thời gian chạy
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, {transform: [{translateX}]}]} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 4,
    width: '100%',
    backgroundColor: '#ccc',
  },
  track: {
    height: 4,
    overflow: 'hidden',
    backgroundColor: '#FFFACD',
  },
  bar: {
    width: 200,
    height: 4,
    backgroundColor: '#FFC72C', // Màu vàng của Booking.com
  },
});
export default LoadingBarComponent;
