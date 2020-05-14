import React, { useState } from "react";
import classes from "./Training.module.scss";
import { Codearea } from "../Codearea/Codearea";
import { TestCard } from "../TestCard/TestCard";

export const Training = ({
  tests,
  submit,
  queryResult,
  setActive,
  activeTest,
}) => {
  const [query, setQuery] = useState("");
  const classList = [classes.Training__query_result];

  if (queryResult.className) classList.push(classes[queryResult.className]);

  return (
    <div className={classes.Training__wrapper}>
      <h3>Тренажер кода для MongoDB</h3>
      <div className={classes.Training__main}>
        <div className={classes.Training__user_field}>
          <Codearea pressHandler={(e) => setQuery(e.target.value)} />
          <button
            onClick={() => submit(query, activeTest)}
            className="waves-light btn-small orange darken-2"
            style={{ marginTop: "1rem" }}
          >
            <i className="material-icons right">settings_ethernet</i>
            Query!
          </button>
        </div>
        <div className={classes.Training__task}>
          <h5 className={classes.Training__task_header}>Доступные тесты:</h5>
          {tests.map((test, idx) => {
            return <TestCard key={idx} test={test} setTest={setActive} />;
          })}
        </div>
      </div>
      <p className={classList.join(" ")}>{queryResult.result}</p>
      {classList.includes(classes.success) && (
        <p className={classes.Training__congrats}>
          Поздравляем с успешным прохождением теста :)
        </p>
      )}
    </div>
  );
};
