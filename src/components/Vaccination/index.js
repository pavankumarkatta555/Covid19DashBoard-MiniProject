import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Select from 'react-select'
import {AiFillHome} from 'react-icons/ai'

import Header from '../Header'
import MultiLineChart from '../MultiLineChart'
import PieAndHalfDonutChart from '../PieChart'
import NotFound from '../NotFound'
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

class Vaccination extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    stateCode: statesList[1].state_code,
    districtCode: '',
    stateDetailsList: [],
    multiLineData: [],
  }

  componentDidMount() {
    this.fetchingStateDetails()
    this.fetchingTimeLineDetails()
  }

  onChangeStateSelect = value => {
    this.setState({stateCode: value.value, districtCode: ''})
  }

  onChangeDistrictSelect = value => {
    this.setState({districtCode: value.label})
  }

  fetchingStateDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    const options = {
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const responseJsonData = await apiResponse.json()

      this.setState({
        apiStatus: apiStatusConstants.success,
        stateDetailsList: responseJsonData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  fetchingTimeLineDetails = async () => {
    const {stateCode} = this.state
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data`

    const options = {
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const responseJsonData = await apiResponse.json()
      const resultList = []

      const dates = Object.keys(responseJsonData[stateCode].dates)
      dates.forEach(eachItem => {
        resultList.push({
          date: eachItem,
          vaccinated1:
            responseJsonData[stateCode].dates[eachItem].total.vaccinated1,
          vaccinated2:
            responseJsonData[stateCode].dates[eachItem].total.vaccinated2,
          total:
            responseJsonData[stateCode].dates[eachItem].total.vaccinated1 +
            responseJsonData[stateCode].dates[eachItem].total.vaccinated2,
        })
      })
      this.setState({multiLineData: resultList})
    } else {
      this.setState({multiLineData: []})
    }
  }

  apiStatusOnSuccess = () => {
    const {
      stateCode,
      districtCode,
      stateDetailsList,
      multiLineData,
    } = this.state

    const stateDetails = statesList.find(each => stateCode === each.state_code)
    const stateOptions = statesList.map(each => ({
      value: each.state_code,
      label: each.state_name,
    }))

    const districtNames = Object.keys(stateDetailsList[stateCode].districts)
    const districtOptions = districtNames.map(each => ({
      value: each.toUpperCase(),
      label: each,
    }))

    let doses1 = 0
    let doses2 = 0

    if (districtCode === '') {
      const specificState = stateDetailsList[stateCode]
      doses1 =
        specificState.total.vaccinated1 !== 'NaN'
          ? specificState.total.vaccinated1
          : 0
      doses2 =
        specificState.total.vaccinated2 !== 'NaN'
          ? specificState.total.vaccinated2
          : 0
    } else {
      const specificDistrict =
        stateDetailsList[stateCode].districts[districtCode]

      doses1 =
        specificDistrict.total.vaccinated1 !== undefined
          ? specificDistrict.total.vaccinated1
          : 0
      doses2 =
        specificDistrict.total.vaccinated2 !== undefined
          ? specificDistrict.total.vaccinated2
          : 0
    }

    const styles = {
      option: provided => ({
        ...provided,
        color: 'white',
        backgroundColor: '#222234',
      }),
    }

    return (
      <div className="vaccine-responsive-container">
        <div className="country-state-name-container">
          <AiFillHome className="home-icon" color="#CBD5E1" />
          <h1 className="country-state-name-heading">
            India/{stateDetails.state_name}
          </h1>
        </div>
        <div className="selects-container">
          <div className="select-container">
            <Select
              options={stateOptions}
              onChange={this.onChangeStateSelect}
              placeholder="Select State"
              styles={styles}
            />
          </div>
          <div className="select-container">
            <Select
              options={districtOptions}
              onChange={this.onChangeDistrictSelect}
              placeholder="Select district"
              styles={styles}
            />
          </div>
        </div>
        <div className="vaccine-details-containers">
          <div className="vaccine-details-container">
            <div className="vaccine-logo-container">
              <img
                src="https://res.cloudinary.com/dvzwomefi/image/upload/v1646452574/Vector_cximcd.png"
                alt="injection logo"
                className="vaccine-logo"
              />
            </div>
            <div className="vaccines-count-containers">
              <div>
                <p className="total-vaccine">Site Conducting Vaccination</p>
                <p className="total-vaccine-count">1339</p>
              </div>
              <div className="doses-container">
                <div className="dose1-container">
                  <p className="doses-heading">Government</p>
                  <p className="doses-count">2000</p>
                </div>
                <div>
                  <p className="doses-heading">Private</p>
                  <p className="doses-count">25</p>
                </div>
              </div>
            </div>
          </div>
          <div className="vaccine-details-container">
            <div className="vaccine-logo-container">
              <img
                src="https://res.cloudinary.com/dvzwomefi/image/upload/v1646454284/Vector_1_m8rpjw.png"
                alt="injection logo"
                className="vaccine-logo"
              />
            </div>
            <div className="vaccines-count-containers">
              <div>
                <p className="total-vaccine">Total Vaccination Doses</p>
                <p className="total-vaccine-count">{doses1 + doses2}</p>
              </div>
              <div className="doses-container">
                <div className="dose1-container">
                  <p className="doses-heading">Dose 1</p>
                  <p className="doses-count">{doses1}</p>
                </div>
                <div>
                  <p className="doses-heading">Dose 2</p>
                  <p className="doses-count">{doses2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MultiLineChart chartData={multiLineData} />
        <div className="vaccine-pie-charts-container">
          <PieAndHalfDonutChart />
        </div>
      </div>
    )
  }

  apiStatusInProgress = () => (
    <div className="vaccination-loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#007BFF" />
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.apiStatusInProgress()
      case apiStatusConstants.failure:
        return <NotFound />
      case apiStatusConstants.success:
        return this.apiStatusOnSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="vaccine-main-container">
        <Header />
        {this.renderBasedOnApiStatus()}
        <Footer />
      </div>
    )
  }
}

export default Vaccination
