export interface Home {
  id: number;
  MatchName: string;
  Team1Name: string;
  Team1Manager: string;
  Team1Coach: string;
  Team1Players: [
      {
        Name: string;
        tNumber: number;
        role: string;
      }
    ];
  Team2Name: string;
  Team2Manager: string;
  Team2Coach: string;
  Team2Players: [
      {
        Name: string;
        tNumber: number;
        role: string;
      }
    ];
  Referee: string;
  Linesman1: string;
  Linesman2: string;
  Stadium: string;
  Date: string;
  Time: string;
  TicketCost: string;
}
