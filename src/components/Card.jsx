import React from "react";

function Card(props) {
  function handleClick(event) {
    window.open(props.gamePreviewUrl);
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={"https://" + props.gameThumbnail} class="card-img-top" alt="" />
      <h5 className="card-title">{props.gameName}</h5>
    </div>
  );
}

export default Card;
