import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Dimensions} from 'react-native';
import {COLORS} from '@styles/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {API_URL, formatDate} from '@utils/constants';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const initialLayout = {width: Dimensions.get('window').width};

// Hàm gọi API lấy dữ liệu
const fetchTripsData = async (
  tabKey: string,
  token: string | null | undefined,
  userId: string,
) => {
  try {
    let response;
    if (tabKey === 'active') {
      response = await axios.get(`${API_URL}/booking/upcoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      const status = tabKey === 'past' ? 'CONFIRMED' : 'CANCELLED';
      response = await axios.get(`${API_URL}/booking/filter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {status},
      });
    }
    return response.data.result || [];
  } catch (error) {
    console.error(`Error fetching ${tabKey} trips data:`, error);
    return [];
  }
};

// TripCard component
const TripCard = ({item, onPress}: {item: any; onPress: () => void}) => {
  // Tính số đêm
  const nights = moment(item.checkout_date).diff(
    moment(item.checkin_date),
    'days',
  );

  return (
    <Pressable
      style={({pressed}) => [
        {
          flex: 1,
          borderRadius: 12,
          backgroundColor: COLORS.white,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 4,
          elevation: 3,
          marginBottom: 16,
        },
        pressed && {opacity: 0.5},
      ]}
      onPress={onPress}>
      <Image
        source={{
          uri: item.Hotel?.images
            ? `${API_URL}/hotel-properties/hotel/get-image/${item.Hotel?.id}/${
                item.Hotel?.images?.split(',')[0]
              }`
            : 'https://via.placeholder.com/400x200?text=No+Image',
        }}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'cover',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <View
        style={{
          padding: 12,
          gap: 8,
        }}>
        <Text style={{color: COLORS.black, fontSize: 18, fontWeight: 'bold'}}>
          {item.Hotel?.name || 'Khách sạn không xác định'}
        </Text>
        <Text style={styles.cardSubtitle}>
          {formatDate(item.checkin_date, false, true)} -{' '}
          {formatDate(item.checkout_date, false, true)} • {nights} đêm
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.black, fontWeight: '600'}}>
            {Number(item.total_price).toLocaleString('vi-VN')} VNĐ
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLORS.primary, marginRight: 5}}>
              Xem chi tiết
            </Text>
            <Feather name="chevron-right" size={20} color={COLORS.primary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

// CanceledTripCard component
const CanceledTripCard = ({
  item,
  onPress,
  onOpenBottomsheet,
}: {
  item: any;
  onPress: () => void;
  onOpenBottomsheet?: () => void;
}) => (
  <Pressable
    style={({pressed}) => ({
      backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
      padding: 16,
      borderRadius: 8,
      borderColor: COLORS.grayLight,
      shadowColor: COLORS.black,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
      gap: 10,
      marginBottom: 16,
    })}
    onPress={onPress}>
    <View style={{flexDirection: 'row', gap: 10}}>
      <Image
        source={{
          uri: item.Hotel?.images
            ? `${API_URL}/hotel-properties/hotel/get-image/${item.Hotel?.id}/${
                item.Hotel?.images?.split(',')[0]
              }`
            : 'https://via.placeholder.com/60x60?text=No+Image',
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 6,
          resizeMode: 'cover',
        }}
      />
      <View style={{flexDirection: 'column', gap: 5, flex: 1}}>
        <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
          {item.Hotel?.name || 'Khách sạn không xác định'}
        </Text>
        <View>
          <Text style={{color: COLORS.black}}>
            {formatDate(item.checkin_date, false, true)} -{' '}
            {formatDate(item.checkout_date, false, true)}
          </Text>

          <Text style={{color: COLORS.black}}>
            VNĐ {Number(item.total_price).toLocaleString('vi-VN')}
          </Text>
        </View>
        <Text style={{color: COLORS.red}}>
          {item.status === 'CANCELLED' ? 'Đã hủy' : ''}
        </Text>
      </View>
    </View>
    <Pressable
      style={({pressed}) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderTopWidth: 1,
          borderColor: COLORS.grayLight,
          marginHorizontal: -16,
          paddingHorizontal: 16,
          paddingTop: 16,
          marginBottom: -16,
          paddingBottom: 16,
          justifyContent: 'space-between',
          backgroundColor: pressed ? COLORS.grayLight : 'transparent',
        },
      ]}
      onPress={onOpenBottomsheet}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Ionicons name="information-circle-outline" color="brown" size={24} />
        <Text style={{color: COLORS.black}}>Thông tin hủy và đặt lại</Text>
      </View>
      <EvilIcons name="chevron-right" color={COLORS.black} size={24} />
    </Pressable>
  </Pressable>
);

