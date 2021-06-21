import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { FaChild, FaBell, FaProcedures, FaUsers } from "react-icons/fa";
import "./InfoBox.css";

function InfoBox({ title, total, icon }) {
  const getIcon = (type) => {
    switch (type) {
      case "users":
        return (
          <div class="icon icon-shape bg-gradient-blue text-white rounded-circle shadow">
            <FaUsers className="icon" />
          </div>
        );
      case "bell":
        return (
          <div class="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
            <FaBell className="icon" />
          </div>
        );
      case "proc":
        return (
          <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
            <FaProcedures className="icon" />
          </div>
        );
      case "child":
        return (
          <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
            <FaChild className="icon" />
          </div>
        );
    }
  };
  return (
    <div class="card card-stats">
      <div class="card-body">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted">{title}</h5>
          <span class="h2 font-weight-bold deaths color-blue count">
            {new Intl.NumberFormat().format(total)}
          </span>
        </div>
        {getIcon(icon)}
      </div>
    </div>
  );
}

export default InfoBox;
