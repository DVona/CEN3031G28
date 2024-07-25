import React from 'react'
import './TicketForm.css'
import '../server/models/ticketModel.js'

import { TfiUser } from "react-icons/tfi";
import { TfiLock } from "react-icons/tfi";

export const TicketForm = () => {
  return (
    <div className="container">
        <form>
        <div className="header">
            <div className="headText">Ticket Submission Form</div>
                <div className="underline"></div>
        </div>
        <label>
        <div className="bodyText">Request Type:</div>
            <select name="selectedCategory">
                <option value="Repair Request">RepairRequest</option>
                <option value="Account Help">AccountHelp</option>
                <option value="Other">Other</option>
            </select>
        </label>
        <p></p>
        <label className='bodyText'>
        Issue Details:
        <p></p>
        <input className="textBox" name="issueDesc"/>
        </label>
        <div className="submit-container">
          <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  )
  
}


async function onSubmit(e) {
  e.preventDefault();
  const person = { ...form };
  try {
    let response;
    if (isNew) {
      response = await fetch(`${API_URL}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
    } else {
      response = await fetch(`${API_URL}/record/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("A problem occurred adding or updating a record: ", error);
  } finally {
    setForm({ username: "", password: "", level: "" });
    navigate("/records");
  }
}