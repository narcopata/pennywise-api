import { Service } from "typedi";
import { CompaniesRepository } from "../../database/repositories/companies.repositories";
import { Company } from "../../database/entities/companies.entity";

type CreateDto = {
  name: string;
  currentBalance: number;
  identifier: string;
  userId: string;
};

@Service()
export class CompaniesServices {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  public async create(data: CreateDto): Promise<Company> {
    const companyWithIdentifier = await this.companiesRepository.findOne(
      data.identifier,
    );

    if (companyWithIdentifier) {
      throw new Error("");
    }

    const company = await this.companiesRepository.create(data);

    return company;
  }

  public async getAllFromUser(userId: string): Promise<Company[]> {
    const companies = await this.companiesRepository.findAllFromUser(userId);

    return companies;
  }

  public async associateToUser(
    userId: string,
    identifier: string,
  ): Promise<void> {
    await this.companiesRepository.associateUser(userId, identifier);
  }

  public async findOne(identifier: string): Promise<Company | null> {
    const company = await this.companiesRepository.findOne(identifier);

    return company;
  }
}
