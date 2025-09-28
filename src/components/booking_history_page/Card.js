'use client';
import React from "react";
import style from './Card.module.scss';

const InfoCard = ({ icon, title, subtitle }) => {
  return (
    <div className={`card shadow-sm p-3 text-center h-100 d-block mt-3 ${style.c} `}>
      <div className={`mb-2 fs-15 text-primary ${style.i}`}>
        {icon}
      </div>
      <h5 className="fw-bold">{title}</h5>
      <p className="text-secondary mb-0">{subtitle}</p>
    </div>
  );
};

export default InfoCard;
