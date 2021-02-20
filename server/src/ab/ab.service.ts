import { Injectable } from '@nestjs/common'

@Injectable()
export class ABService {
  async getStationsPage(): Promise<string> {
    const rp = require('request-promise-native') // eslint-disable-line @typescript-eslint/no-var-requires

    const results = await rp({
      uri: 'https://almatybike.kz/velostation',
      headers: {
        Connection: 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 Chrome/78.0.3904.108',
        Referer: 'https://almatybike.kz/velostation',
      },
      json: true,
    })

    return results
  }
}