import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalComponent from './ModalComponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {formatDate} from '@utils/constants';
import moment from 'moment';
import 'moment/locale/vi';
import AsyncStorage from '@react-native-async-storage/async-storage';
moment.locale('vi');

const COLORS = {
  primary: '#FFB700',
  secondary: '#0165FF',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGray: '#F5F5F5',
  borderGray: '#E0E0E0',
};

type location = {
  address?: string;
  latitude?: string;
  longitude?: string;
};

type SearchComponentProps = {
  location?: location;
  openCalendar?: () => void;
  dateRange?: {
    startDate: string | null;
    endDate: string | null;
  };
};

type initialSearchCondition = {
  checkInDate?: string | null;
  checkOutDate?: string | null;
  location?: location;
  capacity?: {
    adults?: number;
    children?: number;
  };
  rooms: number;
};

// Format ngày hiện tại theo chuẩn YYYY-MM-DD
const getCurrentDateFormatted = (): string => {
  return new Date().toLocaleDateString('en-CA').split('/').join('-');
};

// Lấy ngày mặc định cho checkout (ngày sau checkIn)
const getDefaultCheckOutDate = (checkInDateStr: string): string => {
  const checkIn = new Date(checkInDateStr);
  checkIn.setDate(checkIn.getDate() + 1);
  return checkIn.toLocaleDateString('en-CA').split('/').join('-');
};

