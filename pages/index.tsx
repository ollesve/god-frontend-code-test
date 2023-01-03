import { CardCarousel } from "../src/components/CardCarousel";
import { StyleProvider, ThemePicker } from 'vcc-ui';
import React, { useEffect, useState } from "react";
import { CarType } from "../types/car";
import { CarCard } from "../src/components/CarCard";
import { useScreenSizeDetection } from "../src/helpers/screenSizeDetection";
import { CardCarouselChildrenType } from "../types/cardCarouselChildren";


export default function HomePage() {
  const [carInfoArray, setCarInfoArray] = useState<CarType[]>([])
  const screenSize = useScreenSizeDetection() //TODO: Använd S, L, M

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/cars.json")
      const data = await response.json()
      setCarInfoArray(data)
    }
    fetchData();
  }, [])


  function searchFunction(children: CardCarouselChildrenType[], input: string) {
    return children.filter((card) => {
      return card.props.carInfo.modelName.toLowerCase().includes(input.toLowerCase())
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
