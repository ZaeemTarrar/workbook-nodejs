export type T_Profile = {
  id?: number
  firstname?: string
  lastname?: string
  age?: number
  snap?: string | any
}

export type C_T_Profile = {
  firstname?: string
  lastname?: string
  age?: number
  snap?: string | any
  userId: number
}
