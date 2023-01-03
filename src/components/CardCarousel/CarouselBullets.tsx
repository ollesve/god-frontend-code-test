import React from "react";
import { Flex } from 'vcc-ui';

type CarouselBulletsPropsType = {
  currentIdx: number,
  totalElementsInCarousel: number
}

export const CarouselBullets = ({ currentIdx, totalElementsInCarousel }: CarouselBulletsPropsType) => {
  let bullets = getBullets(totalElementsInCarousel, currentIdx)

  return (
    <Flex extend={{
      flexDirection: "row",
      justifyContent: "center",
      margin: "10px"
    }}>
      {bullets}
    </Flex>
  );
};

const getBullets = (totalElementsInCarousel: number, currentIdx: number) => {
  let items = [];

  for (let i = 0; i < totalElementsInCarousel; i++) {
    items.push(<Flex
      key={i}
      extend={{
        margin: "5px",
        height: "8px",
        width: "8px",
        borderRadius: "100%",
        background: "black",
        transition: 'opacity 0.2s linear 0.2s',
        opacity: currentIdx === i ? "1" : "0.2",
      }}>
    </Flex>);
  }
  return <>{items}</>;
}

export default CarouselBullets