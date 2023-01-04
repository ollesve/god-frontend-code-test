import { ExtendCSS } from "vcc-ui"


export const carCardContainer: ExtendCSS = {
  scrollSnapAlign: "start",
  padding: "0 12px",
  onlyS: {
    minWidth: "calc(75% - 24px)"
  },
  onlyM: {
    minWidth: "calc(40% - 24px)"
  },
  fromL: {
    minWidth: "calc(25% - 24px)"
  }
}

export const textContainer: ExtendCSS = {
  flexDirection: "row",
  alignItems: "center",
  textAlign: 'left'
}

export const imageWrapper: ExtendCSS = {
  position: "relative",
  width: "100%",
  padding: "0 0 75% 0"
}
