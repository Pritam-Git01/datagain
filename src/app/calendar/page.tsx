import DateCalendar from "@/components/DateCalendar";
import React from "react";
import Layout from "@/components/Layout";

const Calendar = () => {
  return (
    <Layout activeMenuItemName="Calendar">
      <DateCalendar />
    </Layout>
  );
};

export default Calendar;
