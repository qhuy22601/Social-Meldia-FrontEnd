import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAccounts, getAvata } from "../feature/followingAccounts/followingAccountSlice";
import FollowerAccountItem from "./FollowerAccountItem";

function AllAccounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowerAccounts = useSelector(
    (state) => state.followingAccountReducer.followerAccounts
  );
  const [url, setUrl] =useState('');
  const uploader = (file) =>{
  const reader = new FileReader();
  reader.addEventListener('load', ()=>{
      localStorage.setItem('UserAvata',reader.result)
  })
  reader.readAsDataURL(file);
  }
  
  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }
    dispatch(getAllAccounts());
    
  }, []);

  return (
    <div>
      <h1>Khám phá</h1>
      {storeFollowerAccounts ? (
        storeFollowerAccounts.map((followerAccount) => {
          return (
            <FollowerAccountItem
              key={followerAccount.id}
              id={followerAccount.id}
              firstName={followerAccount.firstName}
              lastName={followerAccount.lastName}
            />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default AllAccounts;
