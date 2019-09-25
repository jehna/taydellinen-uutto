import { round } from "./utils/math-utils"

let weight: number = 0

export const setWeight = (newWeight: number) => {
  weight = round(newWeight, 1)
}

export const getWeight = () => weight