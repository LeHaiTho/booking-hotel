// src/components/GlobalBottomSheet.tsx
import React, {useMemo} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, Text, StyleSheet} from 'react-native';
import {useBottomSheet} from '../context/BottomSheetContext';

const GlobalBottomSheet = () => {
  const {bottomSheetRef} = useBottomSheet();
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose>
      <View style={styles.contentContainer}>
        <Text>Nội dung Bottom Sheet</Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlobalBottomSheet;
