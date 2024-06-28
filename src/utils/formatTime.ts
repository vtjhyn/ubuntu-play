const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatTime = (time: Date, format: string) => {
  const year = time.getFullYear().toString();
  const month = months[time.getMonth()];
  const date = time.getDate().toString().padStart(2, "0");
  let hour = time.getHours();
  const minute = time.getMinutes().toString().padStart(2, "0");
  const second = time.getSeconds().toString().padStart(2, "0");
  const meridiem = hour < 12 ? "AM" : "PM";

  const hour12 = (hour % 12 || 12).toString().padStart(2, "0");
  const hour24 = hour.toString().padStart(2, "0");

  const replacements: { [key: string]: string } = {
    YYYY: year,
    YY: year.slice(-2),
    MMMM: month,
    MMM: month,
    MM: (time.getMonth() + 1).toString().padStart(2, "0"),
    M: (time.getMonth() + 1).toString(),
    DD: date,
    D: time.getDate().toString(),
    HH: hour24,
    H: hour.toString(),
    hh: hour12,
    h: (hour % 12 || 12).toString(),
    mm: minute,
    m: time.getMinutes().toString(),
    ss: second,
    s: time.getSeconds().toString(),
    A: meridiem,
    a: meridiem.toLowerCase(),
  };

  return format.replace(
    /YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a/g,
    (match) => replacements[match]
  );
};

export default formatTime;
