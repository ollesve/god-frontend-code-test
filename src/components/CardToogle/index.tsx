import React from "react";
import { Flex, IconButton, Spacer } from 'vcc-ui';
import { cardToogleContainer } from "./CardToogle.styles";

type CardTooglePropsType = {
  previousCardClick: () => void,
  nextCardClick: () => void,
  previousButtonDisabled: boolean,
  nextButtonDisabled: boolean,
}

export const CardToogle = ({ previousCardClick, nextCardClick, previousButtonDisabled, nextButtonDisabled }: CardTooglePropsType) => {
  return (
    <Flex
      extend={cardToogleContainer}
    >
      <IconButton
        aria-label="Previous image"
        iconName="navigation-chevronback"
        onClick={previousCardClick}
        disabled={previousButtonDisabled}
        variant="outline"
      />
      <Spacer />
      <IconButton
        aria-label="Next image"
        iconName="navigation-chevronforward"
        onClick={nextCardClick}
        disabled={nextButtonDisabled}
        variant="outline"
      />
    </Flex>
  );
};

export default CardToogle