import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getAuth,
  FirebaseAuthTypes,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation, useRoute} from '@react-navigation/native';
import {API_URL} from '../../utils/constants';

import axios from 'axios';
import useAuthStore from '@stores/authStore';
import {COLORS} from '@styles/colors';

GoogleSignin.configure({
  webClientId:
    '997402381071-psabl334fh76op0a77j8kghro055j6mo.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(false);
  const {login} = useAuthStore();

  const {redirect, params} = route.params || {};

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult: any = await GoogleSignin.signIn();

      const idToken = signInResult.data?.idToken;
      if (!idToken) throw new Error('No ID token found');

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await getAuth().signInWithCredential(
        googleCredential,
      );

      const payload = {
        email: signInResult.data.user.email,
        uid: signInResult.data.user.uid,
        photo: signInResult.data.user.photo,
        lastname: signInResult.data.user.givenName,
        firstname: signInResult.data.user.familyName,
      };

      await logUser(payload);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const logUser = async (payload: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/auth/login-with-google`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        await Promise.all([
          login(response.data.user, response.data.token),
          navigation.replace(redirect || 'Main', params || {}),
        ]);
      } else {
        Alert.alert('Lỗi đăng nhập', 'Vui lòng thử lại');
      }
    } catch (error: any) {
      console.log('error log user', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          paddingHorizontal: 16,
          paddingVertical: 26,
          gap: 20,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          Đăng nhập để dễ dàng truy cập thông tin chuyến đi
        </Text>

        {/* social button */}

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              backgroundColor: '#fff',
              gap: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: '#939394',
              borderRadius: 3,
            }}
            onPress={onGoogleButtonPress}>
            <Image
              source={require('../../assets/icons/logo/google-icon.png')}
              style={{width: 20, height: 20, backgroundColor: '#fff'}}
            />
            <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
              Tiếp tục bằng tài khoản Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              backgroundColor: '#fff',
              width: '100%',
              gap: 10,
              borderWidth: 1,
              borderColor: '#939394',
              borderRadius: 3,
            }}>
            <Image
              source={require('../../assets/icons/logo/facebook-image.png')}
              style={{width: 20, height: 20}}
            />
            <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
              Tiếp tục bằng tài khoản Facebook
            </Text>
          </TouchableOpacity>
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
              Tiếp tục với email
            </Text>
          </TouchableOpacity>
        </View>

        {/* thông tin chân trang */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 16,
            gap: 10,
            paddingBottom: 26,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
            }}>
            Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{' '}
            <Text
              style={{
                color: '#0165FF',
                textDecorationLine: 'underline',
              }}>
              Điều khoản và Điều kiện
            </Text>{' '}
            Button, <Text>cũng như</Text>{' '}
            <Text
              style={{
                color: '#0165FF',
                textDecorationLine: 'underline',
              }}>
              Chính sách An toàn và Bảo mật
            </Text>{' '}
            <Text>của chúng tôi</Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 12,
            }}>
            {'\u00A9'} 2025 MNMQ.com
          </Text>
        </View>
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
              Đang đăng nhập...
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

LoginScreen.propTypes = {};

export default LoginScreen;
