/**
 * This Component is used for Show User form
 *
 */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-dropdown-select";
import nasaServices from "../../services/api";

const mapStateToProps = ({ dispatch }) => ({
  dispatch: dispatch,
});

const UserForm = ({ dispatch }) => {
  const history = useHistory();
  const [isDisable, setIsDisable] = useState(true);
  const [asteriodId, setAsteriodId] = useState("");
  const [isRandom, setIsRandom] = useState(false);
  const [asteroidDrp, setAsteroidDrp] = useState(["one", "two", "three"]);

  useEffect(() => {}, []);

  /**
   * Method used for submit form data
   */
  const onSubmit = () => {
    saveData(asteriodId);
  };

  /**
   * Method used for save form data and move to detail page
   * @param {*} id
   */
  const saveData = (id) => {
    dispatch({
      type: "user/ADD_USER",
      payload: id,
    });
    history.push("/nasa-details");
  };

  /**
   * Method used for get all nasa details
   */
  const onSubmitRandom = () => {
    setIsRandom(true);
    nasaServices
      .getNasaDetails()
      .then((response) => {
        setAsteroidDrp(response.data.near_earth_objects);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * Method for on change event
   * @param {*} event
   */
  const onHandleChange = (event) => {
    setAsteriodId(event.target.value);
    if (event.target.value !== "") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  /**
   * Method Used for getting nasa id
   * @param {*} event
   */
  const onSelectAsteroidId = (event) => {
    saveData(event[0].id);
  };

  return (
    <div>
      <h3>User Form</h3>
      <form>
        <div className="form-group">
          <label htmlFor="asteroid_id">Enter Asteroid ID : </label>
          <input
            type="asteroid_id"
            className="form-control asteriod-id"
            id="asteroid_id"
            placeholder="Enter Asteroid ID"
            required
            value={asteriodId}
            onChange={(e) => onHandleChange(e)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isDisable}
          onClick={onSubmit}
        >
          Submit
        </button>
        <span>OR</span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSubmitRandom}
        >
          Random Asteroid
        </button>
      </form>

      {isRandom ? (
        <Select
          options={asteroidDrp}
          labelField="name"
          valueField="id"
          onChange={(e) => onSelectAsteroidId(e)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default connect(mapStateToProps)(UserForm);
