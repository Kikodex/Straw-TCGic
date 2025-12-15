export interface Card {
  id: string;
  code: string;
  rarity?: string;
  type?: string;
  name?: string;
  images: {
    small: string;
    large: string;
  };
  cost?: number | null;
  attribute?: {
    name?: string;
    image?: string | null;
  } | null;
  power?: number | null;
  counter?: string | number | null;
  color?: string | null;
  family?: string | null;
  ability?: string | null;
  trigger?: string | null;
  set?: { name?: string } | null;
  notes?: any[];
  card_name?: string;
  card_text?: string;
  card_image?: string;
  card_image_id?: string;
  card_set_id?: string | number;
  inventory_price?: number;
  market_price?: number;
  date_scraped?: string;
  count?: number | null;
}

export interface Leader extends Card {
  type: 'LEADER';
}

export interface Deck {
  id?: number;
  userId: string;
  leaderId: string;
  leaderImage: string;
  leaderName: string;
  deckName: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
