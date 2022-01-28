const i18n = require('i18n')
const i18nConfig = require('../../web/middleware/localization').i18n.options
i18n.configure(i18nConfig)
const { ObjectId } = require('mongodb')
const moment = require('moment')

const headerAuthorization = JSON.stringify({ userId: '60e6ceb748484a0144265ee6', userType: 'user', metaData: {} })

exports.req = {
  _route: {},
  i18n,
  auth: {
    credentials: {
      userId: '60e6ceb748484a0144265ee6',
      userType: 'user',
      metaData: {}
    }
  },
  headers: {
    authorization: headerAuthorization,
    lan: 'en',
    'x-forwarded-for': '156.5.52.45'
  },
  info: { remoteAddress: '127.0.0.1' },
  payload: {},
  query: {},
  params: {},
  user: {
    _id: ObjectId('60e6ceb748484a0144265ee6'),
    firstName: 'jay',
    lastName: 'rao',
    email: 'test1@gmail.com',
    profilePic: 'http://profilepic.png',
    countryCode: '+91',
    phoneNumber: '9567876766',
    dateOfBirth: '2021-07-05T00:00:00.000Z',
    password: 'password',
    loginVerifiredBy: {
      googleVerified: false,
      emailVerified: false,
      phoneNumberVerified: false
    },
    country: '',
    deviceDetail: {
      deviceId: '6A9ADFCC34B2',
      deviceMake: 'samsung',
      deviceModel: 'A1',
      deviceOs: 'android',
      browserVersion: '1.0.0',
      deviceType: 'ANDROID'
    },
    userType: 'NURSE',
    signUpType: 'NORMAL',
    googleId: '432E-AF58-6A9ADFCC34B2',
    status: 'ACTIVE',
    createdDate: moment('2021-07-09T07:52:06.241Z').toDate(),
    createdTs: 1625817126241.0,
    location: {
      lat: 0,
      long: 0
    },
    userLastLoggedInLocationDetails: {},
    fcmTopic: '60e80025772b93143068dbb8',
    mqttTopic: '60e80025772b93143068dbb8',
    haveVehicle: false,
    drivingLicenceFront: 'http://drivinglicencefront.png',
    drivingLicenceBack: 'http://drivinglicenceback.png',
    education: [
      {
        _id: '5e25939815c20f0027b9eaa3',
        startDate: '2015-07-05T00:00:00.000Z',
        endDate: '2020-07-05T00:00:00.000Z',
        doc: [
          'http://eductiondoc.png'
        ]
      }
    ],
    competence: [
      {
        _id: '5e25939815c20f0027b9eaa3',
        validUpTo: '2022-07-05T00:00:00.000Z',
        doc: [
          'http://competencedoc.png'
        ],
        status: 'ACTIVE'
      }
    ],
    contractHoursPerWeek: 100,
    contractHoursMinPerDay: 8,
    firstTimeVerify: false,
    countryId: '60ebe6e76fa2840027741515',
    cityId: '60ebe6fc6fa2840027741516',
    address: [
      {
        address: 'rt nagar',
        placeName: 'ganag nagar',
        line1: '10th cross',
        line2: 'near station',
        area: 'RBI colony',
        city: 'Bangalore',
        state: 'karanataka',
        country: 'India',
        zipCode: '582001',
        lat: 12,
        long: 13,
        isDefault: true,
        _id: ObjectId('60e6ceb848484a0144265ee7')
      }
    ],
    preference: {
      operate: 'ZONE',
      zoneId: [
        '5e25939815c20f0027b9eaa3'
      ],
      radius: 10,
      medicalCondition: [
        '5e25939815c20f0027b9eaa3'
      ]
    },
    document: {
      documentTypeId: '',
      name: '',
      frontImage: '',
      backImage: '',
      uploadedTs: 0,
      uploadedDate: ''
    }
  }
}
