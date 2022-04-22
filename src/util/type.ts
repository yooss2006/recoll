export type Data = {
  title: string;
  desc: string;
  emotion: string;
};

export type DataProps = {
  data: Data;
  setEditorMode: React.Dispatch<React.SetStateAction<string>>;
};

export type DataListProps = {
  data: Data[];
  setEditorMode: React.Dispatch<React.SetStateAction<string>>;
};

export type DataEditorProps = {
  data: Data[];
  onCreate: (date: string, content: string, emotion: string) => void;
  onEdit: (title: string, content: string, emotion: string) => void;
  editorMode: string;
  setEditorMode: React.Dispatch<React.SetStateAction<string>>;
};

export type EmotionProps = {
  emotionWord: string;
};

export type ReducerType = {
  type: String;
  data: Data;
};
