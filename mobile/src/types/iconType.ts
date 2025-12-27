export type IconLibrary =
  | 'AntDesign'
  | 'Entypo'
  | 'FontAwesome'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'FontAwesome6'
  | 'FontAwesome6Pro'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'
  | 'Fontisto'
  | 'Ionicons';

export type IconType = {
  name: string;
  library: IconLibrary;
};
