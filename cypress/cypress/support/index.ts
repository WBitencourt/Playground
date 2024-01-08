/// <reference types="cypress" />

import './commands';
import { credentials } from '../env';

const email = credentials.email;
const password = credentials.password;

beforeEach(() => {
  cy.useSession({ email, password });
});

after(() => {
  cy.destroySession();
});
