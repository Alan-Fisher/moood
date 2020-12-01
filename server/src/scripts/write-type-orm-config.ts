import { configService } from '../config/config.service'
import fs = require('fs')
import { Logger } from '@nestjs/common'

Logger.log('info')
fs.writeFileSync('ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2)
)