export const AUTH_HEADER_PREFIX = 'Bearer '
export const ROOT_API_URL = process.env.ROOT_API

export const AUTH_STATUS = {
  NOT_LOGGED_IN: 1,
  LOADING: 2,
  LOGGED_ID: 3,
  ERROR: 4
}

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  OK: 200,
  INTERNAL_SERVER_ERROR: 500
}

export const ROLE_TYPES = {
  CLIENT: 1,
  SHOPKEEPER: 2
}
