import React from "react";
import { Flex, IconButton, Spacer } from 'vcc-ui';

type CardTooglePropsType = {
  previousCardClick: () => void,
  nextCardClick: () => void,
  previousButtonDisabled: boolean,
  nextButtonDisabled: boolean,
}

export const CardToogle = ({ previousCardClick, nextCardClick, previousButtonDisabled, nextButtonDisabled }: CardTooglePropsType) => {
  return (
    <Flex
      extend={{
        flexDirection: "row",
        justifyContent: "right",
        padding: "10px",
      }}
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