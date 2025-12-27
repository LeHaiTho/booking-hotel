import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconComponent} from '@components/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useInfoBookingStore from '@stores/InfoBookingStore';
import {API_URL, formatDate} from '@utils/constants';
import moment from 'moment';
import {COLORS} from '@styles/colors';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '@components/ModalComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuthStore from '@stores/authStore';
const BookingDetailScreen = ({route}: any) => {
  const {hotelId, selectedRooms, payment, searchCondition} = route.params || {};
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {formData} = useInfoBookingStore();
  const [hotel, setHotel] = useState<any>(null);
  const {token} = useAuthStore();
  console.log('token', token);
  const totalFinalPrice = selectedRooms?.reduce(
    (
      acc: number,
      curr: {roomPrice: number; quantity: number; final_price: number},
    ) => acc + curr.quantity * curr.final_price,
    0,
  );
  const totalInitialPrice = selectedRooms?.reduce(
    (
      acc: number,
      curr: {roomPrice: number; quantity: number; initial_price: number},
    ) => acc + curr.quantity * curr.initial_price,
    0,
  );
  console.log('totalInitialPrice', totalInitialPrice);
  const getHotel = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/hotel-properties/hotel/${hotelId}`,
      );
      setHotel(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getHotel();
  }, [hotelId]);

  // Thêm hàm gửi email xác nhận đặt phòng
  const sendConfirmationEmail = async (bookingId: string, formData: any) => {
    try {
      const response = await axios.post(
        `${API_URL}/booking/send-confirmation-email/${bookingId}`,
        {formData},
      );
      console.log('Email confirmation response:', response.data);
      return true;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      return false;
    }
  };

  const handleBooking = async () => {
    if (!payment) {
      setModalVisible(true);
      return;
    }
    const payload = {
      formData,
      hotelId,
      selectedRooms,
      payment: payment?.name === 'cash' ? 'CASH' : 'CREDIT_CARD',
      searchCondition,
    };

    try {
      const response = await axios.post(`${API_URL}/booking`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log('response', response.data);

        // Nếu là CREDIT_CARD, điều hướng đến WebviewPayment với URL thanh toán
        if (
          payload.payment === 'CREDIT_CARD' &&
          response.data.result.payment_url
        ) {
          navigation.navigate('WebviewPayment', {
            url: response.data.result.payment_url,
            bookingId: response.data.result.id,
            formData,
            hotelId,
            selectedRooms,
            searchCondition,
          });
        } else {
          // Nếu là CASH, điều hướng đến BookingConfirmation với tất cả thông tin cần thiết
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'BookingConfirmation',
                params: {
                  result: response.data.result,
                  formData,
                  hotelId,
                  selectedRooms,
                  searchCondition,
                },
              },
            ],
          });
        }
      } else {
        console.log('response', response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const methodPayment = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q_OJ9bSa7fER1itMbUeaQrWfkKCz5Tinw2T8usjtjx2NdkZeaJSapjJpM7aTWPWD5UI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgber4MngQY983WF6ItDL0bzmmImENuVrPw&s',
    'https://thietkelogo.mondial.vn/wp-content/uploads/2023/12/Mau_thiet_-ke_-logo_thuong_-hieu_visa.jpeg',
  ];

  const totalPrice = selectedRooms?.reduce(
    (acc: number, curr: {roomPrice: number}) => acc + curr.roomPrice,
    0,
  );

  const onPressAccept = () => {
    // console.log('formData', formData);
    // console.log('hotel', hotel);
    setModalVisible(true);
  };

  const handleClickPayment = () => {
    // navigation.push('PaymentMethod', {
    //   hotel,
    //   selectedRooms,
    // });
    navigation.navigate('PaymentMethod', {
      hotelId,
      selectedRooms,
      payment,
      searchCondition,
    });
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: '#fff',
          gap: 16,
        }}>
        {/* không cần thẻ tín dụng
        <View
          style={
            {
              // paddingHorizontal: 16,
            }
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: 16,
              borderWidth: 1,
              borderColor: '#E5E5E5',
              borderRadius: 8,
              gap: 20,
            }}>
            <IconComponent
              name="credit-card-off-outline"
              color="#387053"
              library="MaterialCommunityIcons"
              size={20}
            />
            <View
              style={{
                gap: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Không cần thẻ tín dụng
              </Text>
              <Text
                style={{
                  color: '#000',
                  // flexWrap: 'wrap',
                  // flexShrink: 1,
                }}>
                Bạn sẽ thanh toán khi đến nghỉ.
              </Text>
            </View>
          </View>
        </View> */}
        {/* <Text style={{color: COLORS.black, fontWeight: '700', fontSize: 16}}>
          Bạn sẽ thanh toán trực tiếp cho chỗ nghỉ
        </Text>
        <View style={{flexDirection: 'row', gap: 15}}>
          {methodPayment?.map((item, index) => (
            <Image
              key={index}
              source={{uri: item}}
              style={{
                width: 30,
                height: 15,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: COLORS.borderGray,
              }}
              resizeMode="contain"
            />
          ))}
        </View>
        <Text style={{color: COLORS.black, fontWeight: '400'}}>
          Chỗ nghĩ sẽ xử lý thanh toán. Ngày họ thu tiền bạn sẽ tùy theo điều
          kiện đặt phòng của bạn.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: COLORS.black, fontWeight: '400'}}>
            Trước khi nhận phòng, chỗ nghỉ sẽ thu
          </Text>
          <Text style={{color: COLORS.black, fontWeight: '700'}}>
            VND {Number(totalFinalPrice)?.toLocaleString()}
          </Text>
        </View>
        <View style={{height: 1, backgroundColor: COLORS.borderGray}} /> */}
        <View>
          <Text style={{color: COLORS.black, fontWeight: '700', fontSize: 16}}>
            Thanh toán
          </Text>

          {payment ? (
            <>
              <Pressable
                style={({pressed}) => ({
                  backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                  flexDirection: 'column',
                  gap: 10,
                  alignSelf: 'flex-start',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
                onPress={() => {}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image
                    source={{uri: payment.image}}
                    style={{width: 40, height: 40}}
                  />
                  <Text style={{color: COLORS.black, fontWeight: '400'}}>
                    {payment.name === 'cash' ? 'Tiền mặt' : 'Zalo Pay E-wallet'}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={({pressed}) => ({
                  backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                  flexDirection: 'row',
                  gap: 10,
                  alignSelf: 'flex-start',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
                onPress={handleClickPayment}>
                <Icon
                  name="currency-exchange"
                  size={16}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: '400',
                    fontStyle: 'italic',
                  }}>
                  Thay đổi phương thức
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text
                style={{color: COLORS.black, fontWeight: '400', fontSize: 12}}>
                Chọn phương thức thanh toán
              </Text>
              <Pressable
                style={({pressed}) => ({
                  backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                  flexDirection: 'column',
                  gap: 10,
                  alignSelf: 'flex-start',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
                onPress={handleClickPayment}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    shadowColor: COLORS.black,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 4,
                    padding: 16,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                  }}>
                  <FontAwesome
                    name="credit-card"
                    size={30}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={{color: COLORS.black, fontWeight: '400'}}>
                  Thẻ mới
                </Text>
              </Pressable>
            </>
          )}
        </View>
        {/* Thông tin phòng + nhận trả phòng */}
        <View style={{gap: 12}}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
            Thông tin đặt phòng của bạn
          </Text>
          <View
            style={{
              flexDirection: 'column',
              padding: 16,
              borderWidth: 1,
              borderColor: '#E5E5E5',
              borderRadius: 8,
              gap: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontWeight: '700',
                  flex: 1,
                }}>
                {hotel?.name}
              </Text>
              <View
                style={{
                  backgroundColor: '#003b95',
                  padding: 4,
                  borderRadius: 5,
                  borderBottomLeftRadius: 0,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}>
                  7.1
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <AntDesign name="star" color="#FFB700" size={20} />
              <AntDesign name="star" color="#FFB700" size={20} />
            </View>
            <Text style={{color: '#000', fontWeight: '400'}} numberOfLines={2}>
              {hotel?.address}
            </Text>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#E5E5E5',
                marginVertical: 10,
              }}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* Nhận phòng */}
              <View>
                <Text style={{color: '#000', fontWeight: '500'}}>
                  Nhận phòng
                </Text>
                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  {formatDate(searchCondition?.checkInDate, true)}
                </Text>
              </View>

              {/* Trả phòng */}
              <View
                style={{
                  paddingHorizontal: 16,
                  borderLeftWidth: 1,
                  borderColor: '#E5E5E5',
                }}>
                <Text style={{color: '#000', fontWeight: '500'}}>
                  Trả phòng
                </Text>

                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  {formatDate(searchCondition?.checkOutDate, true)}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#E5E5E5',
                marginVertical: 10,
              }}
            />
            <View>
              <Text style={{color: '#000', fontWeight: '500'}}>
                Bạn đã chọn
              </Text>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                {`${moment(searchCondition?.checkOutDate).diff(
                  moment(searchCondition?.checkInDate),
                  'days',
                )} đêm, ${searchCondition?.rooms} căn hộ cho ${
                  searchCondition?.capacity?.adults
                } người lớn`}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#E5E5E5',
                marginVertical: 10,
              }}
            />
            <View>
              <Text style={{color: '#000', fontWeight: '700'}}>
                {formData?.guest_firstname} {formData?.guest_lastname}
              </Text>
              <Text style={{color: '#000'}}>{formData?.guest_email}</Text>
              <Text style={{color: '#000'}}>Việt Nam</Text>
              <Text style={{color: '#000'}}>{formData?.guest_phone}</Text>
            </View>
          </View>
        </View>

        {/* Gía gốc */}
        {/* <View
          style={{
            flexDirection: 'column',
            padding: 16,
            borderWidth: 1,
            borderColor: '#E5E5E5',
            borderRadius: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: COLORS.black,
              }}>
              Giá gốc
            </Text>
            <Text
              style={{
                color: COLORS.black,
              }}>
              VND {Number(totalPrice).toLocaleString()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: COLORS.black}}>
              Ưu Đãi Trong Thời Gian Có Hạn
            </Text>
            <Text style={{color: COLORS.black}}>VND 0</Text>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: '#E5E5E5',
              marginVertical: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#000', fontSize: 20, fontWeight: '500'}}>
              Giá
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}>
              {totalInitialPrice > totalFinalPrice ? (
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VND {Number(totalInitialPrice).toLocaleString()}
                </Text>
              ) : (
                <View />
              )}
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
                  VND {Number(totalFinalPrice).toLocaleString()}
                </Text>
                <Text style={{color: '#000', fontSize: 12}}>
                  Đã bao gồm thuế và phí
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        <View
          style={{
            gap: 16,
          }}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
            Điểm nổi bật
          </Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Ionicons name="sparkles-outline" color={COLORS.green} size={24} />
            <View style={{flexDirection: 'column', gap: 5}}>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                Phòng có không gian rộng, thoáng mát
              </Text>
              <Text style={{color: '#000', fontSize: 12}}>
                Dựa trên 2 đánh giá
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E5E5',
              marginVertical: 10,
            }}
          />
          {/* Chính sách hủy */}
          <View style={{gap: 16}}>
            <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
              Chính sách hủy
            </Text>
            <View style={{gap: 10}}>
              {/* <View style={{flexDirection: 'row', gap: 5}}>
                <AntDesign name="check" color="#008234" size={20} />

                <Text style={{color: '#008234', fontWeight: '700'}}>
                  Hủy miễn phí{' '}
                  <Text style={{fontWeight: 'normal'}}>
                    trước 18:00 ngày 11 thg 2, 2025
                  </Text>
                </Text>
              </View> */}
              <View style={{flexDirection: 'row', gap: 5}}>
                <AntDesign name="check" color="#008234" size={20} />
                <Text style={{color: '#008234', fontWeight: '700'}}>
                  Không cần thanh toán{' '}
                  <Text style={{fontWeight: 'normal'}}>
                    thanh toán tại chỗ nghỉ
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{}}>
              <Text
                style={{
                  color: '#0165FC',
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Điều kiện đặt phòng
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{height: 1, backgroundColor: '#E5E5E5', marginVertical: 10}}
          />
          {/* Chương trình Genius */}
          <View>
            {/* Bạn đang ở Genius Cấp 1 */}
            <View
              style={
                {
                  // padding: 16,
                }
              }>
              <View
                style={{
                  borderTopColor: '#E5E5E5',
                  borderTopWidth: 1,
                  paddingTop: 16,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    borderRadius: 4,
                    padding: 16,
                    gap: 16,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    Đơn đặt này sẽ được tính
                  </Text>

                  <View style={{gap: 10}}>
                    <Text style={{color: '#000'}}>
                      Khả dụng cho một số lựa chọn:
                    </Text>

                    <Text>
                      Chỗ nghỉ, vé máy bay, xe thuê, taxi hay vé tham quan, mỗi
                      đơn đặt hoàn tất đề được tính vào tiến trình Genius của
                      bạn
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#000',
                          fontWeight: '500',
                          flex: 1,
                        }}>
                        Chương trình khách hàng thân thiết của MNMQ.com
                      </Text>
                      <Image
                        source={{
                          uri: 'https://milesopedia.com/wp-content/uploads/2020/06/genius-booking-logo-e1593011246996.png',
                        }}
                        resizeMode="contain"
                        style={{
                          height: 30,
                          width: 70,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          // Shadow properties
          shadowColor: '#000', // Màu của shadow
          shadowOffset: {width: 0, height: -15}, // Đổ bóng phía trên (height âm)
          shadowOpacity: 0.2, // Độ trong suốt của shadow
          shadowRadius: 3, // Độ mờ của shadow
          elevation: 10, // Hỗ trợ shadow trên Android
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginBottom: 10,
            }}>
            {totalInitialPrice > totalFinalPrice && (
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  color: '#f20000',
                  fontWeight: 'bold',
                }}>
                VND {Number(totalInitialPrice).toLocaleString()}
              </Text>
            )}
            <Text style={{color: '#000', fontWeight: 'bold'}}>
              VND {Number(totalFinalPrice).toLocaleString()}
            </Text>
          </View>
          {/* <Text
            style={{
              fontSize: 12,
            }}>
            + VND 0 bao gồm thuế và phí
          </Text> */}
        </View>
        {/* Modal xác nhận không dùng phương thức thanh toán */}
        <ModalComponent
          modalVisible={modalVisible}
          touchable={false}
          closeModal={() => setModalVisible(false)}>
          <View style={{gap: 20, flexDirection: 'column'}}>
            <View style={{paddingHorizontal: 5, gap: 16}}>
              <Text
                style={{color: COLORS.black, fontSize: 20, fontWeight: '700'}}>
                Thông tin bị thiếu
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '400',
                  fontSize: 16,
                  lineHeight: 26,
                }}>
                Vui lòng chọn phương thức thanh toán để hoàn tất đặt phòng này
              </Text>
            </View>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.opacity : '',
                  padding: 12,
                  borderRadius: 3,
                  alignSelf: 'flex-end',
                },
              ]}
              onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                OK
              </Text>
            </Pressable>
          </View>
        </ModalComponent>
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              backgroundColor: pressed ? COLORS.primaryLight : COLORS.primary,
              width: '100%',
              gap: 10,
              borderRadius: 3,
            },
          ]}
          onPress={handleBooking}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            Đặt ngay
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({});
