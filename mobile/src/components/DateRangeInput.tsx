import React, {memo} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../styles/colors';
import {formatDate} from '@utils/constants';

type DateRangeInputProps = {
  checkInDate?: string;
  checkOutDate?: string;
  onPress: () => void;
};

const DateRangeInput = memo(
  ({checkInDate, checkOutDate, onPress}: DateRangeInputProps) => {
    return (
      <Pressable
        style={({pressed}) => [styles.inputRow, pressed && styles.pressedInput]}
        onPress={onPress}
        android_ripple={{color: '#e0e0e0'}}>
        <AntDesign name="calendar" size={24} color={COLORS.black} />
        <Text style={styles.inputText}>
          {checkInDate && checkOutDate ? (
            formatDate(checkInDate, true) +
            ' - ' +
            formatDate(checkOutDate, true)
          ) : (
            <Text style={styles.inputTextPlaceholder}>
              Chọn ngày nhận và trả phòng
            </Text>
          )}
        </Text>
      </Pressable>
    );
  },
);

export default DateRangeInput;
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
