import {
  ActivityIndicator,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import useAuthStore from '@stores/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '@styles/colors';

// Tạo kiểu dữ liệu cho icon để đảm bảo nó có cấu trúc đúng
type IconType = {
  name: string;
  library:
    | 'AntDesign'
    | 'Ionicons'
    | 'SimpleLineIcons'
    | 'Feather'
    | 'MaterialCommunityIcons'
    | 'Fontisto'; // Removed duplicated AntDesign from here
};

// getIcon dùng để thay đổi các icon của menu nếu khác thư viện (fontawesome, ant-design, etc.)
const getIcon = (icon: IconType) => {
  switch (icon.library) {
    case 'AntDesign':
      return <AntDesign name={icon.name} size={24} color="#000" />;
    case 'Ionicons':
      return <Ionicons name={icon.name} size={24} color="#000" />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={icon.name} size={24} color="#000" />;
    case 'Feather':
      return <Feather name={icon.name} size={24} color="#000" />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={icon.name} size={24} color="#000" />;
    case 'Fontisto':
      return <Fontisto name={icon.name} size={24} color="#000" />; // Removed duplicated AntDesign from here
    default:
      return <Ionicons name={icon.name} size={24} color="#000" />;
  }
};

// menuData
const menuData: {
  title: string;
  data: {name: string; icon: IconType; screen?: string}[];
}[] = [
  {
    title: 'Thông tin thanh toán',
    data: [
      {
        name: 'Tặng thưởng & Ví',
        icon: {name: 'wallet-outline', library: 'Ionicons'},
      },
      {
        name: 'Phương thức thanh toán',
        icon: {name: 'creditcard', library: 'AntDesign'},
      },
    ],
  },
  {
    title: 'Quản lý tài khoản',
    data: [
      {
        name: 'Thông tin cá nhân',
        icon: {name: 'user', library: 'AntDesign'},
      },
      {
        name: 'Cài đặt bảo mật',
        icon: {name: 'lock', library: 'SimpleLineIcons'},
      },
      {
        name: 'Người đi cùng',
        icon: {name: 'users', library: 'Feather'},
      },
    ],
  },
  {
    title: 'Cài đặt',
    data: [
      {
        name: 'Cài đặt thiết bị',
        icon: {name: 'setting', library: 'AntDesign'},
      },
      {
        name: 'Tùy chọn du lịch',
        icon: {name: 'options-outline', library: 'Ionicons'},
      },
      {
        name: 'Cài đặt email',
        icon: {name: 'email', library: 'Fontisto'},
      },
    ],
  },
  {
    title: 'Hoạt động du lịch',
    data: [
      {
        name: 'Đánh giá của tôi',
        icon: {name: 'chatbubble-outline', library: 'Ionicons'},
        screen: 'Review',
      },
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
        name: 'Liên hệ dịch vụ khách hàng',
        icon: {name: 'questioncircleo', library: 'AntDesign'},
      },
      {
        name: 'Trung tâm thông tin về bảo mật',
        icon: {name: 'creditcard', library: 'AntDesign'},
      },
      {
        name: 'Giải quyết khiếu nại',
        icon: {name: 'addusergroup', library: 'AntDesign'},
      },
    ],
  },
  {
    title: 'Pháp lý và quyền riêng tư',
    data: [
      {
        name: 'Quản lý quyền riêng tư và dữ liệu',
        icon: {name: 'security', library: 'MaterialCommunityIcons'},
      },
      {
        name: 'Hướng dẫn nội dung',
        icon: {name: 'notebook', library: 'SimpleLineIcons'},
      },
    ],
  },
  {
    title: 'Khám phá',
    data: [
      {
        name: 'Ưu đãi',
        icon: {name: 'percent', library: 'Feather'},
      },
    ],
  },
  {
    title: 'Dành cho chủ chỗ nghỉ',
    data: [
      {
        name: 'Đăng chỗ nghỉ',
        icon: {name: 'home', library: 'AntDesign'},
      },
    ],
  },
];

