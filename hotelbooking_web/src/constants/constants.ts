export const COLORS = {
    BACKGROUND: "#003b95",
    BUTTON: "#006ce4",
    ALINK: "#208aeb",
    GRAYCOLOR: "#525252"
  };
export const APP1 = {
  name: "MNMQ.com"
}

export const formatCurrency = (amount1:any) => {
  const amount = Number(amount1);
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

export const formatDateHour = (isoString:string):string => {
  const date = new Date(isoString);

  const pad = (n:any) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  // const seconds = pad(date.getSeconds());

  const formatted = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formatted
}
// Địa chỉ server
export const baseUrl = "http://localhost:5000/"