import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
// import {Icon} from 'react-native-vector-icons/Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import ModalComponent from '@components/ModalComponent';
import SearchComponent from '@components/SearchComponent';
import {useIsFocused, useRoute, useFocusEffect} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import {
  API_URL,
  formatDate,
  getCurrentDateFormatted,
  getDefaultCheckOutDate,
} from '@utils/constants';
import useAuthStore from '@stores/authStore';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text} from 'react-native';
import {useCallback, useEffect, useRef, useState, useMemo} from 'react';

// Tạo kiểu dữ liệu cho icon để đảm bảo nó có cấu trúc đúng
type IconType = {
  name: string;
  library:
    | 'AntDesign'
    | 'Ionicons'
    | 'SimpleLineIcons'
    | 'Feather'
    | 'MaterialCommunityIcons'
    | 'Foundation'
    | 'Fontisto';
};

// Optimize the getIcon function with useMemo
const getIcon = (icon: IconType) => {
  if (!icon || !icon.name || !icon.library) return null;

  switch (icon.library) {
    case 'AntDesign':
      return <AntDesign name={icon.name} size={20} color="#fff" />;
    case 'Ionicons':
      return <Ionicons name={icon.name} size={20} color="#fff" />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={icon.name} size={20} color="#fff" />;
    case 'Feather':
      return <Feather name={icon.name} size={20} color="#fff" />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={icon.name} size={20} color="#fff" />;
    case 'Foundation':
      return <Foundation name={icon.name} size={20} color="#fff" />;
    case 'Fontisto':
      return <Fontisto name={icon.name} size={20} color="#fff" />;
    default:
      return <Ionicons name={icon.name} size={20} color="#fff" />;
  }
};

// Khuyến mãi
const propotionData = [
  {
    id: 0,
    title: 'Genius',
    icon: {},
    description:
      'Bạn dang là Genius Cấp 1 trong chương trình khách hàng thân thiết của chúng tôi',
  },
  {
    id: 1,
    title: 'Giảm giá 10% cho chỗ nghỉ',
    name: 'Ưu đãi',
    icon: {name: 'percent', library: 'Feather'},
    description: 'Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu',
  },
  {
    id: 2,
    title: 'Giảm giá 10% khi thuê xe',
    icon: {
      name: 'car',
      library: 'AntDesign',
    },
    description: 'Tiết kiệm cho một số xe cho thuê',
  },
  {
    id: 3,
    title: 'Giảm giá 15% cho chỗ nghỉ',
    icon: {
      name: 'calendar',
      library: 'Feather',
    },
    description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
  },
  {
    id: 4,
    title: 'Nâng hạng phòng miễn phí',
    icon: {
      name: 'calendar',
      library: 'Feather',
    },
    description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
  },
];

// Dữ liệu menu
const menuData = [
  {
    id: 1,
    title: 'Lưu trú',
    icon: {
      name: 'home-outline',
      library: 'Ionicons',
    },
  },
  {
    id: 2,
    title: 'Chuyến bay',
    icon: {
      name: 'plane',
      library: 'SimpleLineIcons',
    },
  },
  {
    id: 3,
    title: 'Thuê xe',
    icon: {
      name: 'car',
      library: 'AntDesign',
    },
  },
  {
    id: 4,
    title: 'Taxi',
    icon: {
      name: 'taxi',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 5,
    title: 'Địa điểm tham quan',
    icon: {
      name: 'map',
      library: 'Foundation',
    },
  },
];

// Memoize renderItem to prevent unnecessary re-renders
const renderItem = ({item}: any) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      paddingHorizontal: 12,
      justifyContent: 'center',
      borderWidth: item.id === 1 ? 0.7 : 0,
      borderColor: item.id === 1 ? '#fff' : 'transparent',
      minHeight: 50,
      backgroundColor: item.id === 1 ? 'rgba(255,255,255,0.2)' : 'transparent',
      gap: 8,
    }}>
    {getIcon(item.icon)}
    <Text
      style={{
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
      }}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

