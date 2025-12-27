import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

interface RoomTypeProps {
  title: string;
  image: string;
  isSelected: boolean;
  onPress: () => void;
}
const RoomType: React.FC<RoomTypeProps> = ({
  title,
  isSelected,
  onPress,
  image,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isSelected && styles.isSelected]}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 16,
    width: 102,
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  image: {
    width: 70,
    height: 70,
  },
  isSelected: {
    borderColor: '#0165ff',
    borderWidth: 2,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    marginTop: 5,
    width: '100%',
  },
});
export default RoomType;