const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const {user, logout} = useAuthStore();
  const [loading, setLoading] = useState(false);

  console.log('user', user);
  const handleSignOut = async () => {
    try {
      setLoading(true);
      // await auth().signOut();
      await Promise.all([
        GoogleSignin.signOut(),
        logout(),
        navigation.reset({
          index: 0,
          routes: [{name: 'Main', params: {screen: 'Account'}}],
        }),
      ]);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#003b95',
            paddingHorizontal: 16,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <View
              style={{
                backgroundColor: 'yellow',
                padding: 2,
                flexDirection: 'row',
                width: 50,
                height: 50,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {user?.image_url ? (
                <Image
                  source={{uri: user.image_url}}
                  style={{width: '100%', height: '100%', borderRadius: 100}}
                />
              ) : null}
            </View>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                Chào {user?.firstname?.split(' ')[0]}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  alignItems: 'center',

                  gap: 3,
                }}>
                <Text style={{color: '#fff', fontWeight: '500'}}>Genius</Text>
                <Text
                  style={{
                    color: '#FFB700',
                    fontWeight: '500',
                  }}>
                  Cấp 1
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        {/* khuyến mãi */}

        <View
          style={{
            backgroundColor: '#003b95',
            paddingHorizontal: 16,
            paddingVertical: 16,
            alignItems: 'center',
            gap: 16,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 10,
              gap: 16,
              width: '100%',
            }}>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Image
                  source={{
                    uri: 'https://t-cf.bstatic.com/design-assets/assets/v3.138.1/illustrations-traveller/GeniusRewardGiftBoxDiscount.png',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 5,
                  }}>
                  <Text style={{color: '#000', fontWeight: '500'}}>
                    Bạn có 2 tặng thường Genius
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                    }}>
                    Giảm giá 10% và hơn thế nữa!
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={20} color="#000" />
            </View>

            <Text
              style={{
                fontSize: 12,
              }}>
              Bạn còn 5{' '}
              <Text
                style={{
                  color: '#000',
                  fontWeight: '500',
                }}>
                đơn đặt
              </Text>{' '}
              để lên{' '}
              <Text
                style={{
                  color: '#000',
                  fontWeight: '500',
                }}>
                Genius Cấp 2
              </Text>
            </Text>
          </TouchableOpacity>
          {/* Tiền, tín dụng */}

          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderRadius: 10,
              width: '100%',
              gap: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>Chưa có Tín dụng hay voucher</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                VNĐ 0
              </Text>
              <Entypo name="chevron-right" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Hoàn tất hồ sơ */}
        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 14,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 10,
              gap: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 50,
              }}>
              <View
                style={{
                  flex: 2,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#000',
                    fontSize: 15,
                  }}>
                  Hoàn tất hồ sơ của bạn
                </Text>
                <Text>
                  Hoàn thành hồ sơ sử dụng thông tin này cho đơn đặt tới
                </Text>
              </View>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#f0f6fd',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <EvilIcons name="user" size={50} color="#0165FF" />
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#0165FF',
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 4,
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                }}>
                Hoàn tất ngay
              </Text>
            </TouchableOpacity>
          </View>
          {/* Menu*/}
          <SectionList
            scrollEnabled={false}
            sections={menuData}
            renderSectionHeader={({section: {title}}) =>
              title ? <Text style={styles.headerText}>{title}</Text> : null
            }
            renderItem={({item, index, section}) => {
              const isFirstItem = index === 0;
              const isLastItem = index === section.data.length - 1;
              // console.log(section);
              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#ddd',
                    gap: 16,
                    marginBottom: isLastItem ? 0 : -1, // Giữ border chồng nhau
                    borderTopLeftRadius: isFirstItem ? 8 : 0,
                    borderTopRightRadius: isFirstItem ? 8 : 0,
                    borderBottomLeftRadius: isLastItem ? 8 : 0,
                    borderBottomRightRadius: isLastItem ? 8 : 0,
                  }}
                  onPress={() => {
                    if (item.screen) {
                      navigation.navigate(item.screen);
                    }
                  }}>
                  <View
                    style={{
                      gap: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {getIcon(item.icon)}
                    <Text
                      style={{
                        color: '#000',
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                  <Entypo name="chevron-right" size={20} color="gray" />
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={styles.sectionListContainer}
          />
          {/* Đăng xuất */}
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: '#fff',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 14,
            }}
            onPress={handleSignOut}>
            <Text
              style={{
                color: '#f20000',
                fontWeight: '600',
              }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
            Đang đăng xuất...
          </Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  sectionListContainer: {},
  headerText: {
    fontWeight: '600',
    color: '#000',
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
});
export default DashboardScreen;
