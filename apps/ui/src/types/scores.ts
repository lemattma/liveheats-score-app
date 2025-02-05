export enum ScoreStatus {
  UPCOMING,
  LIVE,
  ENDED,
}

export type Participant = {
  name: string;
  standing?: number;
};

export interface Score {
  id: string;
  title: string;
  status: ScoreStatus;
  participants: Participant[];
}
