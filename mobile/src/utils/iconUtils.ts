import React, {createElement} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconType} from '../types/iconType';

const iconComponents = {
  AntDesign,
  Entypo,
  FontAwesome,
  EvilIcons,
  Feather,
  FontAwesome5,
  FontAwesome5Pro,
  FontAwesome6,
  FontAwesome6Pro,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
  Fontisto,
  Ionicons,
};
export const getIcon = (
  icon: IconType,
  size: number = 24,
  color: string = '#000',
): JSX.Element | undefined => {
  const {name, library} = icon;
  const IconComponent = iconComponents[library];
  if (IconComponent) {
    return createElement(IconComponent, {name, size, color});
  }
  return undefined;
};
