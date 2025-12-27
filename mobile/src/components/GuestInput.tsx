// GuestInput.jsx
import React, {memo} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../styles/colors';

type GuestInputProps = {
  adults?: number;
  children?: number;
  rooms?: number;
  onPress: () => void;
};

const GuestInput = memo(
  ({adults = 2, children = 0, rooms = 1, onPress}: GuestInputProps) => {
    return (
      <Pressable
        style={({pressed}) => [styles.inputRow, pressed && styles.pressedInput]}
        onPress={onPress}
        android_ripple={{color: '#e0e0e0'}}>
        <AntDesign name="user" size={24} color={COLORS.black} />
        <Text style={styles.inputText}>
          {rooms} phòng - <Text>{adults} người lớn</Text> -{' '}
          <Text>{children} trẻ em</Text>
        </Text>
      </Pressable>
    );
  },
);

export default GuestInput;

const styles = StyleSheet.create({
  inputRow: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 2,
    gap: 10,
  },
  pressedInput: {
    backgroundColor: '#f5f5f5',
  },
  inputText: {
    color: COLORS.black,
    flex: 1,
  },
  inputTextPlaceholder: {
    color: COLORS.gray,
    flex: 1,
  },
});
