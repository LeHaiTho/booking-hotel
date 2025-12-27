// import {
//   Keyboard,
//   PermissionsAndroid,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Geolocation from 'react-native-geolocation-service';
// import LoadingBarComponent from '@components/LoadingBarComponent';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {COLORS} from '@styles/colors';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// // data gợi ý tìm kiếm
// const data = [
//   {
//     id: 1,
//     name: 'Đồng Nai',
//   },
//   {
//     id: 2,
//     name: 'Hà Nội',
//   },
//   {
//     id: 3,
//     name: 'Hồ Chí Minh',
//   },
//   //...
// ];

// type location = {
//   address?: string;
//   latitude?: string;
//   longitude?: string;
// };
// const SearchLocationScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchText, setSearchText] = React.useState('');
//   const {location}: any = route.params || {};

//   console.log('location', location);
//   // Lấy vị trí hiện tại của người dùng
//   const [currentLocation, setCurrentLocation] = React.useState<location>();
//   const inputRef = useRef<TextInput>(null);
//   // cấp quyền
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Cần cấp quyền truy cập vị trí của bạn',
//             message:
//               '��ng dụng cần truy cập vị trí của bạn để tìm kiếm nhà hàng tốt nhất',
//             buttonNeutral: 'Không đ��ng ��',
//             buttonNegative: 'Không',
//             buttonPositive: 'Đồng ��',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Location permission granted');
//           setIsLoading(true);
//           getCurrentLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (error) {
//         console.warn(error);
//       }
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         // console.log(position);
//         // setCurrentLocation(position);
//         getAddressFromCoordinates({
//           longitude: position.coords.longitude.toString(),
//           latitude: position.coords.latitude.toString(),
//         });
//         setCurrentLocation(prev => ({
//           ...prev,
//           latitude: position.coords.latitude.toString(),
//           longitude: position.coords.longitude.toString(),
//         }));
//       },
//       error => {
//         console.log(error.code, error.message);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   // gọi API của Mapbox chuyển kinh độ vĩ độ thành địa chỉ
//   const getAddressFromCoordinates = async ({
//     longitude,
//     latitude,
//   }: {
//     longitude: string;
//     latitude: string;
//   }) => {
//     // token mapbox
//     const TOKEN =
//       'pk.eyJ1IjoibGVoYWl0aG8yMDAyIiwiYSI6ImNtN216ZzlzOTBvaGsycnM2YXExbmk2b3IifQ.8XDAfDAC87AGVUfcaV9tnA';
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${TOKEN}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       // const location = data.features[0].place_name
//       //   .split(', ')
//       //   .slice(1, 3)
//       //   .join(', ');
//       // setCurrentLocation(location);
//       const address = data.features[3].place_name;
//       setCurrentLocation(prev => ({
//         ...prev,
//         address,
//       }));
//       setIsLoading(false);
//       console.log('address', address);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClear = () => {
//     setSearchText('');
//   };

//   useEffect(() => {
//     if (searchText.length === 0) {
//       Keyboard.dismiss();
//       inputRef.current?.focus();
//     }
//   }, [searchText]);

//   useEffect(() => {
//     if (
//       currentLocation?.address &&
//       currentLocation?.latitude &&
//       currentLocation?.longitude
//     ) {
//       navigation.replace('Main', {currentLocation});
//     }
//   }, [currentLocation]);

//   console.log('searchText', searchText);
//   return (
//     <View
//       style={{
//         backgroundColor: '#fff',
//         padding: 16,
//         gap: 16,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 16,
//           borderWidth: 3,
//           borderColor: '#FFB700',
//           borderRadius: 8,
//           backgroundColor: COLORS.white,
//           paddingHorizontal: 10,
//         }}>
//         <Pressable
//           style={({pressed}) => [
//             {
//               backgroundColor: pressed ? COLORS.opacity : COLORS.white,
//               borderRadius: 50,
//               padding: 5,
//             },
//           ]}
//           onPress={() => navigation.replace('Main')}>
//           <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
//         </Pressable>
//         <TextInput
//           style={{flex: 1}}
//           placeholder="Nhập điểm dến"
//           value={searchText}
//           onChangeText={text => setSearchText(text)}
//           ref={inputRef}
//         />
//         {searchText.length > 0 && (
//           <AntDesign
//             name="close"
//             size={22}
//             color="#000"
//             onPress={handleClear}
//           />
//         )}
//       </View>
//       {isLoading ? <LoadingBarComponent /> : null}
//       <TouchableOpacity
//         style={{
//           gap: 16,
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}
//         onPress={requestLocationPermission}>
//         <MaterialIcons
//           name="my-location"
//           size={15}
//           color="#0165FC"
//           style={{
//             backgroundColor: '#D8E7FA',
//             padding: 10,
//             borderRadius: 2,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         />
//         <View
//           style={{
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//           }}>
//           <Text style={{color: '#0165FC', fontWeight: '700'}}>
//             Xung quanh vị trí hiện tại
//           </Text>
//           {location?.location?.address && (
//             <Text style={{fontSize: 13}}>{location?.location?.address}</Text>
//           )}
//         </View>
//       </TouchableOpacity>
//       <View
//         style={{
//           gap: 16,
//         }}>
//         <Text style={{fontWeight: '700', fontSize: 18, color: '#000'}}>
//           Tiếp tục tìm kiếm của bạn
//         </Text>
//         <View
//           style={{
//             gap: 10,
//           }}>
//           {data?.map(item => {
//             return (
//               <TouchableOpacity
//                 key={item?.id}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',

