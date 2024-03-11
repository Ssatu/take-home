import React, { useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [teamName, setTeamName] = useState("");
  const [redeemable, setRedeemable] = useState("");
  const [redeemResult, setRedeemResult] = useState("");
  const [disableCheckRedeem, setDisableCheckRedeem] = useState(true);
  const [disableRedeem, setDisableRedeem] = useState(true);
  const staffIdRef = useRef<HTMLInputElement>(null);

  // Handler for task 1: Retriving team based on ID
  const onCheckIdClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const staffId = staffIdRef.current!.value;
    if (staffId !== "") {
      axios
        .get(`http://localhost:3000/redemption/staff/${staffId}`)
        .then((response) => {
          const teamName = response.data.teamName;
          console.log(teamName);
          if (teamName == null) {
            setTeamName(
              "No team found. This person's ID is not in our database."
            );
            setDisableCheckRedeem(true);
          } else {
            setTeamName(teamName.team_name);
            setDisableCheckRedeem(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Please key in a staff ID!");
    }
  };

  // Handler for task 2: Returning whether a team can redeem a gift
  const onCheckRedeemableClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    axios
      .get(`http://localhost:3000/redemption/check/${teamName}`)
      .then((response) => {
        if (response.data.data) {
          setRedeemable("Yes!");
          setDisableRedeem(false);
        } else {
          setRedeemable("No :(");
          setDisableRedeem(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Handler for task 3: Attempt to create a redemption record
  const onRedeemAttemptClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (teamName !== "") {
      axios
        .post(`http://localhost:3000/redemption/create/${teamName}`)
        .then((response) => {
          setRedeemResult(response.data.message);
          if (response.data.message === "Redemption successful!") {
            setDisableRedeem(false);
            setRedeemable("");
          } else {
            setDisableRedeem(true);
            setRedeemable("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const idChangeHandler = (e: React.InputHTMLAttributes<HTMLInputElement>) => {
    setRedeemable("");
    setTeamName("");
    setRedeemResult("");
    setDisableRedeem(true);
    setDisableCheckRedeem(true);
  };

  return (
    <div className="App">
      <h1>Christmas Gift Redemption 🎁</h1>
      <div className="mainContainer">
        <div className="checkStaffId">
          Check staff ID:
          <form>
            <input
              type="text"
              ref={staffIdRef}
              placeholder="Input staff ID here"
              onChange={(e) => idChangeHandler(e)}
            />
            <div>
              Team :<div>{teamName}</div>
            </div>
            <button onClick={(e) => onCheckIdClickHandler(e)}> Check </button>
          </form>
        </div>
        <div className="redemptionWrapper">
          <div className="getRedemptionAvailability">
            <div>
              <div>{redeemable}</div>
            </div>
            <button
              disabled={disableCheckRedeem}
              onClick={(e) => onCheckRedeemableClickHandler(e)}
            >
              Check if team can redeem
            </button>
          </div>
          <div>
            <div className="redemptionContainer">
              <div>{redeemResult}</div>
              <button
                disabled={disableRedeem}
                onClick={(e) => {
                  onRedeemAttemptClickHandler(e);
                }}
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
