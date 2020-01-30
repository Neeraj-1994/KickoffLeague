export interface Bet {
  id: number;
  Name: string;
  email: string;
  CreditCard: {
    CardNumber: number;
    CVV: number;
    ExpDate: string;
  };
  Match: string;
  SelectedTeamName: string;
  FinalScore: string;
  BetAmount: string;
}
