import React from "react";
import { Flex, Text, CardContent, Spacer, Link } from 'vcc-ui';
import Image from 'next/image'
import { CarType } from "../../../types/car";

type CarCardPropsType = {
  carInfo: CarType
}

export const CarCard = ({
  carInfo
}: CarCardPropsType) => {

  const { bodyType, modelType, modelName, imageUrl, id } = carInfo

  return (
    <Flex
      extend={{
        scrollSnapAlign: "start",
        padding: "0 5px",
        onlyS: {
          minWidth: "calc(75% - 10px)"
        },
        onlyM: {
          minWidth: "calc(40% - 10px)"
        },
        fromL: {
          minWidth: "calc(25% - 10px)"
        }
      }}
    >
      <CardContent>
        <Text>{bodyType}</Text>
        <Flex extend={{
          alignItems: "center",
          textAlign: 'left',
          flexDirection: "row",
          height: "32px"
        }}>
          <Text subStyle="emphasis">{modelName}</Text>
          <Spacer />
          <Text subStyle="inline-link">{modelType}</Text>
        </Flex>

      </CardContent>
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
    </Flex >
  );
};
