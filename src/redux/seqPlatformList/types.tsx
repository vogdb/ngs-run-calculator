export interface SeqPlatformReadParams {
  [key: string]: string
}

export interface SeqPlatformModes {
  [key: string]: SeqPlatformReadParams
}

export interface SeqPlatform {
  name: string;
  modes: SeqPlatformModes;
}

export type SeqPlatformList = SeqPlatform[];
