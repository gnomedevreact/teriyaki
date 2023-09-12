import { Auth } from "src/decorator/Auth.decorator";
import { SiteDto } from "./dto/SiteDto";
import { SiteService } from "./site.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("site")
export class SiteController {
  constructor(private readonly SiteService: SiteService) {}

  @Post()
  async createSiteObject() {
    return this.SiteService.updateSiteStatus();
  }
}
