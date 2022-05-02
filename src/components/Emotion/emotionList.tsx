import { AiOutlineSmile } from "react-icons/ai";
import { CgSmileNeutral, CgSmileSad } from "react-icons/cg";
import { EmotionListType } from "../../util/type";

export const EmotionList: EmotionListType[] = [
  {
    emotion_id: 1,
    desc: "좋음",
    icon: <AiOutlineSmile />,
  },
  {
    emotion_id: 2,
    desc: "보통",
    icon: <CgSmileNeutral />,
  },
  {
    emotion_id: 3,
    desc: "나쁨",
    icon: <CgSmileSad />,
  },
];
