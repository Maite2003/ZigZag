interface ConfigStock {
  id: string,
  model: string,
  fabric: string
}

export interface DataConfigType {
  models: string[],
  fabrics: string [],
  stock: ConfigStock[],
  pricePerModel: Record<string, number>
}