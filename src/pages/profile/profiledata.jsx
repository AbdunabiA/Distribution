import React from "react";
import profiledataScss from "./profiledata.module.scss";
import { Button } from "antd";
import ProfileImage from "components/profileImage";

function ProfileData({
  userProfile,
  button1Text = null,
  button2Text = null,
  button3Text = null,
  button1 = false,
  button2 = false,
  button3 = false,
  height = null
}) {
  return (
    <div style={{height:height}} className={profiledataScss.main_wrapper}>
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
          <ProfileImage/>
        </div>
      </div>
      <div className={profiledataScss.third_wrapper}>
        <ul>
         {userProfile.phoneNumber && userProfile.phoneNumber ?  <li>
            {userProfile.phoneNumber ? <span>Tel:</span> : null}
            {userProfile.phoneNumber ? userProfile.phoneNumber : null}
          </li> : null}
          {userProfile.lavozim && userProfile.lavozim ? <li>
           { userProfile.lavozim ?  <span>Lavozim:</span> : null}
            {userProfile.lavozim ? userProfile.lavozim : null}
          </li> : null}
          {userProfile.salary && userProfile.salary ? <li>
            {userProfile.salary ? <span>Oylik:</span> : null}
            {userProfile.salary ? userProfile.salary : null}
          </li> : null}
         {userProfile.status && userProfile.status ? <li>
            {userProfile.status ? <span>Status:</span> :null}
            {userProfile.status === true ? "Aktiv" : "noActive"}
          </li> : null}
          {userProfile.byWhichPerson && userProfile.byWhichPerson ? <li>
            {userProfile.byWhichPerson ? <span>Kim tomonidan tizimga kiritilgan:</span> :null}
            {userProfile.byWhichPerson ? userProfile.byWhichPerson : null}
          </li> : null}
        </ul>
        <ul>
          <li>
            { userProfile.adress ? <span>Adress:</span> : null}
            {userProfile.adress ? userProfile.adress : null}
          </li>
          <li>
            {userProfile.branch ? <span>Filial:</span> : null}
            {userProfile.branch ? userProfile.branch : null}
          </li>
          <li>
            {userProfile.KPI ? <span>KPI:</span> : null}
            {userProfile.KPI ? userProfile.KPI : null}
          </li>
        </ul>
      </div>
      <div className={profiledataScss.btn}>
        {button3 && button3 ? (
          <Button className={profiledataScss.bnt1} size="large" type="primary">
            {button3Text ? button3Text : null}
          </Button>
        ) : null}
        {button2 && button2 ? (
          <Button className={profiledataScss.bnt1} size="large" type="primary">
            {button2Text ? button2Text : null}
          </Button>
        ) : null}
        { button1 && button1 ? <Button className={profiledataScss.bnt1} size="large" type="primary">
          {button1Text ? button1Text : null}
        </Button> : null}
      </div>
    </div>
  );
}

export default ProfileData;
