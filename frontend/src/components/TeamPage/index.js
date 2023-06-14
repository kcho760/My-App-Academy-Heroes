import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import TeamPage from './TeamPage';

function TeamPageModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='displayTeamName' onClick={() => setShowModal(true)}>Team</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TeamPage />
        </Modal>
      )}
    </>
  );
}

export default TeamPageModal;