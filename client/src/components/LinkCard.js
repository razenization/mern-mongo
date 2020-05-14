import React from "react";

export const LinkCard = ({ link }) => {
  console.log(link.date);
  return (
    <>
      <h2>Link</h2>

      <p>
        Shortened link:&nbsp;
        <a href={link.to} target={"_blank"} rel={"noopener noreferrer"}>
          {link.to}
        </a>
      </p>
      <p>
        Origin:&nbsp;
        <a href={link.from} target={"_blank"} rel={"noopener noreferrer"}>
          {link.from}
        </a>
      </p>
      <p>
        Link clicks:&nbsp;
        <strong>{link.clicks}</strong>
      </p>
      <p>
        Create date:&nbsp;
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
