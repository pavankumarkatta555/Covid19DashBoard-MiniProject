import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import NotFound from '../NotFound'
import CovidCasesCard from '../CovidSelectCard'
import BarChartUsingData from '../BarChart'
import LineChartUsingData from '../LineChart'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const covidSelectCardData = [
  {
    id: 'CONFIRMED',
    text: 'Confirmed',
    imageUrl:
      'https://res.cloudinary.com/dvzwomefi/image/upload/v1638120008/check-mark_1_cvwhq9.png',
    altText: 'state specific confirmed cases pic',
    testId: 'stateSpecificConfirmedCasesContainer',
  },
  {
    id: 'ACTIVE',
    text: 'Active',
    imageUrl:
      'https://res.cloudinary.com/dvzwomefi/image/upload/v1638120017/protection_2_voxoav.png',
    altText: 'state specific active cases pic',
    testId: 'stateSpecificActiveCasesContainer',
  },
  {
    id: 'RECOVERED',
    text: 'Recovered',
    imageUrl:
      'https://res.cloudinary.com/dvzwomefi/image/upload/v1638120025/recovered_1_rqp5dt.png',
    altText: 'state specific recovered cases pic',
    testId: 'stateSpecificRecoveredCasesContainer',
  },
  {
    id: 'DECEASED',
    text: 'Deceased',
    imageUrl:
      'https://res.cloudinary.com/dvzwomefi/image/upload/v1638120032/breathing_1_brb8nh.png',
    altText: 'state specific deceased cases pic',
    testId: 'stateSpecificDeceasedCasesContainer',
  },
]

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const lineChartIndex = [0, 1, 2, 3, 4]

class StateDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    timeLinesApiStatus: apiStatusConstants.initial,
    stateWiseCovidDataDetailsList: [],
    stateCode: '',
    activeCovidSelectCard: 'CONFIRMED',
    dateTimeLinesData: [],
  }

  componentDidMount() {
    this.fetchingStateWiseCovidDetails()
    this.fetchingTimeLinesData()
  }

  onChangeCovidSelectId = id => {
    this.setState({activeCovidSelectCard: id})
  }

  fetchingStateWiseCovidDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const jsonResponseData = await apiResponse.json()

      const updatedStateWiseData = jsonResponseData[stateCode]

      this.setState({
        apiStatus: apiStatusConstants.success,
        stateWiseCovidDataDetailsList: updatedStateWiseData,
        stateCode,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  fetchingTimeLinesData = async () => {
    this.setState({timeLinesApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const jsonData = await apiResponse.json()
      const id = stateCode
      const timeLineResultList = []

      const keyNames = Object.keys(jsonData[id].dates)

      keyNames.forEach(date => {
        timeLineResultList.push({
          date,
          confirmed: jsonData[id].dates[date].total.confirmed,
          deceased: jsonData[id].dates[date].total.deceased,
          recovered: jsonData[id].dates[date].total.recovered,
          tested: jsonData[id].dates[date].total.tested,
          active:
            jsonData[id].dates[date].total.confirmed -
            (jsonData[id].dates[date].total.deceased +
              jsonData[id].dates[date].total.recovered),
        })
      })
      this.setState({
        dateTimeLinesData: timeLineResultList,
        timeLinesApiStatus: apiStatusConstants.success,
      })
    }
  }

  timeLinesDataOnSuccess = () => {
    const {activeCovidSelectCard, dateTimeLinesData} = this.state

    const barChartData = []

    dateTimeLinesData.forEach(each => {
      const cases = each[activeCovidSelectCard.toLowerCase()]

      let count

      if (cases > 100000) {
        count = `${(cases / 100000).toFixed(1)}L`
      } else if (cases > 1000) {
        count = `${(cases / 1000).toFixed(1)}K`
      } else {
        count = cases
      }

      barChartData.push({
        date: each.date,
        count,
        cases,
      })
    })

    const lineChartData = [[], [], [], [], []]

    dateTimeLinesData.forEach(each => {
      lineChartData[0].push({
        date: each.date,
        cases: each.confirmed,
      })
      lineChartData[1].push({
        date: each.date,
        cases: each.active,
      })
      lineChartData[2].push({
        date: each.date,
        cases: each.recovered,
      })
      lineChartData[3].push({
        date: each.date,
        cases: each.deceased,
      })
      lineChartData[4].push({
        date: each.date,
        cases: each.tested,
      })
    })

    return (
      <>
        <BarChartUsingData barChartData={barChartData} />
        <div className="line-chart-unordered-list" testid="lineChartsContainer">
          <h1 className="line-chart-heading">Daily Spread Trends</h1>
          {lineChartIndex.map(each => (
            <div key={`lineChart${each}`} className="line-chart-list-item">
              <LineChartUsingData
                key={`lineChart${each}`}
                chartData={lineChartData}
                indexNo={each}
              />
            </div>
          ))}
        </div>
      </>
    )
  }

  timeLinesDataInProgress = () => (
    <div className="loader-responsive-container" testid="timelinesDataLoader">
      <Loader type="TailSpin" color="#007BFF" />
    </div>
  )

  renderBasedOnTimeLinesData = () => {
    const {timeLinesApiStatus} = this.state

    switch (timeLinesApiStatus) {
      case apiStatusConstants.success:
        return this.timeLinesDataOnSuccess()
      case apiStatusConstants.failure:
        return <NotFound />
      case apiStatusConstants.inProgress:
        return this.timeLinesDataInProgress()
      default:
        return null
    }
  }

  getDistrictCasesList = data => {
    const {activeCovidSelectCard} = this.state

    const districtsList = []
    const districtNames = Object.keys(data)

    districtNames.forEach(eachDistrict => {
      if (data[eachDistrict]) {
        const {total} = data[eachDistrict]

        let cases

        if (activeCovidSelectCard === 'ACTIVE') {
          cases =
            total.confirmed - (total.recovered + total.deceased)
              ? total.confirmed - (total.recovered + total.deceased)
              : 0
        } else {
          cases = total[activeCovidSelectCard.toLowerCase()]
            ? total[activeCovidSelectCard.toLowerCase()]
            : 0
        }

        districtsList.push({
          districtName: eachDistrict,
          cases,
        })
      }
    })
    return districtsList
  }

  apiStatusOnSuccess = () => {
    const {
      stateCode,
      stateWiseCovidDataDetailsList,
      activeCovidSelectCard,
    } = this.state

    const individualStateName = statesList.find(
      each => stateCode === each.state_code,
    )

    const lastUpdatedDate = new Date(
      stateWiseCovidDataDetailsList.meta.last_updated,
    )

    const districtsCasesList = this.getDistrictCasesList(
      stateWiseCovidDataDetailsList.districts,
    )

    const sortedDistrictsList = districtsCasesList.sort(
      (a, b) => b.cases - a.cases,
    )

    return (
      <>
        <div className="covid-state-state-name-tested-cases-container">
          <div className="covid-state-state-name-updated-container">
            <div className="covid-state-state-name-container">
              <h1 className="covid-state-state-name">
                {individualStateName.state_name}
              </h1>
            </div>
            <p className="covid-state-updated-date">
              Last update on {month[lastUpdatedDate.getMonth()]}
              {lastUpdatedDate.getDate()}st {lastUpdatedDate.getFullYear()}.
            </p>
          </div>
          <div>
            <p className="covid-state-tested-heading covid-state-tested-cases">
              Tested
            </p>
            <p className="covid-state-tested-cases">
              {stateWiseCovidDataDetailsList.total.tested}
            </p>
          </div>
        </div>
        <ul className="covid-selects-container">
          {covidSelectCardData.map(eachSelect => {
            const activeCasesDetails = stateWiseCovidDataDetailsList.total
            const objectKey = eachSelect.id.toLowerCase()
            const sumOfCasesList = () => {
              if (objectKey === 'active') {
                return (
                  activeCasesDetails.confirmed -
                  (activeCasesDetails.deceased + activeCasesDetails.recovered)
                )
              }
              return activeCasesDetails[objectKey]
            }

            const totalCasesInCountry = sumOfCasesList()

            return (
              <CovidCasesCard
                key={eachSelect.id}
                covidCasesDetails={eachSelect}
                covidSelect={activeCovidSelectCard}
                stateWiseDataList={stateWiseCovidDataDetailsList}
                onChangeCovidSelectId={this.onChangeCovidSelectId}
                totalCasesInCountry={totalCasesInCountry}
              />
            )
          })}
        </ul>
        <h1 className="top-districts-heading">Top Districts</h1>
        <ul
          className="state-name-cases-unordered-list"
          testid="topDistrictsUnorderedList"
        >
          {sortedDistrictsList.map(each => {
            const {districtName, cases} = each
            return (
              <li className="state-name-cases-list-item" key={districtName}>
                <p className="district-cases">{cases}</p>
                <p className="district-name">{districtName}</p>
              </li>
            )
          })}
        </ul>
        {this.renderBasedOnTimeLinesData()}
      </>
    )
  }

  apiStatusInProgress = () => (
    <div className="loader-responsive-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#007BFF" />
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.apiStatusOnSuccess()
      case apiStatusConstants.failure:
        return <NotFound />
      case apiStatusConstants.inProgress:
        return this.apiStatusInProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-specific-bg-container">
        <Header />
        {this.renderBasedOnApiStatus()}
        <Footer />
      </div>
    )
  }
}

export default StateDetails
