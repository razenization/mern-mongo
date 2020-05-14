import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { Codearea } from "../components/Codearea/Codearea";
// import { ConfirmationPopup } from "../components/ConfirmationPopup/ConfirmationPopup";

export const AdminPage = () => {
  const [isAdmin, setAdmin] = useState(false);
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [testName, setTestName] = useState("");
  const [taskQuery, setTaskQuery] = useState("");
  const [output, setOutput] = useState("");
  // const [popup, setPopup] = useState({ shown: false });
  const [defaultInput, setDefaultInput] = useState("");
  // const [expectedOutput, setExpected] = useState("");

  const getAdminStatus = useCallback(async () => {
    try {
      const { isAdmin } = await request(
        `/api/profile/adminStatus`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setAdmin(isAdmin);
    } catch (e) {}
  }, [token, request]);

  const createHandler = async () => {
    try {
      await request(
        "/api/test/create",
        "POST",
        {
          testName,
          taskQuery,
          output,
          defaultInput,
        },
        { Authorization: `Bearer ${token}` }
      );
      // setPopup({
      //   shown: true,
      //   queryResult: data.queryResult,
      // });
      // if (data.expected) setExpected(data.expected);
    } catch (e) {}
  };

  useEffect(() => {
    getAdminStatus();
  }, [getAdminStatus]);

  // const onConfirmHandler = async (status) => {
  //   console.log(status);
  //   try {
  //     const data = await request(
  //       "/api/test/confirmCreation",
  //       "POST",
  //       {
  //         confirmed: status,
  //       },
  //       { Authorization: `Bearer ${token}` }
  //     );
  //     console.log(data);
  //   } catch (e) {}
  // };

  if (loading) return <Loader />;

  if (isAdmin) {
    return (
      <>
        {/*{popup.shown && (*/}
        {/*  <ConfirmationPopup*/}
        {/*    queryResult={popup.queryResult}*/}
        {/*    onConfirm={(confirm) => createHandler(confirm)}*/}
        {/*  />*/}
        {/*)}*/}
        <h1>Admin page</h1>
        <h5>
          Тут вы можете создать свой тест для тренажера в личном кабинете.
          <br />
          Предполагается, что функции асинхронны.
        </h5>
        <div style={{ width: "60%" }}>
          <div className="input-field">
            <input
              id="test_header"
              type="text"
              className="validate"
              onChange={(e) => setTestName(e.target.value)}
            />
            <label htmlFor="test_header">Название теста</label>
          </div>
          <h6>
            Запрос для создания исходного документа и наполнения его данными.
          </h6>
          <Codearea
            setHeight={"880px"}
            maxLines={50}
            defValue={"const mongoose = require('mongoose');\n"}
            pressHandler={(e) => setTaskQuery(e.target.value)}
            placeholder={
              "Запрос для создания исходного документа и наполнения его данными"
            }
          />
          <br />
          <Codearea
            setHeight={"600px"}
            maxLines={35}
            defValue={"const mongoose = require('mongoose');\n"}
            pressHandler={(e) => setOutput(e.target.value)}
            placeholder={
              "Запрос для получения нужных данных из созданных выше документов"
            }
          />
          <br />
          <Codearea
            setHeight={"600px"}
            maxLines={35}
            defValue={"const mongoose = require('mongoose');\n"}
            pressHandler={(e) => setDefaultInput(e.target.value)}
            placeholder={"Стартовый код для пользователя"}
          />
          <br />
          {/*<div className="input-field">*/}
          {/*  <input id="test_task" type="text" className="validate" />*/}
          {/*  <label htmlFor="test_task">Запрос для создания документа</label>*/}
          {/*</div>*/}
          <button
            className="btn blue darken-2"
            onClick={() => createHandler(false)}
            disabled={loading}
          >
            Создать!
          </button>
        </div>
      </>
    );
  }

  return <></>;
};
