export interface pointsI {
  [index: string]: any,
  "X": number,
  "O": number
}

export interface highlighterI {
  array: any[],
  letter: string
}

export interface handleSequenceI {
  target?: number | undefined
}

export interface eachBoxI {
  id: number,
  value: string
}

export interface initialStateI {
  allowBgSound: boolean,
  BgSoundValue: number,
  allowFXSound: boolean,
  FXSoundValue: number
}

export interface playSoundI {
  file?: any,
  pitch?: number,
  cV?: number,
  loop?: boolean,
}

export interface loadAllSoundsI {
  file?: any,
  mV?: any
}