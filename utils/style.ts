export const getHeaderHeight = (): number => {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--header-height"
    )
  );
};

export const setCursor = (direction: string | null) => {
  switch (direction) {
    case "top":
    case "bottom":
      document.body.style.cursor = "ns-resize";
      break;
    case "right":
    case "left":
      document.body.style.cursor = "ew-resize";
      break;
    case "top-right":
    case "bottom-left":
      document.body.style.cursor = "nesw-resize";
      break;
    case "bottom-right":
    case "top-left":
      document.body.style.cursor = "nwse-resize";
      break;
    default:
      document.body.style.cursor = "default";
      break;
  }
};
