import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import IconComponent from '@components/IconComponent';
import SlideUpViewComponent from '@components/SlideUpViewComponent';
import RadioButtonComponent from '@components/RadioButtonComponent';
import CheckboxComponent from '@components/CheckboxComponent';
import useAuthStore from '@stores/authStore';
import useInfoBookingStore from '@stores/InfoBookingStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ModalComponent from '@components/ModalComponent';
import {COLORS} from '@styles/colors';

const BookingInfomationScreen = ({route}: any) => {
  const {hotelId, selectedRooms, searchCondition} = route.params || {};
  console.log('hotelId', hotelId);
  console.log('selectedRooms', selectedRooms);
  console.log('searchCondition', searchCondition);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<boolean>(true);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const {user} = useAuthStore();
  const {formData, updateFormData, resetFormData, validateForm, errors} =
    useInfoBookingStore();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const inputRef = {
    guest_firstname: useRef<TextInput>(null),
    guest_lastname: useRef<TextInput>(null),
    guest_email: useRef<TextInput>(null),
    guest_phone: useRef<TextInput>(null),
  };

  // Mục đích chuyến đi
  const options = ['Vui chơi/ giải trí', 'Công tác'];
  const onClose = () => {
    setIsVisible(false);
  };
  const onOpen = () => {
    setIsVisible(true);
  };
  const handleUpdateFormData = (field: string, value: string) => {
    updateFormData(field, value);
  };
  const handleSubmitForm = () => {
    const isValid = validateForm();

    if (isValid) {
      navigation.navigate('BookingDetail', {
        hotelId,
        selectedRooms,
        searchCondition,
      });
    } else {
      const errorFields = Object.keys(errors).find(
        key => errors[key as keyof typeof errors] !== '',
      );
      if (errorFields) {
        inputRef[errorFields as keyof typeof inputRef].current?.focus();
      }
    }
  };
  useEffect(() => {
    if (user) {
      updateFormData('guest_firstname', user.firstname);
      updateFormData('guest_lastname', user.lastname);
      updateFormData('guest_email', user.email);
    }
  }, [user]);
  return (
    <>
      <ModalComponent
        closeModal={() => setIsVisibleModal(false)}
        modalVisible={isVisibleModal}
        touchable={false}
        containerStyle={{
          borderRadius: 4,
          width: '70%',
        }}
        children={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <ActivityIndicator size={50} color="#0165FC" />
            <Text style={{color: '#000'}}>Đang tải thông tin...</Text>
          </View>
        }
      />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: '#fff',
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{gap: 16}}>
          {!user && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                backgroundColor: '#fff',
                borderRadius: 3,
                borderWidth: 1,
                borderColor: '#0165FC',
                gap: 10,
              }}
              onPress={() =>
                navigation.navigate('Login', {
                  redirect: 'BookingInfomation',
                  params: {
                    hotelId,
                    selectedRooms,
                    searchCondition,
                  },
                })
              }>
              <IconComponent
                name="user"
                size={18}
                library="SimpleLineIcons"
                color="#0165FC"
              />
              <Text style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                Đăng nhập để tiết kiệm
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Tên{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput
                ref={inputRef.guest_firstname}
                style={{flex: 1, color: '#000'}}
                value={formData.guest_firstname}
                onChangeText={value =>
                  handleUpdateFormData('guest_firstname', value)
                }
              />

              {errors?.guest_firstname ? (
                <IconComponent
                  name="alert-circle-outline"
                  library="Ionicons"
                  color="#FF0000"
                />
              ) : (
                <IconComponent
                  name="checkmark-circle-outline"
                  library="Ionicons"
                  color="#058633"
                />
              )}
            </View>
            {/* error message*/}
            {errors?.guest_firstname && (
              <Text style={{color: '#f20000', fontSize: 13}}>
                {errors.guest_firstname}
              </Text>
            )}
          </View>
          {/* Họ */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Họ{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput
                ref={inputRef.guest_lastname}
                style={{flex: 1, color: '#000'}}
                value={formData.guest_lastname}
                onChangeText={value =>
                  handleUpdateFormData('guest_lastname', value)
                }
              />

              {errors?.guest_lastname ? (
                <IconComponent
                  name="alert-circle-outline"
                  library="Ionicons"
                  color="#FF0000"
                />
              ) : (
                <IconComponent
                  name="checkmark-circle-outline"
                  library="Ionicons"
                  color="#058633"
                />
              )}
            </View>
            {/* error message*/}
            {errors?.guest_lastname && (
              <Text style={{color: '#f20000', fontSize: 13}}>
                {errors.guest_lastname}
              </Text>
            )}
          </View>
          {/* Địa chỉ email */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Địa chỉ email{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput
                ref={inputRef.guest_email}
                style={{flex: 1, color: '#000'}}
                value={formData.guest_email}
                onChangeText={value =>
                  handleUpdateFormData('guest_email', value)
                }
              />

              {errors?.guest_email ? (
                <IconComponent
                  name="alert-circle-outline"
                  library="Ionicons"
                  color="#FF0000"
                />
              ) : (
                <IconComponent
                  name="checkmark-circle-outline"
                  library="Ionicons"
                  color="#058633"
                />
              )}
            </View>
            {/* error message*/}
            {errors?.guest_email && (
              <Text style={{color: '#f20000', fontSize: 13}}>
                {errors.guest_email}
              </Text>
            )}
          </View>
          {/* Vùng quốc gia */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Vùng/quốc gia{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
                padding: 12,
              }}
              onPress={onOpen}>
              <Text style={{color: '#000'}}>Việt Nam</Text>

              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                {/* <IconComponent
                  name="alert-circle-outline"
                  library="Ionicons"
                  color="#FF0000"
                /> */}
                <IconComponent
                  name="checkmark-circle-outline"
                  library="Ionicons"
                  color="#058633"
                />
                <TouchableOpacity>
                  <IconComponent
                    name="chevron-down-sharp"
                    library="Ionicons"
                    color="#000"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {/* error message*/}
            {/* {errors?.guest_country && (
              <Text style={{color: '#f20000', fontSize: 13}}>
                {errors.guest_country}
              </Text>
            )} */}
          </View>
          {/* Điện thại */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Điện thoại{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput
                ref={inputRef.guest_phone}
                style={{flex: 1, color: '#000'}}
                keyboardType="phone-pad"
                value={formData.guest_phone}
                onChangeText={value =>
                  handleUpdateFormData('guest_phone', value)
                }
              />

              {errors?.guest_phone ? (
                <IconComponent
                  name="alert-circle-outline"
                  library="Ionicons"
                  color="#FF0000"
                />
              ) : (
                <IconComponent
                  name="checkmark-circle-outline"
                  library="Ionicons"
                  color="#058633"
                />
              )}
            </View>
            {/* error message*/}
            {errors?.guest_phone && (
              <Text style={{color: '#f20000', fontSize: 13}}>
                {errors.guest_phone}
              </Text>
            )}
          </View>
        </View>

        {/* Mục đích chính chuyến đi của bạn */}
        <View
          style={{
            gap: 16,
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: '500',
            }}>
            Mục đích chính chuyến đi của bạn là gì?
          </Text>
          <RadioButtonComponent
            options={options}
            initialSelected="Vui chơi/ giải trí"
            onSelect={option => {
              setSelectedPurpose(option);
            }}
          />
        </View>
        {/* Yêu cầu hóa đơn */}
        <View
          style={{
            gap: 16,
          }}>
          <Text
            style={{
              color: '#000',
            }}>
            Yêu cầu hóa đơn
          </Text>
          {/* Tôi muốn khách sạn xuất hóa đơn có thông tin địa chỉ công ty của mình */}
          <CheckboxComponent
            label="Tôi muốn khách sạn xuất hóa đơn có thông tin địa chỉ công ty của mình"
            checked={isChecked}
            onToggle={setIsChecked}
          />
        </View>
      </ScrollView>
      {/* Thêm chi tiết còn thiếu */}
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
          onPress={handleSubmitForm}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            Thêm chi tiết còn thiếu
          </Text>
        </Pressable>
      </View>
      <SlideUpViewComponent visible={isVisible} onClose={onClose}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            gap: 16,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: '#000',
            }}>
            Vùng/quốc gia
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              gap: 10,
              borderWidth: 1,
              borderColor: '#939394',
              borderRadius: 3,
            }}>
            <TextInput
              style={{flex: 1, color: '#000'}}
              placeholder="Tìm quốc gia"
            />
          </View>
        </ScrollView>
      </SlideUpViewComponent>
    </>
  );
};

export default BookingInfomationScreen;

const styles = StyleSheet.create({});
