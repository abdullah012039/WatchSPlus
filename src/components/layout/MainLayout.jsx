import React from "react";
import styles from "../../styles/layout/MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      {/* <div className={styles.mainSlider}>Main Slider</div>
      <div className={styles.list}>List</div>
      <div className={styles.secondSlider}>Second Slider</div>
      <div className={styles.thirdSlider}>Third Slider</div>
      <footer className={styles.footer}>Footer</footer> */}
    </div>
  );
};

export default MainLayout;