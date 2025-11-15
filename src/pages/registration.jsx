import {useState} from "react";
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";

function Registration() {
    const [dataForm, setDataForm] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        let check = false;
        for (const eElement of Object.values(dataForm)) {
          if(!eElement){
              check = true;
              break;
          }
        }
        if (check) {
            alert("Please fill all fields");
        }else {
            const result = await fetch(`${import.meta.env.TEST_API_URL}/api/auth/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...dataForm, genderId: 1})
            });
            const fullResult = await result.json();
            if (fullResult.error) {
                alert(fullResult.message);
            } else {
                alert('Succesfull!');
                navigate("/main");
            }
        }
    }
    return (
        <div className="card">
            <form onSubmit={handleSubmit} className="card-body">
                <h2>Registration</h2>
                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input value={dataForm.name} className="inputs" onChange={(e) => setDataForm((prev) => ({...prev, name: e.target.value}))} />
                </div>
                <div className="row">
                    <label htmlFor="lastName">Last Name</label>
                    <input value={dataForm.lastName} className="inputs"  onChange={(e) => setDataForm((prev) => ({...prev, lastName: e.target.value}))} />
                </div>
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input value={dataForm.email} className="inputs" onChange={(e) => setDataForm((prev) => ({...prev, email: e.target.value}))} />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input value={dataForm.password} className="inputs" type="password"  onChange={(e) => setDataForm((prev) => ({...prev, password: e.target.value}))} />
                </div>
                <div className="row">
                    <label htmlFor="birthDate">Age</label>
                    <div className="date-input-wrapper">
                    <DatePicker
                        selected={dataForm.birthDate}
                        onChange={(birthDate) => setDataForm((prevState) => ({...prevState, birthDate}))}
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
            </form>
        </div>
    )
}

export default Registration