import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import NotFound from '../NotFound'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {apiStatus: apiStatusConstants.initial, aboutDetailsList: []}

  componentDidMount() {
    this.fetchingAboutFaqs()
  }

  fetchingAboutFaqs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const faqsData = await apiResponse.json()

      this.setState({
        aboutDetailsList: faqsData.faq,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  apiStatusOnSuccess = () => {
    const {aboutDetailsList} = this.state

    return (
      <div className="about-responsive-container">
        <h1 className="about-heading">About</h1>
        <p className="description">Last update on march 28th 2021.</p>
        <h3 className="description-heading">
          COVID-19 vaccines be ready for distribution
        </h3>
        <ul className="faq-unordered-list" testid="faqsUnorderedList">
          {aboutDetailsList.map(each => {
            const {qno, answer, question} = each

            return (
              <li key={qno} className="faq-list-item">
                <p className="question">{question}</p>
                <p className="answer">{answer}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  apiStatusInProgress = () => (
    <div className="loader-responsive-container" testid="aboutRouteLoader">
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
      <div className="about-bg-container">
        <Header />
        {this.renderBasedOnApiStatus()}
        <Footer />
      </div>
    )
  }
}

export default About
