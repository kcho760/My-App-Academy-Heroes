import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import Instructions from './Instructions';

function InstructionModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='displayInstructions' onClick={() => setShowModal(true)}>Instructions</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Instructions />
        </Modal>
      )}
    </>
  );
}

export default InstructionModal;