// Thêm mảng dữ liệu cho phần "Du khách cũng đã đặt"
const popularDestinations = [
  {
    id: '1',
    name: 'Đà Lạt',
    image:
      'https://media.vneconomy.vn/images/upload/2023/07/06/1688465738-grasp-the-rainy-season-travel-tips-to-da-lat.jpg',
    description: 'Thành phố ngàn hoa',
    rating: 4.8,
    reviews: 1245,
  },
  {
    id: '2',
    name: 'Phú Quốc',
    image:
      'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?q=80&w=1000&auto=format&fit=crop',
    description: 'Đảo ngọc thiên đường',
    rating: 4.7,
    reviews: 982,
  },
  {
    id: '3',
    name: 'Hội An',
    image:
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop',
    description: 'Phố cổ lãng mạn',
    rating: 4.9,
    reviews: 1567,
  },
  {
    id: '4',
    name: 'Hạ Long',
    image:
      'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?q=80&w=1000&auto=format&fit=crop',
    description: 'Kỳ quan thiên nhiên',
    rating: 4.6,
    reviews: 1120,
  },
  {
    id: '5',
    name: 'Nha Trang',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    description: 'Thiên đường biển',
    rating: 4.5,
    reviews: 876,
  },
  {
    id: '6',
    name: 'Sapa',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
    description: 'Thị trấn trong mây',
    rating: 4.7,
    reviews: 1032,
  },
];

// Memoize PopularDestinationCard component
const PopularDestinationCard = ({item, onPress}: any) => {
  return (
    <TouchableOpacity
      style={styles.popularDestinationCard}
      onPress={onPress}
      activeOpacity={0.8}>
      <ImageBackground
        source={{uri: item.image}}
        style={styles.popularDestinationImage}
        imageStyle={{borderRadius: 12}}>
        <View style={styles.popularDestinationOverlay}>
          <Text style={styles.popularDestinationName}>{item.name}</Text>
          <Text style={styles.popularDestinationDescription}>
            {item.description}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} đánh giá)</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width;
