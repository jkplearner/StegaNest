# StegaNest 🔐🖼️  
A secure image steganography app built with the MERN stack that lets you hide encrypted secret messages inside images and reveal them later.

🌐 **Live Demo**: [stega-nest.vercel.app](https://stega-nest.vercel.app/)

---

## 🚀 Features

- 🖼️ Upload any image and hide secret messages inside it
- 🔒 Messages are encrypted using AES encryption before hiding
- 🕵️‍♂️ Reveal hidden messages from encoded images with password decryption
- 📥 Download the encoded image as a PNG preserving hidden data
- 🔄 Supports all common image types for input
- 🔐 Password-protected encryption for extra security

---

## 🛠️ Tech Stack

| Frontend             | Backend / Crypto       |
|----------------------|-----------------------|
| React (Vite or CRA)  | CryptoJS (AES encryption) |
| HTML5 Canvas API     | Client-side image processing |
| JavaScript (ES6+)    | FileReader API         |
| Vercel Hosting       | Client-only (no DB)    |

---

## 🧑‍💻 Contributors

| Name                         | GitHub                          | Role                        |
|------------------------------|--------------------------------|-----------------------------|
| Jaya Krishna Pavan Mummaneni | [@jkplearner](https://github.com/jkplearner) | 🔧 Backend, Encryption Logic |
| Srineela Reddy M         | [@srinime1806](https://github.com/srinime1806) | 🎨 Frontend & UI Design     |


---

## 🧪 How It Works

1. User uploads an image and enters a secret message
2. User sets a password to encrypt the message (AES encryption)
3. The app converts the encrypted message into binary bits
4. These bits are hidden inside the image’s pixel least significant bits (LSB)
5. The user can download the newly encoded PNG image
6. To reveal, user uploads the encoded image and enters the password
7. The app extracts the bits, reconstructs and decrypts the message

---

## 🗝️ Environment Setup

Clone the repository and install dependencies:
```bash
npm install
```
```To run
npm run dev
```
# 📦 Deployment
Frontend is deployed via Vercel

Backend handled inside frontend via secure Gemini fetch logic

No external database or server used — all state is client-managed

