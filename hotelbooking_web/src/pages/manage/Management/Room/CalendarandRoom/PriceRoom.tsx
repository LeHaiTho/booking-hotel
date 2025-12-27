// import { Calendar } from "antd";
// import dayjs from "dayjs";

// const specialDates = ["2025-03-10", "2025-03-15"];

// const cellRender = (value: dayjs.Dayjs, info: any) => {
//     if (info.type === "date" && specialDates.includes(value.format("YYYY-MM-DD"))) {
//         return <div style={{ background: "#1890ff", color: "white", padding: 5 }}>{value.date()}</div>;
//     }
//     return value.date();
// };

// const PriceRoom = () => <Calendar cellRender={cellRender} />;

// export default PriceRoom;

// import { Calendar } from "antd";
// import dayjs from "dayjs";

// const events = {
//     "2025-03-10": "Sinh nhật",
//     "2025-03-15": "Lễ hội",
// };

// const dateFullCellRender = (value: dayjs.Dayjs) => {
//     const event = events["2025-03-10"];
//     return (
//         <div style={{ background: event ? "#fadb14" : "white", padding: 5, minHeight: 40 }}>
//             <div>{value.date()}</div>
//             {event && <small>{event}</small>}
//         </div>
//     );
// };

// const PriceRoom = () => <Calendar dateFullCellRender={dateFullCellRender} />;

// export default PriceRoom;

import { Calendar } from "antd";
import dayjs from "dayjs";

const importantMonths = [3, 7, 12]; // Tháng 3, 7, 12

const fullCellRender = (value: dayjs.Dayjs, info: any) => {
    if (info.type === "month" && importantMonths.includes(value.month() + 1)) {
        return (
            <div style={{ background: "#ff4d4f", color: "white", padding: 10 }}>
                <strong>{value.format("MMMM")}</strong>
                <div>Sự kiện đặc biệt</div>
            </div>
        );
    }
    return value.format("MMM");
};

const RoomPrice = () => <Calendar fullCellRender={fullCellRender} />;

export default RoomPrice;