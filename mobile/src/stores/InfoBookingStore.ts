import {create} from 'zustand';

interface InfoBookingStore {
  formData: {
    guest_firstname: string;
    guest_lastname: string;
    guest_email: string;
    guest_phone: string;
  };
  errors: {
    guest_firstname?: string;
    guest_lastname?: string;
    guest_email?: string;
    guest_phone?: string;
  };
  updateFormData: (field: string, value: string) => void;
  validateForm: () => boolean;
  resetFormData: () => void;
}

const useInfoBookingStore = create<InfoBookingStore>(set => {
  return {
    formData: {
      guest_firstname: '',
      guest_lastname: '',
      guest_email: '',
      guest_phone: '',
    },
    errors: {},
    updateFormData: (field: string, value: string) =>
      set(state => ({
        formData: {...state.formData, [field]: value},
        errors: {...state.errors, [field]: ''},
      })),
    validateForm: () => {
      let isValid = true;
      set(state => {
        const newErrors: Record<string, string> = {};
        Object.keys(state.formData).forEach(key => {
          if (!state.formData[key as keyof typeof state.formData]) {
            newErrors[key] = 'Vui lòng nhập thông tin';
          }
        });
        isValid = Object.values(newErrors).every(error => error === '');
        return {errors: newErrors};
      });
      return isValid;
    },
    resetFormData: () =>
      set({
        formData: {
          guest_firstname: '',
          guest_lastname: '',
          guest_email: '',
          guest_phone: '',
        },
        errors: {},
      }),
  };
});

export default useInfoBookingStore;