// ActiveTrips component
const ActiveTrips = ({
  tripsData,
  navigation,
}: {
  tripsData: any[];
  navigation: any;
}) => (
  <FlatList
    contentContainerStyle={{padding: 16}}
    data={tripsData}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <TripCard
        item={item}
        onPress={() =>
          navigation.navigate('ReservationDetail', {infoBooking: item})
        }
      />
    )}
    ListEmptyComponent={() => (
      <View
        style={{
          flex: 1,
          padding: 16,
          alignItems: 'center',
          gap: 12,
          paddingTop: '30%',
          backgroundColor: COLORS.white,
        }}>
        <Image
          source={{
            uri: 'https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsGlobe.png',
          }}
          style={{width: 180, height: 180, marginBottom: 20}}
        />
        <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
          Đi đâu tiếp đây?
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 22,
          }}>
          Bạn chưa có chuyến đi nào cả. Sau khi bạn đặt chỗ, đơn đó sẽ xuất hiện
          tại đây.
        </Text>
      </View>
    )}
  />
);

// PastTrips component
const PastTrips = ({
  tripsData,
  navigation,
}: {
  tripsData: any[];
  navigation: any;
}) => (
  <FlatList
    contentContainerStyle={{padding: 16}}
    data={tripsData}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <TripCard
        item={item}
        onPress={() =>
          navigation.navigate('ReservationDetail', {infoBooking: item})
        }
      />
    )}
    ListEmptyComponent={() => (
      <View
        style={{
          flex: 1,
          padding: 16,
          alignItems: 'center',
          gap: 12,
          marginTop: '10%',
          backgroundColor: COLORS.white,
        }}>
        <Image
          source={{
            uri: 'https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsEmptyScreenComplete.png',
          }}
          style={{width: 260, height: 260}}
        />
        <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
          Xem lại các chuyến đi đã qua
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 22,
          }}>
          Tại đây, bạn có thể xem lại tất cả chuyến đi qua và lấy cảm hứng cho
          những chuyến tới
        </Text>
      </View>
    )}
  />
);

// CanceledTrips component
const CanceledTrips = ({
  tripsData,
  handleOpenBottomSheet,
  navigation,
}: {
  tripsData: any[];
  handleOpenBottomSheet: (data: any) => void;
  navigation: any;
}) => (
  <FlatList
    contentContainerStyle={{
      padding: 16,
      gap: 10,
    }}
    data={tripsData}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <CanceledTripCard
        item={item}
        onPress={() =>
          navigation.navigate('ReservationDetail', {infoBooking: item})
        }
        onOpenBottomsheet={() => handleOpenBottomSheet(item)}
      />
    )}
    ListEmptyComponent={() => (
      <View
        style={{
          flex: 1,
          padding: 16,
          alignItems: 'center',
          gap: 12,
          marginTop: '10%',
          backgroundColor: COLORS.white,
        }}>
        <Image
          source={{
            uri: 'https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsEmptyScreenCancelled.png',
          }}
          style={{width: 220, height: 220}}
        />
        <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
          Đôi lúc kế hoạch bị thay đổi
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 22,
          }}>
          Bạn sẽ thấy tất cả chuyến đi bạn đã hủy tại đây. Để dành cho lần tới
          chăng?
        </Text>
      </View>
    )}
  />
);

