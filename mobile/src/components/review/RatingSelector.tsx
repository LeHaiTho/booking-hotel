import React, {memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '@styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RatingSelectorProps = {
  items: {id: number; score: number; name: string; icon: string}[];
  selectedScore: number;
  onSelect: (score: number) => void;
  showIcon?: boolean;
  title?: string;
};
const RatingSelector = memo(
  ({
    items,
    selectedScore,
    onSelect,
    showIcon = false,
    title,
  }: RatingSelectorProps) => {
    return (
      <View style={styles.ratingContainer}>
        {items.map((item, index) => {
          const isSelected = item.score === selectedScore;
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.ratingButton,
                {
                  borderRightWidth: isLast ? 0 : 1,
                  borderRightColor: COLORS.grayLight,
                  borderBottomRightRadius: isLast ? 100 : 0,
                  borderTopRightRadius: isLast ? 100 : 0,
                  borderBottomLeftRadius: isFirst ? 100 : 0,
                  borderTopLeftRadius: isFirst ? 100 : 0,
                  backgroundColor: isSelected ? COLORS.primary : 'transparent',
                  borderColor: isSelected ? COLORS.primary : COLORS.grayLight,
                },
              ]}
              onPress={() => onSelect(item.score)}>
              {showIcon ? (
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={isSelected ? COLORS.white : COLORS.primary}
                />
              ) : (
                <Text
                  style={{
                    color: isSelected ? COLORS.white : COLORS.black,
                    fontSize: 16,
                  }}>
                  {item.score}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: COLORS.grayLight,
    borderRadius: 100,
  },
  ratingButton: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RatingSelector;
