import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
export type Ref = BottomSheetModal;
const TestBottomSheetModal = forwardRef<Ref, any>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} enableTouchThrough={true} />
    ),
    [],
  );
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={0}
      backdropComponent={renderBackdrop}>
      <View style={styles.container}>
        <Text>TestBottomSheetModal</Text>
      </View>
    </BottomSheetModal>
  );
});

export default TestBottomSheetModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
