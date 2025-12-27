import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '@utils/constants';
import useInfoBookingStore from '@stores/InfoBookingStore';

const WebviewPaymentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {url, bookingId, formData, hotelId, selectedRooms, searchCondition} =
    route.params || {};
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);
  const {formData: storeFormData} = useInfoBookingStore();

  // Sử dụng formData từ route params hoặc từ store nếu không có
  const bookingFormData = formData || storeFormData;

  // Hàm cập nhật trạng thái thanh toán
  // const updatePaymentStatus = async (bookingId: string, status: string) => {
  //   try {
  //     const response = await axios.post(`${API_URL}/payment/update-status`, {
  //       bookingId,
  //       status,
  //     });
  //     console.log('Payment status update response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error updating payment status:', error);
  //     return null;
  //   }
  // };

  // Xử lý khi thanh toán thành công
  const handlePaymentSuccess = async () => {
    // Cập nhật trạng thái thanh toán
    // const updateResult = await updatePaymentStatus(bookingId, 'SUCCESS');

    // Chuyển hướng đến màn hình xác nhận đặt phòng với tất cả thông tin cần thiết
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'BookingConfirmation',
          params: {
            result: {
              id: bookingId,
              payment_status: 'SUCCESS',
              payment_method: 'CREDIT_CARD',
            },
            formData: bookingFormData,
            hotelId,
            selectedRooms,
            searchCondition,
          },
        },
      ],
    });
  };

  // Xử lý khi thanh toán thất bại
  // const handlePaymentFailure = async () => {
  //   await updatePaymentStatus(bookingId, 'FAILED');

  //   Alert.alert(
  //     'Thanh toán thất bại',
  //     'Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.',
  //     [
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           navigation.goBack();
  //         },
  //       },
  //     ],
  //   );
  // };

  // Xử lý khi người dùng hủy thanh toán
  // const handlePaymentCancelled = async () => {
  //   await updatePaymentStatus(bookingId, 'CANCELLED');

  //   Alert.alert('Thanh toán đã bị hủy', 'Bạn đã hủy quá trình thanh toán.', [
  //     {
  //       text: 'OK',
  //       onPress: () => {
  //         navigation.goBack();
  //       },
  //     },
  //   ]);
  // };

  // Xử lý sự kiện thay đổi URL trong WebView
  const handleNavigationStateChange = (navState: any) => {
    const currentUrl = navState.url;
    console.log('Current URL:', currentUrl);

    // Kiểm tra các trường hợp kết quả thanh toán
    if (currentUrl.includes('/payment/success')) {
      // Thanh toán thành công
      handlePaymentSuccess();
    } else if (currentUrl.includes('/payment/failure')) {
      // Thanh toán thất bại
      // handlePaymentFailure();
    } else if (currentUrl.includes('/payment/cancel')) {
      // Thanh toán bị hủy
      // handlePaymentCancelled();
    }
  };

  // Xử lý sự kiện nút Back của thiết bị
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'Hủy thanh toán',
          'Bạn có chắc chắn muốn hủy quá trình thanh toán này?',
          [
            {
              text: 'Không',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Có',
              onPress: () => {
                handlePaymentCancelled();
                return true;
              },
            },
          ],
        );
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/* {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0165FC" />
        </View>
      )} */}
      <WebView
        ref={webViewRef}
        source={{uri: url}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default WebviewPaymentScreen;
