/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, PartyPopper, Star, Image as ImageIcon, MessageSquare, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

type ViewState = 'gift' | 'main' | 'gallery' | 'messages';

export default function App() {
  const [view, setView] = useState<ViewState>('gift');

  const [guestMessages] = useState([
    { name: "From Me", text: "Real መታደል is having someone you can talk to about አንድ አይነት story over and over until you're finally done with it. No judgment, just understanding for me you are that person and am happy to have you in my life happy birthday YOUR MAJESTY ❤️" },
  ]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Setting Neju's birthday to April 28th, 2026 for the countdown
    const targetDate = new Date('2026-04-28T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const galleryImages = [
    { url: "images/neju1.jpg", caption: "Sweet Memories" },
    { url: "images/hero.jpg", caption: "Neju's Smile" },
    { url: "images/bb.jpg", caption: "Beautiful Moments" },
    { url: "images/nn.jpg", caption: "birthday hero" },
    { url: "images/nm.jpg", caption: "Special Day" },
  ];

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleOpenGift = () => {
    setView('main');
    triggerConfetti();
  };



  const wishes = [
    "Happy birthday to my best friend, to my other half, to my soulmate who is always here for me no matter what. I love her so much, to the moon and back and I really wish her the best in her life. She's such an angel and deserves everything good. I'm so happy to be able to call her my best friend in this whole world",
    "መጀመሪያ ስንገናኝ ጓደኛ ብቻ ነበርን አሁን ግን መቼም ላጣሽ የማልፈልጋት እህቴ ሁነሻል "
  ];

  const BackButton = () => (
    <motion.button
      whileHover={{ scale: 1.1, x: -5 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setView('main')}
      className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-purple-600 font-bold shadow-lg hover:bg-white transition-all"
    >
      <ArrowLeft size={20} />
      Back
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110vh', x: Math.random() * 100 + 'vw' }}
            animate={{ 
              y: '-10vh',
              rotate: 360,
              x: (Math.random() * 100 - 10) + 'vw'
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute text-3xl opacity-20"
          >
            {['🎈', '✨', '🎂', '🎁', '💖'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full text-center py-12">
        <AnimatePresence mode="wait">
          {view === 'gift' ? (
            <motion.div
              key="gift"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="cursor-pointer group"
                onClick={handleOpenGift}
              >
                <div className="relative">
                  <Gift size={120} className="text-purple-600 group-hover:text-purple-500 transition-colors" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                  >
                    OPEN ME!
                  </motion.div>
                </div>
              </motion.div>
              <h1 className="mt-8 text-4xl font-bold text-purple-900 tracking-tight">
                Neju, someone has a surprise for you...
              </h1>
              <p className="mt-4 text-purple-700 font-medium">Click the gift to reveal your birthday message!</p>
            </motion.div>
          ) : view === 'main' ? (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-block p-2 bg-white rounded-full shadow-2xl overflow-hidden w-32 h-32"
              >
                <img 
                  src="images/hero.jpg" 
                  alt="Neju" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  HAPPY BIRTHDAY, NEJU!
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-purple-800 font-medium"
                >
                  Wishing you the most wonderful day ever!
                </motion.p>
              </div>

              {/* Countdown Timer */}
              {timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds > 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center gap-4 py-6"
                >
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-white/60 backdrop-blur-md p-4 rounded-2xl min-w-[80px] shadow-sm border border-purple-100">
                      <span className="text-3xl font-black text-purple-600">{item.value}</span>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6"
                >
                  <span className="text-2xl font-black text-pink-600 animate-bounce block">
                    IT'S YOUR BIRTHDAY, NEJU! 🎉
                  </span>
                </motion.div>
              )}

              <motion.div 
                className="grid grid-cols-1 gap-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {wishes.map((wish, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + (idx * 0.2) }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-purple-100 flex items-start gap-4 hover:shadow-md transition-shadow"
                  >
                    <Star className="text-yellow-500 shrink-0 mt-1" size={24} />
                    <p className="text-purple-900 text-base md:text-lg font-medium text-left leading-relaxed">{wish}</p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('gallery')}
                  className="px-6 py-3 bg-white text-purple-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <ImageIcon size={20} />
                  Photo Gallery
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('messages')}
                  className="px-6 py-3 bg-white text-pink-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <MessageSquare size={20} />
                  Guest Messages
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerConfetti}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <PartyPopper size={20} />
                  Celebrate!
                </motion.button>
              </div>
            </motion.div>
          ) : view === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-8 relative pt-8"
            >
              <BackButton />
              <h2 className="text-4xl font-black text-purple-900">Neju's Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl bg-white p-2"
                  >
                    <img 
                      src={img.url} 
                      alt={img.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white font-bold text-lg">{img.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-8 relative pt-8"
            >
              <BackButton />
              <h2 className="text-4xl font-black text-purple-900">A Special Wish</h2>
              
              <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-purple-100">
                <div className="space-y-6 text-center">
                  {guestMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-purple-100 shadow-inner"
                    >
                      <Heart className="text-pink-500 mx-auto mb-4 fill-pink-500" size={32} />
                      <p className="text-2xl text-purple-900 font-serif italic leading-relaxed mb-6">
                        "{msg.text}"
                      </p>
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent w-full mb-4" />
                      <p className="font-bold text-purple-600 text-lg">— {msg.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Hearts */}
      <div className="fixed bottom-8 left-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart size={40} className="text-pink-400 fill-pink-400 opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}
