import React, {memo} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../styles/colors';

type SearchLocationInputProps = {
  address?: string;
  onPress: () => void;
};

const SearchLocationInput = memo(
  ({address, onPress}: SearchLocationInputProps) => {
    return (
      <Pressable
        style={({pressed}) => [styles.inputRow, pressed && styles.pressedInput]}
        onPress={onPress}
        android_ripple={{color: '#e0e0e0'}}>
        <AntDesign name="search1" size={24} color={COLORS.black} />
        {address ? (
          <Text style={styles.inputText} numberOfLines={1} ellipsizeMode="tail">
            {address}
          </Text>
        ) : (
          <Text style={styles.inputTextPlaceholder}>Nhập điểm đến của bạn</Text>
        )}
      </Pressable>
    );
  },
);

export default SearchLocationInput;

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
