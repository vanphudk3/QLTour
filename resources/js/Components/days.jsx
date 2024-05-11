import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import "../../css/app.css";
import { unset } from 'lodash';

export default function BasicDatePicker(props) {
  const { value, onChange, days } = props;

  // Hàm kiểm tra xem ngày có trong danh sách không
  const shouldDisableDate = (day) => {
    const dayString = day.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
    const updatedDays = [...days]; // Tạo bản sao của mảng days

    if (dayString < yesterday) {
      const index = updatedDays.indexOf(dayString); // Tìm vị trí của ngày trong mảng
      if (index !== -1) {
        updatedDays.splice(index, 1); // Xóa ngày khỏi mảng
      }
    }
    return !updatedDays.includes(dayString); // Trả về true nếu ngày không có trong mảng
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={onChange}
        inputFormat="MM/dd/yyyy"
        renderInput={(params) => <input type="text" {...params} />}
        shouldDisableDate={shouldDisableDate} // Sử dụng hàm shouldDisableDate
      />
    </LocalizationProvider>
  );
}
