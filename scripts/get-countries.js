const axios = require('axios')
const {
  promises: { writeFile },
} = require('fs')
const { join } = require('path')

const dataFolder = join(__dirname, '..', 'src/resources')
const version = 'v2'
const BASE_ENPOINT = `https://restcountries.com/${version}/all`

async function run() {
  try {
    const { data } = await axios.get(BASE_ENPOINT)
    await writeFile(
      join(dataFolder, `countries.${version}.json`),
      JSON.stringify(data)
    )
  } catch (error) {
    console.log('Failed to fetch countries', error)
  }
}

run()
