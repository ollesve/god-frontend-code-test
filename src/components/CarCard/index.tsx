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
        <Text>{carInfo.bodyType}</Text>
        <Flex extend={{
          alignItems: "center",
          textAlign: 'left',
          flexDirection: "row",
          height: "32px"
        }}>
          <Text subStyle="emphasis">{carInfo.modelName}</Text>
          <Spacer />
          <Text subStyle="inline-link">{carInfo.modelType}</Text>
        </Flex>

      </CardContent>
      <Flex
        extend={{
          flexDirection: "row",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Image src={`${carInfo.imageUrl}`} alt={`Image of volvo car of model ${carInfo.modelName}`} priority layout='fill' objectFit='contain' />
      </Flex>
      <Flex
        extend={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/learn/${carInfo.id}`}
          arrow="right"
        >
          Learn
        </Link>
        <Spacer size={5} />
        <Link
          href={`/shop/${carInfo.id}`}
          arrow="right"
        >
          Shop
        </Link>
      </Flex>
    </Flex >
  );
};
