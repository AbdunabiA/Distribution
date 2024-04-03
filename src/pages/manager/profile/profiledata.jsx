import React from "react";
import profiledataScss from "./profiledata.module.scss";
import { Button } from "antd";
function ProfileData({ userProfile }) {
  return (
    <div className={profiledataScss.main_wrapper}>
      <div className={profiledataScss.second_wrapper}>
        <div>
          <h1 className={profiledataScss.name}>
            {userProfile.name ? userProfile.name : null}
          </h1>
          <p className={profiledataScss.lavozim}>
            {userProfile.lavozim ? userProfile.lavozim : null}
          </p>
        </div>
        <div>
          <img
            src={userProfile.profileImg ? userProfile.profileImg : null}
            alt="Profile image"
          />
        </div>
      </div>
      <div className={profiledataScss.third_wrapper}>
        <ul>
          <li>
            <span>Tel:</span>
            {userProfile.phoneNumber ? userProfile.phoneNumber : null}
          </li>
          <li>
            <span>Lavozim:</span>
            {userProfile.lavozim ? userProfile.lavozim : null}
          </li>
          <li>
            <span>Oylik:</span>
            {userProfile.salary ? userProfile.salary : null}
          </li>
          <li>
            <span>Status:</span>
            {userProfile.status === true ? "Aktiv" : "noActive"}
          </li>
        </ul>
        <ul>
          <li>
            <span>Adress:</span>
            {userProfile.adress ? userProfile.adress : null}
          </li>
          <li>
            <span>Filial:</span>
            {userProfile.branch ? userProfile.branch : null}
          </li>
          <li>
            <span>KPI:</span>
            {userProfile.KPI ? userProfile.KPI : null}
          </li>
        </ul>
      </div>
      <div className={profiledataScss.btn}>
        <Button className={profiledataScss.bnt1} size="large" type="primary">
          O'zgartirish
        </Button>
      </div>
    </div>
  );
}

export default ProfileData;
