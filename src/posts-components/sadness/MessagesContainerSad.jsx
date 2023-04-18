import React from 'react';

import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import * as Md from "react-icons/md";

import ReactTimeAgo from 'react-time-ago'

function MessagesContainerSad(props) {
  const { title1, summary1, codename1, createdAt, cover1 } = props;
  return (
    <div className="mssgeBox mb-3">
      <div className="ttle">
        <img src={'https://emowall-backend.onrender.com/' + cover1}/>     
        <h6>{title1}</h6>
        <ReactTimeAgo date={(createdAt)} locale="en-US"/>
      </div>
      
      <p>{summary1}</p>
      <p className='text-end codename'> - {codename1}</p>

      <div className="btnMssge">
        <div className='btn2'><Ai.AiOutlinePlus /> Add Comment</div>
        <div className='btn2'><Ai.AiOutlineHeart /> Care</div>
        <div className='btn2'><Bs.BsArrow90DegRight /> SHARE</div>
        <div className='btn2'><Md.MdOutlineReportProblem /> Report</div>
      </div>
    </div>
  );
}

export default MessagesContainerSad;