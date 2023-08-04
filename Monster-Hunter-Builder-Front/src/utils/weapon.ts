/* eslint-disable import/prefer-default-export */

// maximum sharpness on weapon is 400
// Here we calculate the width purcent to fit the container's width
export function setSharpnessWidth(value: number) {
  const width = (value / 400) * 100;
  return width;
}
