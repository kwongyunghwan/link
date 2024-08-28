"use client";
import Link from "next/link";
import React, { useState } from 'react';
import Modal from '../Modal';

const HomePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="title"><Link href="/"><img src="/title.png" className ="title_image"/></Link></div>
      <h1>Hello Next.js</h1>
      <button onClick={openModal}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
      </Modal>
    </div>
  );
};

export default HomePage;