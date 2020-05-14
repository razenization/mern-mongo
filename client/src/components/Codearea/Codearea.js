import classes from "../Training/Training.module.scss";
import React, { useEffect, useState } from "react";

export const Codearea = ({
  pressHandler,
  placeholder,
  defValue = "",
  setHeight,
  maxLines = 11,
}) => {
  // const [query, setQuery] = useState("");
  const [codeLines, setCodeLines] = useState(["random"]);

  const textareaHandler = (e) => {
    const newLinesCount = e.target.value.match(/\n/g) || [];
    newLinesCount.push("random");
    if (newLinesCount.length <= maxLines) {
      // setQuery(e.target.value);
      setCodeLines(newLinesCount);
    } else {
      e.target.value = e.target.value.replace(/\n$/, "");
    }
  };

  useEffect(() => {
    const newLinesCount = defValue.match(/\n/g) || [];
    newLinesCount.push("random");
    setCodeLines(newLinesCount);
  }, [defValue]);

  return (
    <div className={classes.Textarea__wrapper} style={{ height: setHeight }}>
      <div className={classes.Textarea__lines_wrapper}>
        {codeLines.map((line, idx) => {
          return (
            <p key={idx} className={classes.Textarea__line}>
              {idx + 1}
            </p>
          );
        })}
      </div>
      <textarea
        onKeyUp={pressHandler}
        onChange={textareaHandler}
        id={"training-textarea"}
        className={classes.Training__textarea}
        placeholder={placeholder}
        defaultValue={defValue}
      />
    </div>
  );
};
