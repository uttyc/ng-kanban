export interface List {
  id: string;
  description: string;
  dateCreated: string;
  dateUpdated: string;
  cards: List[];
}
