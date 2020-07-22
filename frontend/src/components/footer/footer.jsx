import React from "react";
import style from "./footer.module.scss";

function Footer({ children }) {
  return (
    <div className={style.footer}>
      {children}
      <footer>FDV | You Deserve a Better Budget</footer>
    </div>
  );
}

export default Footer;
