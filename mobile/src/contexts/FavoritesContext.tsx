import React, {createContext, useContext, ReactNode} from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage';

// Định nghĩa kiểu dữ liệu cho khách sạn yêu thích
export interface FavoriteHotel {
  id: number;
  name: string;
  images: string;
  address: string;
  rating?: number;
}

interface FavoritesContextType {
  favorites: FavoriteHotel[];
  loading: boolean;
  toggleFavorite: (hotel: FavoriteHotel) => void;
  isFavorite: (hotelId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [favorites, setFavorites, loading] = useLocalStorage<FavoriteHotel[]>(
    'favorites',
    [],
  );

  // Kiểm tra xem khách sạn có trong danh sách yêu thích không
  const isFavorite = (hotelId: number): boolean => {
    return favorites.some(hotel => hotel.id === hotelId);
  };

  // Thêm/xóa khách sạn khỏi danh sách yêu thích
  const toggleFavorite = (hotel: FavoriteHotel) => {
    setFavorites(currentFavorites => {
      const isAlreadyFavorite = currentFavorites.some(
        fav => fav.id === hotel.id,
      );

      if (isAlreadyFavorite) {
        // Xóa khỏi danh sách yêu thích
        return currentFavorites.filter(fav => fav.id !== hotel.id);
      } else {
        // Thêm vào danh sách yêu thích
        return [...currentFavorites, hotel];
      }
    });
  };

  return (
    <FavoritesContext.Provider
      value={{favorites, loading, toggleFavorite, isFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
