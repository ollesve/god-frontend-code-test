import React, { useState, useRef, useEffect } from "react";
import { Flex, TextInput, Block, useTheme } from 'vcc-ui';
import CardToogle from "./CardToogle";
import CarouselBullets from "./CarouselBullets";
import { DeviceType } from "../../../types/device";
import { CarType } from "../../../types/car";

type CarCardPropsType = {
  props: { carInfo: CarType }
}

type CardCarouselPropsType = {
  children: JSX.Element[],
  device: DeviceType
  searchFunction?: (children: CarCardPropsType[], input: string) => CarCardPropsType[]
}

export const CardCarousel = ({ children, device, searchFunction }: CardCarouselPropsType) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState<boolean>(false)
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const elementsInCarousel = device === "desktop" ? 4 : (device === "mobile" ? 1 : 2) //TODO: ändra namn till S, M, L
  const [searchInput, setSearchInput] = useState('');
  const [filteredChildren, setFilteredChildren] = useState<CarCardPropsType[]>(children);


  useEffect(() => {
    setFilteredChildren(children)
  }, [children])


  useEffect(() => {
    setTimeout(() => {
      setPreviousButtonDisabled(filteredChildren.length <= elementsInCarousel || currentIdx === 0)
      setNextButtonDisabled(filteredChildren.length <= elementsInCarousel || currentIdx === filteredChildren.length - elementsInCarousel)
    }, 200)
  }, [currentIdx, elementsInCarousel, filteredChildren])


  const nextCard = () => {
    scrollToCard(currentIdx + elementsInCarousel)
  }

  const previousCard = () => {
    scrollToCard(currentIdx - 1)
  }

  const scrollToCard = (index: number) => {
    carouselRef.current?.children[index]?.scrollIntoView({ behavior: "smooth", inline: "nearest" })
  }

  const handleScroll = (event: React.UIEvent): void => {
    const element = event.currentTarget;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;
    const nextIdx = Math.round((filteredChildren.length - elementsInCarousel) * (windowScroll / totalWidth))

    if (!isNaN(nextIdx)) setCurrentIdx(nextIdx)
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!searchFunction) return //TODO: Check this
    const input = e.target.value
    setSearchInput(input);

    setFilteredChildren(searchFunction(children, input))
  }



  return (
    <Flex
      extend={{
        background: "white",
      }}
    >
      {searchFunction &&
        <Block extend={{
          margin: "10px",
          width: "300px"
        }}
        >
          <TextInput
            value={searchInput}
            label="Search"
            onChange={search}
          />
        </Block>}
      <Flex
        extend={{
          height: "355px",
          overflowX: "scroll",
          flexDirection: "row",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none"
          }
        }}
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {filteredChildren}
      </Flex>
      {device === "desktop"
        ?
        <CardToogle
          previousCardClick={previousCard}
          nextCardClick={nextCard}
          previousButtonDisabled={previousButtonDisabled}
          nextButtonDisabled={nextButtonDisabled}
        />
        :
        <CarouselBullets
          currentIdx={currentIdx}
          totalElementsInCarousel={filteredChildren.length - elementsInCarousel + 1}
        />
      }
    </Flex>
  );
};

export default CardCarousel