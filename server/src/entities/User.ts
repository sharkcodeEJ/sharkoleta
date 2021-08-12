import { uuid } from 'uuidv4'
class User {
  id?: string;
  name: string;
  email: string;

  private constructor (props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    } else {
      this.id = id
    }

    return this
  }

  static create ({ name, email }: User) {
    const user = new User({ name, email })
    return user
  }
}

export { User }
