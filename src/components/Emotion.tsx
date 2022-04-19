import { AiOutlineSmile } from "react-icons/ai";
import { CgSmileNeutral, CgSmileSad } from "react-icons/cg";
type EmotionProps = {
  emotionNumber: number;
};

const emotionList = [
  {
    emotion_id: 1,
    desc: "기분 좋음",
    icon: <AiOutlineSmile />,
  },
  {
    emotion_id: 2,
    desc: "기분 보통",
    icon: <CgSmileNeutral />,
  },
  {
    emotion_id: 3,
    desc: "기분 나쁨",
    icon: <CgSmileSad />,
  },
];

const Emotion = ({ emotionNumber }: EmotionProps) => {
  const emotion = emotionList.find((it) => it.emotion_id === emotionNumber);
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
  emotionNumber: 2,
};

export default Emotion;
