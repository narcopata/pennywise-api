import { Service } from "typedi";
import { UsersRepository } from "../../database/repositories/users.repositories";
import { argon2id, hash, verify } from "argon2";
import jwt from "jsonwebtoken";

type SignUpDto = {
  email: string;
  password: string;
};

type SignInDto = {
  email: string;
  password: string;
};

@Service()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private generateAccessToken(sub: string) {
    return jwt.sign({ sub }, process.env.JWT_SECRET ?? "", {
      expiresIn: Number(process.env.JWT_SIGN_EXPIRES_IN),
    });
  }

  public async signup(data: SignUpDto) {
    const userWithEmailFromDb = await this.usersRepository.findOne(data.email);

    if (userWithEmailFromDb) {
      // Lançar erro no contexto do koa e adicionar descrição
      throw new Error("");
    }

    const hashedPassword = await hash(data.password, {
      type: argon2id,
      hashLength: 40,
    });

    const user = await this.usersRepository.create(data.email, hashedPassword);

    const accessToken = this.generateAccessToken(user.id);

    return { accessToken };
  }

  public async signin(data: SignInDto) {
    const user = await this.usersRepository.findOne(data.email);

    if (!user) {
      // Lançar erro no contexto do koa e adicionar descrição
      throw new Error("");
    }

    const isPasswordValid = await verify(user.password, data.password, {
      type: argon2id,
      hashLength: 40,
    });

    if (!isPasswordValid) {
      // Lançar erro no contexto do koa e adicionar descrição
      throw new Error("");
    }

    const accessToken = this.generateAccessToken(user.id);

    return { accessToken };
  }
}
