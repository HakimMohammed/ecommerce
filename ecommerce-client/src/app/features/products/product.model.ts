export interface ProductModel {
  id: string,
  name: string,
  price: number,
  quantity: number,
}

export interface ProductUpdateModel {
  name: string,
  price: number,
  quantity: number,
}
