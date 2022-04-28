export type Data = {
  title: string;
  desc: string;
  emotion: string;
};
export type calendarMode = {
  name: string;
  isActivate: boolean;
  selectDate: string;
};
export type EmotionListType = {
  emotion_id: number;
  desc: string;
  icon: JSX.Element;
};

//context API
export type StateContext = {
  data: Data[];
  calendarMode: calendarMode;
  isEditorMode: boolean;
};
export type OnFuncContext = {
  onCreate: onDataFunc;
  onEdit: onDataFunc;
  onRemove: onRemoveFunc;
  toggleCalendarMode: (isCalendarMode: boolean) => void;
  toggleEditMode: (isEdit: boolean) => void;
  calendarSelectDateChange: (date: string) => void;
};

//OnFuncContext의 재료들
export type onDataFunc = (
  title: string,
  content: string,
  emotion: string
) => void;
export type onRemoveFunc = (title: string) => void;

// props
export type DataProps = {
  data: Data;
};
export type EmotionProps = {
  emotionWord: string;
};
export type ReducerType =
  | {
      type: "INIT";
      data: Data[];
    }
  | {
      type: "CREATE" | "EDIT" | "REMOVE";
      data: Data;
    };
