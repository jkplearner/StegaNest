// ImageSteganography.jsx
import React, { useRef, useState } from 'react';
import CryptoJS from 'crypto-js';

const ImageSteganography = () => {
  const [secretMessage, setSecretMessage] = useState('');
  const [image, setImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [revealedMessage, setRevealedMessage] = useState('');
  const canvasRef = useRef(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setOutputImage(null);
    setRevealedMessage('');
  };

  const hideMessage = () => {
    if (!image || !secretMessage) {
      alert("Please select an image and enter a message.");
      return;
    }

    const password = prompt("Enter a password to encrypt your message:");
    if (!password) return alert("Password is required.");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        const encrypted = CryptoJS.AES.encrypt(secretMessage, password).toString();
        const message = encrypted + '¶'; // end symbol
        const bits = message
          .split('')
          .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join('')
          .split('');

        if (bits.length > pixels.length / 4 * 3) {
          alert("Message too long for image.");
          return;
        }

        let bitIndex = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          for (let j = 0; j < 3; j++) {
            if (bitIndex < bits.length) {
              pixels[i + j] = (pixels[i + j] & 0xFE) | Number(bits[bitIndex]);
              bitIndex++;
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const outputURL = canvas.toDataURL("image/png");
        setOutputImage(outputURL);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(image);
  };

  const revealMessage = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const password = prompt("Enter the password to decrypt the message:");
    if (!password) return alert("Password required to decrypt.");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let bits = '';
        for (let i = 0; i < pixels.length; i += 4) {
          for (let j = 0; j < 3; j++) {
            bits += (pixels[i + j] & 1).toString();
          }
        }

        let chars = '';
        for (let i = 0; i < bits.length; i += 8) {
          const byte = bits.slice(i, i + 8);
          const char = String.fromCharCode(parseInt(byte, 2));
          if (char === '¶') break;
          chars += char;
        }

        try {
          const decrypted = CryptoJS.AES.decrypt(chars, password).toString(CryptoJS.enc.Utf8);
          setRevealedMessage(decrypted || '❌ Wrong password or corrupted message.');
        } catch (err) {
          setRevealedMessage('❌ Decryption failed.');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(image);
  };

  return (
    <div>
      <h2>🔐 Hide Message</h2>
      <input type="file" onChange={handleImageChange} accept="image/*" /><br />
      <input
        type="text"
        value={secretMessage}
        onChange={(e) => setSecretMessage(e.target.value)}
        placeholder="Enter your message"
      /><br />
      <button onClick={hideMessage}>Hide Message</button><br />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {outputImage && (
        <>
          <img src={outputImage} alt="Output" style={{ maxWidth: '300px' }} /><br />
          <a href={outputImage} download="encoded.png">📥 Download</a>
        </>
      )}

      <hr />

      <h2>🔍 Reveal Message</h2>
      <input type="file" onChange={handleImageChange} accept="image/*" /><br />
      <button onClick={revealMessage}>Reveal</button>
      <p><strong>{revealedMessage}</strong></p>
    </div>
  );
};

export default ImageSteganography;
