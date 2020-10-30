import React, { Component } from 'react';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: null
    };
  }
  componentDidMount() {
    fetch(`/api/sessions/${this.props.currUser}`, {
      credentials: 'same-origin'})
      .then(response => response.json())
      .then(sessions => {
        this.setState({sessions})
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (!this.state.sessions) return null;
    const sessions = this.state.sessions.map((session) => {
      const exercises = session.exercises.map((exercise, index) => {
        console.log("exercise: ", exercise);
        return (
          <li key={index}>{exercise}</li>
        )
      }); 
      console.log("exercises: ", exercises)
      console.log("curr session", session.session_id);
      return (
        <li key={session.session_id}>
          <p>{session.completed_on.slice(0, 10)}</p>
          <ul>Exercises: 
            {exercises}
          </ul>
          <p>Notes: {session.notes}</p>
        </li>
      )
    });
    console.log("sessions:", sessions);
    return (
      <div>
        <h2>Past Exercise Sessions:</h2>
        <ul>{sessions}</ul>
      </div>
    );
  }
}

export default Sessions;