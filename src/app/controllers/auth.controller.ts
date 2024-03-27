import type Router from "@koa/router";
import Container from "typedi";
import { AuthService } from "~app/services/auth.services";

type AuthControllerType = {
  signup: Router.Middleware;
  signin: Router.Middleware;
};

export const authController: AuthControllerType = {
  signup: async (ctx) => {
    const signUpData = ctx.request.body;

    const authService = Container.get(AuthService);

    const tokenPayload = await authService.signup(signUpData);

    ctx.body = tokenPayload;
  },
  signin: async (ctx) => {
    const signInData = ctx.request.body;

    const authService = Container.get(AuthService);

    const tokenPayload = await authService.signin(signInData);

    ctx.body = tokenPayload;
  },
};
