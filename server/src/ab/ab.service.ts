import { Injectable } from '@nestjs/common'
import fetch from 'node-fetch'

const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser
@Injectable()
export class ABService {
  async getStationsPage(): Promise<any> {
    this.getContacts()
    // this.sortCompanies()
  }

  async sortCompanies(): Promise<any> {
    const fs = require('fs')
    const companies1 = JSON.parse(fs.readFileSync('/Users/alan/code/projects/leadgenerator/2021-11-07/2021-11-07-moscow-spb.json'))
    const companies2 = JSON.parse(fs.readFileSync('/Users/alan/code/projects/leadgenerator/2021-11-07/2021-11-07-all-except-moscow-spb.json'))

    const russiaCompanies = [...companies1, ...companies2]
      .filter(({ vacanciesCount }) => vacanciesCount < 50 && vacanciesCount > 19)

    fs.writeFileSync('/Users/alan/code/projects/leadgenerator/2021-11-07/2021-11-07-russia-20-49.json', JSON.stringify(russiaCompanies))
  }

  async getCompanies(): Promise<any> {
    const russiaRegions = [
      {
        "id": "1",
        "text": "Москва"
      },
      {
        "id": "2",
        "text": "Санкт-Петербург"
      },
      {
        "id": "1620",
        "text": "Республика Марий Эл"
      },
      {
        "id": "1624",
        "text": "Республика Татарстан"
      },
      {
        "id": "2019",
        "text": "Московская область"
      },
      {
        "id": "1646",
        "text": "Удмуртская Республика"
      },
      {
        "id": "1652",
        "text": "Чувашская Республика"
      },
      {
        "id": "1192",
        "text": "Забайкальский край"
      },
      {
        "id": "1124",
        "text": "Иркутская область"
      },
      {
        "id": "1146",
        "text": "Красноярский край"
      },
      {
        "id": "1118",
        "text": "Республика Бурятия"
      },
      {
        "id": "1174",
        "text": "Республика Саха (Якутия)"
      },
      {
        "id": "1169",
        "text": "Республика Тыва"
      },
      {
        "id": "1187",
        "text": "Республика Хакасия"
      },
      {
        "id": "1661",
        "text": "Кировская область"
      },
      {
        "id": "1679",
        "text": "Нижегородская область"
      },
      {
        "id": "1704",
        "text": "Рязанская область"
      },
      {
        "id": "1217",
        "text": "Алтайский край"
      },
      {
        "id": "1229",
        "text": "Кемеровская область"
      },
      {
        "id": "1202",
        "text": "Новосибирская область"
      },
      {
        "id": "1249",
        "text": "Омская область"
      },
      {
        "id": "1216",
        "text": "Республика Алтай"
      },
      {
        "id": "1255",
        "text": "Томская область"
      },
      {
        "id": "1932",
        "text": "Амурская область"
      },
      {
        "id": "1941",
        "text": "Еврейская АО"
      },
      {
        "id": "1943",
        "text": "Камчатский край"
      },
      {
        "id": "1946",
        "text": "Магаданская область"
      },
      {
        "id": "1948",
        "text": "Приморский край"
      },
      {
        "id": "1960",
        "text": "Сахалинская область"
      },
      {
        "id": "1975",
        "text": "Хабаровский край"
      },
      {
        "id": "1982",
        "text": "Чукотский АО"
      },
      {
        "id": "1008",
        "text": "Архангельская область"
      },
      {
        "id": "1020",
        "text": "Калининградская область"
      },
      {
        "id": "145",
        "text": "Ленинградская область"
      },
      {
        "id": "1061",
        "text": "Мурманская область"
      },
      {
        "id": "1985",
        "text": "Ненецкий АО"
      },
      {
        "id": "1051",
        "text": "Новгородская область"
      },
      {
        "id": "1090",
        "text": "Псковская область"
      },
      {
        "id": "1077",
        "text": "Республика Карелия"
      },
      {
        "id": "1041",
        "text": "Республика Коми"
      },
      {
        "id": "1103",
        "text": "Смоленская область"
      },
      {
        "id": "1716",
        "text": "Владимирская область"
      },
      {
        "id": "1739",
        "text": "Вологодская область"
      },
      {
        "id": "1754",
        "text": "Ивановская область"
      },
      {
        "id": "1771",
        "text": "Костромская область"
      },
      {
        "id": "1783",
        "text": "Тверская область"
      },
      {
        "id": "1806",
        "text": "Ярославская область"
      },
      {
        "id": "1563",
        "text": "Оренбургская область"
      },
      {
        "id": "1575",
        "text": "Пензенская область"
      },
      {
        "id": "1556",
        "text": "Республика Мордовия"
      },
      {
        "id": "1586",
        "text": "Самарская область"
      },
      {
        "id": "1596",
        "text": "Саратовская область"
      },
      {
        "id": "1614",
        "text": "Ульяновская область"
      },
      {
        "id": "1308",
        "text": "Курганская область"
      },
      {
        "id": "1317",
        "text": "Пермский край"
      },
      {
        "id": "1347",
        "text": "Республика Башкортостан"
      },
      {
        "id": "1261",
        "text": "Свердловская область"
      },
      {
        "id": "1342",
        "text": "Тюменская область"
      },
      {
        "id": "1368",
        "text": "Ханты-Мансийский АО - Югра"
      },
      {
        "id": "1384",
        "text": "Челябинская область"
      },
      {
        "id": "1414",
        "text": "Ямало-Ненецкий АО"
      },
      {
        "id": "1463",
        "text": "Кабардино-Балкарская республика"
      },
      {
        "id": "1471",
        "text": "Карачаево-Черкесская Республика"
      },
      {
        "id": "1438",
        "text": "Краснодарский край"
      },
      {
        "id": "1422",
        "text": "Республика Адыгея"
      },
      {
        "id": "1424",
        "text": "Республика Дагестан"
      },
      {
        "id": "1434",
        "text": "Республика Ингушетия"
      },
      {
        "id": "1475",
        "text": "Республика Северная Осетия-Алания"
      },
      {
        "id": "1481",
        "text": "Ставропольский край"
      },
      {
        "id": "1500",
        "text": "Чеченская республика"
      },
      {
        "id": "1817",
        "text": "Белгородская область"
      },
      {
        "id": "1828",
        "text": "Брянская область"
      },
      {
        "id": "1844",
        "text": "Воронежская область"
      },
      {
        "id": "1859",
        "text": "Калужская область"
      },
      {
        "id": "1880",
        "text": "Курская область"
      },
      {
        "id": "1890",
        "text": "Липецкая область"
      },
      {
        "id": "1898",
        "text": "Орловская область"
      },
      {
        "id": "1905",
        "text": "Тамбовская область"
      },
      {
        "id": "1913",
        "text": "Тульская область"
      },
      {
        "id": "1505",
        "text": "Астраханская область"
      },
      {
        "id": "2114",
        "text": "Республика Крым"
      },
      {
        "id": "1511",
        "text": "Волгоградская область"
      },
      {
        "id": "1553",
        "text": "Республика Калмыкия"
      },
      {
        "id": "1530",
        "text": "Ростовская область"
      }
    ]

    const russiaRegionsIds = russiaRegions.map(r => r.id)
      .slice(2) // TODO: move to config
    const getRegionName = (regionId) => russiaRegions.find(({ id }) => id == regionId).text

    const getPageWithCompanies = async (areaId, letter, page) => {
      let url = 'https://hh.kz/employers_list?'
      const params = { areaId, letter, page }
      Object.entries(params).forEach(([name, value]) => { if (value) { url = url.concat(`&${name}=${value}`) } })
      // console.log(url)

      return await fetch(url)
        .then((response) => response.text()
          .then((html) => {
            const parser = new DOMParser()
            return (parser.parseFromString(html, 'text/html'))
          }))
    }

    const companies = []

    const getCompaniesByParams = async (regionId, letter, page) => {
      const html = await getPageWithCompanies(regionId, letter && encodeURIComponent(letter), page)

      const nodes = [...html.querySelectorAll('.l-cell.b-companylist > .bloko-text > div')]
      const parsedCompanies = nodes
        .map(c => {
          const vacanciesCount = parseInt(c.querySelector('em').textContent, 10)

          if (vacanciesCount > 9) { // TODO: move to config
            return {
              companyName: c.querySelector('a').textContent,
              companyHhId: parseInt(c.querySelector('a').getAttribute('href').split('/').pop(), 10),
              companyRegion: { name: getRegionName(regionId), id: parseInt(regionId, 10) },
              vacanciesCount,
            }
          }
        })
        .filter(c => c !== undefined)

      return await parsedCompanies
    }

    const iterateThroughPages = async (regionId, letter) => {
      if (letter) { console.log(`\nБуква: ${letter}`) }

      const companiesOnPages = []
      for (let page = 0; page < 50; page++) { // TODO: move to config
        if (page % 10 === 0 && page > 0) {
          console.log(`Страниц проверено: ${page}`)
        }
        const companiesOnPage = await getCompaniesByParams(regionId, letter, page)
        if (companiesOnPage.length === 0) {
          console.log(`Всего страниц: ${page}`)
          break
        }
        companiesOnPages.push(...companiesOnPage)
      }
      return await companiesOnPages
    }

    const getCompaniesByRegionAndLetters = async (regionId) => {
      // TODO: move to config
      const letters = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "%23"]
      // const letters = ["А", "Б"]
      console.log(`\nВ регионе ${getRegionName(regionId)} больше 5000 компаний, придется пройтись по алфавиту...`)

      const companies = []
      for (const letter of letters) {
        companies.push(...await iterateThroughPages(regionId, letter))
      }
      return companies
    }

