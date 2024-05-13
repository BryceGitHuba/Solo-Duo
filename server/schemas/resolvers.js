const { User, SavingsPlan } = require('../models');
const { signToken, AuthticationError } = require('../middleware/auth')

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        console.error('Error in getUser query:', error.message);
        return null;
      }
    },
    getUsers: async () => {
      try {
        return await User.find();
      } catch (error) {
        console.error('Error in getUsers query:', error.message);
        return [];
      }
    },
    getSavingsPlans: async () => {
      try {
        return await SavingsPlan.find().populate('user');
      } catch (error) {
        console.error('Error in getSavingsPlans query:', error.message);
        return [];
      }
    }
  },
  Mutation: {
    registerUser: async (_, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return {token, user}
    //   try {
    //     const existingUser = await User.findOne({ email });
    //     if (existingUser) {
    //       throw new Error('User with this email already exists');
    //     }

    //     const newUser = new User({ username, email, password });
    //     await newUser.save();

    //     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    //     return { token, user: newUser };
    //   } catch (error) {
    //     console.error('Error in registerUser mutation:', error.message);
    //     throw new Error('User registration failed');
    //   }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
          throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return { token, user };
      } catch (error) {
        console.error('Error in login mutation:', error.message);
        throw new Error('Login failed');
      }
    },
    setupSavingsPlan: async (_, { userId, amount }) => {
      try {
        const savingsPlan = new SavingsPlan({
          user: userId,
          amount: amount || 5, // Default $5 if not specified
          schedule: 'weekly',
        });
        return await savingsPlan.save();
      } catch (error) {
        console.error('Error in setupSavingsPlan mutation:', error.message);
        throw new Error('Savings Plan setup failed');
      }
    }
  }
};

module.exports = resolvers;