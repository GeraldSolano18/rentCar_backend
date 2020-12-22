import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkRolesExisted = async (req, res, next) => {
  // roles= "admin" here is 1 user a many roles
  const { roles } = req.body;

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return res.status(400).json({ message: `Role ${roles[i]} does not exists` });
      }
    }
  }

  next();
};

export const checkDuplicates = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).json({ message: "The user already exists" });

  const email = await User.findOne({ email: req.body.email });

  if (email)
    return res.status(400).json({ message: "the email already exists" });

  next();
};
