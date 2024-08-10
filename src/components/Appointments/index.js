import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    starred: false,
  }

  onChangedate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onChangetitle = event => {
    this.setState({title: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {title, date} = this.state

    // Ensure the date is in YYYY-MM-DD format before formatting
    const formattedDate = format(new Date(date), 'yyyy-MM-dd') // Store as raw date for compatibility

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate, // Store raw date
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  starredBtn = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }))
  }

  render() {
    const {title, date, appointmentsList, starred} = this.state

    const filteredAppointmentsList = starred
      ? appointmentsList.filter(eachAppointment => eachAppointment.isFavorite)
      : appointmentsList

    const btnClass = starred ? 'active' : 'inactive'

    return (
      <div className="bgContainer">
        <div className="Container">
          <div className="fillingContainer">
            <div className="formContainer">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAdd}>
                <label className="titleLabel" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={this.onChangetitle}
                  className="input"
                  placeholder="Title"
                />
                <label className="titleLabel" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  value={date}
                  onChange={this.onChangedate}
                  placeholder="Date"
                />
                <div>
                  <button type="submit" className="btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="imgContainer">
              <img
                className="img"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="middleContainer">
            <h1 className="heading2">Appointments</h1>
            <div>
              <button className={btnClass} onClick={this.starredBtn}>
                starred
              </button>
            </div>
          </div>
          <ul className="list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                toggleIsFavorite={this.toggleIsFavorite}
                appointmentDetails={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