// Main TripScreen component
const TripScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [bottomSheetData, setBottomSheetData] = useState<any>(null);
  const {dismiss} = useBottomSheetModal();
  const [routes] = useState([
    {key: 'active', title: 'Đang hoạt động'},
    {key: 'past', title: 'Đã qua'},
    {key: 'canceled', title: 'Đã huỷ'},
  ]);
  const {token, user} = useAuthStore();
  const [tripsData, setTripsData] = useState({
    active: [],
    past: [],
    canceled: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const snapPoints = useMemo(() => ['53%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Fetch data when tab changes
  const handleFetchData = async () => {
    if (!token || !user?.id) return;
    setIsLoading(true);
    try {
      const data = await fetchTripsData(routes[index].key, token, user.id);
      setTripsData(prev => ({
        ...prev,
        [routes[index].key]: data,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [index, token, user?.id]);

  const handleOpenBottomSheet = (data: any) => {
    setBottomSheetData(data);
    bottomSheetRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
    dismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
        pressBehavior="close"
      />
    ),
    [],
  );

  const renderScene = ({route}: {route: {key: string}}) => {
    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    }

    switch (route.key) {
      case 'active':
        return (
          <ActiveTrips tripsData={tripsData.active} navigation={navigation} />
        );
      case 'past':
        return <PastTrips tripsData={tripsData.past} navigation={navigation} />;
      case 'canceled':
        return (
          <CanceledTrips
            tripsData={tripsData.canceled}
            handleOpenBottomSheet={handleOpenBottomSheet}
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{shadowColor: 'none'}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: COLORS.primary, height: 3}}
            activeColor={COLORS.primary}
            inactiveColor={COLORS.black}
            style={{backgroundColor: COLORS.white}}
            labelStyle={{fontWeight: 'bold', textTransform: 'none'}}
          />
        )}
      />
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        enableContentPanningGesture={false}
        overDragResistanceFactor={0}
        backdropComponent={renderBackdrop}>
        <BottomSheetView
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 16,
            paddingBottom: 25,
            gap: 16,
          }}>
          <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
            Thông tin hủy và đặt lại
          </Text>
          {bottomSheetData && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                padding: 16,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 8,
                elevation: 6,
              }}>
              <Image
                source={{
                  uri: bottomSheetData.Hotel?.images
                    ? `${API_URL}/hotel-properties/hotel/get-image/${
                        bottomSheetData.Hotel?.id
                      }/${bottomSheetData.Hotel?.images?.split(',')[0]}`
                    : 'https://via.placeholder.com/45x45?text=No+Image',
                }}
                style={{width: 45, height: 45, borderRadius: 5}}
              />
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold', color: COLORS.black}}>
                  {bottomSheetData.Hotel?.name || 'Khách sạn không xác định'}
                </Text>
                <Text style={{color: COLORS.black}}>
                  {formatDate(bottomSheetData.checkin_date, false, true)} -{' '}
                  {formatDate(bottomSheetData.checkout_date, false, true)} - Đã
                  hủy
                </Text>
              </View>
            </View>
          )}
          <View style={{gap: 5}}>
            <Text style={{color: COLORS.black, fontSize: 16}}>
              Bạn đã hủy đơn đặt này
              {bottomSheetData?.updatedAt && (
                <Text style={{fontWeight: '700'}}>
                  {' '}
                  vào {formatDate(bottomSheetData.updatedAt, false, true)}
                </Text>
              )}
            </Text>
            <Text style={{color: COLORS.black, fontSize: 16}}>
              Dịch vụ Khách hàng không thể hoàn tác việc hủy đặt chỗ
            </Text>
          </View>
          <Text style={{color: COLORS.black, fontSize: 16}}>
            Nếu vẫn muốn lưu trú tại chỗ nghỉ này bạn sẽ cần đặt lại hoặc tìm
            lựa chọn thay thế.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.primary,
              padding: 12,
              borderRadius: 5,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              handleCloseBottomSheet();
              if (bottomSheetData?.Hotel?.id) {
                navigation.navigate('HotelDetail', {
                  hotelId: bottomSheetData.Hotel.id,
                });
              }
            }}>
            <Text
              style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}}>
              Xem tình trạng phòng trống
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default TripScreen;
