import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiResponsesList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    totalVaccinationCoverage: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiResponseStatus: apiResponsesList.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiResponseStatus: apiResponsesList.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      const totalVaccinationCoverage = data.last_7_days_vaccination.map(
        each => ({
          vaccinationDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )
      const vaccinationByAge = data.vaccination_by_age
      const vaccinationByGender = data.vaccination_by_gender
      this.setState({
        totalVaccinationCoverage,
        vaccinationByAge,
        vaccinationByGender,
        apiResponseStatus: apiResponsesList.success,
      })
    } else {
      this.setState({apiResponseStatus: apiResponsesList.failure})
    }
  }

  successView = () => {
    const {
      totalVaccinationCoverage,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage vaccinationCoverage={totalVaccinationCoverage} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  failureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="image"
      />
      <h1 className="failureMsg">Something went wrong</h1>
    </>
  )

  renderLoader = () => (
    <div id="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
    </div>
  )

  renderCowinData = () => {
    const {apiResponseStatus} = this.state
    console.log(apiResponseStatus)
    switch (apiResponseStatus) {
      case apiResponsesList.inProgress:
        return this.renderLoader()
      case apiResponsesList.success:
        return this.successView()
      case apiResponsesList.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="name">Co-WIN</p>
        </div>
        <h1 className="heading">CoWin Vaccination in India</h1>
        <div className="content-container">{this.renderCowinData()}</div>
      </div>
    )
  }
}

export default CowinDashboard
