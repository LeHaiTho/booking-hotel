import React, {useRef, useState} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOnChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === otp.length - 1 && text) {
      Keyboard.dismiss();
    }
  };
  console.log(otp);
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];

      // Nếu có số trong ô
      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 32,
        gap: 16,
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
          Xác minh địa chỉ email của bạn
        </Text>
        <Text
          style={{
            lineHeight: 22,
            fontSize: 16,
          }}>
          Chúng tôi đã gửi xác minh đến <Text>deckmamay@gmail.com</Text>. Vui
          lòng nhập mã này để tiếp tục.
        </Text>
      </View>
      <View
        style={{
          gap: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 16,
          }}>
          {otp.map((val, index) => (
            <TextInput
              key={index}
              onChangeText={text => handleOnChangeText(text, index)}
              value={val}
              ref={ref => (inputRefs.current[index] = ref)}
              maxLength={1}
              keyboardType="number-pad"
              onKeyPress={e => handleKeyPress(e, index)}
              style={{
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                padding: 8,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#0165FC',
            borderRadius: 3,
          }}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            Xác minh email
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
          }}>
          Bạn chưa nhận được email? Vui lòng kiểm tra mục thư rác hoặc yêu cầu
          mã khác trong 59 giây
        </Text>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;
