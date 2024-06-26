import React from "react";
import profiledataScss from "./profiledata.module.scss";
import ProfileImage from "components/profileImage";


const roles = {
  admin: "Admin",
  manager: "Menejer",
  branch_director: "Filial direktor",
  supervisor: "Supervisor",
  operator: "Operator",
  agent: "Agent",
  driver: "Yetkazib beruvchi",
}


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
            {userProfile?.first_name
              ? userProfile?.first_name + " " + userProfile?.last_name
              : userProfile?.name}
          </h1>
          <p className={profiledataScss.lavozim}>
            {userProfile.role ? roles[userProfile.role] : null}
          </p>
        </div>
        <div>
          <ProfileImage />
        </div>
      </div>
      <div className={profiledataScss.third_wrapper}>
        <ul>
          {userProfile.phone_number ||
          (userProfile.phone && userProfile.phone_number) ||
          userProfile.phone ? (
            <li>
              {userProfile.phone_number || userProfile.phone ? (
                <span>Tel:</span>
              ) : null}
              {userProfile.phone_number || userProfile.phone}
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
              <span>Kim tomonidan tizimga kiritilgan:</span>
              {userProfile.created_by}
            </li>
          ) : null}
          {userProfile.car && userProfile.car.type ? (
            <li>
              <span>Mashina turi:</span>
              {userProfile?.car?.type}
            </li>
          ) : null}
          {userProfile.car && userProfile.car.number ? (
            <li>
              <span>Mashina raqami:</span>
              {userProfile?.car?.number}
            </li>
          ) : null}
          {userProfile.fixed ? (
            <li>
              <span>Oylik maosh:</span>
              {userProfile?.fixed}
            </li>
          ) : null}
          {userProfile?.total_amount ? (
            <li>
              <span>Xisoblangan oylik:</span>
              {userProfile?.total_amount}
            </li>
          ) : null}
        </ul>
        <ul>
          <li>
            {userProfile.address ? <span>Manzil:</span> : null}
            {userProfile.address ? userProfile.address : null}
          </li>
          <li>
            {userProfile.warehouse ? <span>Filial:</span> : null}
            {userProfile.warehouse ? userProfile.warehouse?.name : null}
          </li>
          <li>
            {userProfile.birth_date ? <span>Tug'ulgan sana:</span> : null}
            {userProfile.birth_date ? userProfile.birth_date : null}
          </li>
          <li>
            {userProfile.KPI ? <span>KPI:</span> : null}
            {userProfile.KPI ? userProfile.KPI : null}
          </li>
          {userProfile.kpi_by_sales ? (
            <li>
              <span>KPI maosh:</span>
              {userProfile?.kpi_by_sales}
            </li>
          ) : null}
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
