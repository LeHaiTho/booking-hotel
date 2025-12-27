import React, {memo, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import {COLORS} from '../styles/colors';
import {DateRange} from '../types/commonTypes';

type CalendarBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  dateRange: DateRange;
  onDayPress: (day: any) => void;
  onConfirm: () => void;
};

const CalendarBottomSheet = memo(
  ({
    bottomSheetRef,
    dateRange,
    onDayPress,
    onConfirm,
  }: CalendarBottomSheetProps) => {
    // Snap points cho BottomSheetModal
    const snapPoints = useMemo(() => ['60%'], []);

    // Render backdrop cho BottomSheetModal
    const renderBackdrop = useMemo(
      () => (props: any) =>
        (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.7}
            pressBehavior="close"
          />
        ),
      [],
    );

    // Tối ưu markedDates với useMemo
    const markedDates = useMemo(() => {
      const result: any = {};
      const {startDate, endDate} = dateRange;

      // Vô hiệu hóa các ngày trong quá khứ
      const startDisableDate = moment().subtract(6, 'months');
      const endDisableDate = moment().subtract(1, 'day');
      let currentDisableDate = startDisableDate.clone();

      while (currentDisableDate.isSameOrBefore(endDisableDate)) {
        const dateStr = currentDisableDate.format('YYYY-MM-DD');
        result[dateStr] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            container: {backgroundColor: '#f0f0f0'},
            text: {color: '#c0c0c0', textDecorationLine: 'line-through'},
          },
        };
        currentDisableDate.add(1, 'day');
      }

      // Đánh dấu ngày bắt đầu
      if (startDate) {
        result[startDate] = {
          ...result[startDate],
          selected: true,
          startingDay: true,
          disabled: false,
          disableTouchEvent: false,
          customStyles: {
            container: {
              backgroundColor: COLORS.primary,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
              borderTopRightRadius: endDate === startDate ? 6 : 0,
              borderBottomRightRadius: endDate === startDate ? 6 : 0,
              width: '100%',
            },
            text: {color: COLORS.white},
          },
        };
      }

      // Đánh dấu ngày kết thúc
      if (endDate && endDate !== startDate) {
        result[endDate] = {
          ...result[endDate],
          selected: true,
          endingDay: true,
          disabled: false,
          disableTouchEvent: false,
          customStyles: {
            container: {
              backgroundColor: COLORS.primary,
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: '100%',
            },
            text: {color: COLORS.white},
          },
        };
      }

      // Đánh dấu các ngày giữa
      if (startDate && endDate && startDate !== endDate) {
        let curDate = moment(startDate).clone();
        while (curDate.add(1, 'day').isBefore(moment(endDate))) {
          const dateStr = curDate.format('YYYY-MM-DD');
          result[dateStr] = {
            ...result[dateStr],
            selected: true,
            disabled: false,
            disableTouchEvent: false,
            customStyles: {
              container: {
                backgroundColor: '#cccccc',
                borderRadius: 0,
                width: '100%',
              },
              text: {color: COLORS.black},
            },
          };
        }
      }

      return result;
    }, [dateRange.startDate, dateRange.endDate]);

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        android_keyboardInputMode="adjustResize">
        <BottomSheetView style={styles.calendarContainer}>
          <View style={styles.weekdayHeader}>
            <Text>Th2</Text>
            <Text>Th3</Text>
            <Text>Th4</Text>
            <Text>Th5</Text>
            <Text>Th6</Text>
            <Text>Th7</Text>
            <Text>CN</Text>
          </View>

          <CalendarList
            pastScrollRange={0}
            futureScrollRange={12}
            showScrollIndicator={false}
            horizontal={false}
            calendarHeight={200}
            hideDayNames
            initialNumToRender={3}
            markingType="custom"
            windowSize={3}
            removeClippedSubviews={true}
            markedDates={markedDates}
            onDayPress={onDayPress}
            minDate={moment().format('YYYY-MM-DD')}
            theme={{
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            }}
          />

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.7}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default CalendarBottomSheet;

const styles = StyleSheet.create({
  bottomSheetIndicator: {
    width: '13%',
    backgroundColor: '#797979',
  },
  weekdayHeader: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  calendarContainer: {
    flex: 1,
  },
  calendarWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.primary,
    width: '100%',
    gap: 10,
    borderRadius: 3,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
