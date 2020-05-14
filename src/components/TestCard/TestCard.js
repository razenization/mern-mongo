import React, { useEffect, useState } from "react";
import classes from "./TestCard.module.scss";

export const TestCard = (props) => {
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (showRules) props.setTest(props.test);
  }, [showRules, props]);

  return (
    <div className={classes.Test__wrapper} onClick={() => setShowRules(true)}>
      {showRules ? (
        <>
          <div>
            <p className={classes.Test__inner_header}>
              Изучите данный код и визуализируйте его результат.
            </p>
            <pre>{props.test.task}</pre>
          </div>
          <div>
            <p className={classes.Test__inner_header}>
              Вы можете использовать этот базовый код для своей программы:
            </p>
            <pre>{props.test.defaultInput}</pre>
          </div>
          <div>
            <p className={classes.Test__inner_header}>
              Чтобы успешно пройти тест получите следующий результат:
            </p>
            <pre>{JSON.stringify(props.test.expectedOutput, null, "\t")}</pre>
          </div>
        </>
      ) : (
        <p className={classes.Test__text}>{props.test.name}</p>
      )}
    </div>
  );
};
