import { Injectable } from '@nestjs/common'
import fetch from 'node-fetch'

const fs = require('fs')
const _ = require("lodash")
const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser
@Injectable()
export class ABService {
  async getStationsPage(): Promise<any> {
    // this.getContacts()
    // this.sortCompanies()

    // this.getCompanies()
    // this.convertToCsv()
    this.convertToCsvMultiple()
  }

  async convertToCsv(): Promise<any> {
    const filePath = '/Users/alan/code/projects/leadgenerator/Done lists/10.01.2023, 23-20-22 - moscow.json'

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      this.saveToCsv(JSON.parse(data), filePath.replace('.json', '.csv'))
    })
  }

  async convertToCsvMultiple(): Promise<any> {
    const dirname = "/Users/alan/code/projects/leadgenerator/Predone lists"

    const files = []
    fs.readdirSync(dirname).forEach(file => {
      const fileData = JSON.parse(fs.readFileSync(dirname + '/' + file))
      files.push(fileData)
    })

    console.log(files)
    const data = [].concat(...files)
    this.saveToCsv(data, "/Users/alan/code/projects/leadgenerator/Done lists/11.01.2023 all but moscow is without no vacancies companies in three categories after Л letter.csv")
  }

  saveToCsv(data: any, filePath: string): void { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    const companies = data
    const csvRows = [["Компания", "Локация", "Кабинет hh", "Кол-во вакансий", "Категория"].map(i => `"${i}"`).join(',')]

    companies.forEach(({ name, region, id, vacanciesCount, categories }, i) => {
      categories.forEach(category => {
        const csvRow = [name, region.name, `https://hh.ru/employer/${id}`, vacanciesCount, category]
          .map(i => `"${i}"`)
          .join(',')

        csvRows.push(csvRow)
      })
    })

    fs.writeFileSync(filePath, csvRows.join('\n'))
  }

  async getCompanies(): Promise<any> {
    // TD: когда буду дособирать Москву, сначала проверить, что в файл корректно собирается!

    // 160 страниц — максимум, который отображает hh. Вручную можно дойти до 165 и всё
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

    // const russiaRegionsIds = russiaRegions.map(r => r.id)
    // .slice(2) // TODO: move to config
    // const subcategoriesHrefs = subcategoriesByCategories.map(({subCategories}) => subCategories)
    const russiaRegionsIds = russiaRegions.map(r => r.id)
    const getRegionName = (regionId) => russiaRegions.find(({ id }) => id == regionId).text

    const getHhPageUrl = (href, regionId, page) => `https://hh.kz/${href}?area=${regionId}&page=${page}&vacanciesRequired=true` // Before release remove vacanciesRequired

    const getPageWithCompanies = async (href, regionId, page) => {
      const url = getHhPageUrl(href, regionId, page)
      // console.log("------ Делаю запрос на страницу:", url)

      return await fetch(url)
        .then((response) => response.text()
          .then((html) => {
            const parser = new DOMParser()
            return (parser.parseFromString(html, 'text/html'))
          }))
    }

    const moscowData = JSON.parse(fs.readFileSync('/Users/alan/code/projects/leadgenerator/Done lists/10.01.2023, 23-20-22 - moscow.json'))

    const companies = new Map()

    for (const mCompany of moscowData) {
      companies.set(mCompany.id, mCompany)
    }

    const getCompaniesByParams = async (href, regionId, page) => {
      const html = await getPageWithCompanies(href, regionId, page)

      const nodes = [...html.querySelectorAll('.employers-company__description')]
      const parsedCompanies = nodes
        .map(c => {
          const vacanciesCount = parseInt(c.querySelector('span').textContent, 10)

          // if (vacanciesCount > 9) { // TODO: move to config
          return {
            name: c.querySelector('a').textContent,
            id: parseInt(c.querySelector('a').getAttribute('href').split('/').pop(), 10),
            region: { name: getRegionName(regionId), id: parseInt(regionId, 10) },
            vacanciesCount,
          }
          // }
        })
        .filter(c => c !== undefined)

      return await parsedCompanies
    }


    const iterateThroughPages = async (href, regionId) => {
      const companiesOnPages = []

      for (let page = 0; page < 200; page++) {
        const companiesOnPage = await getCompaniesByParams(href, regionId, page)

        if (companiesOnPage.length === 0) {
          console.log(`------ Всего страниц: ${page} ${page > 159 ? `| Alert! Возможно, не все компании запарсены: ${getHhPageUrl(href, regionId, page)}` : ''}\n`)
          break
        }

        if ((page + 1) % 5 === 0) {
          console.log("------ Проверено страниц:", page + 1)
        }

        companiesOnPages.push(...companiesOnPage)
      }
      return await companiesOnPages
    }

    const getCompaniesByRegionAndSubCategory = async (href, regionId) => {
      const companies = []

      companies.push(...await iterateThroughPages(href, regionId))
      return companies
    }

    console.log(`Сейчас я соберу все российские компании.\n`)
    console.time('Общее время')
    for (const regionId of russiaRegionsIds.slice(0, 1)) {
      console.log("## Собираю компании по региону", getRegionName(regionId), `(${russiaRegionsIds.indexOf(regionId) + 1}/${russiaRegionsIds.length})`)
      // const companiesToAdd = await getCompaniesByRegionAndSubCategory('/employers_company/informacionnye_tekhnologii_sistemnaya_integraciya_internet/razrabotka_programmnogo_obespecheniya', 1)

      // for (const company of companiesToAdd) {
      //   const { id } = company
      //   if (!companies.get(id)) {
      //     companies.set(company.id, {
      //       ...company,
      //       categories: ["Разработка программного обеспечения"],
      //     })
      //   } else {
      //     companies.set(company.id, {
      //       ...companies.get(id),
      //       categories: _.uniq([...companies.get(id).categories, "Разработка программного обеспечения"]),
      //     })
      //   }
      // }

      // for (const category of [subcategoriesByCategories[0]]) {

      for (const category of subcategoriesByCategories) {
        console.log("---- Категория:", category.categoryName, `(${subcategoriesByCategories.indexOf(category) + 1}/${subcategoriesByCategories.length})`)
        await getPageWithCompanies(category.href, regionId, 0)
          .then(async html => {
            const companiesCount = parseInt(html.querySelector('.employers-company__count').textContent.replace(/\s+/g, ''), 10)
            console.log(companiesCount)
            if (companiesCount >= 4800) {
              console.log("------ Inform! В этой категории более 4800 компаний, придется пройтись по подкатегориям")
              for (const subcategory of category.subCategories) {
                console.log("------ Подкатегория:", subcategory.subcategoryName)

                // TD: reuse
                const companiesToAdd = await getCompaniesByRegionAndSubCategory(subcategory.href, regionId)

                for (const company of companiesToAdd) {
                  const { id } = company
                  if (!companies.get(id)) {
                    companies.set(company.id, {
                      ...company,
                      categories: [category.categoryName],
                    })
                  } else {
                    companies.set(company.id, {
                      ...companies.get(id),
                      categories: _.uniq([...companies.get(id).categories, category.categoryName]),
                    })
                  }
                }
              }
            } else {
              const companiesToAdd = await getCompaniesByRegionAndSubCategory(category.href, regionId)

              for (const company of companiesToAdd) {
                const { id } = company
                if (!companies.get(id)) {
                  companies.set(company.id, {
                    ...company,
                    categories: [category.categoryName],
                  })
                } else {
                  companies.set(company.id, {
                    ...companies.get(id),
                    categories: _.uniq([...companies.get(id).categories, category.categoryName]),
                  })
                }
              }
            }
          })
        // for (const category of subcategoriesByCategories) {
        // for (const subcategory of category.subCategories) {
      }
    }

    console.log('\nДело сделано!')
    console.timeEnd('Общее время')

    const currentDateTime = new Date().toLocaleTimeString('ru', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
    fs.writeFileSync(`/Users/alan/code/projects/leadgenerator/${currentDateTime} - moscow to 160 pages in some categories + all other categoried but only with vacancies.json`, JSON.stringify(Array.from(companies.values())))
  }
}

