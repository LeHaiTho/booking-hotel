import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextProps,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React, {useState} from 'react';
interface ICheckboxProps {
  label: string;
  checked?: boolean;
  onToggle: (checked: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  checkboxColor?: string;
  uncheckedColor?: string;
}
const CheckboxComponent: React.FC<ICheckboxProps> = ({
  label,
  checked = false, // Sửa giá trị mặc định thành false
  onToggle,
  containerStyle,
  checkboxStyle,
  labelStyle,
  checkboxColor = '#007aff',
  uncheckedColor = '#ccc',
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onToggle?.(newCheckedState);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
      }}
      onPress={handleToggle}>
      <Text
        style={[
          {
            fontSize: 12,
            color: '#000',
            flex: 1,
          },
          labelStyle,
        ]}>
        {label}
      </Text>
      <View
        style={{
          height: 20,
          width: 20,
          borderWidth: 1,
          borderColor: isChecked ? checkboxColor : uncheckedColor,
          borderRadius: 5,
          justifyContent: 'center',
          backgroundColor: isChecked ? '#0165fc' : 'transparent',
          alignItems: 'center',
        }}>
        {isChecked && (
          <View
            style={{
              width: 12,
              height: 6,
              borderBottomWidth: 1.5,
              borderLeftWidth: 1.5,
              borderColor: '#fff',
              transform: [{rotate: '-45deg'}],
            }}></View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CheckboxComponent;
