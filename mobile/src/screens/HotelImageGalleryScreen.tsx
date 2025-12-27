import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {RoomType} from '@components/index';

// Lấy chiều rộng thiết bị
const {width} = Dimensions.get('window');
// tạo kiểu dữ liệu cho RoomTypeCard
const roomTypeData = [
  {
    id: 1,
    name: 'Tổng quan',
    image:
      'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20024660-9b194d66013b8b76517d145e72c9d93c.jpeg',
  },
  {
    id: 2,
    name: 'Phòng khách sạn',
    image:
      'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20024660-9b194d66013b8b76517d145e72c9d93c.jpeg',
  },
  {
    id: 3,
    name: 'Phòng Deluxe',
    image:
      'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20024660-9b194d66013b8b76517d145e72c9d93c.jpeg',
  },
  {
    id: 4,
    name: 'Phòng Superior',
    image:
      'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20024660-9b194d66013b8b76517d145e72c9d93c.jpeg',
  },
];
const HotelImageGalleryScreen = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 10}}>
      <ScrollView contentContainerStyle={{}}>
        {/* <RoomTypeCard> */}
        <RoomType
          title="Tổng quan"
          image="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232"
          onPress={() => console.log('hello')}
          isSelected
        />
        {/* </RoomTypeCard> */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={roomTypeData}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            gap: 12,
            paddingHorizontal: 6,
            paddingTop: 16,
            paddingBottom: 16,
          }}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                padding: 16,
                width: 102,
                // borderWidth: 2, // Độ dày viền
                // borderColor: '#0165ff', // Màu viền
                borderRadius: 2, // Bo tròn góc
                backgroundColor: '#fff', // Màu nền (quan trọng để viền nằm trên shadow)
                shadowColor: '#000',
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 10, // Bóng đổ
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: '#000',
                  marginTop: 5,
                  width: '100%',
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
            </View>
          )}
        />

        {/* Image Gallery */}
        {/* hàng lẻ sẽ là 1 ảnh full độ rộng, hàng chẵn sẽ 2 ảnh 1 hàng. */}
        <View>
          <Image
            source={{
              uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/373806199.jpg?k=fa5a824210954bb5617c726e9ada5911722e16b7148472f54f8f1f4d3e46f5df&o=&hp=1',
            }}
            style={{width: width, height: 180}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HotelImageGalleryScreen;
