import { Injectable } from '@nestjs/common'
import fetch from 'node-fetch'
const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser
@Injectable()
export class ABService {
  async getStationsPage(): Promise<any> {
    // const rp = require('request-promise-native') // eslint-disable-line @typescript-eslint/no-var-requires

    // const results = await rp({
    //   uri: 'https://almatybike.kz/velostation',
    //   headers: {
    //     Connection: 'keep-alive',
    //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 Chrome/78.0.3904.108',
    //     Referer: 'https://almatybike.kz/velostation',
    //   },
    //   json: true,
    // })

    // return results
    this.getCompanies()
  }

  async getCompanies(): Promise<any> {
    const rp = require('request-promise-native') // eslint-disable-line @typescript-eslint/no-var-requires

    const companies = []

    const getPageWithCompanies = async (letter, page) => {
      console.log('URL', `https://hh.kz/employers_list?areaId=113&letter=${letter}&${page}`)
      return fetch(`https://hh.kz/employers_list?areaId=113&letter=${letter}&${page}`)
        .then((response) => response.text()
          .then((html) => html))
    }

    const letters = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "%23"]
    // const letters = ['A']
    // letters.forEach(async letter => {
    for (const letter of letters) {
      for (let i = 0; i < 1; i++) {
        if (i % 10 === 0) { console.log(letter, i) }
        // const parseDataFromHTML = () => {
        const html = await getPageWithCompanies(letter, i)
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const nodes = [...doc.querySelectorAll('.l-cell.b-companylist > .bloko-text > div')]
        const parsedCompanies = nodes.map(c => {
          return {
            companyName: c.querySelector('a').textContent,
            companyHhId: parseInt(c.querySelector('a').getAttribute('href').split('/').pop(), 10),
            vacanciesCount: c.querySelector('em').textContent
          }
        })
        console.log(parsedCompanies)
        companies.push(parsedCompanies)
      }
    }

    console.log(companies)
    const fs = require('fs')
    fs.writeFileSync('/Users/alan/code/projects/leadgenerator/companies-by-letters-2021-11-06.json', JSON.stringify(companies))
  }

  async getContacts(): Promise<string> {
    const rp = require('request-promise-native') // eslint-disable-line @typescript-eslint/no-var-requires

    const results = await rp({
      uri: 'https://hh.ru/vacancy/42221363?from=employer',
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      json: true,
    })


    // const parsedVacancies = vacancies.map(({ name, vacancyId, company, contactInfo }) => {
    //   const phoneObject = contactInfo?.phones?.phones?.[0] || {}
    //   const phone = `+${phoneObject.country}${phoneObject.city}${phoneObject.number}`
    //   return {
    //     company: company?.name,
    //     companyLink: `hh.kz/employer/${company?.id}`,
    //     vacancyName: name,
    //     vacancyLink: `hh.kz/vacancy/${vacancyId}`,
    //     recruiter: contactInfo?.fio,
    //     phone,
    //     email: contactInfo?.email,
    //   }
    // })

    // const result = parsedVacancies.filter((value, index, self) => {
    //   return self.findIndex(v => v.phone === value.phone) === index;
    // })

    // const companyNameElement = results?.match(new RegExp("<\s*span data-qa=\"bloko-header-2\"[^>]*>(.*?)<\s*\/\s*span>"))[1]
    // const companyName = companyNameElement.split('<span>').pop() // TODO: beautify

    // const interestingObject = JSON.parse(results?.match(new RegExp("<\s*template[^>]*>(.*?)<\s*/\s*template>"))[1])
    // const relatedVacancies = interestingObject.relatedVacancies?.vacancies
    // const currentCompanyVacancies = relatedVacancies.filter(({ company }) => company.name === companyName)
    // console.log(companyName, currentCompanyVacancies)

    // JSON.parse(document.body.getInnerHTML().match(new RegExp("<\s*template[^>]*>(.*?)<\s*/\s*template>"))[1]).applicantVacancyResponseStatuses
    return results
  }
}