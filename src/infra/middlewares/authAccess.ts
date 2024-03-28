import type { Middleware } from "koa";
import { verifyAccessToken } from "../../utils/verifyAccessToken";

export const authAccessMiddleware: Middleware = async (ctx, next) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    ctx.throw(401, "Nenhuma autenticação foi fornecida");
  }

  const token = authorization?.split(" ")[1];

  !token && ctx.throw(401);

  try {
    const decoded = await verifyAccessToken(token as string);
    ctx.state.userId = typeof decoded === "string" ? decoded : decoded?.sub;

    return next();
  } catch (err) {
    ctx.throw(401, "Token Inválido");
  }
};
