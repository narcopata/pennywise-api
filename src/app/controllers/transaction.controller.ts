import type Router from "@koa/router";
import Container from "typedi";
import { TransactionsServices } from "~app/services/transactions.services";

type TransactionControllerType = {
  create: Router.Middleware;
  getAllFromCompany: Router.Middleware;
  update: Router.Middleware;
  delete: Router.Middleware;
};

export const transactionController: TransactionControllerType = {
  create: async (ctx) => {
    const data = ctx.request.body;

    const transactionsServices = Container.get(TransactionsServices);

    const transaction = await transactionsServices.create(data);

    ctx.body = transaction;
  },
  delete: async (ctx) => {
    const transactionId = ctx.params.transactionId as string;

    const transactionsServices = Container.get(TransactionsServices);

    await transactionsServices.delete(transactionId);

    ctx.status = 204;
    ctx.body = '';
  },
  getAllFromCompany: async (ctx) => {
    const companyId = ctx.params.companyId as string;
    
    const transactionsServices = Container.get(TransactionsServices);

    const transactions = await transactionsServices.getAllFromCompany(companyId);

    ctx.body = transactions;
  },
  update: async (ctx) => {
    const data = ctx.request.body;

    const transactionsServices = Container.get(TransactionsServices);

    const updatedTransaction = await transactionsServices.update(data);

    ctx.body = updatedTransaction;
  }
};
