import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import {create} from 'zustand';
import {API_URL} from '../utils/constants';

interface AuthStore {
  user?: any | null;
  token?: string | null;
  login: (user: any, token: string) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}
const useAuthStore = create<AuthStore>(set => ({
  user: null,
  token: null,

  // Lưu token và user vào local storage(async storage)
  login: async (user: any, token: string) => {
    set({user, token});
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('token', token);
  },

  logout: async () => {
    set({user: null, token: null});
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  },

  // Lấy user và token từ local storage(async storage)
  getUser: async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.get(`${API_URL}/auth/get-info-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({user: response.data.user, token: token});
      console.log(token);
    }
  },
}));

export default useAuthStore;
