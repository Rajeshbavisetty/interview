import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechEraItem extends Component {
  state = {tech: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getTechItem()
  }

  getTechItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log(data)
    const filterdData = {
      id: data.course_details.id,
      name: data.course_details.name,
      imageUrl: data.course_details.image_url,
      description: data.course_details.description,
    }
    if (response.ok === true) {
      this.setState({tech: filterdData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {tech} = this.state
    const {id, name, imageUrl, description} = tech
    return (
      <div className="Item" key={id}>
        <img className="ImgElement" src={imageUrl} alt={name} />
        <div className="Description">
          <h1 className="Heading">{name}</h1>
          <p className="Paragraph">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getTechItem}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

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

  render() {
    return <div data-testid="loader">{this.renderApi()}</div>
  }
}
export default TechEraItem
