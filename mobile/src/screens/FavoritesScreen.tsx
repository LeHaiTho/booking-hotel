import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '@styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFavorites} from '../contexts/FavoritesContext';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@utils/constants';
const FavoritesScreen = ({navigation}: any) => {
  const {favorites, loading, toggleFavorite} = useFavorites();
  console.log('favorites', favorites);

  const handlePressHotel = (hotelId: number) => {
    navigation.navigate('HotelDetail', {hotelId});
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (favorites?.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <AntDesign name="hearto" size={50} color={COLORS.gray} />
        <Text style={styles.emptyText}>
          Bạn chưa có khách sạn yêu thích nào
        </Text>
        <Text style={styles.emptySubText}>
          Nhấn vào biểu tượng trái tim trên khách sạn để thêm vào danh sách yêu
          thích
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.hotelCard}
            onPress={() => handlePressHotel(item.id)}>
            <Image
              source={{
                uri: `${API_URL}/hotel-properties/hotel/get-image/${item?.id}/${
                  item?.images?.split(',')[4]
                }`,
              }}
              style={styles.hotelImage}
              resizeMode="cover"
            />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.hotelAddress} numberOfLines={2}>
                {item.address}
              </Text>
              {item.rating ? (
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>
                    {item.rating.toFixed(1)}
                  </Text>
                </View>
              ) : (
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Chưa có đánh giá</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item)}>
              <AntDesign name="heart" size={24} color={COLORS.red} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
  },
  hotelCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hotelImage: {
    width: 100,
    height: 100,
  },
  hotelInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  hotelAddress: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  ratingContainer: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  ratingText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  favoriteButton: {
    padding: 12,
    justifyContent: 'center',
  },
});

export default FavoritesScreen;
