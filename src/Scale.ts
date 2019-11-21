export interface Scale {
  onWeightChange: (weight: number) => void
  startListeningChanges: () => void
}
