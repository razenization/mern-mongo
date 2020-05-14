import React from "react";
import classes from "./ConfirmationPopup.module.css";

export const ConfirmationPopup = ({ onConfirm, queryResult }) => {
  console.log(queryResult);
  return (
    <div className={classes.Popup__wrapper}>
      <div className={classes.Popup__content}>
        <h6 style={{ marginBottom: "1rem" }}>Confirm test creation</h6>
        <div className={classes.Popup__user_input}>
          <div className={classes.Popup__query_result}>
            <pre className={classes.Popup__query_result_text}>
              {JSON.stringify(queryResult, null, "\t")}
            </pre>
          </div>
        </div>
        <button
          onClick={() => onConfirm(true)}
          className={"btn-small blue darken-2"}
        >
          Confirm
        </button>
        <button
          onClick={() => onConfirm(false)}
          className={"btn-small red darken-2"}
          style={{ marginLeft: "1rem" }}
        >
          Abort
        </button>
      </div>
    </div>
  );
};
