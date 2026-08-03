export interface Item {
  id: number;
  reference: string;
  item_name: string;
  item_code: string;
  hsn_code: string;
  item_cost: number;       // internal/base cost
  walk_in_price: number;
  cloud_kitchen_price: number;
  tax_rate: number;
  unit: string;             // aliased from item_cost_narration
  item_description: string;
  category: string;
  item_image: string | null;
  track_inventory: boolean | number;
  is_batch_tracked: boolean | number;
  total_stock: number;
  created_at: string;
}

export interface ItemInput {
  item_name: string;
  hsn_code: string;
  item_cost: number;
  walk_in_price: number;
  cloud_kitchen_price: number;
  tax_rate: number;
  item_cost_narration: string; // unit
  item_description: string;
  category: string;
  item_image: string | null;
  track_inventory: 0 | 1;
  is_batch_tracked: 0 | 1;
}

export const UNIT_OPTIONS = ["Piece", "Plate", "Portion", "Glass", "Bowl", "KG", "Litre", "Pack"];
