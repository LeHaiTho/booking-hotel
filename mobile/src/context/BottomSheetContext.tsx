import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {COLORS} from '../styles/colors';

interface BottomSheetContextType {
  showBottomSheet: (
    content: ReactNode,
    snapPoints?: (string | number)[],
    onClose?: () => void,
  ) => void;
  closeBottomSheet: () => void;
}

interface BottomSheetProviderProps {
  children: ReactNode;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = React.useState<ReactNode | null>(null);
  const [snapPoints, setSnapPoints] = React.useState<(string | number)[]>([
    '50%',
  ]);
  const [onCloseCallback, setOnCloseCallback] = React.useState<
    (() => void) | null
  >(null);

  const showBottomSheet = useCallback(
    (
      sheetContent: ReactNode,
      points: (string | number)[] = [],
      onClose?: () => void,
    ) => {
      setContent(sheetContent);
      setSnapPoints(points);
      setOnCloseCallback(() => onClose || null);
      bottomSheetModalRef.current?.present();
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setContent(null);
    if (onCloseCallback) {
      onCloseCallback();
      setOnCloseCallback(null);
    }
  }, [onCloseCallback]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  const value = useMemo(
    () => ({
      showBottomSheet,
      closeBottomSheet,
    }),
    [showBottomSheet, closeBottomSheet],
  );

  return (
    <BottomSheetContext.Provider value={value}>
      <BottomSheetModalProvider>
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
          enableDynamicSizing={false}
          onChange={index => {
            if (index === -1) closeBottomSheet();
          }}
          accessibilityLabel="Bottom sheet nội dung">
          <View style={styles.contentContainer}>{content}</View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  bottomSheetBackground: {
    backgroundColor: COLORS.white,
  },
  handleIndicator: {
    backgroundColor: COLORS.gray,
    width: 40,
    height: 4,
  },
});
