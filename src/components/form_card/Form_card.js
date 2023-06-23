import React from 'react'
import './styles.scss'

function Form_card(props) {
    const { name, email, address, phone, dob }=props
    return (
        <div id="form_card_container">
          {/* <div className="card"> */}
          <h2 className="card-name">{name}</h2>
          <p className="card-info">
            <strong>Email:</strong> {email}
          </p>
          <p className="card-info">
            <strong>Address:</strong> {address}
          </p>
          <p className="card-info">
            <strong>Phone:</strong> {phone}
          </p>
          <p className="card-info">
            <strong>Date of Birth:</strong> {dob}
          </p>
        {/* </div> */}
        </div>
    );
}

export default Form_card