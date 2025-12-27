import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Touchable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import IconComponent from './IconComponent';

const height = Dimensions.get('window').height * 0.6;
interface SlideUpViewComponentProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  slideHeight?: number;
}

const SlideUpViewComponent: React.FC<SlideUpViewComponentProps> = ({
  visible,
  onClose,
  children,
  slideHeight = height,
}) => {
  const slideAnim = useRef(new Animated.Value(slideHeight)).current;
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: slideHeight,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };
  useEffect(() => {
    if (visible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [visible]);

  return (
    <>
      <Animated.View
        style={[
          styles.slideView,
          {
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}
          onPress={slideDown}>
          <IconComponent
            name="close"
            size={20}
            library="AntDesign"
            color="#000"
          />
        </TouchableOpacity>
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  slideView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    backgroundColor: '#fff',
    padding: 16,
    gap: 16,
  },
});

export default SlideUpViewComponent;
