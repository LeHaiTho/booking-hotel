import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import IconComponent from '@components/IconComponent';
import {IconLibrary, IconType} from 'src/types/iconType';
import {getIcon} from '@utils/iconUtils';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import axios from 'axios';
import {API_URL} from '@utils/constants';
import LoadingBarComponent from '@components/LoadingBarComponent';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import moment from 'moment';
// amenities: wifi, sân tennis, sân bóng đá, tủ lạnh, kitchen,...

interface AmenityItem {
  id: number;
  name: string;
  icon: IconType;
}
const amenities: AmenityItem[] = [
  {
    id: 1,
    name: 'Wifi miễn phí',
    icon: {
      name: 'wifi',
      library: 'AntDesign',
    },
  },
  {
    id: 2,
    name: 'Ban công',
    icon: {
      name: 'balcony',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 3,
    name: 'Nhìn ra vườn',
    icon: {
      name: 'wifi',
      library: 'AntDesign',
    },
  },
  {
    id: 4,
    name: 'Nhìn ra thành phố',
    icon: {
      name: 'snowflake',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 5,
    name: 'Phòng tắm riêng trong phòng',
    icon: {
      name: 'shower',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 6,
    name: 'TV màn hình phẳng',
    icon: {
      name: 'television',
      library: 'FontAwesome',
    },
  },
];

const RoomListScreen: React.FC = ({route}: any) => {
  const {hotelId, ...searchCondition} = route.params || {};
  const navigation = useNavigation<NavigationProp<any>>();
  console.log('searchCondition', searchCondition);
  console.log('hotelId', hotelId);
  // state
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedRooms, setSelectedRooms] = useState<any[]>([]);
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const [roomList, setRoomList] = useState<any[]>([]);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleBooking = () => {
    // Tính tổng số phòng đã chọn
    const totalSelectedRooms = selectedRooms.reduce(
      (sum, room) => sum + room.quantity,
      0,
    );

    // Kiểm tra xem đã chọn đủ số phòng chưa
    if (totalSelectedRooms < searchCondition.rooms) {
      // Hiển thị thông báo nếu chưa đủ số phòng
      Alert.alert(
        'Thông báo',
        `Vui lòng chọn đủ ${searchCondition.rooms} phòng để tiếp tục. Hiện tại bạn đã chọn ${totalSelectedRooms} phòng.`,
        [{text: 'Đã hiểu', style: 'default'}],
      );
      return;
    }

    // Nếu đã chọn đủ số phòng, chuyển sang màn hình tiếp theo
    navigation.navigate('BookingInfomation', {
      hotelId,
      selectedRooms,
      searchCondition,
    });
    console.log('selectedRooms', selectedRooms);
  };
  console.log('searchCondition', searchCondition);

  const fetchRoomList = async () => {
    const params = {
      checkInDate: searchCondition.checkInDate,
      checkOutDate: searchCondition.checkOutDate,
      adults: searchCondition.capacity.adults,
      children: searchCondition.capacity.children,
      rooms: searchCondition.rooms,
    };
    console.log('params', params);
    try {
      const response = await axios.get(
        `${API_URL}/hotel-properties/room/by-hotel/${hotelId}`,
        {params},
      );
      setRoomList(response?.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchRoomList();
  }, [hotelId]);
  console.log('roomList', roomList);

  // Tăng số lượng phòng
  const increaseQuantity = () => {
    if (currentRoom && quantity < currentRoom.totalRoom) {
      setQuantity(prev => prev + 1);
    }
  };
  // Giảm số lượng phòng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      console.log('Giảm số lượng phòng');
    } else {
      // xóa phòng khỏi selectedRooms
      setSelectedRooms(prev => prev.filter(r => r.id !== currentRoom.id));
      bottomSheetRef.current?.close();
    }
  };
  // Chọn phòng / hủy phòng
  const toggleRoomSelection = (room: any) => {
    const isSelected = selectedRooms.find(r => r.id === room.id);
    if (isSelected) {
      setSelectedRooms(prev => prev.filter(r => r.id !== room.id));
    } else {
      setSelectedRooms(prev => [...prev, {...room, quantity: 1}]);
    }
  };

  console.log('selectedRooms', selectedRooms);
  // Mở BottomSheet và chọn phòng để tùy chỉnh số lượng
  const openBottomSheet = (room: any) => {
    setCurrentRoom(room);
    const selected = selectedRooms.find(r => r.id === room.id);
    setQuantity(selected ? selected.quantity : 1); // Lấy số lượng từ selectedRooms hoặc mặc định là 1
    bottomSheetRef.current?.expand();
  };
  console.log('selectedRooms', selectedRooms);
  // mở bottom sheet để chỉnh số lượng phòng
  const confirmRoomSelection = () => {
    if (currentRoom) {
      const updatedRoom = {...currentRoom, quantity};
      const isSelected = selectedRooms.some(r => r.id === currentRoom.id);
      if (isSelected) {
        setSelectedRooms(
          selectedRooms.map(r => (r.id === currentRoom.id ? updatedRoom : r)),
        );
      } else {
        setSelectedRooms([...selectedRooms, updatedRoom]);
      }
      bottomSheetRef.current?.close();
    }
  };
  return (
    <>
      <ScrollView contentContainerStyle={{padding: 10, gap: 10}}>
        {roomList?.length > 0 ? (
          roomList?.map(r => {
            const isSelected = selectedRooms.some(room => room.id === r.id);
            const selectedRoom = selectedRooms.find(room => room.id === r.id);
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  padding: 14,
                  borderWidth: 0.2,
                  borderColor: COLORS.borderGray,
                  borderRadius: 5,
                  gap: 15,
                }}
                key={r.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1, gap: 10}}>
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontWeight: '500',
                        fontSize: 16,
                        flex: 1,
                      }}>
                      {r.roomName}
                    </Text>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          alignItems: 'center',
                        }}>
                        <IconComponent
                          name="bed-outline"
                          library="Ionicons"
                          size={18}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: COLORS.black,
                          }}>
                          {r.roomType} - dành cho {r.roomCapacity} người lớn
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          alignItems: 'center',
                        }}>
                        <IconComponent
                          name="bed-outline"
                          library="Ionicons"
                          size={18}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: COLORS.black,
                          }}>
                          Diện tích: 21 m2
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Image
                    source={{
                      uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
                    }}
                    style={{width: 60, height: 60, borderRadius: 5}}
                  />
                </View>
                <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
                  {amenities?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <IconComponent
                        name={item.icon.name}
                        library={item.icon.library}
                        size={15}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.black,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* lựa chọn */}
                <TouchableOpacity
                  style={{
                    padding: 16 - (isSelected ? 2 : 0.2),
                    borderWidth: isSelected ? 2 : 0.2,
                    borderColor: isSelected
                      ? COLORS.primary
                      : COLORS.borderGray,
                    borderRadius: 5,
                  }}
                  onPress={() => toggleRoomSelection(r)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                      }}>
                      <IconComponent
                        name="people"
                        library="SimpleLineIcons"
                        size={18}
                      />
                      <Text
                        style={{
                          color: COLORS.black,
                        }}>
                        giá cho {r.roomCapacity} người lớn
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: isSelected ? 2 : 1,
                        width: 20,
                        height: 20,
                        borderRadius: 100,
                        borderColor: isSelected
                          ? COLORS.primary
                          : COLORS.borderGray,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {isSelected && (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 100,
                            backgroundColor: COLORS.primary,
                          }}></View>
                      )}
                    </View>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}>
                    <IconComponent
                      name="check"
                      library="MaterialCommunityIcons"
                      size={15}
                      color={COLORS.green}
                    />
                    <Text
                      style={{
                        color: COLORS.green,
                        fontWeight: '500',
                      }}>
                      Hủy miễn phí{' '}
                      <Text style={{fontWeight: 'normal'}}>
                        18:00, 24 tháng 1, 2025
                      </Text>
                    </Text>
                  </View> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}>
                    <IconComponent
                      name="check"
                      library="MaterialCommunityIcons"
                      size={15}
                      color={COLORS.green}
                    />
                    <Text
                      style={{
                        color: COLORS.green,
                        fontWeight: '500',
                        flex: 1,
                      }}>
                      Không cần thanh toán trước{' '}
                      <Text style={{fontWeight: 'normal'}}>
                        - thanh toán tại chỗ nghỉ
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}>
                    <IconComponent
                      name="check"
                      library="MaterialCommunityIcons"
                      size={15}
                      color={COLORS.green}
                    />
                    <Text
                      style={{
                        color: COLORS.green,
                        fontWeight: '500',
                      }}>
                      Không cần thẻ tín dụng
                    </Text>
                  </View>
                  {/* <View style={{flexDirection: 'row', gap: 5}}>
                    <IconComponent
                      name="coffee"
                      library="FontAwesome"
                      size={15}
                      color={COLORS.black}
                    />
                    <Text
                      style={{
                        color: COLORS.black,
                        fontWeight: '700',
                      }}>
                      Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
                    </Text>
                  </View> */}
                  <View style={{flexDirection: 'column', gap: 5}}>
                    {r?.promotions &&
                      r?.promotions?.length > 0 &&
                      r?.promotions?.map((promotion: any, index: number) => {
                        // Cắt phần giữa của chuỗi promotion.name
                        const parts = promotion.name.split(' - ');
                        const displayText =
                          parts.length > 1 ? parts[1] : promotion.name;

                        return (
                          <View
                            key={index}
                            style={{
                              backgroundColor: COLORS.green,
                              alignSelf: 'flex-start',
                              paddingHorizontal: 5,
                              paddingVertical: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: COLORS.white,
                              }}>
                              {displayText}
                            </Text>
                          </View>
                        );
                      })}
                  </View>
                  <View>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 13,
                      }}>
                      Giá cho{' '}
                      {moment(searchCondition.checkOutDate).diff(
                        moment(searchCondition.checkInDate),
                        'days',
                      )}{' '}
                      đêm
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      {r?.initial_price > r?.final_price && (
                        <Text
                          style={{
                            color: COLORS.red,
                            textDecorationLine: 'line-through',
                            textAlign: 'right',
                          }}>
                          VNĐ {r?.initial_price.toLocaleString()}
                        </Text>
                      )}
                      <Text
                        style={{
                          color: COLORS.black,
                          fontWeight: '700',
                          fontSize: 20,
                        }}>
                        VNĐ {r?.final_price.toLocaleString()}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                      }}>
                      Đã bao gồm thuế và phí
                    </Text>
                    {/* {r.total_rooms == 1 ? (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 12,
                          backgroundColor: COLORS.white,
                          borderWidth: 1,
                          borderColor: COLORS.primary,
                          gap: 10,
                        }}
                        onPress={() => bottomSheetRef.current?.expand()}>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          Chọn phòng
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 12,
                          backgroundColor: COLORS.white,
                          borderWidth: 1,
                          borderColor: COLORS.primary,
                          gap: 10,
                        }}
                        onPress={() => bottomSheetRef.current?.expand()}>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          Lựa chọn và tùy chỉnh
                        </Text>
                      </TouchableOpacity>
                    )} */}

                    {!selectedRoom?.quantity ? (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 12,
                          backgroundColor: COLORS.white,
                          borderWidth: 1,
                          borderColor: COLORS.primary,
                          borderRadius: 5,
                        }}
                        onPress={e => {
                          e.stopPropagation();
                          openBottomSheet(r);
                        }}>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          Lựa chọn và tùy chỉnh
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: COLORS.white,
                            borderColor: COLORS.primary,
                            borderWidth: 1,
                            gap: 10,
                            flex: 1,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            openBottomSheet(r);
                          }}>
                          <Text
                            style={{
                              color: COLORS.primary,
                              fontSize: 16,
                              fontWeight: '500',
                            }}>
                            {selectedRoom.quantity} phòng
                          </Text>
                          <IconComponent
                            name="angle-down"
                            library="FontAwesome"
                            size={18}
                            color={COLORS.primary}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 14,
                            backgroundColor: COLORS.white,
                            borderWidth: 1,
                            borderColor: COLORS.red,
                            gap: 10,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            toggleRoomSelection(r);
                          }}>
                          <IconComponent
                            name="delete"
                            library="AntDesign"
                            size={20}
                            color={COLORS.red}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>

                {r.total_rooms == 1 && (
                  <Text
                    style={{
                      color: COLORS.red,
                      textAlign: 'center',
                      fontWeight: '500',
                    }}>
                    Hệ thống chỉ còn {r.total_rooms} phòng
                  </Text>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
          shadowColor: COLORS.black,
          shadowOffset: {width: 0, height: -15},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 10,
        }}>
        <Pressable
          style={({pressed}) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: pressed ? COLORS.primaryLight : COLORS.primary,
            width: '100%',
            gap: 10,
            borderRadius: 3,
          })}
          onPress={handleBooking}>
          <Text style={{color: COLORS.white, fontSize: 16, fontWeight: '500'}}>
            Đặt ngay
          </Text>
        </Pressable>
      </View>

      {/* BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={{
          width: '13%',
          backgroundColor: COLORS.gray,
        }}>
        <BottomSheetView style={{flex: 1}}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 16,
              paddingTop: 10,
              gap: 16,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {currentRoom ? currentRoom.loaichonghi : 'Chưa chọn phòng'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.black, fontWeight: '600'}}>
                Số phòng (Tối đa: {currentRoom?.totalRoom || 0})
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.borderGray,
                  borderRadius: 3,
                  gap: 16,
                }}>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={decreaseQuantity}>
                  <IconComponent
                    name="remove-outline"
                    library="Ionicons"
                    size={25}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <Text style={{color: COLORS.black, padding: 10}}>
                  {quantity}
                </Text>

                <TouchableOpacity
                  style={{padding: 10}}
                  disabled={quantity >= currentRoom?.totalRoom}
                  onPress={increaseQuantity}>
                  <IconComponent
                    name="add-outline"
                    library="Ionicons"
                    size={25}
                    color={
                      quantity < currentRoom?.totalRoom
                        ? COLORS.primary
                        : COLORS.gray
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: COLORS.borderGray,
            }}
          />
          <View style={{padding: 16, gap: 10}}>
            <View>
              <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                {currentRoom
                  ? `${(currentRoom.sotien * quantity).toLocaleString()} VND`
                  : 'N/A'}
              </Text>
              <Text style={{fontSize: 12}}>
                + VND {Math.round(78171 * quantity).toLocaleString()} bao gồm
                thuế và phí
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                backgroundColor: COLORS.primary,
                width: '100%',
                gap: 10,
                borderRadius: 3,
              }}
              onPress={confirmRoomSelection}>
              <Text
                style={{color: COLORS.white, fontSize: 16, fontWeight: '500'}}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default RoomListScreen;
