import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [tapCount, setTapCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const requiredTaps = 10;

  const handleTap = () => {
    if (!isOpen) {
      setTapCount(prev => {
        const newCount = prev + 1;
        if (newCount >= requiredTaps) {
          setIsOpen(true);
        }
        return newCount;
      });
    }
  };

  const resetCard = () => {
    setIsOpen(false);
    setTapCount(0);
  };

  return (
    <div className="birthday-container">
      <h1 className="title">Buka Kartu Ucapan</h1>
      
      
      <div className="envelope-container">
        {/* Amplop */}
        <motion.div 
          className="envelope"
          onClick={handleTap}
          whileTap={{ scale: 0.95 }}
        >
          <div className="envelope-front">
            <div className="stamp">🎂</div>
            <div className="recipient">Untuk Kamu</div>
          </div>
          <div className="envelope-back"></div>
          <motion.div 
            className="envelope-flap"
            animate={{ 
              rotateX: isOpen ? 180 : 0,
              y: isOpen ? -50 : 0
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* Kartu yang keluar dari amplop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="birthday-card"
              initial={{ y: 0, scale: 0.9, opacity: 0 }}
              animate={{ 
                y: -220,
                scale: 1,
                opacity: 1,
                transition: { delay: 0.3 } 
              }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <div className="card-content">
                <h2>Selamat Ulang Tahun Via!!</h2>
                <p>ciee udah 19 tahun aja nih, ah tapi masih bocil belum 20 tahun. Yaa semoga sehat terus yak, tambah cantik, tambah pinter,
                  duitnya banyak. Semangat deh kuliahnya di UII mu itu. gitu doang sih hehe
                </p>
          
                <div className="decorations">
                  <span className="heart">❤️</span>
                  <span className="balloon">🎈</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isOpen && (
        <motion.button
          className="reset-btn"
          onClick={resetCard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Klik untuk Menutup
        </motion.button>
      )}

      <div className="hint">
        
        {!isOpen && tapCount < 3 && <p>Tap amplop sebanyak banyaknya untuk membuka</p>}
        {!isOpen && tapCount >= 3 && tapCount < 7 && <p>Lanjutkan! {requiredTaps-tapCount}x lagi!</p>}
        {!isOpen && tapCount >= 7 && <p>MMMM ada apa yaa, coba {requiredTaps-tapCount}x tap!</p>}
        
      </div>
    </div>
  );
}

export default App;
