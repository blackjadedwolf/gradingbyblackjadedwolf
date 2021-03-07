import React from 'react';
import {useUser} from "services/api";

const ProfilePage = () => {

  const [user] = useUser();

  const isAdmin =
  user?.email === "gradingbyblackjadedwolf@gmail.com" ||
  (process.env.NODE_ENV === "development" && user?.email === "test@test.com");

  return(
    <div>
      Profile
    </div>
  )
}

export default ProfilePage;