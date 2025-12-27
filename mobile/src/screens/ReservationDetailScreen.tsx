import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import IconComponent from '@components/IconComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import authStore from '@stores/authStore';
import {formatDate, API_URL} from '@utils/constants';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import moment from 'moment';
import axios from 'axios';

const ReservationDetailScreen = ({route}: {route: any}) => {
  const navigation = useNavigation<any>();
  const {user, token} = authStore();
  const {infoBooking} = route.params || {};
  const [hasRated, setHasRated] = useState(false);
  const [isCheckingRating, setIsCheckingRating] = useState(true);

  // Tính số đêm lưu trú
  const nights = moment(infoBooking?.checkout_date).diff(
    moment(infoBooking?.checkin_date),
    'days',
  );

  // Kiểm tra trạng thái đặt phòng
  const isPending = infoBooking?.status === 'PENDING';

  const isCancelled = infoBooking?.status === 'CANCELLED';
  const isConfirmed = infoBooking?.status === 'CONFIRMED';
  console.log(infoBooking?.status);
  // Kiểm tra phương thức thanh toán
  const isCashPayment = infoBooking?.payment_method === 'CASH';
  const isCreditCardPayment = infoBooking?.payment_method === 'CREDIT_CARD';

  // Kiểm tra xem người dùng đã đánh giá khách sạn này chưa
  useEffect(() => {
    const checkRating = async () => {
      if (!token || !infoBooking?.Hotel.id || !infoBooking?.id) {
        setIsCheckingRating(false);

        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/ratings/check-rating/${infoBooking?.Hotel?.id}/${infoBooking?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setHasRated(response?.data?.hasRated);
        console.log('response.data', response?.data);
      } catch (error) {
        console.error('Error checking rating:', error);
      } finally {
        setIsCheckingRating(false);
      }
    };

    checkRating();
  }, [token, infoBooking]);

  // Hàm xử lý khi nhấn nút đánh giá
  const handleRateHotel = () => {
    navigation.navigate('Step1Review', {
      hotelId: infoBooking?.Hotel?.id,
      bookingId: infoBooking?.id,
      hotel: infoBooking?.Hotel,
    });
  };

  // Hiển thị nút đánh giá nếu đặt phòng đã hoàn thành và chưa được đánh giá
  const showRatingButton = isConfirmed && !hasRated && !isCheckingRating;
  console.log('showRatingButton', isConfirmed, hasRated, isCheckingRating);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#fff',
          padding: 16,
          gap: 25,
        }}>
        <View style={{gap: 10}}>
          <Text
            style={{
              color: isCancelled
                ? COLORS.red
                : isPending
                ? COLORS.green
                : COLORS.black,
            }}>
            {isCancelled
              ? 'Đã hủy'
              : isPending
              ? 'Đã xác nhận'
              : 'Đã hoàn thành'}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            {isCancelled
              ? 'Đặt chỗ của bạn đã bị hủy'
              : 'Đặt chỗ của bạn đã được xác nhận'}
          </Text>
          <Text
            style={{
              color: '#000',
              lineHeight: 20,
            }}>
            {!isCancelled && (
              <>
                Mọi thứ xong xuôi! Chúng tôi đã gửi email xác nhận đến{' '}
                <Text
                  style={{
                    fontWeight: '700',
                  }}>
                  {user?.email}{' '}
                  {isPending && (
                    <Text
                      style={{
                        color: '#0165FC',
                        fontWeight: '500',
                      }}>
                      Cập nhật và gửi lại
                    </Text>
                  )}
                </Text>
              </>
            )}
          </Text>
        </View>

        {/* Hiển thị nút đánh giá nếu đặt phòng đã hoàn thành và chưa được đánh giá */}
        {showRatingButton && (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 12,
              borderRadius: 5,
              alignItems: 'center',
            }}
            onPress={handleRateHotel}>
            <Text
              style={{color: COLORS.white, fontSize: 16, fontWeight: '500'}}>
              Đánh giá khách sạn
            </Text>
          </TouchableOpacity>
        )}

        <View style={{gap: 18}}>
          <View>
            <Text
              style={{
                color: '#0165FC',
                fontSize: 20,
                fontWeight: '700',
                lineHeight: 30,
              }}>
              {infoBooking?.Hotel?.name}
            </Text>

            {/* Chi tiết thông tin phòng */}
            <View style={{padding: 8, gap: 16}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent name="calendar" library="AntDesign" size={20} />
                <View style={{gap: 4}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    {formatDate(infoBooking?.checkin_date, true)} -{' '}
                    {formatDate(infoBooking?.checkout_date, true)} • {nights}{' '}
                    đêm
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Nhận phòng: từ {infoBooking?.Hotel?.checkinfrom} đến{' '}
                    {infoBooking?.Hotel?.checkinto}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Trả phòng: từ {infoBooking?.Hotel?.checkoutfrom} đến{' '}
                    {infoBooking?.Hotel?.checkoutto}
                  </Text>

                  {/* Chỉ hiển thị nút thay đổi ngày nếu đặt phòng đang ở trạng thái PENDING */}
                  {isPending && !isCancelled && (
                    <Pressable
                      style={({pressed}) => [
                        {
                          paddingVertical: 10,
                          backgroundColor: pressed
                            ? COLORS.grayLight
                            : 'transparent',
                          alignSelf: 'flex-start',
                        },
                      ]}
                      onPress={() => {
                        navigation.navigate('AdjustBookingDate', {
                          infoBooking,
                        });
                      }}>
                      <Text
                        style={{
                          color: '#0165FC',
                          fontWeight: '600',
                          fontSize: 16,
                        }}>
                        Thay đổi ngày
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent
                  name="location-pin"
                  library="SimpleLineIcons"
                  size={20}
                />
                <View style={{gap: 4, flex: 1}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    Địa chỉ chỗ nghỉ
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      flex: 1,
                    }}>
                    {infoBooking?.Hotel?.address}
                    <TouchableOpacity style={{flex: 1}}>
                      <IconComponent
                        name="content-copy"
                        library="MaterialIcons"
                        size={20}
                        color="#0165FC"
                      />
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent name="phone" library="Feather" size={20} />
                <View style={{gap: 4}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    Số điện thoại
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    {infoBooking?.phone || user?.phone || 'Chưa cung cấp'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#ccc',
            }}></View>

          {/* Chỉ hiển thị nút quản lý đặt phòng nếu đặt phòng đang ở trạng thái PENDING */}
          {isPending && !isCancelled && (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#0165FC',
                padding: 12,
                borderRadius: 5,
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('BookingManagement', {
                  infoBooking,
                });
              }}>
              <Text style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                Quản lý đặt phòng
              </Text>
            </TouchableOpacity>
          )}

          <View style={{gap: 16}}>
            <View style={{gap: 10}}>
              <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
                Căn hộ studio có Ban Công
              </Text>
              <View style={{gap: 14}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <IconComponent
                    name="user"
                    library="AntDesign"
                    size={20}
                    color="#000"
                  />
                  <View>
                    <Text>Khách</Text>
                    <Text>
                      {user?.name} - {infoBooking?.total_adult} người lớn
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <IconComponent
                    name="check"
                    library="Feather"
                    size={20}
                    color="#058633"
                  />
                  <View
                    style={{
                      flex: 1,
                      gap: 4,
                    }}>
                    <Text
                      style={{
                        color: '#058633',
                        fontWeight: 'bold',
                      }}>
                      {isCancelled ? 'Đã hủy' : 'Miễn phí hủy'}
                    </Text>
                    {!isCancelled && (
                      <>
                        <Text style={{color: '#000', lineHeight: 20}}>
                          Bạn có thể hủy phòng miễn phí đến 18:00 ngày nhận
                          phòng. Bạn sẽ phải trả toàn bộ tiền phòng nếu bạn hủy
                          sau 18:00 ngày nhận phòng. Nếu bạn vắng mặt, phí vắng
                          mặt sẽ bằng với phí hủy.
                        </Text>
                        <Text style={{color: '#000', fontSize: 12}}>
                          (Các thời hạn hủy miễn phí được tính theo múi giờ của
                          chỗ nghỉ)
                        </Text>
                      </>
                    )}
                  </View>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <IconComponent
                    name="plus"
                    library="SimpleLineIcons"
                    size={20}
                    color="#000"
                  />
                  <View style={{gap: 4}}>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Quyền lợi bao gồm
                    </Text>
                    <Text style={{color: '#000'}}>Chỗ đậu xe</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: '#0165FC',
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Xem chi tiết căn hộ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#ccc',
            }}></View>
          <View style={{gap: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Tổng giá
              </Text>
              <Text
                style={{color: '#058633', fontSize: 22, fontWeight: 'bold'}}>
                {Number(infoBooking?.total_price).toLocaleString('vi-VN')} VNĐ
              </Text>
            </View>

            {/* Hiển thị trạng thái thanh toán dựa trên trạng thái đặt phòng và phương thức thanh toán */}
            {isPending && isCashPayment && (
              <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                Thanh toán được xử lý bởi chỗ nghỉ
              </Text>
            )}
            {isPending &&
              isCreditCardPayment &&
              infoBooking?.is_paid === true && (
                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  Đã thanh toán
                </Text>
              )}
            {isPending &&
              isCreditCardPayment &&
              infoBooking?.is_paid === false && (
                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  Chưa thanh toán
                </Text>
              )}
            {isConfirmed && infoBooking?.is_paid === true && (
              <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                Đã đến chỗ nghỉ
              </Text>
            )}
            {isCancelled && (
              <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                Đã hủy
              </Text>
            )}

            {/* Hiển thị thông tin về giá cho tất cả các trạng thái */}
            <TouchableOpacity
              style={{
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: '#0165FC',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Thông tin về giá
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReservationDetailScreen;
