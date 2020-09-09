export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export enum ItemType {
  Vape = 'Вейп',
  Fluid = 'Жидкость'
}

export interface Item {
  name: string
  description: string
  url: string

  type: ItemType
  features: Features

  cost: number
  amount: number

  date: Date
  id?: string
}
export type Features = {[key: string]: string}


export interface FbAuthResponse {
  expiresIn: string
  idToken: string
}

export interface FbCreateResponse {
  item: Item
  id: string
}


// ----> alert interfaces
export type AlertType = 'warning' | 'danger' | 'success'

export interface Alert {
  type: AlertType
  text: string
}

// ----> basket interfaces
export interface BasketItem {
  id: string
  amount: number
  item?: Item
}

// ----> orders service
export interface Order {
  items: BasketItem[]
  email: string
  phone: string
}
