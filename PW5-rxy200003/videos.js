import React from "react";

const Videos = (props) => {
  const name = props.videos.available ?
      props.videos.title :
      <span style={{ color: 'red' }}>
        {props.videos.title}
      </span>;
  return (
    <div>
      
      {
        
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{props.videos.game}</h6>
              <p className="card-text">{props.videos.description}</p>
            </div>
          </div>
        
      }
    </div>
  );
}
export default Videos;