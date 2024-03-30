import React from "react";
import { userProfile } from "assets/db";
import profileScss from "./profile.module.scss";
import CustomTable from "components/table";
import { Button } from "antd";
import DateFilter from "components/dateFilter";
import { useState } from "react";
function Profile({
  data,
  btnText,
  columns,
  items,
  columns1,
  items1,
  tableRight = false,
  tableBottom = false,
}) {
  const [dateValue, setDateValue] = useState("");
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  return (
    <div className="container">
      <div className={profileScss.biggest_wrapper}>
        {data.map((item, index, data) => (
          <div key={index} className={profileScss.flex_div}>
            <div className={profileScss.main_wrapper}>
              <div className={profileScss.second_wrapper}>
                <div>
                  <h1 className={profileScss.name}>
                    {item.name ? item.name : null}
                  </h1>
                  <p className={profileScss.lavozim}>
                    {item.lavozim ? item.lavozim : null}
                  </p>
                </div>
                <div>
                  <img src={item.profileImg ? item.profileImg : null} alt="" />
                </div>
              </div>
              <div className={profileScss.third_wrapper}>
                <ul>
                  <li>
                    <span>Tel:</span>
                    {item.phoneNumber ? item.phoneNumber : null}
                  </li>
                  <li>
                    <span>Lavozim:</span>
                    {item.lavozim ? item.lavozim : null}
                  </li>
                  <li>
                    <span>Oylik:</span>
                    {item.salary ? item.salary : null}
                  </li>
                  <li>
                    <span>Status:</span>
                    {item.status === true ? "Aktiv" : "noActive"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Adress:</span>
                    {item.adress ? item.adress : null}
                  </li>
                  <li>
                    <span>Filial:</span>
                    {item.branch ? item.branch : null}
                  </li>
                  <li>
                    <span>KPI:</span>
                    {item.KPI ? item.KPI : null}
                  </li>
                </ul>
              </div>
              <div className={profileScss.btn}>
                <Button
                  className={profileScss.bnt1}
                  size="large"
                  type="primary"
                >
                  {btnText}
                </Button>
              </div>
            </div>
            <div className={profileScss.table}>
              {tableRight && (
                <CustomTable
                  {...{
                    columns: columns,
                    items: items,
                    title: "Topshiriqlar",
                    mineHeigth: "230px",
                    hasStatus: true,
                    scrollY: true,
                    height: 230,
                    hideColumns: true,
                    hasPagination: true,
                  }}
                />
              )}
            </div>
          </div>
        ))}
        <div>
          <div className={profileScss.date}>
            <DateFilter  onChange={onchange} value={dateValue}/>
            <div style={{marginTop:'20px'}}>
            {tableBottom && (
              <CustomTable 
                {...{
                  columns: columns1,
                  items: items1,
                  title: "Maosh to’lo’vi ",
                  mineHeigth: "230px",
                  hasStatus: true,
                  scrollY: true,
                  height: 230,
                  hideColumns: true,
                  hasPagination: true,
                }}
              />
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
