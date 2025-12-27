import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../styles/colors';

type SearchButtonProps = {
  onPress: () => void;
};

const SearchButton = memo(({onPress}: SearchButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.searchButton}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.searchButtonText}>Tìm</Text>
    </TouchableOpacity>
  );
});

export default SearchButton;

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  searchButtonText: {
    paddingVertical: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
});
