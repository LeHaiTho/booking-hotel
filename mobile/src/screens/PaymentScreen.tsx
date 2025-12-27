import IconComponent from '@components/IconComponent';
import ModalComponent from '@components/ModalComponent';
import {COLORS} from '@styles/colors';
import {formatDate} from '@utils/constants';
import moment from 'moment';
import React, {useState} from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PaymentScreen = ({route}: any) => {
  const {hotel, formData} = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  console.log('hotel', formData);
  const methodPayment = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q_OJ9bSa7fER1itMbUeaQrWfkKCz5Tinw2T8usjtjx2NdkZeaJSapjJpM7aTWPWD5UI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgber4MngQY983WF6ItDL0bzmmImENuVrPw&s',
    'https://thietkelogo.mondial.vn/wp-content/uploads/2023/12/Mau_thiet_-ke_-logo_thuong_-hieu_visa.jpeg',
  ];

  const handleBooking = () => {
    // console.log('formData', formData);
    // console.log('hotel', hotel);
    setModalVisible(true);
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: COLORS.white,
          gap: 16,
        }}>
        <Text style={{color: COLORS.black, fontWeight: '700', fontSize: 16}}>
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
            VND 1.026.000
          </Text>
        </View>
        <View style={{height: 1, backgroundColor: COLORS.borderGray}} />
        <View>
          <Text style={{color: COLORS.black, fontWeight: '700', fontSize: 16}}>
            Thanh toán
          </Text>
          <Text style={{color: COLORS.black, fontWeight: '400', fontSize: 12}}>
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
            })}>
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
              <IconComponent
                name="star"
                color="#FFB700"
                library="AntDesign"
                size={20}
              />
              <IconComponent
                name="star"
                color="#FFB700"
                library="AntDesign"
                size={20}
              />

              <IconComponent
                name="star"
                color="#FFB700"
                library="AntDe"
                size={20}
              />
            </View>
            <Text style={{color: '#000', fontWeight: '400'}} numberOfLines={2}>
              {hotel?.address}
            </Text>

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
                  {formatDate(hotel?.checkInDate, true)}
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
                  {formatDate(hotel?.checkOutDate, true)}
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
                {`${moment(hotel?.checkOutDate).diff(
                  moment(hotel?.checkInDate),
                  'days',
                )} đêm, 1 căn hộ cho 2 người lớn`}
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
        <View
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
              VND 1.183.000
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
              <Text
                style={{color: '#f20000', textDecorationLine: 'line-through'}}>
                VND 1.183.000
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
                  VND 683.000
                </Text>
                <Text style={{color: '#000', fontSize: 12}}>
                  Đã bao gồm thuế và phí
                </Text>
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
            }}>
            <Text
              style={{
                textDecorationLine: 'line-through',
                color: '#f20000',
                fontWeight: 'bold',
              }}>
              VND 1.520.000
            </Text>
            <Text style={{color: '#000', fontWeight: 'bold'}}>
              VND 1.026.000
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
            }}>
            + VND 78.171 bao gồm thuế và phí
          </Text>
        </View>

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
          <Text style={{color: COLORS.white, fontSize: 16, fontWeight: '500'}}>
            Đặt ngay
          </Text>
        </Pressable>
      </View>
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
              style={{color: COLORS.primary, fontSize: 16, fontWeight: '500'}}>
              OK
            </Text>
          </Pressable>
        </View>
      </ModalComponent>
    </>
  );
};

export default PaymentScreen;
