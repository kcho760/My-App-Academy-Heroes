import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createGroup } from "../../store/group";
import './Instructions.css';
import '../NavBar/NavBar.css'

function Instructions() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="modal-container">
      <div className = "modal">
        <h1 className="modal-header">Instructions</h1>       
        <h2 className="modal-instruction">Instructions Pending</h2>
      </div>
    </div>
  );

}

export default Instructions;