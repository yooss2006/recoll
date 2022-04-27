import React from "react";
import { emotionList } from "../util/emotionList";
import { EmotionProps } from "../util/type";

const Emotion = ({ emotionWord }: EmotionProps) => {
  const emotion = emotionList.find((item) => item.desc === emotionWord);

  if (emotion) {
    return (
      <div className="Emotion">
        <p className="blind">{emotion.desc}</p>
        {emotion.icon}
      </div>
    );
  } else {
    return <div className="Emotion">X</div>;
  }
};

Emotion.defaultProps = {
  emotionWord: "보통",
};

export default React.memo(Emotion);
