interface config_stock {
  id: string,
  model: string,
  fabric: string
}

export interface dataConfigType {
  models: string[],
  fabrics: string [],
  stock: config_stock[],
  pricePerModel: Record<string, number>
}