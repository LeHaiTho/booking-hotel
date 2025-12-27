import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Tạo kiểu dữ liệu cho icon để đảm bảo nó có cấu trúc đúng
type IconType = {
  name: string;
  library:
    | 'AntDesign'
    | 'Ionicons'
    | 'SimpleLineIcons'
    | 'Feather'
    | 'MaterialCommunityIcons'; // Removed duplicated AntDesign from here
};

// Danh sách render
const menuData: {title: string; data: {name: string; icon: IconType}[]}[] = [
  {
    title: '',
    data: [
      {
        name: 'Đăng nhập hoặc tạo tài khoản',
        icon: {name: 'login', library: 'AntDesign'},
      },
      {
        name: 'Tặng thưởng & Ví',
        icon: {name: 'wallet-outline', library: 'Ionicons'},
      },
      {
        name: 'Chương trình khách hàng thân thiết Genius',
        icon: {name: 'social-google', library: 'SimpleLineIcons'},
      },
      {name: 'Đánh giá', icon: {name: 'like2', library: 'AntDesign'}},
      {
        name: 'Câu hỏi cho chỗ nghỉ',
        icon: {name: 'filetext1', library: 'AntDesign'},
      },
    ],
  },
  {
    title: 'Trợ giúp',
    data: [
      {
        name: 'Liên hệ Dịch vụ Khách hàng',
        icon: {name: 'questioncircleo', library: 'AntDesign'},
      },
      {
        name: 'Trung tâm thông tin bảo mật',
        icon: {name: 'gift', library: 'AntDesign'},
      },
      {
        name: 'Giải quyết tranh chấp',
        icon: {name: 'addusergroup', library: 'AntDesign'},
      },
    ],
  },
  {
    title: 'Khám phá',
    data: [
      {name: 'Ưu đãi', icon: {name: 'percent', library: 'Feather'}},
      {name: 'Taxi sân bay', icon: {name: 'plane', library: 'SimpleLineIcons'}},
      {
        name: 'Bài viết về du lịch',
        icon: {name: 'create-outline', library: 'Ionicons'},
      },
    ],
  },
  {
    title: 'Cài đặt và pháp lý',
    data: [{name: 'Cài đặt', icon: {name: 'setting', library: 'AntDesign'}}],
  },
  {
    title: 'Đối tác',
    data: [{name: 'Đăng chỗ nghỉ', icon: {name: 'home', library: 'AntDesign'}}],
  },
];
// getIcon dùng để thay đổi các icon của menu nếu khác thư viện (fontawesome, ant-design, etc.)
const getIcon = (icon: IconType): JSX.Element | null => {
  const {name, library} = icon;
  switch (library) {
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={name} size={20} color="#000" />;
    case 'AntDesign':
      return <AntDesign name={name} size={20} color="#000" />;
    case 'Feather':
      return <Feather name={name} size={20} color="#000" />;
    case 'Ionicons':
      return <Ionicons name={name} size={20} color="#000" />;

    default:
      return null;
  }
};
const AccountScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#033B95',
          paddingVertical: 16,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <View
          style={{
            backgroundColor: 'gray',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            borderWidth: 1,
            borderColor: 'yellow',
          }}>
          <AntDesign name="user" size={35} color="#fff" />
        </View>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Tài khoản và chuyến đi của bạn
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
          }}>
          Đăng nhập để xem ưu đãi, giảm giá Genius, quản lý chuyến đi hơn thế
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#0165FF',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 3,
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>

      {/* render menu Data dùng sectionList*/}
      <SectionList
        scrollEnabled={false}
        sections={menuData}
        // keyExtractor={(item, index) => item + index}
        renderSectionHeader={({section: {title}}) =>
          title ? <Text style={styles.headerText}>{title}</Text> : null
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}>
            {getIcon(item.icon)}
            <Text
              style={{
                color: '#000',
              }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.sectionListContainer}
      />
    </ScrollView>
  );
};

AccountScreen.propTypes = {};
const styles = StyleSheet.create({
  sectionListContainer: {
    paddingHorizontal: 16,
    gap: 5,
  },
  headerText: {
    fontWeight: '600',
    color: '#000',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
export default AccountScreen;
