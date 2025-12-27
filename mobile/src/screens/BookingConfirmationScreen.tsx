import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconComponent from '@components/IconComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {API_URL, formatDate} from '@utils/constants';
import authStore from '@stores/authStore';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BookingConfirmationScreen = ({route}: {route: any}) => {
  const {result, bookingId, formData, hotelId, selectedRooms, searchCondition} =
    route.params || {};
  const {user} = authStore();
  const [infoBooking, setInfoBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const id = result?.id || bookingId;
  console.log('id', id);

  // Hàm gửi email xác nhận đặt phòng
  const sendConfirmationEmail = async () => {
    if (emailSent || !formData || !id) return;

    setSendingEmail(true);
    try {
      const response = await axios.post(
        `${API_URL}/booking/send-confirmation-email/${id}`,
        {formData},
      );
      console.log('Email confirmation response:', response.data);
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    } finally {
      setSendingEmail(false);
    }
  };

  const getBookingId = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/booking/${id}`);
      setInfoBooking(response.data.booking);

      // Gửi email xác nhận sau khi lấy thông tin đặt phòng thành công
      if (response.data.booking && formData) {
        await sendConfirmationEmail();
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingId();
  }, [id]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" color="#0165FC" />
        <Text style={{marginTop: 16, color: '#000'}}>
          Đang tải thông tin đặt phòng...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        gap: 25,
      }}>
      <View style={{gap: 10}}>
        <Text
          style={{
            color: '#058633',
          }}>
          Đã xác nhận
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          Đặt chỗ của bạn đã được xác nhận
        </Text>
      </View>
      <View style={{gap: 18}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
          }}>
          <Ionicons name="checkmark-sharp" size={20} color="#008234" />
          <Text
            style={{
              flex: 1,
            }}>
            {sendingEmail ? (
              <Text>Đang gửi email xác nhận...</Text>
            ) : emailSent ? (
              <Text>
                Chúng tôi đã gửi xác nhận đến{' '}
                <Text style={{color: '#000', fontWeight: '700'}}>
                  {formData?.guest_email || user?.email}
                </Text>
              </Text>
            ) : (
              <Text>
                Chúng tôi đã gửi xác nhận đến{' '}
                <Text style={{color: '#000', fontWeight: '700'}}>
                  {user?.email}
                </Text>
              </Text>
            )}
          </Text>
        </View>

        {/* Nút gửi lại email nếu cần */}
        {!sendingEmail && emailSent && (
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={sendConfirmationEmail}>
            <Text style={{color: '#0165FC', fontWeight: '500'}}>
              Gửi lại email xác nhận
            </Text>
          </TouchableOpacity>
        )}

        {/* Bảo mật online */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <IconComponent
              name="alert-circle-outline"
              library="Ionicons"
              size={26}
              color="brown"
            />
            <Text>Bảo mật online</Text>
          </View>
          <IconComponent name="chevron-thin-down" library="Entypo" size={18} />
        </TouchableOpacity>

        {/* Thông tin phòng được đặt thành công */}
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 10,
            gap: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
            }}>
            <Image
              source={{
                uri: `${API_URL}/hotel-properties/hotel/get-image/${
                  infoBooking?.Hotel?.id
                }/${infoBooking?.Hotel?.images?.split(',')[0]}`,
              }}
              style={{width: 65, height: 65, borderRadius: 10}}
            />
            <View style={{flex: 1}}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                {infoBooking?.Hotel?.name}
              </Text>
              <Text>
                Tổng giá:{' '}
                <Text style={{color: '#000', fontWeight: '500'}}>
                  {Number(infoBooking?.total_price).toLocaleString('vi-VN')} VNĐ
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              gap: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <IconComponent name="calendar" library="AntDesign" size={23} />
              <Text style={{color: '#000'}}>
                {formatDate(infoBooking?.checkin_date)} -{' '}
                {formatDate(infoBooking?.checkout_date)}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <IconComponent name="bed-outline" library="Ionicons" size={23} />
              <Text style={{color: '#000'}}>
                {infoBooking?.bookingDetails?.length} phòng ngủ
              </Text>
            </View> */}
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#ccc',
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: '#0165FC',
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'center',
              }}
              onPress={() =>
                navigation.navigate('ReservationDetail', {
                  infoBooking,
                })
              }>
              Xem hoặc cập nhật chi tiết
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Gặp host của bạn */}
        <View style={{gap: 10}}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
            Gặp host của bạn
          </Text>
          <Text style={{}}>Nhắn tin cho host nếu bạn muốn:</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              padding: 16,
              gap: 16,
            }}>
            <View
              style={{
                gap: 5,
              }}>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name="checkmark-sharp"
                  library="Ionicons"
                  size={20}
                />
                <Text
                  style={{
                    color: '#000',
                  }}>
                  Sắp xếp thời gian nhận/trả phòng
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name="checkmark-sharp"
                  library="Ionicons"
                  size={20}
                />
                <Text
                  style={{
                    color: '#000',
                  }}>
                  Yêu cầu chỗ đậu xe hoặc dịch vụ đón khách
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name="checkmark-sharp"
                  library="Ionicons"
                  size={20}
                />
                <Text
                  style={{
                    color: '#000',
                    flex: 1,
                  }}>
                  Biết về các dịch vụ liên quan đến hành lý hoặc vật nuôi
                </Text>
              </View>
            </View>

            {/* Nút gửi tin nhắn */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                backgroundColor: '#0165FC',
                width: '100%',
                gap: 10,
                borderRadius: 3,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                Nhắn tin cho host
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingConfirmationScreen;
