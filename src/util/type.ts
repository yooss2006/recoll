export type Data = {
  id: number;
  title: string;
  desc: string;
  emotion: string;
};

export type DataProps = {
  data: Data;
};

export type DataArrayProps = {
  data: Data[];
};
export type DataEditorProps = {
  data: Data[];
  onCreate: (date: string, content: string, emotion: string) => void;
};

export type EmotionProps = {
  emotionWord: string;
};

export type ReducerType = {
  type: String;
  data: Data;
};
