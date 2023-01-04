import React, { useState, useRef, useEffect } from "react";
import { Flex, TextInput, Block, useTheme, ExtendCSS } from 'vcc-ui';

import CardToogle from "../CardToogle";
import CarouselBullets from "../CarouselBullets";
import { CardCarouselChildrenType } from "../../../types/cardCarouselChildren";
import { ScreenSizeType } from "../../../types/screenSize";
import { cardCarouselContainer, cardCarouselWrapper, searchWrapper } from "./CardCarousel.styles";


type CardCarouselPropsType = {
  children: JSX.Element[],
  screenSize: ScreenSizeType
  searchFunction?: (children: CardCarouselChildrenType[], input: string) => CardCarouselChildrenType[]
}

const getElementsInCarousel = (screenSize: ScreenSizeType) => {
  switch (screenSize) {
    case "S":
      return 1
    case "M":
      return 2
    default:
      return 4
  }
}


const CardCarousel = ({ children, screenSize, searchFunction }: CardCarouselPropsType) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState<boolean>(false)
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState('');
  const [filteredChildren, setFilteredChildren] = useState<CardCarouselChildrenType[]>(children);

  const carouselRef = useRef<HTMLDivElement>(null)
  const elementsInCarousel = getElementsInCarousel(screenSize)


  useEffect(() => {
    setFilteredChildren(children)
  }, [children])

  useEffect(() => {
    setTimeout(() => {
      setPreviousButtonDisabled(filteredChildren.length <= elementsInCarousel || currentIdx === 0)
      setNextButtonDisabled(filteredChildren.length <= elementsInCarousel || currentIdx === filteredChildren.length - elementsInCarousel)
    }, 200)
  }, [currentIdx, elementsInCarousel, filteredChildren])


  const nextCard = () => scrollToCard(currentIdx + elementsInCarousel)

  const previousCard = () => scrollToCard(currentIdx - 1)

  const scrollToCard = (index: number) => carouselRef.current?.children[index]?.scrollIntoView({ behavior: "smooth", inline: "nearest" })

  const handleScroll = (event: React.UIEvent) => {
    const element = event.currentTarget;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;
    const nextIdx = Math.round((filteredChildren.length - elementsInCarousel) * (windowScroll / totalWidth))

    if (!isNaN(nextIdx)) setCurrentIdx(nextIdx)
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof searchFunction !== "function") return
    const input = e.target.value
    setSearchInput(input);

    setFilteredChildren(searchFunction(children, input))
  }

  return (
    <Flex
      extend={cardCarouselContainer}
    >
      {
        searchFunction ?
          <Block extend={searchWrapper}
          >
            <TextInput
              value={searchInput}
              label="Search"
              onChange={search}
            />
          </Block>
          :
          null
      }
      <Flex
        extend={cardCarouselWrapper}
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {filteredChildren}
      </Flex>
      {screenSize === "L" || screenSize === "XL"
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