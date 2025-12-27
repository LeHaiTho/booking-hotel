import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  ViewStyle,
} from 'react-native';

interface ModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  overlayStyle?: ViewStyle;
  touchable?: boolean;
}
const ModalComponent = ({
  modalVisible,
  closeModal,
  children,
  containerStyle,
  overlayStyle,
  touchable = true,
}: ModalProps) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={touchable ? closeModal : () => {}}>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
            overlayStyle,
          ]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                {
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 10,
                  gap: 30,
                  width: '85%',
                },
                containerStyle,
              ]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;
