import React, { useState } from "react";
import classes from "./BackDrop.module.scss";
import { Transition } from "react-transition-group";

export const BackDrop = () => {
  const [active, setActive] = useState(true);

  return (
    <Transition in={active} timeout={1000}>
      {(state) => (
        <div className={`${classes.Backdrop__main} ${state}`}>
          <div className={classes.Backdrop__container}>
            <p className={classes.Backdrop__text}>
              Welcome to link shortener. You have to complete registration in
              order to obtain access to this project. Verification is done via
              JWT Token so all you have to do is to specify your e-mail and
              password for registration. Thereafter, every time you login, your
              session will be held for 1 hour.
            </p>
            <button
              className={classes.accept_btn}
              onClick={() => setActive(false)}
              autoFocus
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </Transition>
  );
};
