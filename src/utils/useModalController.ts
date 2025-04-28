'use client';

import { useState } from 'react';

export function useModalController() {
  const [showModal, setShowModal] = useState(false);
  const [titleMessage, setTitleMessage] = useState('');
  const [subMessage, setSubMessage] = useState('');

  return {
    showModal: showModal ?? false,
    setShowModal: setShowModal ?? (() => {}),
    titleMessage: titleMessage ?? '',
    setTitleMessage: setTitleMessage ?? (() => {}),
    subMessage: subMessage ?? '',
    setSubMessage: setSubMessage ?? (() => {}),
  };
}
