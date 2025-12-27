import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconComponent from '@components/IconComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {API_URL} from '../utils/constants';
import {formatDate} from '@utils/constants';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '@styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CheckBox from '@react-native-community/checkbox';
import {useFavorites} from '../contexts/FavoritesContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Amenity {
  id: string;
  name: string;
}

// Thêm hằng số cho các mức đánh giá
const RATING_FILTERS = [
  {value: 0, label: 'Tất cả'},
  {value: 7, label: 'Tốt (7+)'},
  {value: 8, label: 'Rất tốt (8+)'},
  {value: 9, label: 'Xuất sắc (9+)'},
];

// Thêm hằng số cho các tùy chọn sắp xếp
const SORT_OPTIONS = [
  {value: 'rating_high_to_low', label: 'Đánh giá: Cao đến thấp'},
  {value: 'rating_low_to_high', label: 'Đánh giá: Thấp đến cao'},
  {value: 'price_low_to_high', label: 'Giá: Thấp đến cao'},
  {value: 'price_high_to_low', label: 'Giá: Cao đến thấp'},
];

const HotelSearchResultsScreen = ({route}: any) => {
  const {searchCondition} = route?.params || {};
  const [hotelResults, setHotelResults] = useState<any>({});
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [ratingRange, setRatingRange] = useState(0);
  const [sortOption, setSortOption] = useState('rating_high_to_low'); // Mặc định sắp xếp theo đánh giá từ cao đến thấp
  const [isFiltering, setIsFiltering] = useState(false);
  const [commonAmenities, setCommonAmenities] = useState<Amenity[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {toggleFavorite, isFavorite} = useFavorites();

  useEffect(() => {
    const getHotels = async () => {
      const params = {
        checkInDate: searchCondition.checkInDate,
        checkOutDate: searchCondition.checkOutDate,
        adults: searchCondition.capacity.adults,
        children: searchCondition.capacity.children,
        rooms: searchCondition.rooms,
        address: searchCondition.location.address,
        ...(searchCondition.location.latitude &&
          searchCondition.location.longitude && {
            latitude: searchCondition.location.latitude,
            longitude: searchCondition.location.longitude,
          }),
      };

      try {
        // Lấy danh sách tiện nghi
        const amenitiesResponse = await axios.get(
          `${API_URL}/hotel-properties/amenities`,
        );
        setCommonAmenities(amenitiesResponse?.data);

        // Lấy danh sách khách sạn
        const endpoint = `${API_URL}/hotel-properties/searchresults`;
        console.log('Search params:', params); // Thêm log để debug
        const response = await axios.get(endpoint, {params});
        setHotelResults(response?.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getHotels();
  }, [searchCondition]);

  const handlePressHotel = (hotelId: string) => {
    navigation.push('HotelDetail', {
      hotelId,
      ...searchCondition,
    });
  };

  const toggleAmenity = (amenityName: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenityName)) {
        return prev.filter(item => item !== amenityName);
      } else {
        return [...prev, amenityName];
      }
    });
  };

  // Thêm hàm sắp xếp kết quả
  const sortHotels = (hotels: any[]) => {
    if (!hotels || !Array.isArray(hotels)) return [];

    return [...hotels].sort((a, b) => {
      switch (sortOption) {
        case 'rating_high_to_low':
          return (
            (b.ratingStats?.averageOverall || 0) -
            (a.ratingStats?.averageOverall || 0)
          );
        case 'rating_low_to_high':
          return (
            (a.ratingStats?.averageOverall || 0) -
            (b.ratingStats?.averageOverall || 0)
          );
        case 'price_low_to_high':
          const aPrice = a.availableRooms?.[0]?.final_price || Infinity;
          const bPrice = b.availableRooms?.[0]?.final_price || Infinity;
          return aPrice - bPrice;
        case 'price_high_to_low':
          const aPrice2 = a.availableRooms?.[0]?.final_price || 0;
          const bPrice2 = b.availableRooms?.[0]?.final_price || 0;
          return bPrice2 - aPrice2;
        default:
          return 0;
      }
    });
  };

  // Cập nhật hàm applyFilters để áp dụng sắp xếp
  const applyFilters = async () => {
    setIsFiltering(true);
    try {
      const filters = {
        priceRange,
        amenities: selectedAmenities,
        minRating: ratingRange,
        sortOption, // Thêm tùy chọn sắp xếp vào filters
      };

      const params = {
        address: searchCondition.location.address,
        checkInDate: searchCondition.checkInDate,
        checkOutDate: searchCondition.checkOutDate,
        adults: searchCondition.capacity.adults,
        children: searchCondition.capacity.children,
        rooms: searchCondition.rooms,
        filters: JSON.stringify(filters),
      };

      // Gọi API với bộ lọc
      const endpoint = `${API_URL}/hotel-properties/searchresults`;
      const response = await axios.get(endpoint, {params});

      // Sắp xếp kết quả theo tùy chọn đã chọn
      const sortedHotels = sortHotels(response.data.hotels);
      setHotelResults({...response.data, hotels: sortedHotels});

      setFilterModalVisible(false);
      console.log('Applied filters:', filters);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setIsFiltering(false);
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 5000000]);
    setSelectedAmenities([]);
    setRatingRange(0);
    setSortOption('rating_high_to_low'); // Reset về mặc định
  };

  const getRatingDescription = (rating: number) => {
    if (rating >= 9) return 'Xuất sắc';
    if (rating >= 8) return 'Rất tốt';
    if (rating >= 7) return 'Tốt';
    if (rating >= 6) return 'Hài lòng';
    return 'Trung bình';
  };

  // Hàm xử lý khi nhấn vào icon trái tim
  const handleToggleFavorite = (hotel: any) => {
    toggleFavorite({
      id: hotel.id,
      name: hotel.name,
      images: hotel.images,
      address: hotel.address,
      rating: hotel.ratingStats?.averageOverall,
    });
  };

  // Phần render cho modal bộ lọc
  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bộ lọc</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <IconComponent
                name="close"
                library="AntDesign"
                size={24}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterScrollView}>
            {/* Bộ lọc sắp xếp - THÊM MỚI */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sắp xếp theo</Text>
              <View style={styles.sortOptions}>
                {SORT_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.sortOption,
                      sortOption === option.value && styles.sortOptionSelected,
                    ]}
                    onPress={() => setSortOption(option.value)}>
                    <Text
                      style={[
                        styles.sortOptionText,
                        sortOption === option.value &&
                          styles.sortOptionTextSelected,
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bộ lọc giá */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Khoảng giá</Text>
              <Text style={styles.priceRangeText}>
                {priceRange[0].toLocaleString('vi-VN')}đ -{' '}
                {priceRange[1].toLocaleString('vi-VN')}đ
              </Text>
              <MultiSlider
                values={[priceRange[0], priceRange[1]]}
                min={0}
                max={5000000}
                step={100000}
                sliderLength={280}
                onValuesChange={values => setPriceRange(values)}
                selectedStyle={{backgroundColor: COLORS.primary}}
                markerStyle={{backgroundColor: COLORS.primary}}
              />
            </View>

            {/* Bộ lọc tiện nghi */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Tiện nghi</Text>
              <View style={styles.amenitiesList}>
                {commonAmenities.map(amenity => (
                  <View key={amenity.id} style={styles.amenityItem}>
                    <CheckBox
                      value={selectedAmenities.includes(amenity.name)}
                      onValueChange={() => toggleAmenity(amenity.name)}
                      tintColors={{true: COLORS.primary, false: COLORS.gray}}
                    />
                    <Text style={styles.amenityText}>{amenity.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Đặt lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
              disabled={isFiltering}>
              {isFiltering ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.applyButtonText}>Áp dụng</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header + button search */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDark}
      />
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: COLORS.primaryDark,
          gap: 20,
        }}>
        {/* Search Bar */}
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderWidth: 4,
              borderColor: COLORS.yellowGold,
              borderRadius: 10,
              backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
              shadowColor: COLORS.black,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              transform: [{translateY: 25}],
              zIndex: 2,
              position: 'relative',
            },
          ]}
          onPress={() => console.log('Pressed!')}>
          <Pressable
            style={({pressed}) => [
              {flexDirection: 'row', alignItems: 'center', gap: 5},
              {
                backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                padding: 5,
                borderRadius: 50,
              },
            ]}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={COLORS.black}
            />
          </Pressable>
          <Text style={{color: COLORS.black, flex: 1}}>
            {searchCondition.location.latitude &&
            searchCondition.location.longitude
              ? `Xung quanh vị trí hiện tại · ${formatDate(
                  searchCondition.checkInDate,
                )} - ${formatDate(searchCondition.checkOutDate)}`
              : `${searchCondition.location.address} · ${formatDate(
                  searchCondition.checkInDate,
                )} - ${formatDate(searchCondition.checkOutDate)}`}
          </Text>
        </Pressable>
      </View>
      {/* Thanh filter phía dưới */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          shadowColor: COLORS.black,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: -1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            justifyContent: 'space-around',
            flex: 1,
            marginTop: 30,
          }}>
          <Pressable
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flex: 1,
                backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                paddingVertical: 12,
              },
            ]}
            onPress={() => setFilterModalVisible(true)}>
            <MaterialCommunityIcons name="filter" size={20} color="#000" />
            <Text>Bộ lọc</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: 5,
                paddingVertical: 12,
                backgroundColor: pressed ? COLORS.opacity : COLORS.white,
              },
            ]}
            onPress={() => console.log('Pressed!')}>
            <MaterialCommunityIcons name="filter" size={20} color="#000" />
            <Text>Sắp xếp</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flex: 1,
                paddingVertical: 12,
                backgroundColor: pressed ? COLORS.opacity : COLORS.white,
              },
            ]}
            onPress={() => console.log('Pressed!')}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#000" />
            <Text>Sắp xếp</Text>
          </Pressable>
        </View>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          data={sortHotels(hotelResults?.hotels || [])} // Sắp xếp kết quả trước khi hiển thị
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={() => (
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 8,
              }}>
              {hotelResults?.total ? (
                <Text style={{color: '#000', paddingTop: 10}}>
                  {hotelResults?.total} chỗ nghỉ
                </Text>
              ) : (
                <Text style={{color: '#000', paddingTop: 10}}>
                  Không tìm thấy khách sạn phù hợp
                </Text>
              )}
            </View>
          )}
          renderItem={({item}) => (
            <>
              <Pressable
                key={item?.id}
                onPress={() => handlePressHotel(item.id)}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                    width: '100%',
                    height: 'auto',
                    borderRadius: pressed ? 0 : 8,
                    gap: 12,
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    minHeight: 150,
                  },
                ]}>
                <Image
                  source={{
                    uri: `${API_URL}/hotel-properties/hotel/get-image/${
                      item?.id
                    }/${item?.images?.split(',')[0]}`,
                  }}
                  style={{
                    width: 100,
                    height: 'auto',
                    borderRadius: 8,
                    flex: 1,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    gap: 3,
                    flex: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 15,
                        lineHeight: 22,
                        flex: 1,
                      }}
                      numberOfLines={2}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={() => handleToggleFavorite(item)}>
                      <AntDesign
                        name={isFavorite(item.id) ? 'heart' : 'heart'}
                        size={24}
                        color={isFavorite(item.id) ? COLORS.red : COLORS.gray}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: COLORS.primaryDark,
                        padding: 4,
                        borderRadius: 4,
                        borderBottomLeftRadius: 0,
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: 12,
                          fontWeight: '700',
                          paddingHorizontal: 5,
                        }}>
                        {item.ratingStats?.averageOverall?.toFixed(1) || '0.0'}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: COLORS.black,
                      }}>
                      {getRatingDescription(
                        item.ratingStats?.normalizedAverage || 0,
                      )}{' '}
                      <Entypo
                        name="dot-single"
                        size={10}
                        color={COLORS.black}
                      />
                      <Text style={{color: COLORS.gray, fontSize: 13}}>
                        {item.ratingStats?.total || 0} đánh giá
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      flex: 1,
                    }}>
                    <EvilIcons name="location" size={20} color={COLORS.black} />
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        flex: 1,
                      }}
                      numberOfLines={2}>
                      {item.address}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    {item?.availableRooms?.[0]?.Promotions &&
                      item?.availableRooms?.[0]?.Promotions?.length > 0 &&
                      item?.availableRooms?.[0]?.Promotions.map(
                        (promotion: any, index: number) => {
                          const parts = promotion.name.split(' - ');
                          const displayText =
                            parts.length > 1 ? parts[1] : promotion.name;

                          return (
                            <View
                              key={index}
                              style={{
                                backgroundColor: COLORS.green,
                                alignSelf: 'flex-start',
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 4,
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: COLORS.white,
                                }}>
                                {displayText}
                              </Text>
                            </View>
                          );
                        },
                      )}
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontWeight: '600',
                        textAlign: 'right',
                      }}>
                      Giá cho{' '}
                      {moment(searchCondition.checkOutDate).diff(
                        moment(searchCondition.checkInDate),
                        'days',
                      )}{' '}
                      đêm, {searchCondition.capacity.adults} người lớn
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      {item?.availableRooms?.[0]?.initial_price >
                        item?.availableRooms?.[0]?.final_price && (
                        <Text
                          style={{
                            color: COLORS.red,
                            textDecorationLine: 'line-through',
                            textAlign: 'right',
                          }}>
                          VNĐ{' '}
                          {item?.availableRooms?.[0]?.initial_price.toLocaleString()}
                        </Text>
                      )}
                      <Text
                        style={{
                          color: COLORS.black,
                          fontWeight: '700',
                          fontSize: 19,
                          textAlign: 'right',
                        }}>
                        VNĐ{' '}
                        {item?.availableRooms?.[0]?.final_price.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.borderGray,
                  marginHorizontal: -16,
                }}
              />
            </>
          )}
        />
      </View>

      {/* Render filter modal */}
      {renderFilterModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    marginRight: 16,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '80%',
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  filterScrollView: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
    padding: 10,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  priceRangeText: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 8,
  },
  ratingButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ratingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  ratingButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  ratingButtonText: {
    color: COLORS.black,
  },
  ratingButtonTextSelected: {
    color: COLORS.white,
  },
  amenitiesList: {
    flexDirection: 'column',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 8,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
  },
  resetButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  applyButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  sortOptions: {
    flexDirection: 'column',
    gap: 10,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  sortOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sortOptionText: {
    color: COLORS.black,
    fontSize: 14,
  },
  sortOptionTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 5,
  },
});

export default HotelSearchResultsScreen;
