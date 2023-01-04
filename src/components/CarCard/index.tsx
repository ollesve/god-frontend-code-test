import React from "react";
import { Flex, Text, Block, Spacer, Link } from 'vcc-ui';
import Image from 'next/image'

import { CarType } from "../../../types/car";
import { carCardContainer, imageWrapper, textContainer } from "./CarCard.styles";

type CarCardPropsType = {
  carInfo: CarType
}

const CarCard = ({
  carInfo
}: CarCardPropsType) => {

  const { bodyType, modelType, modelName, imageUrl, id } = carInfo

  return (
    <Block
      extend={carCardContainer}
    >
      <Text>{bodyType.toUpperCase()}</Text>
      <Flex extend={textContainer}>
        <Text subStyle="emphasis">{modelName}</Text>
        <Spacer />
        <Text subStyle="inline-link">{modelType}</Text>
      </Flex>
      <Flex
        extend={imageWrapper}
      >
        <Image src={`${imageUrl}`} alt={`Volvo car ${bodyType} of model ${modelName} which is a ${modelType}`} layout='fill' objectFit='contain' />
      </Flex>
      <Flex
        extend={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/learn/${id}`}
          arrow="right"
        >
          Learn
        </Link>
        <Spacer size={5} />
        <Link
          href={`/shop/${id}`}
          arrow="right"
        >
          Shop
        </Link>
      </Flex>
    </Block >
  );
};

export default CarCard
