export enum DetailInfoType {
  white = "whitelist",
  public = "public",
  info = "info",
}

export enum ProjectType {
  FT = "1",
  NFT = "2",
}
export enum InfoType{
  white = 1,
  public = 2
}
export enum BuyState {
  White_Ended = "White_Ended",
  White_NotStarted = "White_NotStarted",
  White_InProgress = "White_InProgress",
  Public_Ended = "Public_Ended",
  Public_NotStarted = "Public_NotStarted",
  Public_InProgress = "Public_InProgress",
}

export enum OrderState{
  PENDING="pending",
  DISTRIBUTE="distribute",
  COMPLETED="completed",
  UNISATVERFY="unisatVerify",
  FAIL="fail",
  FAILED="failed"
}