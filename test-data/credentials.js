/**
 * @fileoverview Test credentials for Saucedemo E2E testing
 * @module test-data/credentials
 */

/**
 * Test user credentials configuration
 * Used across login, inventory, cart, and checkout tests
 * @constant
 */
module.exports = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  invalidCredentials: {
    username: 'standard_user',
    password: 'incorrect_password'
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce'
  },
  emptyPassword: {
    username: 'standard_user',
    password: ''
  },
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  performanceGlitchUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  }
};
