import React from "react";

import { Flex } from 'vcc-ui';
import { carouselBulletsContainer, bulletStyle } from "./CarouselBullets.styles";

type CarouselBulletsPropsType = {
  currentIdx: number,
  totalElementsInCarousel: number
}

export const CarouselBullets = ({ currentIdx, totalElementsInCarousel }: CarouselBulletsPropsType) => {
  let bullets = getBullets(totalElementsInCarousel, currentIdx)

  return (
    <Flex extend={carouselBulletsContainer}>
      {bullets}
    </Flex>
  );
};

const getBullets = (totalElementsInCarousel: number, currentIdx: number) => {
  let items: JSX.Element[] = [];

  for (let i = 0; i < totalElementsInCarousel; i++) {
    items.push(<Flex
      key={i}
      extend={{
        ...bulletStyle,
        opacity: currentIdx === i ? "1" : "0.2",
      }}>
    </Flex>);
  }
  return <>{items}</>;
}

export default CarouselBullets