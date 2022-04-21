import { emotionList } from "../util/emotionList";
import { EmotionProps } from "../util/type";

const Emotion = ({ emotionWord }: EmotionProps) => {
  const emotion = emotionList.find((item) => item.desc === emotionWord);
  if (emotion) {
    return (
      <div className="Emotion">
        <h4 className="blind">{emotion.desc}</h4>
        {emotion.icon}
      </div>
    );
  } else {
    return <div className="Emotion">없습니다.</div>;
  }
};

Emotion.defaultProps = {
  emotionWord: "보통",
};

export default Emotion;
