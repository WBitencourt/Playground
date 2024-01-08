
export const credentials = {
  email: Cypress.env('CYPRESS_USER_EMAIL'),
  password: Cypress.env('CYPRESS_USER_PASSWORD'),
}

export const baseUrl = Cypress.env('CYPRESS_BASE_URL');