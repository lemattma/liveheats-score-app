export enum ScoreStatus {
  UPCOMING,
  LIVE,
  ENDED,
}

type Participant = {
  name: string;
};

export interface Score {
  id: string;
  title: string;
  status: ScoreStatus;
  participants?: Participant[];
}
