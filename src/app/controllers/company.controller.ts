import type Router from "@koa/router";
import Container from "typedi";
import { CompaniesServices } from "~app/services/companies.services";

type CompanyControllerType = {
  create: Router.Middleware;
  getAllFromUser: Router.Middleware;
  associateToUser: Router.Middleware;
  findOne: Router.Middleware;
};

export const companyController: CompanyControllerType = {
  associateToUser: async (ctx) => {
    const data = ctx.request.body;

    const companyService = Container.get(CompaniesServices);

    await companyService.associateToUser(ctx.state.userId, data.identifier);

    ctx.status = 201;
    ctx.body = "";
  },
  create: async (ctx) => {
    const data = ctx.request.body;

    const companiesService = Container.get(CompaniesServices);

    const company = await companiesService.create({
      ...data,
      userId: ctx.state.userId,
    });

    ctx.body = company;
  },
  findOne: async (ctx) => {
    const identifier = ctx.params.identifier as string;

    const companiesService = Container.get(CompaniesServices);

    const company = await companiesService.findOne(identifier);

    ctx.body = company;
  },
  getAllFromUser: async (ctx) => {
    const companiesService = Container.get(CompaniesServices);

    const companies = await companiesService.getAllFromUser(ctx.state.userId);

    ctx.body = companies;
    ctx.status = 200;
  },
};
