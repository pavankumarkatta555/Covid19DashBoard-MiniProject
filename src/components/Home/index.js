import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'

import Header from '../Header'
import NotFound from '../NotFound'
import CovidCasesCard from '../CovidSelectCard'
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
    altText: 'country wide confirmed cases pic',
    testId: 'countryWideConfirmedCases',
  },
  {
    id: 'ACTIVE',
    text: 'Active',
    imageUrl:
      'https://res.cloudinary.com/dvzwomefi/image/upload/v1638120017/protection_2_voxoav.png',
    altText: 'country wide active cases pic',
    testId: 'countryWideActiveCases',
  },
  {
    id: 'RECOVERED',
    text: 'Recovered',
    imageUrl:
      'https://res.cloudinary.com/dvzwomefi/image/upload/v1638120025/recovered_1_rqp5dt.png',
    altText: 'country wide recovered cases pic',
    testId: 'countryWideRecoveredCases',
  },
  {
    id: 'DECEASED',
    text: 'Deceased',
    imageUrl:
      'https://res.cloudinary.com/dvzwomefi/image/upload/v1638120032/breathing_1_brb8nh.png',
    altText: 'country wide deceased cases pic',
    testId: 'countryWideDeceasedCases',
  },
]

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInputValue: '',
    stateWiseDataList: [],
    covidSelect: '',
  }

  componentDidMount() {
    this.fetchingStateWiseData()
  }

  onClickAscButton = () => {
    const {stateWiseDataList} = this.state

    if (stateWiseDataList[0].stateCode[0] !== 'A') {
      this.setState({stateWiseDataList: stateWiseDataList.reverse()})
    }
  }

  onClickDescButton = () => {
    const {stateWiseDataList} = this.state

    if (stateWiseDataList[0].stateCode[0] !== 'W') {
      this.setState({stateWiseDataList: stateWiseDataList.reverse()})
    }
  }

  onChangeCovidSelectId = id => {
    this.setState({covidSelect: id})
  }

  onChangeInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0

        const state = statesList.find(each => each.state_code === keyName)

        if (state === undefined) {
          resultList.push({
            stateCode: keyName,
            name: 'Total',
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        } else {
          resultList.push({
            stateCode: keyName,
            name: state.state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      }
    })
    return resultList
  }

  fetchingStateWiseData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const jsonResponseData = await apiResponse.json()

      const updatedStateWiseData = this.convertObjectsDataIntoListItemsUsingForInMethod(
        jsonResponseData,
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        stateWiseDataList: updatedStateWiseData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchLess = () => {
    const {stateWiseDataList, covidSelect} = this.state

    return (
      <>
        <ul className="covid-selects-container">
          {covidSelectCardData.map(eachSelect => {
            const sumOfCasesList = stateWiseDataList.map(each => {
              const objectKey = eachSelect.id.toLowerCase()
              const count = each[objectKey]
              return count
            })

            const totalCasesInCountry = sumOfCasesList.reduce(
              (acc, cur) => acc + cur,
            )

            return (
              <CovidCasesCard
                key={eachSelect.id}
                covidCasesDetails={eachSelect}
                covidSelect={covidSelect}
                stateWiseDataList={stateWiseDataList}
                onChangeCovidSelectId={this.onChangeCovidSelectId}
                totalCasesInCountry={totalCasesInCountry}
              />
            )
          })}
        </ul>
        <div
          className="state-wise-covid-cases-table-container"
          testid="stateWiseCovidDataTable"
        >
          <div className="state-wise-covid-cases-table-headings-container">
            <div className="states-ut-heading-container">
              <p>States/UT</p>
              <button
                type="button"
                className="asc-desc-btn"
                testid="ascendingSort"
                onClick={this.onClickAscButton}
              >
                <FcGenericSortingAsc />
              </button>
              <button
                type="button"
                className="asc-desc-btn"
                testid="descendingSort"
                onClick={this.onClickDescButton}
              >
                <FcGenericSortingDesc />
              </button>
            </div>
            <p className="state-wise-covid-cases-headings">Confirmed</p>
            <p className="state-wise-covid-cases-headings">Active</p>
            <p className="state-wise-covid-cases-headings">Recovered</p>
            <p className="state-wise-covid-cases-headings">Deceased</p>
            <p className="state-wise-covid-cases-headings">Population</p>
          </div>
          <hr className="home-hr-line" />
          <ul className="state-wise-covid-cases-table-unordered-list">
            {stateWiseDataList.map(eachState => {
              const {
                stateCode,
                name,
                confirmed,
                active,
                recovered,
                deceased,
                population,
              } = eachState

              return (
                <li
                  className="state-wise-covid-cases-table-headings-container"
                  key={stateCode}
                >
                  <p className="states-ut-heading-container">{name}</p>
                  <p className="state-wise-covid-cases-headings confirmed-cases-color">
                    {confirmed}
                  </p>
                  <p className="state-wise-covid-cases-headings active-cases-color">
                    {active}
                  </p>
                  <p className="state-wise-covid-cases-headings recovered-cases-color">
                    {recovered}
                  </p>
                  <p className="state-wise-covid-cases-headings deceased-cases-color">
                    {deceased}
                  </p>
                  <p className="state-wise-covid-cases-headings population-count-color">
                    {population}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }

  renderBasedOnSearch = () => {
    const {searchInputValue} = this.state

    const searchIncludedList = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchInputValue.toLowerCase()),
    )

    return (
      <ul
        className="search-results-container"
        testid="searchResultsUnorderedList"
      >
        {searchIncludedList.map(eachStateItem => (
          <Link
            to={`/state/${eachStateItem.state_code}`}
            className="nav-state-links-list"
            key={eachStateItem.state_code}
          >
            <li className="search-result-list-item">
              <p className="search-result-state-name">
                {eachStateItem.state_name}
              </p>
              <div className="state-code-icon-container">
                <p>{eachStateItem.state_code}</p>
                <BiChevronRightSquare />
              </div>
            </li>
            <hr className="state-search-result-hr-line" />
          </Link>
        ))}
      </ul>
    )
  }

  apiStatusOnSuccess = () => {
    const {searchInputValue} = this.state

    return (
      <>
        <div className="search-input-container">
          <BsSearch color="#94A3B8" />
          <input
            type="search"
            className="searchInput"
            placeholder="Enter the state"
            onChange={this.onChangeInput}
          />
        </div>
        {searchInputValue === ''
          ? this.renderSearchLess()
          : this.renderBasedOnSearch()}
      </>
    )
  }

  apiStatusInProgress = () => (
    <div className="loader-responsive-container" testid="homeRouteLoader">
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
      <div className="home-bg-container">
        <Header />
        <div className="home-responsive-container">
          {this.renderBasedOnApiStatus()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
