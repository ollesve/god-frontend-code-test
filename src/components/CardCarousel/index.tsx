import React, { useState, useRef, useEffect } from "react";
import { Flex, TextInput, Block } from 'vcc-ui';
import CardToogle from "./CardToogle";
import CarouselBullets from "./CarouselBullets";
import { ScreenSizeType } from "../../../types/screenSize";
import { CardCarouselChildrenType } from "../../../types/cardCarouselChildren";


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


export const CardCarousel = ({ children, screenSize, searchFunction }: CardCarouselPropsType) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState<boolean>(false)
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const elementsInCarousel = getElementsInCarousel(screenSize)

  const [searchInput, setSearchInput] = useState('');
  const [filteredChildren, setFilteredChildren] = useState<CardCarouselChildrenType[]>(children);


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

  const handleScroll = (event: React.UIEvent) => {
    const element = event.currentTarget;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;
    const nextIdx = Math.round((filteredChildren.length - elementsInCarousel) * (windowScroll / totalWidth))

    if (!isNaN(nextIdx)) setCurrentIdx(nextIdx)
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!searchFunction) return
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
      {
        searchFunction ?
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
          </Block>
          :
          null
      }
      <Flex
        extend={{
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