import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className={"center"}>No links yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Origin</th>
          <th>Shortened</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, idx) => {
          return (
            <tr key={link._id}>
              <td>{idx + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`detail/${link._id}`}>Open link</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
