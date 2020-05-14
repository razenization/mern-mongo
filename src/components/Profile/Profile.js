import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LinksList } from "../LinksList";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import classes from "./Profile.module.css";

export const Profile = ({ profile }) => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [uploadImg, setUploadImg] = useState(null);
  const history = useHistory();

  const changeHandler = (event) => {
    setUploadImg(event.target.files[0]);
  };

  const updateAvatar = async (uploadImg) => {
    try {
      const formData = new FormData();
      formData.append("avatar", uploadImg);
      if (uploadImg) {
        await request(
          "/api/profile/updateAvatar",
          "POST",
          {
            formData,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.go(0);
      }
    } catch (e) {}
  };

  return (
    <div className={classes.Profile}>
      <h1 className={classes.Profile__header}>Ваш профиль</h1>
      <div className={classes.Profile__content}>
        <div className={classes.Profile__avatar}>
          {!profile.avatar ? (
            <p>У вас еще нет аватара. Загрузить?</p>
          ) : (
            <div style={{ marginBottom: "2rem" }}>
              <img
                src={`/assets/img/${profile.avatar}`}
                alt=""
                className={classes.Profile__avatar_pic}
              />
              <span>{profile.email}</span>
            </div>
          )}
          <div>
            <input
              placeholder="Avatar Upload"
              id="avatar"
              name="avatar"
              type="file"
              onChange={(e) => changeHandler(e)}
            />
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
              onClick={(e) => updateAvatar(uploadImg)}
              disabled={loading}
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
      <div className={"Profile__links"}>
        <h3 className={"Profile__links-header"}>Ваши ссылки</h3>
        <LinksList links={profile.links} />
      </div>
    </div>
  );
};
