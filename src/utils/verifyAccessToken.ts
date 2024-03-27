import jwt from "jsonwebtoken";

export const verifyAccessToken = async (token: string) => {
  return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET ?? "", (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};
