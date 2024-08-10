import './index.css'
import {format} from 'date-fns'  // Import date-fns for date formatting

const AppointmentItem = props => {
  const {toggleIsFavorite, appointmentDetails} = props
  const {id, title, date, isFavorite} = appointmentDetails

  // **Correction:** Parse the raw date string into a Date object
  const dateObj = new Date(date)

  // **Correction:** Get the day name from the Date object
  const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' })

  const toggleIsFavoriteBtn = () => {
    toggleIsFavorite(id)
  }

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listItem">
      <div className="title-container">
        <p className="title">{title}</p>
        <p className="date">
          Date: {format(dateObj, 'dd MMMM yyyy')}, {day}  {/* **Correction:** Display day name correctly */}
        </p>
      </div>
      <button data-testid="star" className="btn2" onClick={toggleIsFavoriteBtn}>
        <img className="icon" src={starImgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
