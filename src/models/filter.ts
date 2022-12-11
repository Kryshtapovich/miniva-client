export interface CarFilter {
  manufacturer?: number;
  model?: string;
  hp_lt?: number;
  hp_gt?: number;
  price_lt?: number;
  price_gt?: number;
  engine_volume_lt?: number;
  engine_volume_gt?: number;
}
