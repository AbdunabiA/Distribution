import React from "react";
import profiledataScss from "./profiledata.module.scss";
import { Button } from "antd";
import ProfileImage from "components/profileImage";

export function ProfileData({ userProfile, buttons = null, height = null }) {
  return (
    <div style={{ height: height }} className={profiledataScss.main_wrapper}>
      <div className={profiledataScss.second_wrapper}>
        <div>
          <h1 className={profiledataScss.name}>
            {userProfile.data.name ? userProfile.data.name : null}
          </h1>
          <p className={profiledataScss.lavozim}>
            {userProfile.lavozim ? userProfile.lavozim : null}
          </p>
        </div>
        <div>
          <ProfileImage />
        </div>
      </div>
      <div className={profiledataScss.third_wrapper}>
        <ul>
          {userProfile.data.phone && userProfile.data.phone ? (
            <li>
              {userProfile.data.phone ? <span>Tel:</span> : null}
              {userProfile.data.phone ? userProfile.data.phone : null}
            </li>
          ) : null}
          {userProfile.lavozim && userProfile.lavozim ? (
            <li>
              {userProfile.lavozim ? <span>Lavozim:</span> : null}
              {userProfile.lavozim ? userProfile.lavozim : null}
            </li>
          ) : null}
          {userProfile.salary && userProfile.salary ? (
            <li>
              {userProfile.salary ? <span>Oylik:</span> : null}
              {userProfile.salary ? userProfile.salary : null}
            </li>
          ) : null}
          {userProfile.data.status && userProfile.data.status ? (
            <li>
              {userProfile.data.status ? (
                <span>Status:{userProfile.data.status}</span>
              ) : null}
            </li>
          ) : null}
          {userProfile.byWhichPerson && userProfile.byWhichPerson ? (
            <li>
              {userProfile.byWhichPerson ? (
                <span>Kim tomonidan tizimga kiritilgan:</span>
              ) : null}
              {userProfile.byWhichPerson ? userProfile.byWhichPerson : null}
            </li>
          ) : null}
        </ul>
        <ul>
          <li>
            {userProfile.data.address ? <span>Adress:</span> : null}
            {userProfile.data.address ? userProfile.data.address : null}
          </li>
          <li>
            {userProfile.data.warehouse ? <span>Filial:</span> : null}
            {userProfile.data.warehouse ? userProfile.data.warehouse : null}
          </li>
          <li>
            {userProfile.KPI ? <span>KPI:</span> : null}
            {userProfile.KPI ? userProfile.KPI : null}
          </li>
        </ul>
      </div>
      <div className={profiledataScss.btn}>
        {buttons ? (
          <div className={profiledataScss.btn_wrapper}>{buttons}</div>
        ) : null}
      </div>
    </div>
  );
}
