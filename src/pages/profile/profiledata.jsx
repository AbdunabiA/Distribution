import React from "react";
import profiledataScss from "./profiledata.module.scss";
import ProfileImage from "components/profileImage";

 export function ProfileData({
  userProfile,
  buttons = null,
  height = null
}) {
  return (
    <div style={{ height: height }} className={profiledataScss.main_wrapper}>
      <div className={profiledataScss.second_wrapper}>
        <div>
          <h1 className={profiledataScss.name}>
            {userProfile?.first_name ? userProfile?.first_name +
              " " +
              userProfile?.last_name : userProfile?.name}
          </h1>
          <p className={profiledataScss.lavozim}>
            {userProfile.role ? userProfile.role : null}
          </p>
        </div>
        <div>
          <ProfileImage />
        </div>
      </div>
      <div className={profiledataScss.third_wrapper}>
        <ul>
          {userProfile.phone_number && userProfile.phone_number ? (
            <li>
              {userProfile.phone_number ? <span>Tel:</span> : null}
              {userProfile.phone_number}
            </li>
          ) : null}
          {userProfile.username && userProfile.username ? (
            <li>
              {userProfile.username ? <span>Username:</span> : null}
              {userProfile.username}
            </li>
          ) : null}
          {userProfile?.salary && userProfile?.salary ? (
            <li>
              {userProfile?.salary ? <span>Oylik:</span> : null}
              {userProfile?.salary}
            </li>
          ) : null}
          {userProfile.status && userProfile.status ? (
            <li>
              {userProfile.status ? <span>Status:</span> : null}
              {userProfile.status}
            </li>
          ) : null}
          {userProfile.created_by && userProfile.created_by ? (
            <li>
              {userProfile.created_by ? (
                <span>Kim tomonidan tizimga kiritilgan:</span>
              ) : null}
              {userProfile.created_by}
            </li>
          ) : null}
        </ul>
        <ul>
          <li>
            {userProfile.address ? <span>Adres:</span> : null}
            {userProfile.address ? userProfile.address : null}
          </li>
          <li>
            {userProfile.warehouse ? <span>Filial:</span> : null}
            {userProfile.warehouse ? userProfile.warehouse : null}
          </li>
          <li>
            {userProfile.birth_date ? <span>Tugulgan sana:</span> : null}
            {userProfile.birth_date ? userProfile.birth_date : null}
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
