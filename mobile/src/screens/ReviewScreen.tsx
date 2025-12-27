import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {COLORS} from '@styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '@utils/constants';
import useAuthStore from '@stores/authStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Define types for our data
interface Hotel {
  id: number;
  name: string;
  images: string;
}

interface Rating {
  id: number;
  overall: number;
  comment: string;
  createdAt: string;
}

interface BookingHotel {
  id: number;
  checkin_date: string;
  checkout_date: string;
  Hotel: Hotel;
  rating?: Rating;
}

interface UserHotelsResponse {
  unratedHotels: BookingHotel[];
  ratedHotels: BookingHotel[];
  unratedCount: number;
  ratedCount: number;
}

const ReviewScreen = ({route}) => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [unratedHotels, setUnratedHotels] = useState<BookingHotel[]>([]);
  const [ratedHotels, setRatedHotels] = useState<BookingHotel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'unrated' | 'rated'>('unrated');
  const {token, user} = useAuthStore();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        fetchUserHotels();
        navigation.setParams({refresh: undefined});
      }
      return () => {};
    }, [route.params?.refresh]),
  );

  useEffect(() => {
    fetchUserHotels();
  }, []);

  const fetchUserHotels = async () => {
    try {
      setLoading(true);

      if (!token) {
        setError('Vui lòng đăng nhập để xem đánh giá');
        setLoading(false);
        return;
      }

      const response = await axios.get<UserHotelsResponse>(
        `${API_URL}/ratings/user-hotels`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUnratedHotels(response.data.unratedHotels);
      setRatedHotels(response.data.ratedHotels);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError('Không thể tải danh sách khách sạn');
      setLoading(false);
    }
  };

  const handleReview = (hotel: Hotel, hotelId: number, bookingId: number) => {
    console.log('Navigating with bookingId:', bookingId);
    navigation.navigate('Step1Review', {
      hotel,
      hotelId,
      bookingId,
    });
  };

  const handleViewRating = (hotel: Hotel, rating: Rating) => {
    // Có thể thêm màn hình xem chi tiết đánh giá sau này
    console.log('View rating for hotel:', hotel.name, 'Rating:', rating);
  };

  // Format date to display in Vietnamese format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day} thg ${month}, ${year}`;
  };

  // Render unrated hotel item
  const renderUnratedHotelItem = ({item}: {item: BookingHotel}) => {
    return (
      <Pressable
        style={({pressed}) => [
          styles.hotelCard,
          {
            backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
          },
        ]}
        onPress={() => handleReview(item.Hotel, item.Hotel.id, item.id)}>
        <View style={styles.hotelInfo}>
          <View style={styles.hotelDetails}>
            <Text style={styles.statusBadge}>Chưa đánh giá</Text>
            <Text style={styles.hotelName}>{item.Hotel.name}</Text>
            <View>
              <Text style={styles.hotelDescription}>Phòng đã đặt</Text>
              <Text style={styles.stayDates}>
                {formatDate(item?.checkin_date)} -{' '}
                {formatDate(item?.checkout_date)}
              </Text>
            </View>
          </View>
          {item?.Hotel?.images && (
            <Image
              source={{
                uri: `${API_URL}/hotel-properties/hotel/get-image/${
                  item.Hotel.id
                }/${item.Hotel.images.split(',')[0]}`,
              }}
              style={styles.hotelImage}
            />
          )}
        </View>
        <Pressable
          style={({pressed}) => [
            styles.reviewButton,
            pressed && styles.reviewButtonPressed,
          ]}
          onPress={() => handleReview(item.Hotel, item.Hotel.id, item.id)}>
          <Text style={styles.reviewButtonText}>Viết đánh giá</Text>
          <Entypo name="dot-single" size={30} color={COLORS.red} />
        </Pressable>
      </Pressable>
    );
  };

  // Render rated hotel item
  const renderRatedHotelItem = ({item}: {item: BookingHotel}) => {
    if (!item.rating) return null;

    return (
      <View style={styles.hotelCard}>
        <View style={styles.hotelInfo}>
          <View style={styles.hotelDetails}>
            <Text style={[styles.statusBadge, styles.ratedBadge]}>
              Đã đánh giá
            </Text>
            <Text style={styles.hotelName}>{item.Hotel.name}</Text>
            <View>
              <Text style={styles.hotelDescription}>Phòng đã đặt</Text>
              <Text style={styles.stayDates}>
                {formatDate(item?.checkin_date)} -{' '}
                {formatDate(item?.checkout_date)}
              </Text>
            </View>
          </View>
          {item?.Hotel?.images && (
            <Image
              source={{
                uri: `${API_URL}/hotel-properties/hotel/get-image/${
                  item.Hotel.id
                }/${item.Hotel.images.split(',')[0]}`,
              }}
              style={styles.hotelImage}
            />
          )}
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingHeader}>
            <View style={styles.ratingScore}>
              <Text style={styles.ratingScoreText}>{item.rating.overall}</Text>
              <MaterialIcons name="star" size={16} color={COLORS.yellowGold} />
            </View>
            <Text style={styles.ratingDate}>
              Đánh giá vào {formatDate(item.rating.createdAt)}
            </Text>
          </View>

          <Text style={styles.ratingComment} numberOfLines={2}>
            "{item.rating.comment}"
          </Text>

          {/* <TouchableOpacity
            style={styles.viewRatingButton}
            onPress={() => handleViewRating(item.Hotel, item.rating!)}>
            <Text style={styles.viewRatingText}>Xem đánh giá</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  // Show loading indicator
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Show error message
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Show empty state if both lists are empty
  if (unratedHotels.length === 0 && ratedHotels.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Bạn chưa có lịch sử đặt phòng nào</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tab navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'unrated' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('unrated')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'unrated' && styles.activeTabText,
            ]}>
            Chưa đánh giá ({unratedHotels.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'rated' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('rated')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'rated' && styles.activeTabText,
            ]}>
            Đã đánh giá ({ratedHotels.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === 'unrated' ? (
        unratedHotels.length > 0 ? (
          <FlatList
            data={unratedHotels}
            renderItem={renderUnratedHotelItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              Bạn đã đánh giá tất cả khách sạn đã lưu trú
            </Text>
          </View>
        )
      ) : ratedHotels.length > 0 ? (
        <FlatList
          data={ratedHotels}
          renderItem={renderRatedHotelItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Bạn chưa đánh giá khách sạn nào</Text>
        </View>
      )}
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
    backgroundColor: COLORS.white,
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.gray,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  hotelCard: {
    padding: 16,
    borderBottomWidth: 5,
    borderColor: COLORS.grayLight,
    gap: 16,
  },
  hotelInfo: {
    flexDirection: 'row',
  },
  hotelDetails: {
    flex: 1,
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.opacityDark,
    alignSelf: 'flex-start',
    color: COLORS.black,
    borderRadius: 4,
    fontSize: 12,
  },
  ratedBadge: {
    borderColor: COLORS.green,
    color: COLORS.green,
  },
  hotelName: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  hotelDescription: {
    fontSize: 12,
  },
  stayDates: {
    color: COLORS.opacityDark,
    fontSize: 12,
    marginTop: 2,
  },
  hotelImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewButtonPressed: {
    opacity: 0.5,
  },
  reviewButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    backgroundColor: COLORS.grayLight,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  ratingDate: {
    fontSize: 12,
    color: COLORS.gray,
  },
  ratingComment: {
    color: COLORS.black,
    fontStyle: 'italic',
  },
  viewRatingButton: {
    alignSelf: 'flex-end',
  },
  viewRatingText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: COLORS.black,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ReviewScreen;
