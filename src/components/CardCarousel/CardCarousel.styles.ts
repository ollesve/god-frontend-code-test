import { ExtendCSS, CurrentTheme } from "vcc-ui"

export const cardCarouselContainer = ({ theme }: { theme: CurrentTheme }) => (
  {
    background: theme.color.background.primary,
  }
)

export const cardCarouselWrapper: ExtendCSS = {
  height: "350px",
  overflowX: "scroll",
  flexDirection: "row",
  WebkitOverflowScrolling: "touch",
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  alignItems: "center",
  "::-webkit-scrollbar": {
    display: "none"
  }
}

export const searchWrapper: ExtendCSS = {
  margin: "10px",
  width: "300px",
  heigh: "60px"
}