//                   gap: 14,
//                 }}>
//                 <Entypo
//                   name="back-in-time"
//                   size={18}
//                   color="#0165fc"
//                   style={{
//                     backgroundColor: '#D8E7FA',
//                     padding: 10,
//                     borderRadius: 2,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                   }}>
//                   <Text
//                     style={{
//                       color: '#000',
//                       fontWeight: '700',
//                     }}>
//                     {item.name}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 13,
//                     }}>
//                     01 thg 3-26 thg 4, 2 người lớn
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>
//       {/* <View>
//         {currentLocation ? (
//           <Text>
//             Latitude: {currentLocation.coords.latitude}, Longitude:{' '}
//             {currentLocation.coords.longitude}
//           </Text>
//         ) : (
//           <Text>Loading location...</Text>
//         )}
//       </View> */}
//     </View>
//   );
// };

// export default SearchLocationScreen;

// const styles = StyleSheet.create({});

import {
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import LoadingBarComponent from '@components/LoadingBarComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import {debounce} from 'lodash';
import {API_URL} from '@utils/constants';
// data gợi ý tìm kiếm lịch sử
const historyData = [
  {
    id: 1,
    name: 'Đồng Nai',
  },
  {
    id: 2,
    name: 'Hà Nội',
  },
  {
    id: 3,
    name: 'Hồ Chí Minh',
  },
  //...
];

type location = {
  address?: string;
  latitude?: string;
  longitude?: string;
};

// Interface for location suggestions
interface LocationSuggestion {
  id: number;
  name: string;
  province_id?: number;
  Province?: {
    id: number;
    name: string;
  };
  type: 'province' | 'city';
}

const SearchLocationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = React.useState('');
  const {location}: any = route.params || {};
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  console.log('location', location);
  // Lấy vị trí hiện tại của người dùng
  const [currentLocation, setCurrentLocation] = React.useState<location>();
  const inputRef = useRef<TextInput>(null);

  // cấp quyền
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cần cấp quyền truy cập vị trí của bạn',
            message:
              'Ứng dụng cần truy cập vị trí của bạn để tìm kiếm nhà hàng tốt nhất',
            buttonNeutral: 'Không đồng ý',
            buttonNegative: 'Không',
            buttonPositive: 'Đồng ý',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          setIsLoading(true);
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        // setCurrentLocation(position);
        getAddressFromCoordinates({
          longitude: position.coords.longitude.toString(),
          latitude: position.coords.latitude.toString(),
        });
        setCurrentLocation(prev => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // gọi API của Mapbox chuyển kinh độ vĩ độ thành địa chỉ
  const getAddressFromCoordinates = async ({
    longitude,
    latitude,
  }: {
    longitude: string;
    latitude: string;
  }) => {
    // token mapbox
    const TOKEN =
      'pk.eyJ1IjoibGVoYWl0aG8yMDAyIiwiYSI6ImNtN216ZzlzOTBvaGsycnM2YXExbmk2b3IifQ.8XDAfDAC87AGVUfcaV9tnA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${TOKEN}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // const location = data.features[0].place_name
      //   .split(', ')
      //   .slice(1, 3)
      //   .join(', ');
      // setCurrentLocation(location);
      const address = data.features[3].place_name;
      setCurrentLocation(prev => ({
        ...prev,
        address,
      }));
      setIsLoading(false);
      console.log('address', address);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch location suggestions from the API
  const fetchLocationSuggestions = async (keyword: string) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `${API_URL}/location/search?keyword=${encodeURIComponent(keyword)}`,
      );

      // Transform data to match our LocationSuggestion interface
      const transformedData: LocationSuggestion[] = response.data.map(
        (item: any) => {
          // Check if it's a province or city based on the response structure
          if (item.Province) {
            return {
              id: item.id,
              name: item.name,
              province_id: item.province_id,
              Province: item.Province,
              type: 'city',
            };
          } else {
            return {
              id: item.id,
              name: item.name,
              type: 'province',
            };
          }
        },
      );

      setSuggestions(transformedData);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce the search function to avoid too many API calls
  const debouncedSearch = debounce(fetchLocationSuggestions, 300);

  const handleClear = () => {
    setSearchText('');
    setSuggestions([]);
  };

  // Handle when a suggestion is selected
  const handleSelectLocation = (item: LocationSuggestion) => {
    // For now, just navigate back to main with the selected location
    // In a real app, you'd want to get coordinates for the location
    const selectedLocation = {
      address:
        item.type === 'city'
          ? `${item.name}, ${item.Province?.name}`
          : item.name,
      // You might want to fetch actual coordinates here
      latitude: '',
      longitude: '',
    };

    navigation.replace('Main', {currentLocation: selectedLocation});
  };

  useEffect(() => {
    if (searchText.length === 0) {
      Keyboard.dismiss();
      inputRef.current?.focus();
      setSuggestions([]);
    } else {
      debouncedSearch(searchText);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText]);

  useEffect(() => {
    if (
      currentLocation?.address &&
      currentLocation?.latitude &&
      currentLocation?.longitude
    ) {
      navigation.replace('Main', {currentLocation});
    }
  }, [currentLocation]);

  // Render a suggestion item
  const renderSuggestionItem = ({item}: {item: LocationSuggestion}) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSelectLocation(item)}>
      <Ionicons
        name={item.type === 'province' ? 'location' : 'business'}
        size={18}
        color="#0165fc"
        style={styles.suggestionIcon}
      />
      <View style={styles.suggestionTextContainer}>
        <Text style={styles.suggestionTitle}>{item.name}</Text>
        {item.type === 'city' && item.Province && (
          <Text style={styles.suggestionSubtitle}>{item.Province.name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Pressable
          style={({pressed}) => [
            styles.backButton,
            {backgroundColor: pressed ? COLORS.opacity : COLORS.white},
          ]}
          onPress={() => navigation.replace('Main')}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="Nhập điểm đến"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          ref={inputRef}
        />
        {searchText.length > 0 && (
          <AntDesign
            name="close"
            size={22}
            color="#000"
            onPress={handleClear}
          />
        )}
      </View>

      {isLoading ? <LoadingBarComponent /> : null}

      {/* Suggestions list */}
      {searchText.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {isSearching ? (
            <ActivityIndicator
              size="small"
              color="#0165FC"
              style={styles.loadingIndicator}
            />
          ) : suggestions.length > 0 ? (
            <FlatList
              data={suggestions}
              renderItem={renderSuggestionItem}
              keyExtractor={item => `${item.type}-${item.id}`}
              style={styles.suggestionsList}
            />
          ) : (
            <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
          )}
        </View>
      )}

      {/* Current location button */}
      {searchText.length === 0 && (
        <>
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={requestLocationPermission}>
            <MaterialIcons
              name="my-location"
              size={15}
              color="#0165FC"
              style={styles.locationIcon}
            />
            <View style={styles.locationTextContainer}>
              <Text style={styles.currentLocationText}>
                Xung quanh vị trí hiện tại
              </Text>
              {location?.location?.address && (
                <Text style={styles.addressText}>
                  {location?.location?.address}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* History search */}
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Tiếp tục tìm kiếm của bạn</Text>
            <View style={styles.historyList}>
              {historyData?.map(item => {
                return (
                  <TouchableOpacity key={item?.id} style={styles.historyItem}>
                    <Entypo
                      name="back-in-time"
                      size={18}
                      color="#0165fc"
                      style={styles.historyIcon}
                    />
                    <View style={styles.historyTextContainer}>
                      <Text style={styles.historyItemTitle}>{item.name}</Text>
                      <Text style={styles.historyItemSubtitle}>
                        01 thg 3-26 thg 4, 2 người lớn
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default SearchLocationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    gap: 16,
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 3,
    borderColor: '#FFB700',
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  backButton: {
    borderRadius: 50,
    padding: 5,
  },
  input: {
    flex: 1,
  },
  currentLocationButton: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    backgroundColor: '#D8E7FA',
    padding: 10,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationTextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  currentLocationText: {
    color: '#0165FC',
    fontWeight: '700',
  },
  addressText: {
    fontSize: 13,
  },
  historyContainer: {
    gap: 16,
  },
  historyTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
  },
  historyList: {
    gap: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  historyIcon: {
    backgroundColor: '#D8E7FA',
    padding: 10,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyTextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  historyItemTitle: {
    color: '#000',
    fontWeight: '700',
  },
  historyItemSubtitle: {
    fontSize: 13,
  },
  suggestionsContainer: {
    marginTop: 10,
  },
  suggestionsList: {
    maxHeight: 350,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  suggestionIcon: {
    backgroundColor: '#D8E7FA',
    padding: 10,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionTextContainer: {
    marginLeft: 14,
    flexDirection: 'column',
  },
  suggestionTitle: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15,
  },
  suggestionSubtitle: {
    color: '#616161',
    fontSize: 13,
    marginTop: 2,
  },
  loadingIndicator: {
    padding: 20,
  },
  noResultsText: {
    padding: 20,
    textAlign: 'center',
    color: '#757575',
  },
});
