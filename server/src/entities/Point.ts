import { uuid } from 'uuidv4'
import { Item } from './Item'
class Point {
  id?: string;
  name: string;
  email: string;
  description: string;
  whatsapp: string;
  fone: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  address: string;
  district: string;
  number: number;
  image: string;
  cep: string;
  itens: Item[];

  private constructor (props: Omit<Point, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    } else {
      this.id = id
    }

    return this
  }

  static create ({ name, email, description, whatsapp, fone, latitude, longitude, city, uf, address, district, number, cep, image, itens }: Point) {
    const point = new Point({ name: name.trim(), email, description: description.trim(), whatsapp, fone, latitude, longitude, city, uf, address: address.trim(), district: district.trim(), number, cep, image, itens })
    return point
  }
}

export { Point }
