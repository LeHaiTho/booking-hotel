import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

const EmailVerificationScreen = () => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 32,
        gap: 32,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          gap: 5,
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 24,
            fontWeight: '700',
          }}>
          Nhập địa chỉ email của bạn
        </Text>
        <Text
          style={{
            lineHeight: 22,
            fontSize: 16,
          }}>
          Chúng tôi sẽ sử dụng thông tin này để giúp bạn đăng nhập hoặc tạo tài
          khoản nếu bạn chưa có.
        </Text>
      </View>
      <View
        style={{
          gap: 16,
        }}>
        <View
          style={{
            gap: 5,
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: '500',
            }}>
            Địa chỉ email
          </Text>
          <TextInput
            placeholder="Nhập địa chỉ email của bạn"
            style={{
              alignItems: 'center',
              padding: 8,
              backgroundColor: '#fff',
              width: '100%',
              gap: 10,
              borderWidth: 1,
              borderColor: '#939394',
              borderRadius: 3,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#0165FC',
            borderRadius: 3,
          }}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailVerificationScreen;
