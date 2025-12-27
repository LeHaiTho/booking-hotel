import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  // Đọc từ AsyncStorage
  const readValue = async () => {
    try {
      setLoading(true);
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.error(`Error reading from AsyncStorage:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Lưu vào AsyncStorage
  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting AsyncStorage key "${key}":`, error);
    }
  };

  // Đọc giá trị ban đầu
  useEffect(() => {
    readValue();
  }, []);

  return [storedValue, setValue, loading] as const;
}
