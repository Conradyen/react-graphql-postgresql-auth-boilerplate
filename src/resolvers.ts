import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as bcrypt from "bcryptjs";
// import { sign } from "jsonwebtoken";

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      return User.findOne(req.session.userId);
    },
  },
  Mutation: {
    register: async (_, { firstName, lastName, email, password }) => {
      const check = await User.findOne({ where: { email } });
      if (check) return false;
      const hashPassword = await bcrypt.hash(password, 10);
      User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      }).save();
      return true;
    },
    login: async (_, { email, password }, { req }) => {
      //   console.log(req);
      const user = await User.findOne({ where: { email } });
      if (!user) return null;
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;
      req.session.userId = user.id;
      return user;
    },
  },
};
