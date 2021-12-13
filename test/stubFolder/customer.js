require('dotenv').config({ path: '../../test.env' })
const i18n = require('i18n')
const i18nConfig = require('../.././web/middleware/localiztion').options
const { headerAuthValidator } = require('../../web/middleware/validator')

i18n.configure(i18nConfig)

const headerAuthorization = JSON.stringify({ _id: '5e81fe56ecfb074ba090174c', userType: 'user', metaData: {} })

const req = {
  i18n,
  headers: {
    authorization: headerAuthValidator,
    language: 'en'
  },
  payload: {},
  query: {},
  params: {}
}

const customer200 = {
  userName: 'someshshakya',
  FirstName: 'Somesh',
  email: 'somesh@gmail.com',
  mobile: 8238242217,
  password: '*********',
  company: 'appscrip.co',
  signUpType: 1,
  city: 'delhi',
  state: 'Gujrat',
  country: 'India',
  countryCode: '+91'
}
const customer402 = {
  FirstName: 'Somesh',
  email: 'somesh@gmail.com',
  mobile: 8238242217,
  password: '*********',
  company: 'appscrip.co',
  signUpType: 1,
  city: 'delhi',
  state: 'Gujrat',
  country: 'India',
  countryCode: '+91'
}
const customer410 = {
  userName: 'someshshakya',
  FirstName: 'Somesh',
  mobile: 8238242217,
  password: '*********',
  company: 'appscrip.co',
  signUpType: 1,
  city: 'delhi',
  state: 'Gujrat',
  country: 'India',
  countryCode: '+91'
}
const customer414 = {
  userName: 'someshshakya',
  FirstName: 'Somesh',
  email: 'somesh@gmail.com',
  mobile: 8238242217,
  company: 'appscrip.co',
  signUpType: 1,
  city: 'delhi',
  state: 'Gujrat',
  country: 'India',
  countryCode: '+91'
}
module.exports = { req, headerAuthorization, customer200, customer402, customer410, customer414 }
