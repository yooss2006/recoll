export const getStringDate = (date: Date): string => {
  let year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

export const dateArray = (curDate: Date): string[] => {
  return [
    getStringDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())
    ),
    getStringDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1)
    ),
    getStringDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 7)
    ),
    getStringDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    ),
    getStringDate(
      new Date(curDate.getFullYear() - 1, curDate.getMonth(), curDate.getDate())
    ),
  ];
};
