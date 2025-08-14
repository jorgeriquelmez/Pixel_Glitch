import React from "react";

function Barras({ distribucion }) {
  const estrellasOrdenadas = Object.entries(distribucion || {}).sort(
    (a, b) => b[0] - a[0]
  );

  return (
    <div className="barContainer">
    <div className="barras">
      {estrellasOrdenadas.map(([estrella, porcentaje]) => (
        <div className="mb-2" key={estrella}>
          <span className="me-2">{estrella} estrellas</span>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${porcentaje}%` }}
              aria-valuenow={porcentaje}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Barras;
