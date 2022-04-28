//date 객체를 yyyy-mm-dd 형식의 문자열로 바꿔준다.
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

//오늘을 기준으로 오늘, 어제, 일주일 전, 한달 전, 일년 전의 날짜가 담긴 배열을 반환한다.
export const dateArray = (): string[] => {
  const date = new Date();
  return [
    getStringDate(
      new Date(date.getFullYear(), date.getMonth(), date.getDate())
    ),
    getStringDate(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    ),
    getStringDate(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    ),
    getStringDate(
      new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
    ),
    getStringDate(
      new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())
    ),
  ];
};

//위 dateArray안에 원하는 날짜가 있다면 그 날의 정보를 반환한다. "오늘", "어제" 등
export const deteName = (title: string) => {
  switch (dateArray().indexOf(title)) {
    case 0:
      return "오늘";
    case 1:
      return "어제";
    case 2:
      return "일주일 전";
    case 3:
      return "한달 전";
    case 4:
      return "일년 전";
    default:
      return "";
  }
};
