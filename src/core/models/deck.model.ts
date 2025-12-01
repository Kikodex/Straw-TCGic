export interface Card {
  // Core identifiers
  id: string; // ejemplo: 'EB01-001' o Mongo _id
  code?: string;

  // New API fields
  rarity?: string; // 'L','R','C', etc.
  type?: string; // 'CHARACTER' | 'LEADER' | 'EVENT' | 'STAGE'
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

  // Backwards-compatibility with previous API fields
  // (mapear cuando sea necesario desde CardService)
  card_name?: string;
  card_text?: string;
  card_image?: string;
  card_image_id?: string;
  card_set_id?: string | number;
  inventory_price?: number;
  market_price?: number;
  date_scraped?: string;

  // Local only
  count?: number; // copias en la baraja
}

export interface Leader {
  name: string;
  imageUrl?: string;
  ability?: string;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  leader: Leader;
  cards: Card[]; // 50 cartas
}
