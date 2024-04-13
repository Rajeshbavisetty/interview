import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import TechItem from '../TechItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class TechEra extends Component {
  state = {techList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getTechDetails()
  }

  getTechDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    const filterdData = data.courses.map(each => ({
      id: each.id,
      name: each.name,
      logoUrl: each.logo_url,
    }))
    console.log(response)
    if (response.ok === true) {
      this.setState({
        techList: filterdData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {techList} = this.state
    return (
      <div>
        <h1 className="Heading">Courses</h1>
        <ul className="TrendItemContainer">
          {techList.map(each => (
            <TechItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="FailureItem">
      <img
        className="ImgElement"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="Heading">Oops! Something Went Wrong</h1>
      <p className="Paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="ButtonRetry"
        type="button"
        onClick={this.getTechDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    return <div data-testid="loader">{this.renderApi()}</div>
  }
}
export default TechEra
