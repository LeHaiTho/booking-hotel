import {
  View,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

interface RadioButtonProps {
  options: string[];
  onSelect: (selected: string) => void;
  initialSelected?: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  selectedButtonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
}
const RadioButtonComponent: React.FC<RadioButtonProps> = ({
  options,
  onSelect,
  initialSelected,
  containerStyle,
  buttonStyle,
  selectedButtonStyle,
  textStyle,
  selectedTextStyle,
}) => {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  };
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          gap: 16,
        },
        containerStyle,
      ]}>
      {options?.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelect(option)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000',
            }}>
            {option}
          </Text>
          <View
            style={{
              borderRadius: 10,
              width: 20,
              height: 20,
              backgroundColor: 'white',
              borderWidth: selected === option ? 2 : 1,
              borderColor: selected === option ? '#0165FC' : '#9999',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {selected === option && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: '#0165FC',
                }}></View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButtonComponent;
