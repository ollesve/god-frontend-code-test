import { CardCarousel } from "../src/components/CardCarousel";
import { StyleProvider, ThemePicker } from 'vcc-ui';
import React, { useEffect, useState } from "react";
import { CarType } from "../types/car";
import { CarCard } from "../src/components/CarCard";
import { useDeviceDetection } from "../src/helpers/deviceDetection";

type CarCardPropsType = {
  props: { carInfo: CarType }
}

export default function HomePage() {
  const [carInfoArray, setCarInfoArray] = useState<CarType[]>([])
  const device = useDeviceDetection() //TODO: Använd S, L, M

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/cars.json")
      const data = await response.json()
      setCarInfoArray(data)
    }
    fetchData();
  }, [])


  function searchFunction(children: CarCardPropsType[], input: string) { //TODO: Bättre typ?

    return children.filter((card) => {
      return card.props.carInfo.modelName.toLowerCase().includes(input.toLowerCase())
    })
  }

  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <CardCarousel device={device} searchFunction={searchFunction}>
            {carInfoArray.map(carInfo => <CarCard key={`car-${carInfo.id}`} carInfo={carInfo} />)}
          </CardCarousel>
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}
