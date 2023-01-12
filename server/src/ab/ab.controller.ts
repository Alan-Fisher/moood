import { Get, Controller } from '@nestjs/common'
import { ABService } from './ab.service-new'

@Controller('ab')
export class ABController {
  constructor(private readonly abService: ABService) { }

  @Get()
  public async getStationsPage(): Promise<any> {
    return await this.abService.getStationsPage()
  }
}
