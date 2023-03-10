import { StyleProvider, ThemePicker } from 'vcc-ui';
import React, { useEffect, useState } from "react";

import CardCarousel from "../src/components/CardCarousel";
import CarCard from "../src/components/CarCard";

import { CardCarouselChildrenType } from "../types/cardCarouselChildren";
import { CarType } from "../types/car";
import { useScreenSizeDetection } from "../src/helpers/screenSizeDetection";



const HomePage = () => {
  const [carInfoArray, setCarInfoArray] = useState<CarType[]>([])
  const screenSize = useScreenSizeDetection()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/cars.json")
      const data = await response.json()
      setCarInfoArray(data)
    }
    fetchData();
  }, [])


  const searchFunction = (children: CardCarouselChildrenType[], input: string) => {

    return children.filter((card) => {
      const carInfo = card.props.carInfo
      const inputLowerCase = input.toLowerCase()
      return (carInfo.modelName.toLowerCase().includes(inputLowerCase) ||
        carInfo.modelType.toLowerCase().includes(inputLowerCase) ||
        carInfo.bodyType.toLowerCase().includes(inputLowerCase))
    })
  }

  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <CardCarousel screenSize={screenSize} searchFunction={searchFunction}>
            {carInfoArray.map(carInfo => <CarCard key={`car-${carInfo.id}`} carInfo={carInfo} />)}
          </CardCarousel>
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default HomePage