const subcategoriesByCategories = [
  // {
  //   categoryName: "Автомобильный бизнес",
  //   subCategories: [
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/avtozapchasti_shiny_roznichnaya_torgovlya",
  //       subcategoryName: "Автозапчасти, шины (розничная торговля)"
  //     },
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/avtokomponenty_zapchasti_proizvodstvo",
  //       subcategoryName: "Автокомпоненты, запчасти (производство)"
  //     },
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/avtokomponenty_zapchasti_shiny_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Автокомпоненты, запчасти, шины (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/legkovye_gruzovye_avtomobili_mototekhnika_avtobusy_trollejbusy_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Легковые, грузовые автомобили, мототехника, автобусы, троллейбусы (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/legkovye_gruzovye_avtomobili_mototekhnika_avtobusy_trollejbusy_proizvodstvo",
  //       subcategoryName: "Легковые, грузовые автомобили, мототехника, автобусы, троллейбусы (производство)"
  //     },
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/roznichnaya_torgovlya_avtomobilyami_dilerskij_centr",
  //       subcategoryName: "Розничная торговля автомобилями (дилерский центр)"
  //     },
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/tekhnicheskoe_obsluzhivanie_remont_avtomobilej",
  //       subcategoryName: "Техническое обслуживание, ремонт автомобилей"
  //     },
  //     {
  //       href: "/employers_company/avtomobilnyj_biznes/finansovye_uslugi_keptivnye_banki_i_lizingovye_kompanii",
  //       subcategoryName: "Финансовые услуги (кэптивные банки и лизинговые компании)"
  //     }
  //   ],
  //   href: "/employers_company/avtomobilnyj_biznes"
  // },
  // {
  //   categoryName: "Гостиницы, рестораны, общепит, кейтеринг",
  //   subCategories: [
  //     {
  //       href: "/employers_company/gostinicy_restorany_obshepit_kejtering/gostinica",
  //       subcategoryName: "Гостиница"
  //     },
  //     {
  //       href: "/employers_company/gostinicy_restorany_obshepit_kejtering/kejtering_vyezdnoe_obsluzhivanie",
  //       subcategoryName: "Кейтеринг (выездное обслуживание)"
  //     },
  //     {
  //       href: "/employers_company/gostinicy_restorany_obshepit_kejtering/restoran_obshestvennoe_pitanie_fast_fud",
  //       subcategoryName: "Ресторан, общественное питание, фаст-фуд"
  //     }
  //   ],
  //   href: "/employers_company/gostinicy_restorany_obshepit_kejtering"
  // },
  // {
  //   categoryName: "Государственные организации",
  //   subCategories: [
  //     {
  //       href: "/employers_company/gosudarstvennye_organizacii/gosudarstvennye_organizacii",
  //       subcategoryName: "Государственные организации"
  //     }
  //   ],
  //   href: "/employers_company/gosudarstvennye_organizacii"
  // },
  // {
  //   categoryName: "Добывающая отрасль",
  //   subCategories: [
  //     {
  //       href: "/employers_company/dobyvayushaya_otrasl/dobycha_i_obogashenie_mineralnogo_syrya_sol_sera_glinozem_razrabotka_karerov_pesok_glina_kamen_dobycha_torfa",
  //       subcategoryName: "Добыча и обогащение минерального сырья (соль, сера, глинозем), разработка карьеров (песок, глина, камень), добыча торфа"
  //     },
  //     {
  //       href: "/employers_company/dobyvayushaya_otrasl/dobycha_i_obogashenie_rud_chernykh_cvetnykh_dragocennykh_blagorodnykh_redkikh_metallov",
  //       subcategoryName: "Добыча и обогащение руд черных, цветных, драгоценных, благородных, редких металлов"
  //     },
  //     {
  //       href: "/employers_company/dobyvayushaya_otrasl/dobycha_i_obogashenie_uglya",
  //       subcategoryName: "Добыча и обогащение угля"
  //     },
  //     {
  //       href: "/employers_company/dobyvayushaya_otrasl/inzhenerno_izyskatelskie_gidrogeologicheskie_geologorazvedochnye_raboty",
  //       subcategoryName: "Инженерно-изыскательские, гидрогеологические, геологоразведочные работы"
  //     }
  //   ],
  //   href: "/employers_company/dobyvayushaya_otrasl"
  // },
  // {
  //   categoryName: "ЖКХ",
  //   subCategories: [
  //     {
  //       href: "/employers_company/zhkkh/blagoustrojstvo_i_uborka_territorij_i_zdanij",
  //       subcategoryName: "Благоустройство и уборка территорий и зданий"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/ventilyaciya_i_kondicionirovanie_montazh_servis_remont",
  //       subcategoryName: "Вентиляция и кондиционирование (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/vodosnabzhenie_i_kanalizaciya",
  //       subcategoryName: "Водоснабжение и канализация"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/liftovoe_khozyajstvo_montazh_servis_remont",
  //       subcategoryName: "Лифтовое хозяйство (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/obespechenie_pozharnoj_bezopasnosti_molniezashity",
  //       subcategoryName: "Обеспечение пожарной безопасности, молниезащиты"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/remont_zdanij_i_sooruzhenij",
  //       subcategoryName: "Ремонт зданий и сооружений"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/slabotochnye_seti_montazh_servis_remont",
  //       subcategoryName: "Слаботочные сети (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/utilizaciya_bytovykh_otkhodov",
  //       subcategoryName: "Утилизация бытовых отходов"
  //     },
  //     {
  //       href: "/employers_company/zhkkh/energosnabzhenie",
  //       subcategoryName: "Энергоснабжение"
  //     }
  //   ],
  //   href: "/employers_company/zhkkh"
  // },
  {
    categoryName: "Информационные технологии, системная интеграция, интернет",
    subCategories: [
      // {
      //   href: "/employers_company/informacionnye_tekhnologii_sistemnaya_integraciya_internet/internet_kompaniya_poiskoviki_platezhnye_sistemy_soc.seti_informacionno_poznavatelnye_i_razvlekatelnye_resursy_prodvizhenie_sajtov_i_prochee",
      //   subcategoryName: "Интернет-компания (поисковики, платежные системы, соц.сети, информационно-познавательные и развлекательные ресурсы, продвижение сайтов и прочее)"
      // },
      // {
      //   href: "/employers_company/informacionnye_tekhnologii_sistemnaya_integraciya_internet/internet_provajder",
      //   subcategoryName: "Интернет-провайдер"
      // },
      {
        href: "/employers_company/informacionnye_tekhnologii_sistemnaya_integraciya_internet/razrabotka_programmnogo_obespecheniya",
        subcategoryName: "Разработка программного обеспечения"
      },
      {
        href: "/employers_company/informacionnye_tekhnologii_sistemnaya_integraciya_internet/sistemnaya_integraciya__avtomatizacii_tekhnologicheskikh_i_biznes_processov_predpriyatiya_it_konsalting",
        subcategoryName: "Системная интеграция,  автоматизации технологических и бизнес-процессов предприятия, ИТ-консалтинг"
      }
    ],
    href: "/employers_company/informacionnye_tekhnologii_sistemnaya_integraciya_internet"
  },
  // {
  //   categoryName: "Искусство, культура",
  //   subCategories: [
  //     {
  //       href: "/employers_company/iskusstvo_kultura/arkhiv_biblioteka_iskusstvovedenie",
  //       subcategoryName: "Архив, библиотека, искусствоведение"
  //     },
  //     {
  //       href: "/employers_company/iskusstvo_kultura/botanicheskij_sad_zoopark_zapovednik",
  //       subcategoryName: "Ботанический сад, зоопарк, заповедник"
  //     },
  //     {
  //       href: "/employers_company/iskusstvo_kultura/muzej_galereya_teatr",
  //       subcategoryName: "Музей, галерея, театр"
  //     }
  //   ],
  //   href: "/employers_company/iskusstvo_kultura"
  // },
  // {
  //   categoryName: "Лесная промышленность, деревообработка",
  //   subCategories: [
  //     {
  //       href: "/employers_company/lesnaya_promyshlennost_derevoobrabotka/derevoobrabotka_proizvodstvo",
  //       subcategoryName: "Деревообработка (производство)"
  //     },
  //     {
  //       href: "/employers_company/lesnaya_promyshlennost_derevoobrabotka/produkciya_derevoobrabotki_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Продукция деревообработки (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/lesnaya_promyshlennost_derevoobrabotka/stolyarno_stroitelnye_izdeliya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Столярно-строительные изделия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/lesnaya_promyshlennost_derevoobrabotka/stolyarno_stroitelnye_izdeliya_proizvodstvo",
  //       subcategoryName: "Столярно-строительные изделия (производство)"
  //     },
  //     {
  //       href: "/employers_company/lesnaya_promyshlennost_derevoobrabotka/cellyulozno_bumazhnaya_produkciya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Целлюлозно-бумажная продукция (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/lesnaya_promyshlennost_derevoobrabotka/cellyulozno_bumazhnoe_proizvodstvo",
  //       subcategoryName: "Целлюлозно-бумажное производство"
  //     }
  //   ],
  //   href: "/employers_company/lesnaya_promyshlennost_derevoobrabotka"
  // },
  // {
  //   categoryName: "Медицина, фармацевтика, аптеки",
  //   subCategories: [
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/apteka_optika",
  //       subcategoryName: "Аптека, оптика"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/veterinarnaya_apteka",
  //       subcategoryName: "Ветеринарная аптека"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/veterinarnaya_deyatelnost",
  //       subcategoryName: "Ветеринарная деятельность"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/klinicheskie_issledovaniya",
  //       subcategoryName: "Клинические исследования"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/laboratoriya_issledovatelskij_centr",
  //       subcategoryName: "Лаборатория, исследовательский центр"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/lechebno_profilakticheskie_uchrezhdeniya",
  //       subcategoryName: "Лечебно-профилактические учреждения"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/uchrezhdenie_soc.pomoshi_i_zashity",
  //       subcategoryName: "Учреждение соц.помощи и защиты"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/farmacevticheskaya_produkciya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Фармацевтическая продукция (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/medicina_farmacevtika_apteki/farmacevticheskaya_produkciya_proizvodstvo",
  //       subcategoryName: "Фармацевтическая продукция (производство)"
  //     }
  //   ],
  //   href: "/employers_company/medicina_farmacevtika_apteki"
  // },
  // {
  //   categoryName: "Металлургия, металлообработка",
  //   subCategories: [
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/dragocennye_blagorodnye_i_redkie_metally_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Драгоценные, благородные и редкие металлы (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/dragocennye_blagorodnye_i_redkie_metally_proizvodstvo",
  //       subcategoryName: "Драгоценные, благородные и редкие металлы (производство)"
  //     },
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/metallicheskie_izdeliya_metallokonstrukcii_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Металлические изделия, металлоконструкции (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/metallicheskie_izdeliya_metallokonstrukcii_proizvodstvo",
  //       subcategoryName: "Металлические изделия, металлоконструкции (производство)"
  //     },
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/produkciya_cvetnoj_metallurgii_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Продукция цветной металлургии (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/produkciya_chernoj_metallurgii_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Продукция черной металлургии (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/cvetnaya_metallurgiya_vyplavka_metalloprokat",
  //       subcategoryName: "Цветная металлургия (выплавка, металлопрокат)"
  //     },
  //     {
  //       href: "/employers_company/metallurgiya_metalloobrabotka/chernaya_metallurgiya_proizvodstvo_chuguna_stali_prokata",
  //       subcategoryName: "Черная металлургия (производство чугуна, стали, проката)"
  //     }
  //   ],
  //   href: "/employers_company/metallurgiya_metalloobrabotka"
  // },
  // {
  //   categoryName: "Нефть и газ",
  //   subCategories: [
  //     {
  //       href: "/employers_company/neft_i_gaz/gsm_toplivo_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "ГСМ, топливо (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/gsm_toplivo_roznichnaya_torgovlya",
  //       subcategoryName: "ГСМ, топливо (розничная торговля)"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/dobycha_gaza",
  //       subcategoryName: "Добыча газа"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/dobycha_nefti",
  //       subcategoryName: "Добыча нефти"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/neftepererabotka_neftekhimiya_proizvodstvo",
  //       subcategoryName: "Нефтепереработка, нефтехимия (производство)"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/neftekhimiya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Нефтехимия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/pererabotka_gaza",
  //       subcategoryName: "Переработка газа"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/transportirovka_khranenie_gaza",
  //       subcategoryName: "Транспортировка, хранение газа"
  //     },
  //     {
  //       href: "/employers_company/neft_i_gaz/transportirovka_khranenie_nefti",
  //       subcategoryName: "Транспортировка, хранение нефти"
  //     }
  //   ],
  //   href: "/employers_company/neft_i_gaz"
  // },
  // {
  //   categoryName: "Образовательные учреждения",
  //   subCategories: [
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/avtoshkola",
  //       subcategoryName: "Автошкола"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/biznes_obrazovanie",
  //       subcategoryName: "Бизнес-образование"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/vuz_ssuz_kolledzh_ptu",
  //       subcategoryName: "Вуз, ссуз колледж, ПТУ"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/internat_detskij_dom",
  //       subcategoryName: "Интернат, детский дом"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/nauchno_issledovatelskaya_nauchnaya_akademicheskaya_deyatelnost",
  //       subcategoryName: "Научно-исследовательская, научная, академическая деятельность"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/obuchenie_inostrannym_yazykam",
  //       subcategoryName: "Обучение иностранным языкам"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/obuchenie_iskusstvam_risovanie_penie_tancy_foto",
  //       subcategoryName: "Обучение искусствам (рисование, пение, танцы, фото)"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/povyshenie_kvalifikacii_perekvalifikaciya",
  //       subcategoryName: "Повышение квалификации, переквалификация"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/sportivnoe_obuchenie",
  //       subcategoryName: "Спортивное обучение"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/treningovye_kompanii",
  //       subcategoryName: "Тренинговые компании"
  //     },
  //     {
  //       href: "/employers_company/obrazovatelnye_uchrezhdeniya/shkola_detskij_sad",
  //       subcategoryName: "Школа, детский сад"
  //     }
  //   ],
  //   href: "/employers_company/obrazovatelnye_uchrezhdeniya"
  // },
  // {
  //   categoryName: "Общественная деятельность, партии, благотворительность, НКО",
  //   subCategories: [
  //     {
  //       href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko/associaciya_v_sfere_kultury_iskusstva",
  //       subcategoryName: "Ассоциация в сфере культуры, искусства"
  //     },
  //     {
  //       href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko/blagotvoritelnaya_organizaciya",
  //       subcategoryName: "Благотворительная организация"
  //     },
  //     {
  //       href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko/obshestvennaya_politicheskaya_organizaciya",
  //       subcategoryName: "Общественная, политическая организация"
  //     },
  //     {
  //       href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko/professionalnaya_predprinimatelskaya_organizaciya",
  //       subcategoryName: "Профессиональная, предпринимательская организация"
  //     },
  //     {
  //       href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko/religioznaya_organizaciya",
  //       subcategoryName: "Религиозная организация"
  //     },
  //     {
  //       href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko/sportivnaya_federaciya",
  //       subcategoryName: "Спортивная федерация"
  //     },
  //     {
  //       href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko/fond_grantodatel",
  //       subcategoryName: "Фонд, грантодатель"
  //     }
  //   ],
  //   href: "/employers_company/obshestvennaya_deyatelnost_partii_blagotvoritelnost_nko"
  // },
  // {
  //   categoryName: "Перевозки, логистика, склад, ВЭД",
  //   subCategories: [
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/aviaperevozki",
  //       subcategoryName: "Авиаперевозки"
  //     },
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/avtomobilnye_perevozki",
  //       subcategoryName: "Автомобильные перевозки"
  //     },
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/ved_tamozhennoe_oformlenie",
  //       subcategoryName: "ВЭД, таможенное оформление"
  //     },
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/zheleznodorozhnye_perevozki",
  //       subcategoryName: "Железнодорожные перевозки"
  //     },
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/kurerskaya_pochtovaya_dostavka",
  //       subcategoryName: "Курьерская, почтовая доставка"
  //     },
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/morskie_rechnye_perevozki",
  //       subcategoryName: "Морские, речные перевозки"
  //     },
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/skladskie_uslugi",
  //       subcategoryName: "Складские услуги"
  //     },
  //     {
  //       href: "/employers_company/perevozki_logistika_sklad_ved/transportno_logisticheskie_kompleksy_porty_vozdushnyj_vodnyj_zheleznodorozhnyj",
  //       subcategoryName: "Транспортно-логистические комплексы, порты (воздушный, водный, железнодорожный)"
  //     }
  //   ],
  //   href: "/employers_company/perevozki_logistika_sklad_ved"
  // },
  // {
  //   categoryName: "Продукты питания",
  //   subCategories: [
  //     {
  //       href: "/employers_company/produkty_pitaniya/alkogolnye_napitki_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Алкогольные напитки (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/bezalkogolnye_napitki_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Безалкогольные напитки (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/bezalkogolnye_napitki_proizvodstvo",
  //       subcategoryName: "Безалкогольные напитки (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/vino_proizvodstvo",
  //       subcategoryName: "Вино (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/detskoe_pitanie_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Детское питание (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/detskoe_pitanie_proizvodstvo",
  //       subcategoryName: "Детское питание (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/konditerskie_izdeliya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Кондитерские изделия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/konditerskie_izdeliya_proizvodstvo",
  //       subcategoryName: "Кондитерские изделия (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/konservirovannaya_produkciya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Консервированная продукция (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/konservirovannaya_produkciya_proizvodstvo",
  //       subcategoryName: "Консервированная продукция (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/korma_dlya_zhivotnykh_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Корма для животных (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/korma_dlya_zhivotnykh_proizvodstvo",
  //       subcategoryName: "Корма для животных (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/likerovodochnaya_produkciya_proizvodstvo",
  //       subcategoryName: "Ликероводочная продукция (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/makaronnye_izdeliya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Макаронные изделия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/makaronnye_izdeliya_proizvodstvo",
  //       subcategoryName: "Макаронные изделия (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/maslozhirovaya_produkciya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Масложировая продукция (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/maslozhirovaya_produkciya_proizvodstvo",
  //       subcategoryName: "Масложировая продукция (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/molochnaya_produkciya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Молочная продукция (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/molochnaya_produkciya_proizvodstvo",
  //       subcategoryName: "Молочная продукция (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/muka_krupy_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Мука, крупы (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/muka_krupy_proizvodstvo",
  //       subcategoryName: "Мука, крупы (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/myasnaya_produkciya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Мясная продукция (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/myasnaya_produkciya_proizvodstvo",
  //       subcategoryName: "Мясная продукция (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/pivo_proizvodstvo",
  //       subcategoryName: "Пиво (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/pishevye_koncentraty_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Пищевые концентраты (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/pishevye_koncentraty_proizvodstvo",
  //       subcategoryName: "Пищевые концентраты (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/polufabrikaty_v_tom_chisle_zamorozhennye__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Полуфабрикаты, в том числе замороженные  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/polufabrikaty_v_tom_chisle_zamorozhennye_proizvodstvo",
  //       subcategoryName: "Полуфабрикаты, в том числе замороженные (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/ryba_i_moreprodukty_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Рыба и морепродукты (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/ryba_i_moreprodukty_proizvodstvo",
  //       subcategoryName: "Рыба и морепродукты (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/sakhar_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Сахар (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/sakhar_proizvodstvo",
  //       subcategoryName: "Сахар (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/svezhie_ovoshi_frukty_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Свежие овощи, фрукты (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/sneki_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Снеки (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/sneki_proizvodstvo",
  //       subcategoryName: "Снеки (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/khlebobulochnye_izdeliya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Хлебобулочные изделия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/khlebobulochnye_izdeliya_proizvodstvo",
  //       subcategoryName: "Хлебобулочные изделия (производство)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/chaj_kofe_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Чай, кофе (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/produkty_pitaniya/chaj_kofe_proizvodstvo",
  //       subcategoryName: "Чай, кофе (производство)"
  //     }
  //   ],
  //   href: "/employers_company/produkty_pitaniya"
  // },
  // {
  //   categoryName: "Промышленное оборудование, техника, станки и комплектующие",
  //   subCategories: [
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/stroitelnaya_tekhnika_oborudovanie_lifty_pogruzochno_razgruzochnoe_skladskoe_oborudovanie_montazh_servis_remont",
  //       subcategoryName: "Дорожно-строительная техника, сельскохозяйственная и другая спец.техника, оборудование, лифты, погрузочно-разгрузочное, складское оборудование (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/stroitelnaya_tekhnika_oborudovanie_lifty_pogruzochno_razgruzochnoe_skladskoe_oborudovanie_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Дорожно-строительная техника, сельскохозяйственная и другая спец.техника, оборудование, лифты, погрузочно-разгрузочное, складское оборудование (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/stroitelnaya_tekhnika_oborudovanie_lifty_pogruzochno_razgruzochnoe_skladskoe_oborudovanie_proizvodstvo",
  //       subcategoryName: "Дорожно-строительная техника, сельскохозяйственная и другая спец.техника, оборудование, лифты, погрузочно-разгрузочное, складское оборудование (производство)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/medicinskoe_diagnosticheskoe_oborudovanie_instrumenty_montazh_servis_remont",
  //       subcategoryName: "Медицинское, диагностическое оборудование, инструменты (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/medicinskoe_diagnosticheskoe_oborudovanie_instrumenty_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Медицинское, диагностическое оборудование, инструменты (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/medicinskoe_diagnosticheskoe_oborudovanie_instrumenty_proizvodstvo",
  //       subcategoryName: "Медицинское, диагностическое оборудование, инструменты (производство)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_derevoobrabotki_zagotovki_lesa_cellyulozno_bumazhnoj_promyshlennosti_montazh_servis_remont",
  //       subcategoryName: "Оборудование для деревообработки, заготовки леса, целлюлозно-бумажной промышленности (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_derevoobrabotki_zagotovki_lesa_cellyulozno_bumazhnoj_promyshlennosti_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Оборудование для деревообработки, заготовки леса, целлюлозно-бумажной промышленности (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_derevoobrabotki_zagotovki_lesa_cellyulozno_bumazhnoj_promyshlennosti_proizvodstvo",
  //       subcategoryName: "Оборудование для деревообработки, заготовки леса, целлюлозно-бумажной промышленности (производство)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_pishevoj_promyshlennosti_i_selskogo_khozyajstva_upakovochnoe_oborudovanie_montazh_servis_remont",
  //       subcategoryName: "Оборудование для пищевой промышленности, упаковки и хранения (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_pishevoj_promyshlennosti_i_selskogo_khozyajstva_upakovochnoe_oborudovanie_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Оборудование для пищевой промышленности, упаковки и хранения (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_pishevoj_promyshlennosti_i_selskogo_khozyajstva_upakovochnoe_oborudovanie_proizvodstvo",
  //       subcategoryName: "Оборудование для пищевой промышленности, упаковки и хранения (производство)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_restoranov_gostinic_kejteringa_roznichnoj_torgovli__montazh_servis_remont",
  //       subcategoryName: "Оборудование для ресторанов, гостиниц, кейтеринга, розничной торговли  (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_restoranov_gostinic_kejteringa_roznichnoj_torgovli__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Оборудование для ресторанов, гостиниц, кейтеринга, розничной торговли  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_dlya_restoranov_gostinic_kejteringa_roznichnoj_torgovli_proizvodstvo",
  //       subcategoryName: "Оборудование для ресторанов, гостиниц, кейтеринга, розничной торговли (производство)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_dobyvayushej_energeticheskoj_neftegazovoj_i_khimicheskoj_otrasli__montazh_servis_remont",
  //       subcategoryName: "Оборудование и станки для добывающей, энергетической, нефтегазовой и химической отрасли  (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_dobyvayushej_energeticheskoj_neftegazovoj_i_khimicheskoj_otrasli__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Оборудование и станки для добывающей, энергетической, нефтегазовой и химической отрасли  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_dobyvayushej_energeticheskoj_neftegazovoj_i_khimicheskoj_otrasli__proizvodstvo",
  //       subcategoryName: "Оборудование и станки для добывающей, энергетической, нефтегазовой и химической отрасли  (производство)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_metallurgii_i_metalloobrabotki_montazh_servis_remont",
  //       subcategoryName: "Оборудование и станки для металлургии и металлообработки (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_metallurgii_i_metalloobrabotki_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Оборудование и станки для металлургии и металлообработки (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_metallurgii_i_metalloobrabotki_proizvodstvo",
  //       subcategoryName: "Оборудование и станки для металлургии и металлообработки (производство)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_otraslej_legkoj_promyshlennostii_montazh_servis_remont",
  //       subcategoryName: "Оборудование и станки для отраслей легкой промышленности (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_otraslej_legkoj_promyshlennosti_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Оборудование и станки для отраслей легкой промышленности (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie/oborudovanie_i_stanki_dlya_otraslej_legkoj_promyshlennosti_proizvodstvo",
  //       subcategoryName: "Оборудование и станки для отраслей легкой промышленности (производство)"
  //     }
  //   ],
  //   href: "/employers_company/promyshlennoe_oborudovanie_stanki_i_komplektuyushie"
  // },
  // {
  //   categoryName: "Розничная торговля",
  //   subCategories: [
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/vending_torgovlya_cherez_avtomaty",
  //       subcategoryName: "Вендинг (торговля через автоматы)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/zoomagazin",
  //       subcategoryName: "Зоомагазин"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/internet_magazin",
  //       subcategoryName: "Интернет-магазин"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/nesetevaya_roznica_melkij_opt",
  //       subcategoryName: "Несетевая розница, мелкий опт"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_diy_i_tovary_dlya_doma",
  //       subcategoryName: "Розничная сеть (DIY и товары для дома)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_drogerie_tovary_povsednevnogo_sprosa",
  //       subcategoryName: "Розничная сеть (drogerie, товары повседневного спроса)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_knigi_igrushki_podarki_chasy_i_prochee",
  //       subcategoryName: "Розничная сеть (книги, игрушки, подарки, часы и прочее)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_mebel",
  //       subcategoryName: "Розничная сеть (мебель)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_mobilnyj_retejl",
  //       subcategoryName: "Розничная сеть (мобильный ритейл)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_odezhda_obuv_aksessuary",
  //       subcategoryName: "Розничная сеть (одежда, обувь, аксессуары)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_parfyumeriya_kosmetika",
  //       subcategoryName: "Розничная сеть (парфюмерия, косметика)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_produktovaya",
  //       subcategoryName: "Розничная сеть (продуктовая)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_sportivnye_tovary",
  //       subcategoryName: "Розничная сеть (спортивные товары)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_tovary_dlya_detej",
  //       subcategoryName: "Розничная сеть (товары для детей)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_elektronika_bytovaya_tekhnika",
  //       subcategoryName: "Розничная сеть (электроника, бытовая техника)"
  //     },
  //     {
  //       href: "/employers_company/roznichnaya_torgovlya/roznichnaya_set_yuvelirnye_izdeliya",
  //       subcategoryName: "Розничная сеть (ювелирные изделия)"
  //     }
  //   ],
  //   href: "/employers_company/roznichnaya_torgovlya"
  // },
  {
    categoryName: "СМИ, маркетинг, реклама, BTL, PR, дизайн, продюсирование",
    subCategories: [
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/izdatelskaya_deyatelnost",
      //   subcategoryName: "Издательская деятельность"
      // },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/kinostudii_i_studii_zvukozapisi",
      //   subcategoryName: "Киностудии и студии звукозаписи"
      // },
      {
        href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/organizaciya_vystavok_event__pr_reklamnye_dizajn__uslugi",
        subcategoryName: "Маркетинговые, рекламные, BTL, дизайнерские, Event-, PR-агентства, организация выставок"
      },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/prodyuserskij_centr",
      //   subcategoryName: "Продюсерский центр"
      // },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/reklamno_suvenirnaya_produkciya_proizvodstvo_i_prodazha",
      //   subcategoryName: "Производство и продажа рекламно-сувенирной продукции"
      // },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/proizvodstvo_multimedia_kontenta_redaktorskaya_deyatelnost",
      //   subcategoryName: "Производство мультимедиа, контента, редакторская деятельность"
      // },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/proizvodstvo_pechatnoj_poligraficheskoj_produkcii",
      //   subcategoryName: "Производство печатной, полиграфической продукции"
      // },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/rasprostranenie_multimedia_i_pechatnoj_produkcii",
      //   subcategoryName: "Распространение мультимедиа и печатной продукции"
      // },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/rasprostranenie_teleprogramm_kino_kabelnoe_televidenie",
      //   subcategoryName: "Распространение телепрограмм, кино (кабельное телевидение)"
      // },
      // {
      //   href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie/tele__i_radioveshanie",
      //   subcategoryName: "Теле- и радиовещание"
      // }
    ],
    href: "/employers_company/smi_marketing_reklama_pr_dizajn_prodyusirovanie"
  },
  // {
  //   categoryName: "Сельское хозяйство",
  //   subCategories: [
  //     {
  //       href: "/employers_company/selskoe_khozyajstvo/zemledelie_rastenievodstvo_zhivotnovodstvo",
  //       subcategoryName: "Земледелие, растениеводство, животноводство"
  //     },
  //     {
  //       href: "/employers_company/selskoe_khozyajstvo/rybolovstvo_rybovodstvo",
  //       subcategoryName: "Рыболовство, рыбоводство"
  //     },
  //     {
  //       href: "/employers_company/selskoe_khozyajstvo/selskokhozyajstvennaya_produkciya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Сельскохозяйственная продукция (продвижение, оптовая торговля)"
  //     }
  //   ],
  //   href: "/employers_company/selskoe_khozyajstvo"
  // },
  // {
  //   categoryName: "Строительство, недвижимость, эксплуатация, проектирование",
  //   subCategories: [
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/agentskie_uslugi_v_nedvizhimosti",
  //       subcategoryName: "Агентские услуги в недвижимости"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/arkhitektura_proektirovanie",
  //       subcategoryName: "Архитектура, проектирование"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/development",
  //       subcategoryName: "Девелопмент"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/konsalting_ocenka_v_nedvizhimosti",
  //       subcategoryName: "Консалтинг, оценка в недвижимости"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_dorozhnoe_i_infrastrukturnoe",
  //       subcategoryName: "Строительство дорожное и инфраструктурное"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_zhilishnoe",
  //       subcategoryName: "Строительство жилищное"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_kommercheskikh_obektov_torgovye_ploshadi_ofisnye_zdaniya",
  //       subcategoryName: "Строительство коммерческих объектов (торговые площади, офисные здания)"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_obektov_metallurgicheskoj_otrasli",
  //       subcategoryName: "Строительство объектов металлургической отрасли"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_obektov_neftegazovoj_otrasli",
  //       subcategoryName: "Строительство объектов нефтегазовой отрасли"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_obektov_telekommunikacionnoj_otrasli",
  //       subcategoryName: "Строительство объектов телекоммуникационной отрасли"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_promyshlennoe",
  //       subcategoryName: "Строительство промышленное"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/stroitelstvo_energeticheskoe",
  //       subcategoryName: "Строительство энергетическое"
  //     },
  //     {
  //       href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura/upravlenie_i_ekspluataciya_nedvizhimosti",
  //       subcategoryName: "Управление и эксплуатация недвижимости"
  //     }
  //   ],
  //   href: "/employers_company/stroitelstvo_nedvizhimost_arkhitektura"
  // },
  // {
  //   categoryName: "Телекоммуникации, связь",
  //   subCategories: [
  //     {
  //       href: "/employers_company/telekommunikacii_svyaz/mobilnaya_svyaz",
  //       subcategoryName: "Мобильная связь"
  //     },
  //     {
  //       href: "/employers_company/telekommunikacii_svyaz/optovolokonnaya_svyaz",
  //       subcategoryName: "Оптоволоконная связь"
  //     },
  //     {
  //       href: "/employers_company/telekommunikacii_svyaz/sputnikovaya_svyaz",
  //       subcategoryName: "Спутниковая связь"
  //     },
  //     {
  //       href: "/employers_company/telekommunikacii_svyaz/fiksirovannaya_svyaz",
  //       subcategoryName: "Фиксированная связь"
  //     }
  //   ],
  //   href: "/employers_company/telekommunikacii_svyaz"
  // },
  // {
  //   categoryName: "Товары народного потребления (непищевые)",
  //   subCategories: [
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/bytovaya_khimiya_parfyumeriya_kosmetika__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Бытовая химия, парфюмерия, косметика  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/bytovaya_khimiya_parfyumeriya_kosmetika__proizvodstvo",
  //       subcategoryName: "Бытовая химия, парфюмерия, косметика  (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/kanctovary_raskhodnye_materialy_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Канцтовары, расходные материалы (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/kanctovary_raskhodnye_materialy_proizvodstvo",
  //       subcategoryName: "Канцтовары, расходные материалы (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/mebel_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Мебель (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/mebel_proizvodstvo",
  //       subcategoryName: "Мебель (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/odezhda_obuv_aksessuary_tekstil__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Одежда, обувь, аксессуары, текстиль  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/odezhda_obuv_aksessuary_tekstil_proizvodstvo",
  //       subcategoryName: "Одежда, обувь, аксессуары, текстиль (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/posuda_svet_tovary_dlya_doma__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Посуда, свет, товары для дома  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/posuda_svet_tovary_dlya_doma__proizvodstvo",
  //       subcategoryName: "Посуда, свет, товары для дома  (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/santekhnika_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Сантехника (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/santekhnika_proizvodstvo",
  //       subcategoryName: "Сантехника (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/sportivnye_tovary_i_oborudovanie_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Спортивные товары и оборудование (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/sportivnye_tovary_i_oborudovanie_proizvodstvo",
  //       subcategoryName: "Спортивные товары и оборудование (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/strojmaterialy_sbornye_konstrukcii_dlya_remonta_i_stroitelstva_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Стройматериалы, сборные конструкции для ремонта и строительства (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/strojmaterialy_sbornye_konstrukcii_dlya_remonta_i_stroitelstva_proizvodstvo_montazh_servis_remont",
  //       subcategoryName: "Стройматериалы, сборные конструкции для ремонта и строительства (производство, монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/tabak__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Табак  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/tabak__proizvodstvo",
  //       subcategoryName: "Табак  (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/tovary_dlya_detej_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Товары для детей (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/tovary_dlya_detej_proizvodstvo",
  //       subcategoryName: "Товары для детей (производство)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/yuvelirnye_izdeliya_bizhuteriya__prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Ювелирные изделия, бижутерия  (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye/yuvelirnye_izdeliya_bizhuteriya__proizvodstvo",
  //       subcategoryName: "Ювелирные изделия, бижутерия  (производство)"
  //     }
  //   ],
  //   href: "/employers_company/tovary_narodnogo_potrebleniya_nepishevye"
  // },
  // {
  //   categoryName: "Тяжелое машиностроение",
  //   subCategories: [
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/aviacionnaya_vertoletnaya_aerokosmicheskaya_promyshlennost",
  //       subcategoryName: "Авиационная, вертолетная, аэрокосмическая промышленность"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/dvigateli_montazh_servis_remont",
  //       subcategoryName: "Двигатели (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/dvigateli_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Двигатели (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/dvigateli_proizvodstvo",
  //       subcategoryName: "Двигатели (производство)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/zheleznodorozhnoe_mashinostroenie_vagonostroenie",
  //       subcategoryName: "Железнодорожное машиностроение, вагоностроение"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/produkciya_aviacionnoj_aerokosmicheskoj_vertoletnoj_promyshlennosti_montazh_servis_remont",
  //       subcategoryName: "Продукция авиационной, аэрокосмической, вертолетной промышленности (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/produkciya_aviacionnoj_aerokosmicheskoj_vertoletnoj_promyshlennosti_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Продукция авиационной, аэрокосмической, вертолетной промышленности (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/produkciya_zheleznodorozhnogo_mashinostroeniya_vagonostroeniya_montazh_servis_remont",
  //       subcategoryName: "Продукция железнодорожного машиностроения, вагоностроения (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/produkciya_zheleznodorozhnogo_mashinostroeniya_vagonostroeniya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Продукция железнодорожного машиностроения, вагоностроения (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/produkciya_sudostroeniya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Продукция судостроения (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/proizvodstvo_i_remont_voennoj_tekhniki_oborudovaniya_i_vooruzheniya",
  //       subcategoryName: "Производство и ремонт военной техники, оборудования и вооружения"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/sudoremont",
  //       subcategoryName: "Судоремонт"
  //     },
  //     {
  //       href: "/employers_company/tyazheloe_mashinostroenie/sudostroenie",
  //       subcategoryName: "Судостроение"
  //     }
  //   ],
  //   href: "/employers_company/tyazheloe_mashinostroenie"
  // },
  // {
  //   categoryName: "Управление многопрофильными активами",
  //   subCategories: [
  //     {
  //       href: "/employers_company/upravlenie_mnogoprofilnymi_aktivami/upravlyayushaya_kompaniya_gruppy_kholdinga_shtab_kvartira",
  //       subcategoryName: "Управляющая компания группы, холдинга, штаб-квартира"
  //     }
  //   ],
  //   href: "/employers_company/upravlenie_mnogoprofilnymi_aktivami"
  // },
  // {
  //   categoryName: "Услуги для бизнеса",
  //   subCategories: [
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/bezopasnost_okhrannaya_deyatelnost",
  //       subcategoryName: "Безопасность, охранная деятельность"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/kadrovye_agentstva",
  //       subcategoryName: "Кадровые агентства"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/koll_centry_dispetcherskie_sluzhby",
  //       subcategoryName: "Колл-центры, диспетчерские службы"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/konsaltingovye_uslugi",
  //       subcategoryName: "Консалтинговые услуги"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/kontrol_kachestva_ekspertiza_ispytaniya_i_sertifikaciya",
  //       subcategoryName: "Контроль качества, экспертиза, испытания и сертификация"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/perevodcheskaya_deyatelnost",
  //       subcategoryName: "Переводческая деятельность"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/uslugi_po_organizacii_poezdok_i_bronirovaniyu",
  //       subcategoryName: "Услуги по организации поездок и бронированию"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/ekologicheskoe_obsluzhivanie_vodoochistka_utilizaciya_otkhodov",
  //       subcategoryName: "Экологическое обслуживание, водоочистка, утилизация отходов"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_biznesa/yuridicheskoe_obsluzhivanie",
  //       subcategoryName: "Юридическое обслуживание"
  //     }
  //   ],
  //   href: "/employers_company/uslugi_dlya_biznesa"
  // },
  // {
  //   categoryName: "Услуги для населения",
  //   subCategories: [
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/arenda_avtomobilej",
  //       subcategoryName: "Аренда автомобилей"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/domashnij_personal",
  //       subcategoryName: "Домашний персонал"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/igornyj_biznes",
  //       subcategoryName: "Игорный бизнес"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/poshiv_remont_odezhdy_i_obuvi",
  //       subcategoryName: "Пошив, ремонт одежды и обуви"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/ritualnye_uslugi",
  //       subcategoryName: "Ритуальные услуги"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/salony_krasoty",
  //       subcategoryName: "Салоны красоты"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/sportivnye_i_fitnes_kluby",
  //       subcategoryName: "Спортивные и фитнес-клубы"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/taksi",
  //       subcategoryName: "Такси"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/turisticheskie_kompanii",
  //       subcategoryName: "Туристические компании"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/foto__i_videouslugi",
  //       subcategoryName: "Фото- и видеоуслуги"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/khimchistka",
  //       subcategoryName: "Химчистка"
  //     },
  //     {
  //       href: "/employers_company/uslugi_dlya_naseleniya/centry_razvlecheniya",
  //       subcategoryName: "Центры развлечения"
  //     }
  //   ],
  //   href: "/employers_company/uslugi_dlya_naseleniya"
  // },
  // {
  //   categoryName: "Финансовый сектор",
  //   subCategories: [
  //     {
  //       href: "/employers_company/finansovyj_sektor/audit_upravlencheskij_uchet_finansovo_yuridicheskij_konsalting",
  //       subcategoryName: "Аудит, управленческий учет, финансово-юридический консалтинг"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/bank",
  //       subcategoryName: "Банк"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/kollektorskaya_deyatelnost",
  //       subcategoryName: "Коллекторская деятельность"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/lizingovye_kompanii",
  //       subcategoryName: "Лизинговые компании"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/npf",
  //       subcategoryName: "НПФ"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/strakhovanie_perestrakhovanie",
  //       subcategoryName: "Страхование, перестрахование"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/upravlyayushaya_investicionnaya_kompaniya_upravlenie_aktivami",
  //       subcategoryName: "Управляющая, инвестиционная компания (управление активами)"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/uslugi_po_vedeniyu_bukhgalterskogo_i_nalogovogo_ucheta_raschet_zarabotnoj_platy",
  //       subcategoryName: "Услуги по ведению бухгалтерского и налогового учета, расчет заработной платы"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/faktoringovye_kompanii",
  //       subcategoryName: "Факторинговые компании"
  //     },
  //     {
  //       href: "/employers_company/finansovyj_sektor/finansovo_kreditnoe_posrednichestvo_birzha_brokerskaya_deyatelnost_vypusk_i_obsluzhivanie_kart_ocenka_riskov_obmennye_punkty_agentstva_po_kreditovaniyu_inkassaciya_lombard_platezhnye_sistemy",
  //       subcategoryName: "Финансово-кредитное посредничество (биржа, брокерская деятельность, выпуск и обслуживание карт, оценка рисков, обменные пункты, агентства по кредитованию, инкассация, ломбард, платежные системы)"
  //     }
  //   ],
  //   href: "/employers_company/finansovyj_sektor"
  // },
  // {
  //   categoryName: "Химическое производство, удобрения",
  //   subCategories: [
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/agrokhimiya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Агрохимия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/agrokhimiya_proizvodstvo",
  //       subcategoryName: "Агрохимия (производство)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/beton_kirpich_steklo_i_prochie_silikaty_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Бетон, кирпич, стекло и прочие силикаты (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/beton_kirpich_steklo_i_prochie_silikaty_proizvodstvo",
  //       subcategoryName: "Бетон, кирпич, стекло и прочие силикаты (производство)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/lakokrasochnaya_produkciya_syre_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Лакокрасочная продукция, сырье (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/lakokrasochnaya_produkciya_syre_proizvodstvo",
  //       subcategoryName: "Лакокрасочная продукция, сырье (производство)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/neorganicheskaya_khimiya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Неорганическая химия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/neorganicheskaya_khimiya_proizvodstvo",
  //       subcategoryName: "Неорганическая химия (производство)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/organicheskaya_khimiya_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Органическая химия (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/organicheskaya_khimiya_proizvodstvo",
  //       subcategoryName: "Органическая химия (производство)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/rezina_plastmassa_i_prochee_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Резина, пластмасса и прочее (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya/rezina_plastmassa_i_prochee_proizvodstvo",
  //       subcategoryName: "Резина, пластмасса и прочее (производство)"
  //     }
  //   ],
  //   href: "/employers_company/khimicheskoe_proizvodstvo_udobreniya"
  // },
  // {
  //   categoryName: "Электроника, приборостроение, бытовая техника, компьютеры и оргтехника",
  //   subCategories: [
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/bytovaya_tekhnika_elektronika_klimaticheskoe_oborudovanie_montazh_servis_remont",
  //       subcategoryName: "Бытовая техника, электроника, климатическое оборудование (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/bytovaya_tekhnika_elektronika_klimaticheskoe_oborudovanie_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Бытовая техника, электроника, климатическое оборудование (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/bytovaya_tekhnika_elektronika_klimaticheskoe_oborudovanie_proizvodstvo",
  //       subcategoryName: "Бытовая техника, электроника, климатическое оборудование (производство)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/promyshlennoe_bytovoe_elektrooborudovanie_i_elektrotekhnika_montazh_servis_remont",
  //       subcategoryName: "Промышленное, бытовое электрооборудование и электротехника (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/promyshlennoe_bytovoe_elektrooborudovanie_i_elektrotekhnika_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Промышленное, бытовое электрооборудование и электротехника (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/promyshlennoe_bytovoe_elektrooborudovanie_i_elektrotekhnika_proizvodstvo",
  //       subcategoryName: "Промышленное, бытовое электрооборудование и электротехника (производство)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/elektronno_vychislitelnaya_opticheskaya_kontrolno_izmeritelnaya_tekhnika_radioelektronika_avtomatika_montazh_servis_remont",
  //       subcategoryName: "Электронно-вычислительная, оптическая, контрольно-измерительная техника, радиоэлектроника, автоматика (монтаж, сервис, ремонт)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/elektronno_vychislitelnaya_opticheskaya_kontrolno_izmeritelnaya_tekhnika_radioelektronika_avtomatika_prodvizhenie_optovaya_torgovlya",
  //       subcategoryName: "Электронно-вычислительная, оптическая, контрольно-измерительная техника, радиоэлектроника, автоматика (продвижение, оптовая торговля)"
  //     },
  //     {
  //       href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika/elektronno_vychislitelnaya_opticheskaya_kontrolno_izmeritelnaya_tekhnika_radioelektronika_avtomatika_proizvodstvo",
  //       subcategoryName: "Электронно-вычислительная, оптическая, контрольно-измерительная техника, радиоэлектроника, автоматика (производство)"
  //     }
  //   ],
  //   href: "/employers_company/elektronika_priborostroenie_bytovaya_tekhnika_kompyutery_i_orgtekhnika"
  // },
  // {
  //   categoryName: "Энергетика",
  //   subCategories: [
  //     {
  //       href: "/employers_company/energetika/alternativnaya_energetika_geo_vetro_solnce_bio_generaciya_elektroenergii",
  //       subcategoryName: "Альтернативная энергетика: гео-, ветро-, солнце-, био- (генерация электроэнергии)"
  //     },
  //     {
  //       href: "/employers_company/energetika/atomnaya_energetika_generaciya_elektroenergii_aes",
  //       subcategoryName: "Атомная энергетика (генерация электроэнергии, АЭС)"
  //     },
  //     {
  //       href: "/employers_company/energetika/gidroenergetika_generaciya_elektroenergii_ges",
  //       subcategoryName: "Гидроэнергетика (генерация электроэнергии, ГЭС)"
  //     },
  //     {
  //       href: "/employers_company/energetika/infrastrukturnaya_kompaniya_v_energetike_so_ees_ats_cfr_i_t.p.",
  //       subcategoryName: "Инфраструктурная компания в энергетике (СО ЕЭС, АТС, ЦФР и т.п.)"
  //     },
  //     {
  //       href: "/employers_company/energetika/konsalting_v_oblasti_energoeffektivnosti",
  //       subcategoryName: "Консалтинг в области энергоэффективности"
  //     },
  //     {
  //       href: "/employers_company/energetika/peredacha_raspredelenie_elektroenergii",
  //       subcategoryName: "Передача, распределение электроэнергии"
  //     },
  //     {
  //       href: "/employers_company/energetika/sbyt_i_potreblenie_elektroenergii",
  //       subcategoryName: "Сбыт и потребление электроэнергии"
  //     },
  //     {
  //       href: "/employers_company/energetika/teplosnabzhenie_tec",
  //       subcategoryName: "Теплоснабжение (ТЭЦ)"
  //     },
  //     {
  //       href: "/employers_company/energetika/teploenergetika_generaciya_elektroenergii_i_tepla_tes",
  //       subcategoryName: "Теплоэнергетика (генерация электроэнергии и тепла, ТЭС)"
  //     }
  //   ],
  //   href: "/employers_company/energetika"
  // }
]