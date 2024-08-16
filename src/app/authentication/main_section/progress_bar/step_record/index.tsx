import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { io } from 'socket.io-client';
import styles from '../step_record/step_record.style.module.scss'

// const socket = io('http://localhost:8000'); // Cambia el puerto según tu configuración de FastAPI

Modal.setAppElement('#root');

interface AudioRecorderModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AudioRecorderModal: React.FC<AudioRecorderModalProps> = ({ isOpen, onRequestClose }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        // socket.emit('audio', event.data);
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setRecording(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Record Audio" style={styles.modalAudioRecord}>
      <h2>Grabar Audio</h2>
      
      
      
      <button onClick={startRecording} disabled={recording} className={styles.buttonRecord}>
        Comenzar Grabación
      </button>


      <button onClick={stopRecording} disabled={!recording} className={styles.buttonStop}>
        Detener Grabación
      </button>
    </Modal>
  );
};

export default AudioRecorderModal;