import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

const mainOrm = await MikroORM.init(config);

export { mainOrm };
