import 'react-native-gesture-handler';
import TabNavigator from '@naviagtion/TabNavigator';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuthStore from '@stores/authStore';
import React, {useEffect, useRef} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BookingInfomationScreen,
  HotelDetailScreen,
  HotelSearchResultsScreen,
  LoginScreen,
  RoomListScreen,
  SearchLocationScreen,
  BookingConfirmationScreen,
  BookingDetailScreen,
  ReservationDetailScreen,
  PaymentScreen,
  PaymentMethodScreen,
  AdjustBookingDateScreen,
} from './screens';
import IconComponent from '@components/IconComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@styles/colors';
import ReviewScreen from '@screens/ReviewScreen';
import Step1ReviewScreen from '@screens/Step1ReviewScreen';
import Step2ReviewScreen from '@screens/Step2ReviewScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ChangeDateConfirmScreen from '@screens/ChangeDateConfirmScreen';
import BookingManagementScreen from '@screens/BookingManagementScreen';
import WebviewPaymentScreen from '@screens/WebviewPaymentScreen';
import {FavoritesProvider} from './contexts/FavoritesContext';
import SplashScreen from '@screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const {getUser, token, user} = useAuthStore();
  useEffect(() => {
    const getUserInfo = async () => {
      await getUser();
    };
    getUserInfo();
  }, []);

  return (
    // {/* // <LoginScreen />
    // // <AccountScreen />
    // // <DashboardScreen />
    // // <EmailVerificationScreen />
    // // <OTPVerificationScreen />
    // // <HotelCard />
    // // <HotelDetailScreen />
    // // <HotelImageGalleryScreen /> */}
    // <RoomListScreen />
    // <BookingInfomationScreen />
    // <BookingDetailScreen />
    // {/* <BookingConfirmationScreen /> */}
    // <ReservationDetailScreen />
    // <AdjustBookingDateScreen />
    // <HotelSearchResultsScreen />
    // <HomeScreen />
    // <Map />

    <FavoritesProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <StatusBar barStyle="light-content" backgroundColor="#003b95" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#003b95',
                },
                headerShadowVisible: false,
                headerTitleStyle: {color: '#fff'},
                headerTitleAlign: 'center',
              }}>
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Review"
                component={ReviewScreen}
                options={{
                  title: 'Đánh giá của bạn',
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                }}
              />
              <Stack.Screen
                name="Step1Review"
                component={Step1ReviewScreen}
                options={{
                  title: 'Bước 1 trên 2',
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                }}
              />
              <Stack.Screen
                name="Step2Review"
                component={Step2ReviewScreen}
                options={{
                  title: 'Bước 2 trên 2',
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />

              <Stack.Screen
                name="SearchLocation"
                component={SearchLocationScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="HotelSearchResults"
                component={HotelSearchResultsScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="HotelDetail"
                component={HotelDetailScreen}
                options={{
                  headerTintColor: '#fff',
                  title: '',
                }}
              />
              <Stack.Screen
                name="RoomList"
                component={RoomListScreen}
                options={{
                  headerTintColor: '#fff',
                  title: '',
                }}
              />
              <Stack.Screen
                name="BookingInfomation"
                component={BookingInfomationScreen}
                options={{
                  headerTitleAlign: 'left',
                  headerTintColor: '#fff',
                  title: 'Điền thông tin của bạn',
                }}
              />
              <Stack.Screen
                name="BookingDetail"
                component={BookingDetailScreen}
                options={{
                  headerTitleAlign: 'left',
                  headerTintColor: '#fff',
                  title: 'Chi tiết đặt phòng',
                }}
              />
              <Stack.Screen
                name="BookingConfirmation"
                component={BookingConfirmationScreen}
                options={({navigation}) => ({
                  headerLeft: () => (
                    <Pressable
                      onPress={() =>
                        navigation.reset({
                          index: 0,
                          routes: [{name: 'Main', params: {screen: 'HomeTab'}}],
                        })
                      }
                      style={({pressed}) => [
                        {
                          marginRight: 26,
                          opacity: pressed ? 0.5 : 1,
                          backgroundColor: pressed
                            ? COLORS.opacityDark
                            : 'transparent',
                          padding: 5,
                          borderRadius: 100,
                        },
                      ]}>
                      <Icon name="close" size={22} color={COLORS.white} />
                    </Pressable>
                  ),
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                  title: 'Xác nhận đặt phòng',
                })}
              />
              <Stack.Screen
                name="ReservationDetail"
                component={ReservationDetailScreen}
                options={{
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                  title: 'Chi tiết đặt phòng',
                }}
              />
              <Stack.Screen
                name="Payment"
                component={PaymentScreen}
                options={{
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                  title: 'Hoàn tất đặt phòng',
                }}
              />
              <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethodScreen}
                options={{
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                  title: 'Chọn phương thức thanh toán',
                }}
              />
              <Stack.Screen
                name="AdjustBookingDate"
                component={AdjustBookingDateScreen}
                options={{
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                  title: 'Thay đổi ngày',
                }}
              />
              <Stack.Screen
                name="ChangeDateConfirm"
                component={ChangeDateConfirmScreen}
                options={{
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                  title: 'Thay đổi ngày',
                }}
              />
              <Stack.Screen
                name="BookingManagement"
                component={BookingManagementScreen}
                options={{
                  headerTintColor: '#fff',
                  headerTitleAlign: 'left',
                  title: 'Quản lý đặt phòng',
                }}
              />
              <Stack.Screen
                name="WebviewPayment"
                component={WebviewPaymentScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </FavoritesProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
