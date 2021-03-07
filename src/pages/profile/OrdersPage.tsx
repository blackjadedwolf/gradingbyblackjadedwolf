import React, {useState} from 'react';
import {useUser} from "services/api";

const OrdersPage = () => {

  const [user] = useUser();

  const isAdmin =
  user?.email === "gradingbyblackjadedwolf@gmail.com" ||
  (process.env.NODE_ENV === "development" && user?.email === "test@test.com");


}