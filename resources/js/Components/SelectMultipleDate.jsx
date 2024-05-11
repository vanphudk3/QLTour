import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const format = "MM/DD/YYYY";

export default function SelectMultipleDate(props) {
    const { days, setDates } = props;

    return (
        <DatePicker
            value={days}
            onChange={setDates}
            style={{ padding: "18px 0px", marginTop: "5px", width: "185%" }}
            multiple
            sort
            format={format}
            calendarPosition="bottom-center"
            plugins={[<DatePanel />]}
            inputStyle={{ fontSize: "16px", padding: "10px", width: "300px" }}
        />
    );
}
