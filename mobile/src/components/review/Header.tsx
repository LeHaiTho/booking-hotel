import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {COLORS} from '@styles/colors';

type HeaderProps = {
  hotelInfo: {
    imageUrl: string;
    name: string;
    roomType: string;
    stayDetails: string;
    date: string;
  };
};
const Header = ({hotelInfo}: HeaderProps) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={{uri: hotelInfo.imageUrl}} style={styles.image} />
      <View style={styles.textOverlay}>
        <Text style={styles.overlayTitle}>{`Đánh giá: ${hotelInfo.name}`}</Text>
        <Text style={styles.overlaySubtitle}>{hotelInfo.roomType}</Text>
        <Text style={styles.overlayText}>{hotelInfo.stayDetails}</Text>
        <Text style={styles.overlayText}>{hotelInfo.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    position: 'relative',
    backgroundColor: COLORS.primaryDark,
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  overlayTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  overlaySubtitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlayText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default Header;