    const getCompaniesByRegion = async (regionId) => {
      console.log(`\nСобираю компании в регионе ${getRegionName(regionId)}...`)
      return await iterateThroughPages(regionId, undefined)
    }

    console.log(`Сейчас я соберу все компании по региону Россия.`)
    console.time('Общее время')
    for (const regionId of russiaRegionsIds) {
      await getPageWithCompanies(regionId, undefined, undefined)
        .then(async html => {
          const companiesCount = parseInt(html.querySelector('.b-alfabeta-totals.nopaddings > strong').textContent.replace(/\s+/g, ''), 10)

          if (companiesCount > 5000) {
            companies.push(...await getCompaniesByRegionAndLetters(regionId))
          } else {
            companies.push(...await getCompaniesByRegion(regionId))
          }
        })
    }

    const fs = require('fs')
    console.log('\nДело сделано!')
    console.timeEnd('Общее время')
    fs.writeFileSync('/Users/alan/code/projects/leadgenerator/2021-11-07-all-except-moscow-spb.json', JSON.stringify(companies))
  }

  async getContacts(): Promise<any> {
    const firstCompanies = [
      {
        "companyName": "А101",
        "companyHhId": 2661,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 109
      },
      {
        "companyName": "ААРОН АВТО",
        "companyHhId": 603085,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 26
      },
      {
        "companyName": "АБК",
        "companyHhId": 1320790,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 39
      },
      {
        "companyName": "АБ-МАРКЕТ",
        "companyHhId": 31480,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 21
      },
      {
        "companyName": "АБСОЛЮТ БАНК",
        "companyHhId": 2737,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 103
      },
      {
        "companyName": "Абсолют Страхование",
        "companyHhId": 4431705,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 45
      },
      {
        "companyName": "АБС Электро",
        "companyHhId": 52578,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 50
      },
      {
        "companyName": "Авангард-Агро",
        "companyHhId": 1859826,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 168
      },
      {
        "companyName": "Авангард, АКБ",
        "companyHhId": 5755,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 199
      },
      {
        "companyName": "Авангард. Профессиональная экипировка",
        "companyHhId": 29858,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 36
      },
      {
        "companyName": "«АВВА РУС»",
        "companyHhId": 1053,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 51
      },
      {
        "companyName": "Август, Фирма",
        "companyHhId": 784,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 90
      },
      {
        "companyName": "Авексима",
        "companyHhId": 1179289,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 43
      },
      {
        "companyName": "Авиакомпания Победа",
        "companyHhId": 1520649,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 39
      },
      {
        "companyName": "Авл Премьер",
        "companyHhId": 5172095,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 23
      },
      {
        "companyName": "Авоська, Cеть универсамов",
        "companyHhId": 23636,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 22
      },
      {
        "companyName": "АвтоГЕРМЕС, Группа компаний",
        "companyHhId": 156344,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 70
      },
      {
        "companyName": "Автодин",
        "companyHhId": 1226563,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 22
      },
      {
        "companyName": "Авто-Евро",
        "companyHhId": 215194,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 142
      },
      {
        "companyName": "АВТОМИР, ГК",
        "companyHhId": 569,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 269
      },
      {
        "companyName": "Автомобильный батальон 2го специального полка Полиции ГУ МВД России по г. Москве",
        "companyHhId": 3789495,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 46
      },
      {
        "companyName": "Авторитэйл М",
        "companyHhId": 4779813,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 78
      },
      {
        "companyName": "АвтоСпецЦентр",
        "companyHhId": 13520,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 98
      },
      {
        "companyName": "Автостэлс",
        "companyHhId": 88618,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 34
      },
      {
        "companyName": "Автофлот-Столица",
        "companyHhId": 3732737,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 26
      },
      {
        "companyName": "АГАМА, Группа компаний",
        "companyHhId": 35143,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 37
      },
      {
        "companyName": "Агентство 21 век, КЦ",
        "companyHhId": 659638,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 21
      },
      {
        "companyName": "Агентство Инфраструктурного и Промышленного Развития Ямало-Ненецкого Автономного Округа",
        "companyHhId": 2367496,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 43
      },
      {
        "companyName": "Агентство кадрового аутсорсинга ALL HR",
        "companyHhId": 1107291,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 29
      },
      {
        "companyName": "Агентство КИТ Консалт",
        "companyHhId": 637743,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 438
      },
      {
        "companyName": "Агентство мерчандайзинга АСМ",
        "companyHhId": 245063,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 63
      },
      {
        "companyName": "Агентство Ми-Ми",
        "companyHhId": 1888985,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 26
      },
      {
        "companyName": "Агентство по подбору персонала Global Search",
        "companyHhId": 5414326,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 22
      },
      {
        "companyName": "Агора, Группа компаний",
        "companyHhId": 6195,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 47
      },
      {
        "companyName": "Агрокомбинат Московский",
        "companyHhId": 127942,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 21
      },
      {
        "companyName": "Агрохолдинг Белая Дача",
        "companyHhId": 105688,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 53
      },
      {
        "companyName": "АДАМАС",
        "companyHhId": 72995,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 46
      },
      {
        "companyName": "АДВ",
        "companyHhId": 1994,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 63
      },
      {
        "companyName": "Аддвайз",
        "companyHhId": 919758,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 65
      },
      {
        "companyName": "Азбука вкуса",
        "companyHhId": 2120,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 288
      },
      {
        "companyName": "Азбука Качества-дом брендов",
        "companyHhId": 683367,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 36
      },
      {
        "companyName": "Азимут ФМ",
        "companyHhId": 408802,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 23
      },
      {
        "companyName": "АЙКРАФТ",
        "companyHhId": 726371,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 186
      },
      {
        "companyName": "АЙНЬЮС, OOO",
        "companyHhId": 31331,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 27
      },
      {
        "companyName": "АЙСБЕРРИ",
        "companyHhId": 2751,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 102
      },
      {
        "companyName": "Ай-Теко (I-Teco)",
        "companyHhId": 115,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 122
      },
      {
        "companyName": "Айтикью Груп",
        "companyHhId": 4722815,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 39
      },
      {
        "companyName": "АЙФЭЛЛ",
        "companyHhId": 3646686,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 22
      },
      {
        "companyName": "Академия Максимус",
        "companyHhId": 197566,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 95
      },
      {
        "companyName": "Академия социального управления",
        "companyHhId": 79618,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 23
      },
      {
        "companyName": "АК АЛРОСА",
        "companyHhId": 92288,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 369
      },
      {
        "companyName": "АККУЮ НУКЛЕАР",
        "companyHhId": 885567,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 22
      },
      {
        "companyName": "«АКП-Техно»",
        "companyHhId": 541729,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 37
      },
      {
        "companyName": "АКРИХИН",
        "companyHhId": 2371,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 51
      },
      {
        "companyName": "Акрон",
        "companyHhId": 44,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 55
      },
      {
        "companyName": "«Аксиома-Софт»",
        "companyHhId": 1512281,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 106
      },
      {
        "companyName": "АКСИТЕХ",
        "companyHhId": 538164,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 27
      },
      {
        "companyName": "Аксофт",
        "companyHhId": 1008388,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 26
      },
      {
        "companyName": "Актив",
        "companyHhId": 2147,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 20
      },
      {
        "companyName": "Акушерство.ru, Компания",
        "companyHhId": 890621,
        "companyRegion": {
          "name": "Москва",
          "id": 1
        },
        "vacanciesCount": 27
      }
    ]

    const getPageWithVacancies = async (companyHhId, page) => {
      const url = `https://almaty.hh.kz/search/vacancy?from=employerPage&employer_id=${companyHhId}&page=${page}`

      return await fetch(url)
        .then((response) => response.text()
          .then((html) => {
            const parser = new DOMParser()
            return (parser.parseFromString(html, 'text/html'))
          }))
    }

    const getVacanciesByParams = async (companyHhId, page) => {
      const html = await getPageWithVacancies(companyHhId, page)
      let parsedVacancies

      try {
        parsedVacancies = JSON.parse(html.querySelector('template#HH-Lux-InitialState').innerHTML).vacancySearchResult.vacancies
      } catch (e) {
        console.log(e)
        throw new Error('broken_object')
      }
      return await parsedVacancies
    }

    const iterateThroughPages = async (companyHhId) => {
      const vacanciesOnPages = []
      for (let page = 0; page < 40; page++) { // TODO: move to config
        if (page % 5 === 0 && page > 0) {
          console.info(`Страниц проверено: ${page}`)
        }
        let vacanciesOnPage
        try {
          vacanciesOnPage = await getVacanciesByParams(companyHhId, page) // TODO: вынести и тут получать только вакансии на странице, а потом манипулировать

          if (vacanciesOnPage.length === 0) {
            console.info(`Всего страниц: ${page}`)
            break
          }
        } catch (e) {
          console.error('Не удалось вытащить рекрутеров')
        }

        vacanciesOnPages.push(...vacanciesOnPage)
      }

      const getUniquePhones = (vacancies) => { // TODO: merge with next function
        const vacanciesWithContacts = vacancies?.filter(({ contactInfo }) => contactInfo)

        return vacanciesWithContacts?.map(({ vacancyId, name, contactInfo }) => {
          const { email, fio, phones } = contactInfo || {}
          const transformedPhones = phones?.phones?.map(({ city, country, number }) => `${country}${city}${number}`)
          return {
            recruiter: {
              email,
              fio,
              phones: transformedPhones
            },
            vacancy: {
              id: vacancyId,
              name,
            }
          }
        })
      }

      const recruitersByUniquePhones = []
      const addedNumbers = []

      getUniquePhones(vacanciesOnPages)?.forEach(({ vacancy, recruiter }) => { // TODO: work with unique idea!
        const { phones, email, fio } = recruiter
        phones?.forEach(p => {
          if (!addedNumbers.includes(p)) {
            recruitersByUniquePhones.push({
              phone: p,
              email,
              fio,
              vacancy
            })
            addedNumbers.push(p)
          }
        })
      })

      return await recruitersByUniquePhones
    }

    const companiesWithRecruiters = []

    // const test = [{ companyHhId: 172 }]
    for (const company of firstCompanies) {
      const { companyHhId, companyName } = company
      console.info(`\nСобираю рекрутеров с компании ${companyName}...`)
      const recruiters = await iterateThroughPages(companyHhId)
      companiesWithRecruiters.push({ ...company, recruiters: recruiters })
    }

    // console.log(JSON.stringify(companiesWithRecruiters))
    const fs = require('fs')
    fs.writeFileSync('/Users/alan/code/projects/leadgenerator/2021-11-12/!2021-11-12-contacts-moscow-spb.json', JSON.stringify(companiesWithRecruiters))
    console.log('\nДело сделано!')
  }

  // async getContacts(): Promise<string> {
  //   const rp = require('request-promise-native') // eslint-disable-line @typescript-eslint/no-var-requires

  //   const results = await rp({
  //     uri: 'https://hh.ru/vacancy/42221363?from=employer',
  //     headers: {
  //       "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  //       "accept-language": "en-US,en;q=0.9",
  //       "cache-control": "max-age=0",
  //       "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
  //       "sec-ch-ua-mobile": "?0",
  //       "sec-ch-ua-platform": "\"macOS\"",
  //       "sec-fetch-dest": "document",
  //       "sec-fetch-mode": "navigate",
  //       "sec-fetch-site": "none",
  //       "sec-fetch-user": "?1",
  //       "upgrade-insecure-requests": "1"
  //     },
  //     json: true,
  //   })


  //   // const parsedVacancies = vacancies.map(({ name, vacancyId, company, contactInfo }) => {
  //   //   const phoneObject = contactInfo?.phones?.phones?.[0] || {}
  //   //   const phone = `+${phoneObject.country}${phoneObject.city}${phoneObject.number}`
  //   //   return {
  //   //     company: company?.name,
  //   //     companyLink: `hh.kz/employer/${company?.id}`,
  //   //     vacancyName: name,
  //   //     vacancyLink: `hh.kz/vacancy/${vacancyId}`,
  //   //     recruiter: contactInfo?.fio,
  //   //     phone,
  //   //     email: contactInfo?.email,
  //   //   }
  //   // })

  //   // const result = parsedVacancies.filter((value, index, self) => {
  //   //   return self.findIndex(v => v.phone === value.phone) === index;
  //   // })

  //   // const companyNameElement = results?.match(new RegExp("<\s*span data-qa=\"bloko-header-2\"[^>]*>(.*?)<\s*\/\s*span>"))[1]
  //   // const companyName = companyNameElement.split('<span>').pop() // TODO: beautify

  //   // const interestingObject = JSON.parse(results?.match(new RegExp("<\s*template[^>]*>(.*?)<\s*/\s*template>"))[1])
  //   // const relatedVacancies = interestingObject.relatedVacancies?.vacancies
  //   // const currentCompanyVacancies = relatedVacancies.filter(({ company }) => company.name === companyName)
  //   // console.log(companyName, currentCompanyVacancies)

  //   // JSON.parse(document.body.getInnerHTML().match(new RegExp("<\s*template[^>]*>(.*?)<\s*/\s*template>"))[1]).applicantVacancyResponseStatuses
  //   return results
  // }
}