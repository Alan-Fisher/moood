import { Injectable } from '@nestjs/common'
import fetch from 'node-fetch'
const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser
import russiaRegions from './russiaRegions.json'
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

    const getPageWithCompanies = async (areaId, letter, page) => {
      let url = 'https://hh.kz/employers_list?'
      const params = { areaId, letter, page }
      Object.entries(params).forEach(([name, value]) => { if (value) { url = url.concat(`&${name}=${value}`) } })
      console.log(url)

      return fetch(url)
        .then((response) => response.text()
          .then((html) => html))
    }


    const getCompaniesByParams = async (regionId, letter, page) => {
      const html = await getPageWithCompanies(regionId, encodeURIComponent(letter), page)
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      const nodes = [...doc.querySelectorAll('.l-cell.b-companylist > .bloko-text > div')]
      const parsedCompanies = nodes.map(c => {
        return {
          companyName: c.querySelector('a').textContent,
          companyHhId: parseInt(c.querySelector('a').getAttribute('href').split('/').pop(), 10),
          vacanciesCount: parseInt(c.querySelector('em').textContent, 10)
        }
      })

      companies.push(parsedCompanies)
    }

    const russiaRegionsIds = ["1620", "1624", "1646", "1652", "1192", "1124", "1146", "1118", "1174", "1169", "1187", "1661", "1679", "1704", "1217", "1229", "1202", "1249", "1216", "1255", "1", "2019", "1932", "1941", "1943", "1946", "1948", "1960", "1975", "1982", "1008", "1020", "145", "1061", "1985", "1051", "1090", "1077", "1041", "2", "1103", "1716", "1739", "1754", "1771", "1783", "1806", "1563", "1575", "1556", "1586", "1596", "1614", "1308", "1317", "1347", "1261", "1342", "1368", "1384", "1414", "1463", "1471", "1438", "1422", "1424", "1434", "1475", "1481", "1500", "1817", "1828", "1844", "1859", "1880", "1890", "1898", "1905", "1913", "1505", "2114", "1511", "1553", "1530"]

    const getCompaniesByRegionAndLetters = async (regionId) => {
      
      const letters = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "%23"]

      for (const letter of letters) {
        for (let page = 0; page < 1; page++) {
          if (page % 10 === 0) { console.log(`Буква: ${letter}, Страниц: ${page}0`) }
          getCompaniesByParams(regionId, letter, page)
        }
      }
    }

    // const russiaRegionsIds = russiaRegions.map(r => r.id)
    console.log(`Собираю все доступные компании по России`)

    for (const regionId of russiaRegionsIds) {
      const html = await getPageWithCompanies(regionId, undefined, undefined)
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      const companiesCount = parseInt(doc.querySelector('.b-alfabeta-totals.nopaddings > strong').textContent.replace(/\s+/g, ''), 10)
      console.log(companiesCount)
      if (companiesCount > 5000) {
        getCompaniesByRegionAndLetters(regionId)
      } else {

      }
    }

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