const HomeScreen = ({navigation, route}: any) => {
  const {currentLocation}: any = route?.params || {};
  const [isOpenBottomsheet, setIsOpenBottomsheet] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState<any>([]);
  const [recentSearches, setRecentSearches] = useState<any>([]);
  const {token, user} = useAuthStore();
  const [dateRange, setDateRange] = useState({
    startDate: getCurrentDateFormatted(),
    endDate: getDefaultCheckOutDate(getCurrentDateFormatted()),
  });
  console.log('token', token);

  // Optimize with useRef
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const calendarBottomSheetRef = useRef<BottomSheet>(null);

  // Add loading states
  const [loadingUpcomingBookings, setLoadingUpcomingBookings] = useState(false);
  const [loadingRecentSearches, setLoadingRecentSearches] = useState(false);

  // Memoize static data
  const memoizedMenuData = useMemo(() => menuData, []);
  const memoizedProportionData = useMemo(() => propotionData, []);
  const memoizedPopularDestinations = useMemo(() => popularDestinations, []);

  // Hàm lấy lịch sử tìm kiếm từ AsyncStorage - optimized
  // const getRecentSearches = async () => {
  //   try {
  //     setLoadingRecentSearches(true);
  //     const searchesJson = await AsyncStorage.getItem('recentSearches');
  //     if (searchesJson) {
  //       const searches = JSON.parse(searchesJson);
  //       setRecentSearches(searches);
  //     }
  //   } catch (error) {
  //     console.error('Lỗi khi lấy lịch sử tìm kiếm:', error);
  //   } finally {
  //     setLoadingRecentSearches(false);
  //   }
  // };

  // // useFocusEffect đảm bảo code chạy mỗi khi màn hình được focus
  // useFocusEffect(
  //   useCallback(() => {
  //     getRecentSearches();
  //   }, [getRecentSearches]),
  // );

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenBottomsheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleOpenCalendar = useCallback(() => {
    if (calendarBottomSheetRef.current) {
      calendarBottomSheetRef.current.expand();
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
        pressBehavior="close"
      />
    ),
    [],
  );

  // Handle day selection for calendar - optimized
  const handleDayPress = (day: any) => {
    const selectedDate = day.dateString;

    // Skip selection if date is in the past
    if (moment(selectedDate).isBefore(moment().startOf('day'))) {
      return;
    }

    setDateRange((prev: any) => {
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        return {
          startDate: selectedDate,
          endDate: null,
        };
      } else {
        if (moment(selectedDate).isAfter(prev.startDate)) {
          return {
            ...prev,
            endDate: selectedDate,
          };
        } else {
          return {
            startDate: selectedDate,
            endDate: null,
          };
        }
      }
    });
  };

  // Optimize getUpcomingBookings with loading state
  const getUpcomingBookings = useCallback(async () => {
    if (!token) return;

    try {
      setLoadingUpcomingBookings(true);
      const response = await axios.get(`${API_URL}/booking/upcoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUpcomingBookings(response?.data?.result || []);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingUpcomingBookings(false);
    }
  }, [token]);

  // Hàm định dạng ngày tháng - memoized
  const formatSearchDate = useCallback((checkIn: string, checkOut: string) => {
    const startDay = moment(checkIn).format('D');
    const endDay = moment(checkOut).format('D');
    const month = moment(checkIn).format('M');
    return `${startDay} - ${endDay} tháng ${month}`;
  }, []);

  // Thêm state và useEffect để lấy dữ liệu khách sạn ở Bình Dương
  const [binhDuongHotels, setBinhDuongHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);

  // Hàm lấy danh sách khách sạn ở Bình Dương - optimized
  // const fetchBinhDuongHotels = useCallback(async () => {
  //   try {
  //     setLoadingHotels(true);
  //     const response = await axios.post(
  //       `${API_URL}/hotel-properties/hotel/recent-searches`,
  //       {
  //         address: 'Bình Dương',
  //       },
  //     );

  //     if (response.data && response.data.hotels) {
  //       setBinhDuongHotels(response.data.hotels.slice(0, 10)); // Lấy tối đa 10 khách sạn
  //     }
  //   } catch (error) {
  //     console.error('Error fetching Binh Duong hotels:', error);
  //   } finally {
  //     setLoadingHotels(false);
  //   }
  // }, []);

  // Thêm state mới
  const [recentSearchHotels, setRecentSearchHotels] = useState([]);
  const [loadingRecentHotels, setLoadingRecentHotels] = useState(false);
  const [hasRecentSearches, setHasRecentSearches] = useState(false);

  // Thêm hàm lấy khách sạn dựa trên lịch sử tìm kiếm - optimized
  // const fetchRecentSearchHotels = useCallback(async () => {
  //   try {
  //     // Lấy lịch sử tìm kiếm từ AsyncStorage
  //     const recentSearchesJson = await AsyncStorage.getItem('recentSearches');
  //     if (!recentSearchesJson) {
  //       setHasRecentSearches(false);
  //       return;
  //     }

  //     const recentSearches = JSON.parse(recentSearchesJson);
  //     if (!recentSearches || recentSearches.length === 0) {
  //       setHasRecentSearches(false);
  //       return;
  //     }

  //     setHasRecentSearches(true);
  //     setLoadingRecentHotels(true);

  //     // Gọi API để lấy khách sạn dựa trên lịch sử tìm kiếm
  //     const response = await axios.post(
  //       `${API_URL}/hotel-properties/hotel/recent-searches`,
  //       {recentSearches},
  //     );

  //     if (response.data && response.data.hotels) {
  //       setRecentSearchHotels(response.data.hotels);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching hotels from recent searches:', error);
  //   } finally {
  //     setLoadingRecentHotels(false);
  //   }
  // }, []);

  // Optimize useEffect calls by combining them
  useEffect(() => {
    if (token) {
      getUpcomingBookings();
    }
    // fetchBinhDuongHotels();
    // fetchRecentSearchHotels();
  }, [
    token,
    getUpcomingBookings,
    // fetchBinhDuongHotels,
    // fetchRecentSearchHotels,
  ]);

  // Memoize the hotel card renderer for better performance
  const renderHotelCard = useCallback(
    ({item}: any) => {
      // Lấy phòng có giá thấp nhất
      const cheapestRoom =
        item.Rooms && item.Rooms.length > 0
          ? item.Rooms.reduce((prev: any, current: any) =>
              prev.final_price < current.final_price ? prev : current,
            )
          : null;

      // Tính giảm giá nếu có
      const hasDiscount =
        cheapestRoom && cheapestRoom.initial_price > cheapestRoom.final_price;
      const discountPercentage = hasDiscount
        ? Math.round(
            (1 - cheapestRoom.final_price / cheapestRoom.initial_price) * 100,
          )
        : 0;

      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HotelDetail', {
              hotelId: item.id,
              checkInDate: moment().add(1, 'days').format('YYYY-MM-DD'),
              checkOutDate: moment().add(2, 'days').format('YYYY-MM-DD'),
              capacity: {adults: 2, children: 0},
              rooms: 1,
            });
          }}
          style={{
            backgroundColor: '#fff',
            width: width * 0.55,
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {width: 10, height: 6},
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}>
          <Image
            source={{
              uri: item.images
                ? `${API_URL}/hotel-properties/hotel/get-image/${item.id}/${
                    item.images.split(',')[0]
                  }`
                : 'https://via.placeholder.com/300x200?text=No+Image',
            }}
            style={{
              width: '100%',
              height: width * 0.5,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              padding: 10,
              gap: 3,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '700',
                fontSize: 15,
                lineHeight: 22,
              }}
              numberOfLines={2}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#003b95',
                  padding: 4,
                  borderRadius: 4,
                  borderBottomLeftRadius: 0,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                  }}>
                  {item.rating || '7.0'}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  color: '#000',
                }}>
                {item.rating >= 8
                  ? 'Tuyệt vời'
                  : item.rating >= 7
                  ? 'Tốt'
                  : 'Khá'}{' '}
                - {item.reviews || '0'} đánh giá
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <EvilIcons name="location" size={20} color="#000" />
              <Text
                style={{
                  color: '#000',
                  flex: 1,
                  overflow: 'hidden',
                  textTransform: 'lowercase',
                }}
                numberOfLines={2}>
                {item.address}
              </Text>
            </View>

            {hasDiscount && (
              <View
                style={{
                  backgroundColor: '#008234',
                  alignSelf: 'flex-start',
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                  }}>
                  Giảm {discountPercentage}%
                </Text>
              </View>
            )}

            {cheapestRoom && (
              <View style={{}}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '600',
                    textAlign: 'right',
                  }}>
                  Giá cho 1 đêm, 2 người lớn
                </Text>
                {hasDiscount && (
                  <Text
                    style={{
                      color: '#f20000',
                      textDecorationLine: 'line-through',
                      textAlign: 'right',
                    }}>
                    VNĐ {cheapestRoom.initial_price.toLocaleString('vi-VN')}
                  </Text>
                )}
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                    textAlign: 'right',
                  }}>
                  VNĐ {cheapestRoom.final_price.toLocaleString('vi-VN')}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'right',
                  }}>
                  Đã bao gồm thuế và phí
                </Text>

                {/* Hiển thị các tiện ích nếu có */}
                {item.free_cancellation && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 5,
                    }}>
                    <MaterialCommunityIcons
                      name="check"
                      size={14}
                      color="#008234"
                    />
                    <Text
                      style={{
                        fontWeight: '700',
                        color: '#008234',
                        fontSize: 13,
                      }}>
                      Hủy miễn phí
                    </Text>
                  </View>
                )}

                {item.no_prepayment && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 5,
                    }}>
                    <MaterialCommunityIcons
                      name="check"
                      size={14}
                      color="#008234"
                    />
                    <Text
                      style={{
                        fontWeight: '700',
                        color: '#008234',
                        fontSize: 13,
                      }}>
                      Không cần thanh toán trước
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, width],
  );

  // Memoize the recent search item renderer
  const renderRecentSearchItem = useCallback(
    ({item}: any) => (
      <TouchableOpacity
        style={{
          width: width * 0.8,
          borderRadius: 8,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 10, height: 6},
          shadowOpacity: 0.4,
          shadowRadius: 8,
          backgroundColor: '#fff',
          padding: 16,
          flexDirection: 'row',
          gap: 10,
        }}
        onPress={() => {
          // Chuyển đến trang kết quả tìm kiếm khi nhấn vào lịch sử
          navigation.navigate('HotelSearchResults', {
            searchCondition: {
              location: {address: item.location},
              checkInDate: item.checkInDate,
              checkOutDate: item.checkOutDate,
              capacity: {
                adults: item.adults,
                children: item.children,
              },
              rooms: item.rooms,
            },
          });
        }}>
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 4,
            backgroundColor: '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EvilIcons name="location" size={24} color="#0165FC" />
        </View>
        <View>
          <Text style={{color: '#000', fontWeight: '500'}}>
            {item.location}
          </Text>
          <Text style={{color: '#666'}}>
            {formatSearchDate(item.checkInDate, item.checkOutDate)},{' '}
            {item.adults} người lớn
            {item.children > 0 ? `, ${item.children} trẻ em` : ''}
            {item.rooms > 1 ? `, ${item.rooms} phòng` : ''}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [formatSearchDate, navigation, width],
  );

  // Memoize the proportion item renderer
  const renderProportionItem = useCallback(
    ({item, index}: any) => (
      <TouchableOpacity
        style={{
          padding: 14,
          borderWidth: index === 0 ? 0 : 1,
          borderColor:
            index === 0
              ? '#003b95'
              : index === 1 || index === 2
              ? '#0156ff'
              : 'rgba(224, 224, 224, 0.9)',
          borderRadius: 8,
          marginBottom: 16,
          backgroundColor:
            index === 0
              ? '#003b95'
              : index === 1 || index === 2
              ? '#fff'
              : 'rgba(224, 224, 224, 0.5)',
          gap: 10,
          width: width * 0.5,
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: index === 0 ? '#fff' : '#000',
            fontSize: index === 0 ? 18 : 14,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: index === 0 ? '#fff' : '#000',
            fontSize: index === 0 ? 14 : 12,
          }}>
          {item.description}
        </Text>
      </TouchableOpacity>
    ),
    [width],
  );

  // Memoize the handleConfirmDate function
  const handleConfirmDate = useCallback(() => {
    if (dateRange.startDate && !dateRange.endDate) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày trả phòng');
    } else if (dateRange.startDate && dateRange.endDate) {
      // Đóng calendar BottomSheet
      calendarBottomSheetRef.current?.close();
    }
  }, [dateRange]);

  // Calculate marked dates for calendar
  const markedDates = useMemo(() => {
    const result: any = {};
    const {startDate, endDate} = dateRange;

    // Disable past dates
    const startDisableDate = moment().subtract(6, 'months');
    const endDisableDate = moment().subtract(1, 'day');
    let currentDisableDate = startDisableDate.clone();

    while (currentDisableDate.isSameOrBefore(endDisableDate)) {
      const dateStr = currentDisableDate.format('YYYY-MM-DD');
      result[dateStr] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: {backgroundColor: '#f0f0f0'},
          text: {color: '#c0c0c0', textDecorationLine: 'line-through'},
        },
      };
      currentDisableDate.add(1, 'day');
    }

    // Mark start date
    if (startDate) {
      result[startDate] = {
        ...result[startDate],
        selected: true,
        startingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: '#0165FC',
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            borderTopRightRadius: endDate === startDate ? 6 : 0,
            borderBottomRightRadius: endDate === startDate ? 6 : 0,
            width: '100%',
          },
          text: {color: 'white'},
        },
      };
    }

    // Mark end date
    if (endDate) {
      result[endDate] = {
        ...result[endDate],
        selected: true,
        endingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: '#0165FC',
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: '100%',
          },
          text: {color: 'white'},
        },
      };
    }

    // Mark in-between dates
    if (startDate && endDate) {
      let curDate = moment(startDate).clone();
      while (curDate.add(1, 'day').isBefore(moment(endDate))) {
        const dateStr = curDate.format('YYYY-MM-DD');
        result[dateStr] = {
          ...result[dateStr],
          selected: true,
          disabled: false,
          disableTouchEvent: false,
          customStyles: {
            container: {
              backgroundColor: '#cccccc',
              borderRadius: 0,
              width: '100%',
            },
            text: {color: 'black'},
          },
        };
      }
    }

    return result;
  }, [dateRange.startDate, dateRange.endDate]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={memoizedMenuData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 5,
            backgroundColor: '#003b95',
            paddingBottom: 15,
          }}
        />
        <ScrollView
          contentContainerStyle={{gap: 16}}
          showsVerticalScrollIndicator={false}>
          {/* Tìm kiếm - Pass openCalendar function */}
          <SearchComponent
            location={currentLocation}
            openCalendar={handleOpenCalendar}
            dateRange={dateRange}
          />

          {/* Tiếp tục tìm kiếm của bạn */}
          <View
            style={
              {
                // paddingHorizontal: 16,
                // gap: 16,
              }
            }>
            {/* Chuyến đi hiện tại */}
            {upcomingBookings?.length > 0 && (
              <View
                style={{
                  marginHorizontal: 16,
                  gap: 20,
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Chuyến đi hiện tại{' '}
                  <Text
                    style={{
                      color: COLORS.red,
                      fontSize: 13,
                      fontStyle: 'italic',
                    }}>
                    ({upcomingBookings?.length} chuyến đi)
                  </Text>
                </Text>
                <Pressable
                  style={({pressed}) => {
                    return {
                      backgroundColor: pressed
                        ? COLORS.grayLight
                        : COLORS.white,
                      padding: 16,
                      borderRadius: 10,
                      borderColor: COLORS.black,
                      shadowColor: COLORS.black,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 3.2,
                      shadowRadius: 3.84,
                      elevation: 5,
                      gap: 10,
                    };
                  }}
                  onPress={() =>
                    navigation.navigate('ReservationDetail', {
                      infoBooking: upcomingBookings[0],
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}>
                    <View style={{flexDirection: 'column', gap: 10}}>
                      <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                        {upcomingBookings[0]?.Hotel?.name}
                      </Text>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Text style={{color: COLORS.black}}>
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkin_date,
                          )}{' '}
                          -{' '}
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkout_date,
                          )}
                        </Text>
                        <Text style={{color: COLORS.green}}>Đã xác nhận</Text>
                      </View>
                    </View>
                    <Image
                      source={{
                        uri: `${API_URL}/hotel-properties/hotel/get-image/${
                          upcomingBookings[0]?.Hotel?.id
                        }/${upcomingBookings[0]?.Hotel?.images?.split(',')[0]}`,
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 25,
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="dot-single" size={24} color={COLORS.black} />
                    <Text style={{color: COLORS.black}}>
                      Nhận phòng từ {upcomingBookings[0]?.Hotel?.checkinto}
                    </Text>
                  </View>

                  <Pressable
                    style={({pressed}) => {
                      return {
                        backgroundColor: pressed
                          ? COLORS.grayLight
                          : COLORS.white,
                        padding: 8,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: COLORS.grayDark,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        alignSelf: 'flex-start',
                      };
                    }}
                    onPress={handleOpenBottomsheet}>
                    <Ionicons
                      name="chatbubbles-outline"
                      color={COLORS.black}
                      size={20}
                    />
                    <Text style={{color: COLORS.black}}>Liên hệ chỗ nghỉ</Text>
                  </Pressable>
                </Pressable>
              </View>
            )}
          </View>
          {/* Tiếp tục tìm kiếm của bạn */}
          {recentSearches?.length > 0 && (
            <View style={{gap: 9}}>
              <View style={{marginHorizontal: 16}}>
                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                  Tiếp tục tìm kiếm của bạn
                </Text>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recentSearches}
                contentContainerStyle={{
                  gap: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                }}
                renderItem={renderRecentSearchItem}
                snapToInterval={width * 0.8 + 16}
                snapToAlignment="start"
                decelerationRate="fast"
                ListEmptyComponent={() => (
                  <View style={{padding: 16, alignItems: 'center'}}>
                    <Text style={{color: '#666'}}>
                      Chưa có lịch sử tìm kiếm
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
          {/* Khuyến mãi */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 16,
              }}>
              Đi nhiều hơn, trả ít hơn
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={memoizedProportionData}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 16,
              }}
              snapToInterval={width * 0.5 + 10}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={renderProportionItem}
            />
          </View>

          {/* Chỗ nghỉ ở Bình Dương */}

          {/* Khám phá những chỗ nghỉ tốt nhất */}
          {/* {hasRecentSearches && (
            <View>
              <View style={{marginHorizontal: 16}}>
                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                  Khám phá những chỗ nghỉ tốt nhất
                </Text>
                <Text style={{color: '#000'}}>
                  Dựa trên lịch sử tìm kiếm của bạn
                </Text>
              </View>

              {loadingRecentHotels ? (
                <View style={{padding: 20, alignItems: 'center'}}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              ) : recentSearchHotels.length > 0 ? (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={recentSearchHotels}
                  contentContainerStyle={{
                    gap: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}
                  renderItem={renderHotelCard}
                  snapToInterval={width * 0.55 + 12}
                  snapToAlignment="start"
                  decelerationRate="fast"
                />
              ) : (
                <View style={{padding: 20, alignItems: 'center'}}>
                  <Text style={{color: COLORS.gray}}>
                    Không tìm thấy khách sạn phù hợp
                  </Text>
                </View>
              )}
            </View>
          )} */}
          {/* Du khách cũng đã đặt */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Du khách cũng đã đặt</Text>
            <Text style={styles.sectionSubtitle}>
              Khám phá những điểm đến được yêu thích
            </Text>

            <FlatList
              data={memoizedPopularDestinations}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <PopularDestinationCard
                  item={item}
                  onPress={() => {
                    navigation.navigate('HotelSearchResults', {
                      location: item.name,
                      checkInDate: moment().add(1, 'days').format('YYYY-MM-DD'),
                      checkOutDate: moment()
                        .add(2, 'days')
                        .format('YYYY-MM-DD'),
                      capacity: {adults: 2, children: 0, rooms: 1},
                    });
                  }}
                />
              )}
              contentContainerStyle={styles.popularDestinationsContainer}
            />
          </View>
        </ScrollView>
      </View>

      {/* Contact BottomSheet - existing */}
      <BottomSheetModal
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={[200]}
        enableDynamicSizing={false}
        handleIndicatorStyle={{
          backgroundColor: COLORS.grayLight,
          width: 40,
        }}
        enableContentPanningGesture={false}
        overDragResistanceFactor={0}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            paddingHorizontal: 18,
            backgroundColor: COLORS.white,
            flex: 1,
            paddingVertical: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18, fontWeight: 'bold'}}>
            Liên hệ chỗ nghỉ
          </Text>
          <View style={{marginTop: 10}}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}
              onPress={() => {}}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                Nhắn tin cho chỗ nghỉ
              </Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                +84 {upcomingBookings[0]?.Hotel?.User?.phonenumber}
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      {/* Calendar BottomSheet - new */}
      <BottomSheet
        ref={calendarBottomSheetRef}
        snapPoints={['60%']}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        enableOverDrag={false}
        onChange={handleSheetChanges}
        index={-1}
        handleIndicatorStyle={{width: '13%', backgroundColor: '#797979'}}>
        <View
          style={{
            paddingHorizontal: 32,
            paddingVertical: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text>CN</Text>
          <Text>Th2</Text>
          <Text>Th3</Text>
          <Text>Th4</Text>
          <Text>Th5</Text>
          <Text>Th6</Text>
          <Text>Th7</Text>
        </View>
        <BottomSheetView style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CalendarList
              pastScrollRange={0}
              futureScrollRange={12}
              showScrollIndicator={false}
              horizontal={false}
              calendarHeight={200}
              hideDayNames
              initialNumToRender={3}
              markingType="custom"
              windowSize={3}
              removeClippedSubviews={true}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={moment().format('YYYY-MM-DD')}
              theme={{
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: -4},
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                backgroundColor: '#0165FF',
                width: '100%',
                gap: 10,
                borderRadius: 3,
              }}
              onPress={handleConfirmDate}
              activeOpacity={0.7}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 16,
  },
  popularDestinationsContainer: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  popularDestinationCard: {
    width: 280,
    height: 180,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  popularDestinationImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  popularDestinationOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  popularDestinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  popularDestinationDescription: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  reviewsText: {
    fontSize: 12,
    color: COLORS.white,
  },
});
