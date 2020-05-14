import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { Profile } from "../components/Profile/Profile";
import { Training } from "../components/Training/Training";

export const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [queryResult, setQueryResult] = useState({});
  const [tests, setTests] = useState(null);
  const [activeTest, setActiveTest] = useState({});
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchProfile = useCallback(async () => {
    try {
      const { user, links, avatarSrc } = await request(
        "/api/profile",
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      user.links = links;
      user.avatar = avatarSrc;
      setProfileInfo(user);
    } catch (e) {}
  }, [token, request]);

  const queryHandler = async (query) => {
    try {
      const data = await request(
        "/api/test/query",
        "POST",
        {
          query,
          activeTest,
        },
        { Authorization: `Bearer ${token}` }
      );
      console.log(data.result);
      setQueryResult({
        result: data.result.toString(),
        className: data.message,
      });
    } catch (e) {}
  };

  const getTests = useCallback(async () => {
    try {
      const { tests } = await request("/api/test/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setTests(tests);
    } catch (e) {}
  }, [request, token]);

  useEffect(() => {
    getTests();
  }, [getTests]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && profileInfo && (
        <>
          <Profile profile={profileInfo} />
          <Training
            activeTest={activeTest}
            setActive={setActiveTest}
            tests={tests}
            submit={queryHandler}
            queryResult={queryResult}
          />
        </>
      )}
    </>
  );
};
