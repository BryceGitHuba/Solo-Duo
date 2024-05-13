
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type SavingsPlan {
    _id: ID!
    user: User!
    amount: Float!
    schedule: String!
    nextWithdrawal: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getSavingsPlans: [SavingsPlan]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    setupSavingsPlan(userId: ID!, amount: Float!): SavingsPlan
  }
`;

module.exports = typeDefs;