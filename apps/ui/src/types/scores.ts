export enum ScoreStatus {
  UPCOMING,
  LIVE,
  ENDED,
}

export interface Score {
  id: string;
  title: string;
  date: Date;
  status: ScoreStatus;
}
