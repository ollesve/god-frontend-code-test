import React from "react";
import { Flex, Text, Block, Spacer, Link } from 'vcc-ui';
import Image from 'next/image'

import { CarType } from "../../../types/car";

type CarCardPropsType = {
  carInfo: CarType
}

const CarCard = ({
  carInfo
}: CarCardPropsType) => {

  const { bodyType, modelType, modelName, imageUrl, id } = carInfo

  return (
    <Block
      extend={{
        scrollSnapAlign: "start",
        padding: "0 12px",
        onlyS: {
          minWidth: "calc(75% - 24px)"
        },
        onlyM: {
          minWidth: "calc(40% - 24px)"
        },
        fromL: {
          minWidth: "calc(25% - 24px)"
        }
      }}
    >
      <Text>{bodyType.toUpperCase()}</Text>
      <Flex extend={{
        alignItems: "center",
        textAlign: 'left',
        flexDirection: "row",
      }}>
        <Text subStyle="emphasis">{modelName}</Text>
        <Spacer />
        <Text subStyle="inline-link">{modelType}</Text>
      </Flex>
      <Flex
        extend={{
          position: "relative",
          width: "100%",
          padding: "0 0 75% 0"
        }}
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
