import React, { Component } from "react";
import { DateRange } from "react-date-range";
import { enUS } from "date-fns/locale"; // Importing the English locale from date-fns
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

class MyCalendar2 extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(ranges) {
    console.log(ranges);
    // The selection object will contain startDate and endDate as native Date objects
  }

  render() {
    const endDate = new Date(2024, 11, 14);

    const selectionRange = {
      startDate: new Date(),
      endDate: endDate,
      key: "selection",
    };

    return (
      <DateRange
        ranges={[selectionRange]}
        onChange={this.handleSelect} // Binding the onChange to the class method
        locale={enUS} // Setting the locale for the calendar
      // showDateDisplay={false} // Hide the left-side panel
      />
    );
  }
}

export default MyCalendar2;
