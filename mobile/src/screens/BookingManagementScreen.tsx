import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ModalComponent from '@components/ModalComponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';
import {API_URL, formatDate} from '@utils/constants';

const BookingManagementScreen = ({route}: {route: any}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {infoBooking} = route.params || {};
  console.log(infoBooking);
  const handleCancelBooking = () => {
    setIsModalVisible(true);
  };

  const handleAcceptCancelBooking = async () => {
    setIsLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const response = await axios.post(`${API_URL}/booking/cancel`, {
        bookingId: infoBooking?.id,
      });
      console.log(response);
      if (response.status === 200) {
        setIsModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Main', params: {screen: 'HomeTab'}}],
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsModalVisible(false);
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'Main', params: {screen: 'HomeTab'}}],
      // });
    }
  };

  return (
    <>
      <View
        style={{flex: 1, gap: 16, backgroundColor: COLORS.white, padding: 16}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: COLORS.black}}>
          Quản lý đặt phòng
        </Text>
        <View style={{gap: 10}}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, gap: 5}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: COLORS.black,
                }}>
                Nhận phòng
              </Text>

              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {formatDate(infoBooking?.checkin_date, true, true)}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                }}>
                từ {infoBooking?.Hotel?.checkinfrom} đến{' '}
                {infoBooking?.Hotel?.checkinto}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.gray,
                width: 0.5,
                height: '100%',
              }}></View>
            <View style={{flex: 1, gap: 5}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: COLORS.black,
                }}>
                Nhận phòng
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {formatDate(infoBooking?.checkout_date, true, true)}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                }}>
                từ {infoBooking?.Hotel?.checkoutfrom} đến{' '}
                {infoBooking?.Hotel?.checkoutto}
              </Text>
            </View>
          </View>
        </View>
        <View style={{gap: 16}}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 12,
              borderRadius: 3,
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('AdjustBookingDate', {
                infoBooking,
              });
            }}>
            <Text
              style={{color: COLORS.white, fontWeight: '500', fontSize: 16}}>
              Thay đổi ngày tháng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 3,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.red,
              flexDirection: 'row',
              gap: 10,
            }}
            onPress={handleCancelBooking}>
            <AntDesign name="close" size={24} color={COLORS.red} />
            <Text style={{color: COLORS.red, fontWeight: '500', fontSize: 16}}>
              Hủy đặt phòng
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{gap: 10}}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Fontisto name="email" size={24} color={COLORS.primary} />
            <Text
              style={{color: COLORS.primary, fontWeight: '500', fontSize: 16}}>
              Gửi lại email xác nhận
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Fontisto name="email" size={24} color={COLORS.primary} />
            <Text
              style={{color: COLORS.primary, fontWeight: '500', fontSize: 16}}>
              Cập nhật địa chỉ email
            </Text>
          </View>
        </View>
      </View>
      <ModalComponent
        modalVisible={isModalVisible}
        touchable={false}
        closeModal={() => setIsModalVisible(false)}
        containerStyle={{
          backgroundColor: COLORS.white,
          padding: 16,
          borderRadius: 4,
          gap: 20,
        }}>
        <View>
          <Text
            style={{
              color: COLORS.black,
            }}>
            Hủy toàn bộ đặt phòng
          </Text>
          <Text
            style={{
              color: COLORS.black,
            }}>
            Bạn sắp hủy toàn bộ đặt phòng
          </Text>
        </View>
        <Text
          style={{
            color: COLORS.black,
          }}>
          Phí hủy đặt phòng
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: COLORS.black,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            Căn hộ có ban công
          </Text>
          <Text style={{color: COLORS.green, fontSize: 18, fontWeight: '600'}}>
            miễn phí
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: COLORS.black,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            Tổng cổng
          </Text>
          <Text style={{color: COLORS.green, fontSize: 18, fontWeight: '600'}}>
            miễn phí
          </Text>
        </View>
        <View style={{gap: 20}}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.red,
              padding: 12,
              borderRadius: 2,
              alignItems: 'center',
            }}
            onPress={handleAcceptCancelBooking}>
            <Text
              style={{
                color: COLORS.white,
                fontWeight: '500',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Đồng ý, hủy toàn bộ đặt phòng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 12,
              borderRadius: 2,
              alignItems: 'center',
            }}
            onPress={() => setIsModalVisible(false)}>
            <Text
              style={{
                color: COLORS.white,
                fontWeight: '500',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Không, tôi không muốn hủy
            </Text>
          </TouchableOpacity>
        </View>
      </ModalComponent>
      <ModalComponent
        modalVisible={isLoading}
        touchable={false}
        closeModal={() => {}}
        containerStyle={{
          backgroundColor: COLORS.white,
          padding: 16,
          borderRadius: 4,
          gap: 20,
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{color: COLORS.black}}>Đang xử lý...</Text>
      </ModalComponent>
    </>
  );
};

export default BookingManagementScreen;

const styles = StyleSheet.create({});
