export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CLIENT = 'CLIENT',
}

export const RoleKeys = Object.keys(Role).filter((item) => {
  return isNaN(Number(item))
})

export const RoleValues = Object.keys(Role).filter((item) => {
  return !isNaN(Number(item))
})
