import React, { useEffect, useRef, useState } from 'react';
import styles from "./websocket.style.module.scss";
import { urlAPI } from '@services/config';

function FacialRecognition() {
  const canvasRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("NORMAL");  // Estado para almacenar el mensaje de alerta
  const [statusColor, setStatusColor] = useState("#93d302");  // Estado inicial verde

  useEffect(() => {
    const websocket = new WebSocket(`${urlAPI.replace("http", "ws")}/facialRecognition/websocket`);
    websocket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const data = JSON.parse(event.data); // Convertir los datos JSON a objeto
        if (data.type === "alert") {
          if (data.data.alert === "SOMNOLIENTO") {
            // Si es un mensaje de alerta de somnolencia, actualizar el estado con el mensaje
            setAlertMessage(data.data.alert);
            setStatusColor("#FF0000");  // Color rojo para indicar alerta
          } else if (data.data.alert === "NORMAL") {
            // Si es un mensaje de estado normal, restablecer el estado
            setAlertMessage(data.data.alert);
            setStatusColor("#93d302");  // Color verde para estado normal
          }
        }
      } else {
        // Si es un frame, decodificar los datos Base64 y mostrar la imagen en el canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(new Blob([event.data]));
      }
    };

    // Cleanup function to close the WebSocket connection
    return () => {
      websocket.close();
    };
  }, []);

  console.log(statusColor)
  return (
    <div className={styles.cameraContainer}>
      <div className={styles.camera} style={{ borderColor: statusColor }}>
        <canvas ref={canvasRef} className={styles.videoCanvas} />
      </div>  
      <div className={styles.alert}>
        <span>Estado del conductor: </span>
        { alertMessage && <span className={styles.Status} style={{ backgroundColor: statusColor }}>{ alertMessage }</span>} {/* Mostrar el mensaje de alerta */}
      </div>
    </div>
  );
}

export { FacialRecognition };

