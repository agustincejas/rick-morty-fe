export interface RecordsInfo {
  count: number;
  pages: number;
  next: string,
  prev: string
}

export interface CharactersResponseInfo {
  info: RecordsInfo;
}