import { ExtendCSS } from "vcc-ui"

export const cardCarouselContainer: ExtendCSS = {
  background: "white"
}

export const cardCarouselWrapper: ExtendCSS = {
  overflowX: "scroll",
  flexDirection: "row",
  WebkitOverflowScrolling: "touch",
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none"
  }
}

export const searchWrapper: ExtendCSS = {
  margin: "10px",
  width: "300px"
}