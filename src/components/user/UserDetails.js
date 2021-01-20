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
  }, [user.asteroidId]);

  return (
    <div>
      <div>
        <h3 className="text-center">Nasa Details</h3>
      </div>

      <div className="card nasa-card">
        <div className="card-body">
          <p className="card-text">
            <b>JPL Url</b> : {userData.nasa_jpl_url}
          </p>
          <p className="card-text">
            <b>Name</b> : {userData.name}
          </p>
          <p className="card-text">
            <b>Is potentially hazardous asteroid</b> :{" "}
            {userData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(UserFormDetails);
