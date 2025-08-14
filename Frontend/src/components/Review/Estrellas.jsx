import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

function Estrellas({ puntaje }) {
  return (
    <div className="estrellas">
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon className="paint"
          key={i}
          icon={i < puntaje ? fullStar : emptyStar}
        />
      ))}
    </div>
  );
}

export default Estrellas;
