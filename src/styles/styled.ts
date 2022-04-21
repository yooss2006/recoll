import styled from "styled-components";

export const SlideWrapper = styled.article<{
  width: number;
  translateX: number;
}>`
  width: ${(props) => props.width * 100}%;
  &.slide1 {
    transform: translateX(-${(props) => props.translateX}%);
  }
  &.slide2 {
    transform: translateX(-${(props) => props.translateX * 2}%);
  }
  &.slide3 {
    transform: translateX(-${(props) => props.translateX * 3}%);
  }
  &.slide4 {
    transform: translateX(-${(props) => props.translateX * 4}%);
  }
`;
