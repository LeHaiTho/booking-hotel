import {ReactNode} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {RefObject} from 'react';

// Định nghĩa type cho context
export interface BottomSheetContextType {
  bottomSheetRef: RefObject<BottomSheet>;
  openBottomSheet: (content: ReactNode, snapPoints?: string[]) => void;
  closeBottomSheet: () => void;
}

// Định nghĩa props cho BottomSheet Provider
export interface BottomSheetProviderProps {
  children: ReactNode;
}
