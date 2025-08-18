import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt as halfStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

function Estrellas({ puntaje }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (puntaje >= i) {
      stars.push(fullStar);
    } else if (puntaje >= i - 0.5) {
      stars.push(halfStar);
    } else {
      stars.push(emptyStar);
    }
  }

  return (
    <div className="estrellas">
      {stars.map((icon, index) => (
        <FontAwesomeIcon key={index} icon={icon} className="paint" />
      ))}
    </div>
  );
}

export default Estrellas;
