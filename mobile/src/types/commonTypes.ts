// Types file (types.js)
export type Location = {
  address?: string;
  latitude?: string;
  longitude?: string;
};

export type SearchCondition = {
  checkInDate?: string;
  checkOutDate?: string;
  location?: Location;
  capacity?: {
    adults?: number;
    children?: number;
  };
  rooms: number;
};

export type DateRange = {
  startDate: string | null;
  endDate: string | null;
};
