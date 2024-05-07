import 'knex'

declare module 'knex/types/tables' {
  interface Users {
    id: string
    session_id?: string
    name: string
    email: string
    created_at: string
    updated_at: string
  }

  interface Meals {
    id: string
    user_id: string
    name: string
    description: string
    date_time: string
    is_on_diet: boolean
    created_at: string
    updated_at: string
  }

  export interface Tables {
    users: Users
  }
}
