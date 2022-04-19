import { Data } from "../util/type";
import Emotion from "./Emotion";
type DiaryItemProps = {
  data: Data;
};

const DiaryItem = ({ data }: DiaryItemProps) => {
  return (
    <article className="DiaryItem">
      <div className="title">
        <Emotion emotionNumber={data.emotion} />
        <h3>{data.title}</h3>
      </div>
      <p>{data.desc}</p>
    </article>
  );
};

export default DiaryItem;