const SearchComponent = React.memo(
  ({
    location,
    openCalendar,
    dateRange: externalDateRange,
  }: SearchComponentProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const initialDate = getCurrentDateFormatted();

    // State để lưu trữ searchCondition
    const [searchCondition, setSearchCondition] =
      useState<initialSearchCondition>({
        checkInDate: initialDate,
        checkOutDate: getDefaultCheckOutDate(initialDate),
        location: location,
        capacity: {
          adults: 2,
          children: 0,
        },
        rooms: 1,
      });

    // Thêm state cho modal chọn số phòng và số người
    const [roomPersonModalVisible, setRoomPersonModalVisible] = useState(false);

    // Cập nhật searchCondition khi dateRange thay đổi từ HomeScreen
    useEffect(() => {
      if (externalDateRange?.startDate && externalDateRange?.endDate) {
        setSearchCondition(prev => ({
          ...prev,
          checkInDate: externalDateRange.startDate,
          checkOutDate: externalDateRange.endDate,
        }));
      }
    }, [externalDateRange]);

    console.log('searchCondition', searchCondition);
    // State để lưu trữ dateRange
    const [dateRange, setDateRange] = useState<{
      startDate: string | null;
      endDate: string | null;
    }>({
      startDate: initialDate,
      endDate: getDefaultCheckOutDate(initialDate),
    });

    // Mở và đóng modal
    const openModal = useCallback((message: string) => {
      setModalMessage(message);
      setModalVisible(true);
    }, []);

    const closeModal = useCallback(() => {
      setModalVisible(false);
    }, []);

    // Điều hướng tới màn hình chọn địa điểm
    const handleLocation = useCallback(() => {
      navigation.replace('SearchLocation', {
        location,
      });
    }, [navigation, location]);

    // Hàm mở modal chọn số phòng và số người
    const openRoomPersonModal = () => {
      setRoomPersonModalVisible(true);
    };

    // Hàm tăng số người lớn
    const increaseAdults = () => {
      setSearchCondition(prev => ({
        ...prev,
        capacity: {
          ...prev.capacity,
          adults: (prev.capacity?.adults || 0) + 1,
        },
      }));
    };

    // Hàm giảm số người lớn
    const decreaseAdults = () => {
      if ((searchCondition.capacity?.adults || 0) > 1) {
        setSearchCondition(prev => ({
          ...prev,
          capacity: {
            ...prev.capacity,
            adults: (prev.capacity?.adults || 0) - 1,
          },
        }));
      }
    };

    // Hàm tăng số trẻ em
    const increaseChildren = () => {
      setSearchCondition(prev => ({
        ...prev,
        capacity: {
          ...prev.capacity,
          children: (prev.capacity?.children || 0) + 1,
        },
      }));
    };

    // Hàm giảm số trẻ em
    const decreaseChildren = () => {
      if ((searchCondition.capacity?.children || 0) > 0) {
        setSearchCondition(prev => ({
          ...prev,
          capacity: {
            ...prev.capacity,
            children: (prev.capacity?.children || 0) - 1,
          },
        }));
      }
    };

    // Hàm tăng số phòng
    const increaseRooms = () => {
      setSearchCondition(prev => ({
        ...prev,
        rooms: prev.rooms + 1,
      }));
    };

    // Hàm giảm số phòng
    const decreaseRooms = () => {
      if (searchCondition.rooms > 1) {
        setSearchCondition(prev => ({
          ...prev,
          rooms: prev.rooms - 1,
        }));
      }
    };

    // Hàm lưu lịch sử tìm kiếm
    const saveSearchHistory = async () => {
      try {
        const recentSearchesJson = await AsyncStorage.getItem('recentSearches');
        let recentSearches = recentSearchesJson
          ? JSON.parse(recentSearchesJson)
          : [];

        // Tạo đối tượng tìm kiếm mới
        const newSearch = {
          location: searchCondition.location?.address,
          checkInDate: searchCondition.checkInDate,
          checkOutDate: searchCondition.checkOutDate,
          adults: searchCondition.capacity?.adults,
          children: searchCondition.capacity?.children,
          rooms: searchCondition.rooms,
          timestamp: new Date().getTime(),
        };

        // Kiểm tra xem đã có tìm kiếm tương tự chưa
        const existingSearchIndex = recentSearches.findIndex(
          (search: any) =>
            search.location === newSearch.location &&
            search.checkInDate === newSearch.checkInDate &&
            search.checkOutDate === newSearch.checkOutDate &&
            search.adults === newSearch.adults &&
            search.children === newSearch.children &&
            search.rooms === newSearch.rooms,
        );

        // Nếu đã có, xóa tìm kiếm cũ
        if (existingSearchIndex !== -1) {
          recentSearches.splice(existingSearchIndex, 1);
        }

        // Thêm tìm kiếm mới vào đầu mảng
        recentSearches.unshift(newSearch);

        // Giới hạn số lượng lịch sử tìm kiếm
        if (recentSearches.length > 10) {
          recentSearches = recentSearches.slice(0, 10);
        }

        // Lưu lại vào AsyncStorage
        await AsyncStorage.setItem(
          'recentSearches',
          JSON.stringify(recentSearches),
        );
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    };

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
      if (searchCondition.location?.address) {
        saveSearchHistory();
        navigation.navigate('HotelSearchResults', {searchCondition});
      } else {
        setModalMessage('Vui lòng chọn địa điểm');
        setModalVisible(true);
      }
    };

    // Render modal chọn số phòng và số người
    const renderRoomPersonModal = () => (
      <Modal
        animationType="slide"
        transparent={true}
        visible={roomPersonModalVisible}
        onRequestClose={() => setRoomPersonModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Số phòng và khách</Text>
              <TouchableOpacity
                onPress={() => setRoomPersonModalVisible(false)}>
                <AntDesign name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {/* Số người lớn */}
              <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Người lớn</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity
                    style={[
                      styles.counterButton,
                      (searchCondition.capacity?.adults || 0) <= 1 &&
                        styles.counterButtonDisabled,
                    ]}
                    onPress={decreaseAdults}
                    disabled={(searchCondition.capacity?.adults || 0) <= 1}>
                    <AntDesign
                      name="minus"
                      size={16}
                      color={
                        (searchCondition.capacity?.adults || 0) <= 1
                          ? COLORS.gray
                          : COLORS.black
                      }
                    />
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>
                    {searchCondition.capacity?.adults || 0}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={increaseAdults}>
                    <AntDesign name="plus" size={16} color={COLORS.black} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Số trẻ em */}
              {/* <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Trẻ em</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity
                    style={[
                      styles.counterButton,
                      (searchCondition.capacity?.children || 0) <= 0 &&
                        styles.counterButtonDisabled,
                    ]}
                    onPress={decreaseChildren}
                    disabled={(searchCondition.capacity?.children || 0) <= 0}>
                    <AntDesign
                      name="minus"
                      size={16}
                      color={
                        (searchCondition.capacity?.children || 0) <= 0
                          ? COLORS.gray
                          : COLORS.black
                      }
                    />
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>
                    {searchCondition.capacity?.children || 0}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={increaseChildren}>
                    <AntDesign name="plus" size={16} color={COLORS.black} />
                  </TouchableOpacity>
                </View>
              </View> */}

              {/* Số phòng */}
              <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Phòng</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity
                    style={[
                      styles.counterButton,
                      searchCondition.rooms <= 1 &&
                        styles.counterButtonDisabled,
                    ]}
                    onPress={decreaseRooms}
                    disabled={searchCondition.rooms <= 1}>
                    <AntDesign
                      name="minus"
                      size={16}
                      color={
                        searchCondition.rooms <= 1 ? COLORS.gray : COLORS.black
                      }
                    />
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>
                    {searchCondition.rooms}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={increaseRooms}>
                    <AntDesign name="plus" size={16} color={COLORS.black} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setRoomPersonModalVisible(false)}>
              <Text style={styles.applyButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );

    return (
      <View style={styles.container}>
        <View style={styles.searchCard}>
          {/* Địa điểm */}
          <Pressable
            style={({pressed}) => [
              styles.inputRow,
              pressed && styles.pressedInput,
            ]}
            onPress={handleLocation}
            android_ripple={{color: '#e0e0e0'}}>
            <AntDesign name="search1" size={24} color={COLORS.black} />
            {searchCondition?.location?.address ? (
              <Text
                style={styles.inputText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {searchCondition.location.address}
              </Text>
            ) : (
              <Text style={styles.inputTextPlaceholder}>
                Nhập điểm đến của bạn
              </Text>
            )}
          </Pressable>

          {/* Ngày nhận phòng và trả phòng */}
          <Pressable
            style={({pressed}) => [
              styles.inputRow,
              pressed && styles.pressedInput,
            ]}
            onPress={openCalendar}
            android_ripple={{color: '#e0e0e0'}}>
            <AntDesign name="calendar" size={24} color={COLORS.black} />
            <Text style={styles.inputText}>
              {searchCondition?.checkInDate && searchCondition?.checkOutDate ? (
                formatDate(searchCondition.checkInDate, true) +
                ' - ' +
                formatDate(searchCondition.checkOutDate, true)
              ) : (
                <Text style={styles.inputTextPlaceholder}>
                  Chọn ngày nhận và trả phòng
                </Text>
              )}
            </Text>
          </Pressable>

          {/* Số lượng khách */}
          <TouchableOpacity
            style={styles.inputRow}
            onPress={openRoomPersonModal}>
            <AntDesign name="user" size={24} color={COLORS.black} />
            <Text style={styles.inputText}>
              {searchCondition.rooms} phòng -{' '}
              <Text>{searchCondition.capacity?.adults} người lớn</Text>
              {/* <Text>{searchCondition.capacity?.children} trẻ em</Text> */}
            </Text>
          </TouchableOpacity>

          {/* Nút tìm kiếm */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.7}>
            <Text style={styles.searchButtonText}>Tìm</Text>
          </TouchableOpacity>
        </View>

        <ModalComponent modalVisible={modalVisible} closeModal={closeModal}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </ModalComponent>

        {/* Render modal chọn số phòng và số người */}
        {renderRoomPersonModal()}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchCard: {
    backgroundColor: COLORS.primary,
    gap: 5,
    borderRadius: 8,
    padding: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
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
  searchButton: {
    backgroundColor: COLORS.secondary,
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
  modalText: {
    color: COLORS.black,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 5,
  },
  modalButtonText: {
    color: '#0165FC',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'right',
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
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modalBody: {
    paddingVertical: 16,
    gap: 20,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonDisabled: {
    borderColor: COLORS.lightGray,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    minWidth: 24,
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#0165FC',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchComponent;
