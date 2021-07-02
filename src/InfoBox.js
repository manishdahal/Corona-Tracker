import React from "react";
import { FaChild, FaBell, FaProcedures, FaUsers } from "react-icons/fa";
import "./InfoBox.css";

function InfoBox({ title, total, icon }) {
  const getIcon = (type) => {
    switch (type) {
      case "users":
        return (
          <div className=" icon-shape bg-gradient-blue text-white rounded-circle shadow">
            <FaUsers className="icon" />
          </div>
        );
      case "bell":
        return (
          <div className="icon-shape bg-gradient-orange text-white rounded-circle shadow">
            <FaBell className="icon" />
          </div>
        );
      case "proc":
        return (
          <div className=" icon-shape bg-gradient-red text-white rounded-circle shadow">
            <FaProcedures className="icon" />
          </div>
        );
      case "child":
        return (
          <div className=" icon-shape bg-gradient-green text-white rounded-circle shadow">
            <FaChild className="icon" />
          </div>
        );
    }
  };
  return (
    <div className="card-body">
      <div className="full__width">
        <h5 className="card-title text-uppercase text-muted">{title}</h5>
      </div>
      <div className="full__width">
        <h2 className="h2 font-weight-bold deaths color-blue count">
          {new Intl.NumberFormat().format(total)}
        </h2>
      </div>
      {getIcon(icon)}
    </div>
  );
}

export default InfoBox;
