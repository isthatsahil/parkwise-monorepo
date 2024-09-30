import { Injectable } from "@nestjs/common";
import { add } from "@parkwise/sample-lib";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!" + add(20, 10);
  }
}
