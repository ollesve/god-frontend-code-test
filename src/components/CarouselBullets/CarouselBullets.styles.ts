import { ExtendCSS } from "vcc-ui"

export const carouselBulletsContainer: ExtendCSS = {
  flexDirection: "row",
  justifyContent: "center",
  margin: "10px",
  height: "18px",
}

export const bulletStyle: ExtendCSS = {
  margin: "5px",
  height: "8px",
  width: "8px",
  borderRadius: "100%",
  background: "black",
  transition: 'opacity 0.2s linear 0.2s',
}