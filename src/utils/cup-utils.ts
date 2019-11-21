import { TARGET_GRAMS } from '../components/Score/Score'
const PERFECT_CUP_FULLNESS = 0.9

export const cupFullness = (weight: number) => {
  return Math.min(1, (weight / TARGET_GRAMS) * PERFECT_CUP_FULLNESS)
}
