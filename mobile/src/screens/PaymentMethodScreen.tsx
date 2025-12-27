import {
  FlatList,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@styles/colors';
import {useNavigation} from '@react-navigation/native';

const paymentSections = [
  {
    title: 'Thanh toán trực tiếp',
    data: [
      {
        id: 1,
        name: 'cash',
        image:
          'https://img.favpng.com/16/1/19/advance-payment-computer-icons-money-png-favpng-Lr3PqHVNvW46gQJzHDYMGP46X_t.jpg',
      },
    ],
  },
  {
    title: 'Thanh toán ví điện tử',
    data: [
      {
        id: 2,
        name: 'zalo-pay',
        image:
          'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png',
      },
    ],
  },
];
const PaymentMethodScreen = ({route}: any) => {
  const navigation = useNavigation<any>();
  const {hotelId, selectedRooms, payment, searchCondition} = route.params || {};
  console.log('hotelId', hotelId);
  console.log('selectedRooms', selectedRooms);
  console.log('payment', payment);
  console.log('searchCondition', searchCondition);
  //   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();

  const handleSelectPaymentMethod = (method: any) => {
    // setSelectedPaymentMethod(method);
    navigation.navigate('BookingDetail', {
      payment: method,
      hotelId,
      selectedRooms,
      searchCondition,
    });
    // navigation.goBack();
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white, padding: 16}}>
      <SectionList
        contentContainerStyle={{
          gap: 10,
        }}
        sections={paymentSections}
        renderSectionHeader={({section}) => (
          <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.black}}>
            {section.title}
          </Text>
        )}
        renderItem={({item}) => (
          <Pressable
            style={({pressed}) => [
              {
                flex: 1,
                backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                gap: 10,
                padding: 5,
                borderRadius: 10,
              },
              pressed && {opacity: 0.5},
            ]}
            onPress={() => handleSelectPaymentMethod(item)}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image
                source={{uri: item.image}}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 16, color: COLORS.black}}>
                {item.name === 'cash' ? 'Tiền mặt' : 'Zalo Pay E-wallet'}
              </Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default PaymentMethodScreen;
