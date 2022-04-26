export type Data = {
  title: string;
  desc: string;
  emotion: string;
};

export type DataProps = {
  data: Data;
};

export type DataEditorProps = {
  firstData: Data;
  isEditorMode: boolean;
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

export type onDataFunc = (
  title: string,
  content: string,
  emotion: string
) => void;

export type onRemoveFunc = (title: string) => void;

export type CheckSelectModeProps = {
  viewMode: {
    name: string;
    isActivate: boolean;
  }[];
  setViewMode: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        isActivate: boolean;
      }[]
    >
  >;
};
