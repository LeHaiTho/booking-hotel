import React, {memo} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import ModalComponent from './ModalComponent';
import {COLORS} from '../styles/colors';

type AlertModalProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

const AlertModal = memo(({visible, message, onClose}: AlertModalProps) => {
  return (
    <ModalComponent modalVisible={visible} closeModal={onClose}>
      <Text style={styles.modalText}>{message}</Text>
      <TouchableOpacity style={styles.modalButton} onPress={onClose}>
        <Text style={styles.modalButtonText}>OK</Text>
      </TouchableOpacity>
    </ModalComponent>
  );
});

export default AlertModal;

const styles = StyleSheet.create({
  modalText: {
    color: COLORS.black,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 5,
  },
  modalButtonText: {
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'right',
  },
});
