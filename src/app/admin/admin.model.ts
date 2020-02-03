export interface Team {
    id: number;
    Name: string;
    Manager: string;
    Coach: string;
    Players:
      {
        Name: string;
        tNumber: number;
        Role: string;
      };
}
