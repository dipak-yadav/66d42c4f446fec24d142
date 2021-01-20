/**
 * This Component is used for Show Default page
 *
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../App.css";
import UserForm from './user/UserForm'

const mapStateToProps = ({ dispatch, user }) => ({
  dispatch: dispatch,
  user
});
const Home = ({ user }) => {
  useEffect(() => {
  }, []);


  return (
    <div className="container">
      <UserForm/>
    </div>
  );
};

export default connect(mapStateToProps)(Home);
