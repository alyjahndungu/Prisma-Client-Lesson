import { Token } from "@prisma/client";
import { Payload } from "@prisma/client/runtime";

const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  signAccessToken(payload: Payload) {
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret, {}, (err: any, token: Token) => {
        if (err) {
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken(token: Token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err: any, payload: Payload) => {
        if (err) {
          const message =
            err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
          return reject(createError.Unauthorized(message));
        }
        resolve(payload);
      });
    });
  },
};
