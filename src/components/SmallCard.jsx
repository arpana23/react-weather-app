import React from 'react';


const SmallCard = ({logo,title,unit}) => {
  return (
        <div className="smallcards">
            <span className="logo">{logo}</span>
            <p>{title}</p>
            <p><b>{unit}</b></p>
        </div>

  )
}

export default SmallCard
