/**
 * This Component is used for Show Nasa details
 *
 */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import nasaServices from "../../services/api";

const mapStateToProps = ({ dispatch, user }) => ({
  dispatch: dispatch,
  countryName: user.countryName,
  user,
});

const UserFormDetails = ({ user }) => {
  const [userData, setUserData] = useState([]);

  /**
   * Method used for get nasa details from id
   */
  useEffect(() => {
    nasaServices
      .getNasaDetailsById(user.asteroidId)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div>
        <h3 className="text-center">User Details</h3>
      </div>

      <div className="card country-card">
        <div className="card-body">
          <p className="card-text">JPL Url : {userData.nasa_jpl_url}</p>
          <p className="card-text">Name : {userData.name}</p>
          <p className="card-text">
            Is potentially hazardous asteroid :{" "}
            {userData.is_potentially_hazardous_asteroid}
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(UserFormDetails);
