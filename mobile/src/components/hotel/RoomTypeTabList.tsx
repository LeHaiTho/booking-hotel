import {View, Text} from 'react-native';
import React from 'react';
interface RoomType {
  title: string;
  image: string;
}

interface RoomTypeList {
  data: RoomType[];
}
const RoomTypeTabList = () => {
  return (
    <View>
      <Text>RoomTypeTabList</Text>
    </View>
  );
};

export default RoomTypeTabList;
