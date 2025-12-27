import {COLORS} from '@styles/colors';
import {API_URL, formatDate} from '@utils/constants';
import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import ModalComponent from '@components/ModalComponent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  ReservationDetailScreen: {bookingId: number};
  Main: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ChangeDateConfirmScreen = ({route}: {route: any}) => {
  const {infoBooking, newCheckInDate, newCheckOutDate} = route.params || {};
  const [isUpdated, setIsUpdated] = useState(false);
  const {token} = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  // Memoize hotel image URI to prevent recalculation on re-renders
  const hotelImageUri = useMemo(() => {
    if (!infoBooking?.Hotel?.id || !infoBooking?.Hotel?.images) return '';
    const firstImage = infoBooking.Hotel.images.split(',')[0];
    return `${API_URL}/hotel-properties/hotel/get-image/${infoBooking.Hotel.id}/${firstImage}`;
  }, [infoBooking?.Hotel?.id, infoBooking?.Hotel?.images]);

  // Memoize formatted dates to prevent recalculations
  const formattedDates = useMemo(
    () => ({
      oldCheckIn: formatDate(infoBooking?.checkin_date, true, true),
      oldCheckOut: formatDate(infoBooking?.checkout_date, true, true),
      newCheckIn: formatDate(newCheckInDate, true, true),
      newCheckOut: formatDate(newCheckOutDate, true, true),
    }),
    [
      infoBooking?.checkin_date,
      infoBooking?.checkout_date,
      newCheckInDate,
      newCheckOutDate,
    ],
  );

  // Memoize price formatting to prevent recalculations
  const formattedPrice = useMemo(() => {
    if (!infoBooking?.total_price) return '0';
    return Number(infoBooking.total_price).toLocaleString('vi-VN');
  }, [infoBooking?.total_price]);

  const handleConfirmChange = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/hotel-properties/room/update-booking-schedule`,
        {
          bookingId: infoBooking.id,
          newCheckInDate,
          newCheckOutDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setIsUpdated(true);
      }
    } catch (error: any) {
      console.error('Error updating booking schedule:', error);
      Alert.alert(
        'Lỗi',
        error.response?.data?.message ||
          'Đã có lỗi xảy ra khi cập nhật lịch đặt phòng',
      );
    } finally {
      setIsLoading(false);
    }
  }, [infoBooking?.id, newCheckInDate, newCheckOutDate, token, isLoading]);

  const handleBackToReservationDetail = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          params: {screen: 'HomeTab'},
        },
      ],
    });
  }, [navigation]);

  const HeaderLeftButton = useCallback(
    () => (
      <Pressable
        onPress={
          isUpdated ? handleBackToReservationDetail : () => navigation.goBack()
        }
        style={({pressed}) => [
          {
            marginRight: 26,
            opacity: pressed ? 0.5 : 1,
            backgroundColor: pressed ? COLORS.opacityDark : 'transparent',
            padding: 5,
            borderRadius: 100,
          },
        ]}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={COLORS.white}
        />
      </Pressable>
    ),
    [isUpdated, handleBackToReservationDetail, navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: HeaderLeftButton,
    });
  }, [HeaderLeftButton, navigation]);

  const SuccessView = useCallback(
    () => (
      <View style={styles.successContainer}>
        <Text style={styles.titleText}>
          Đơn đặt của bạn đã được cập nhật thành công
        </Text>
        <Text style={styles.descriptionText}>
          Chúng tôi đã gửi email xác nhận đến{' '}
          {infoBooking?.email || 'email của bạn'}. Chúc bạn một kỳ nghỉ vui vẻ!
        </Text>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleBackToReservationDetail}>
          <Text style={styles.checkButtonText}>
            Quay lại chi tiết đặt phòng
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [infoBooking?.email, handleBackToReservationDetail],
  );

  const LoadingModal = useCallback(
    () => (
      <ModalComponent
        modalVisible={isLoading}
        closeModal={() => {}}
        containerStyle={styles.modalContainer}
        children={
          <>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{color: COLORS.black}}>Đang cập nhật đơn đặt...</Text>
          </>
        }
      />
    ),
    [isLoading],
  );

  const ConfirmView = useCallback(
    () => (
      <>
        <View style={styles.confirmContainer}>
          <Text style={styles.titleText}>Kiểm tra và xác nhận</Text>
          <Text style={styles.descriptionText}>
            Tin vui! Chúng tôi có thể đổi ngày cho kỳ nghỉ của bạn. Hãy kiểm tra
            thông tin thay đổi bên dưới. Chúng tôi sẽ cập nhật đơn đặt sau khi
            bạn xác nhận.
          </Text>
          <View style={styles.hotelInfoContainer}>
            <Image
              source={{uri: hotelImageUri}}
              style={styles.hotelImage}
              // defaultSource={require('@assets/placeholder.png')}
            />
            <View style={styles.hotelTextContainer}>
              <Text style={styles.hotelName}>{infoBooking?.Hotel?.name}</Text>
              <Text style={styles.optionText}>1 lựa chọn</Text>
            </View>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Ngày mới</Text>
            <View style={styles.dateRowContainer}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Nhận phòng</Text>
                <Text style={styles.oldDate}>{formattedDates.oldCheckIn}</Text>
                <Text style={styles.newDate}>{formattedDates.newCheckIn}</Text>
                <Text style={styles.timeText}>
                  {infoBooking?.Hotel?.checkinfrom} đến{' '}
                  {infoBooking?.Hotel?.checkinto}
                </Text>
              </View>
              <View style={styles.divider}></View>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Trả phòng</Text>
                <Text style={styles.oldDate}>{formattedDates.oldCheckOut}</Text>
                <Text style={styles.newDate}>{formattedDates.newCheckOut}</Text>
                <Text style={styles.timeText}>
                  {infoBooking?.Hotel?.checkoutfrom} đến{' '}
                  {infoBooking?.Hotel?.checkoutto}
                </Text>
              </View>
            </View>
            <Text style={styles.priceTitle}>Chi tiết giá</Text>
            <View style={styles.priceSection}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Giá ban đầu</Text>
                <Text style={styles.oldPrice}>{formattedPrice} VNĐ</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Giá mới</Text>
                <Text style={styles.newPrice}>{formattedPrice} VNĐ</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.checkButton,
              isLoading && styles.checkButtonDisabled,
            ]}
            onPress={handleConfirmChange}
            disabled={isLoading}
            activeOpacity={0.7}>
            <Text style={styles.checkButtonText}>
              {isLoading ? 'Đang xử lý...' : 'Đồng ý thực hiện thay đổi'}
            </Text>
          </TouchableOpacity>
        </View>
        <LoadingModal />
      </>
    ),
    [
      hotelImageUri,
      formattedDates,
      formattedPrice,
      infoBooking,
      isLoading,
      handleConfirmChange,
    ],
  );

  return isUpdated ? <SuccessView /> : <ConfirmView />;
};

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    gap: 16,
  },
  confirmContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    gap: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  descriptionText: {
    color: COLORS.black,
    lineHeight: 22,
  },
  hotelInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  hotelImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  hotelTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  hotelName: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  optionText: {
    color: COLORS.black,
    fontSize: 14,
  },
  dateSection: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  dateRowContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  dateColumn: {
    flex: 1,
    gap: 5,
  },
  dateLabel: {
    fontWeight: '500',
    color: COLORS.black,
  },
  oldDate: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
  newDate: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 16,
  },
  timeText: {
    color: COLORS.gray,
  },
  divider: {
    backgroundColor: COLORS.gray,
    width: 0.5,
    height: '100%',
  },
  priceTitle: {
    fontWeight: '500',
    color: COLORS.black,
    fontSize: 18,
    marginTop: 10,
  },
  priceSection: {
    gap: 10,
    marginTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: {
    color: COLORS.black,
  },
  oldPrice: {
    color: COLORS.black,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    color: COLORS.black,
  },
  bottomButtonContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#0165FC',
    width: '100%',
    gap: 10,
    borderRadius: 3,
  },
  checkButtonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  checkButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: '70%',
    padding: 16,
    gap: 12,
  },
});

export default React.memo(ChangeDateConfirmScreen);
