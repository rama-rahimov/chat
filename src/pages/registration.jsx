import {useState} from "react";
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [startDate, setStartDate] = useState(null);
    return (
        <div className="card">
            <div className="card-body">
                <h2>Registration</h2>
                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input value={email} className="inputs" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="row">
                    <label htmlFor="last_name">Last Name</label>
                    <input value={password} className="inputs"  onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input value={email} className="inputs" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input value={password} className="inputs"  onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="row">
                    <label htmlFor="password">Age</label>
                    <div className="date-input-wrapper">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date("1900-01-01")}
                        maxDate={new Date()}
                        showPopperArrow={false}
                        showDisabledMonthNavigation
                        placeholderText="Please input date"
                        className="date-input"
                        calendarClassName="hidden-calendar" // можно скрыть через CSS
                    />
                </div>
                </div>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Apply</button>
                <p>for login click <Link to='/'>login</Link></p>
            </div>
        </div>
    )
}

export default App