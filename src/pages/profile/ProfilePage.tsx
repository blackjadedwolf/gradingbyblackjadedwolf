import { User } from "models";
import React, { useState } from "react";
import { resetPassword, updateUserProfile } from "services/api";

const ProfilePage = (props: {
  user?: firebase.default.User;
  userProfile?: Partial<User>;
}) => {
  const { user, userProfile } = props;

  const [firstName, setFirstName] = useState<string>(
    userProfile?.firstName ?? ""
  );
  const [lastName, setLastName] = useState<string>(userProfile?.lastName ?? "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    userProfile?.phoneNumber ?? ""
  );

  const [updated, setUpdated] = useState(false);
  const [sentPasswordReset, setSentPasswordReset] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdated(false);
    if (user?.email) {
      await updateUserProfile({
        email: userProfile?.email ?? user?.email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      })
        .then(() => {
          setUpdated(true);
        })
        .catch(() => {
          setUpdated(false);
        });
    }
  };

  return (
    <div className="profile-wrap">
      <div className="container profile-container border border-primary">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>First Name</label>
              <input
                className="form-control"
                id="f_name"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Last Name</label>
              <input
                className="form-control"
                id="l_name"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                readOnly
                defaultValue={user?.email ?? userProfile?.email}
              />
            </div>
            {!sentPasswordReset ? <button className="btn btn-primary col-md-6" onClick={() => {
              if(user?.email) {
                resetPassword(user.email).then(() => {
                  setSentPasswordReset(true);
                })
              } else if (userProfile?.email) {
                resetPassword(userProfile.email).then(() => {
                  setSentPasswordReset(true);
                })
              }
            }}>
              Send Password Reset Email
            </button> : <p>Look at your email for password reset link!</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNum"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </div>
          {/* <div className="form-row">
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
          </div> */}
          <div className="row">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            {updated && <p>Updated successfully!</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
