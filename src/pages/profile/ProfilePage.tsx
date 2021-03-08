import React from 'react';
import {useUser} from "services/api";

const ProfilePage = () => {

  const [user] = useUser();

  const isAdmin =
  user?.email === "gradingbyblackjadedwolf@gmail.com" ||
  (process.env.NODE_ENV === "development" && user?.email === "test@test.com");

  

  return(
    <div className="profile-wrap">
      <div className="container profile-container border border-primary">
      <form>
      <div className="form-row">
      <div className="form-group col-md-6">
        <label>Email</label>
        <input type="email" className="form-control" id="email" placeholder="Email"/>
      </div>
    <div className="form-group col-md-6">
      <label>Password</label>
      <input type="password" className="form-control" id="password4" placeholder="Password"/>
    </div>
  </div>
  <div className="form-group">
    <label>Address</label>
    <input type="text" className="form-control" id="address" placeholder="1234 Main St"/>
  </div>
  <div className="form-group">
    <label>Phone Number</label>
    <input type="text" className="form-control" id="phoneNum" placeholder="Phone Number"/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label>City</label>
      <input type="text" className="form-control" id="city"/>
    </div>
    <div className="form-group col-md-4">
      <label>State</label>
      <select id="state" className="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div className="form-group col-md-2">
      <label>Zip</label>
      <input type="text" className="form-control" id="zip"/>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Save</button>
</form>
      </div>
    </div>
  )
}

export default ProfilePage;