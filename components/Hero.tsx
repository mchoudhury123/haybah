'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/back.jpg)' }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content overlay */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content - moved further left and made larger */}
          <motion.div 
            className="text-left pl-4 lg:pl-8"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-serif text-white mb-3 drop-shadow-lg leading-tight">
                ELEGANT
              </h1>
              <h2 className="text-6xl lg:text-8xl font-serif text-white font-bold mb-6 drop-shadow-lg leading-tight">
                MODESTY
              </h2>
              
              {/* Enhanced paragraph with Arabic/Asian cultural references */}
              <div className="max-w-lg space-y-4">
                <p className="text-xl text-white leading-relaxed drop-shadow-md">
                  Timeless Abaya collections for the modern woman, inspired by the rich heritage of 
                  <span className="font-arabic text-brand-gold"> الحضارة الإسلامية</span> (Islamic civilization) 
                  and the elegance of <span className="font-arabic text-brand-gold">الثقافة العربية</span> (Arabic culture).
                </p>
                <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
                  Each piece embodies the grace of <span className="font-arabic text-brand-gold">الأناقة</span> (elegance) 
                  and the dignity of <span className="font-arabic text-brand-gold">الكرامة</span> (dignity), 
                  crafted for women who embrace both tradition and contemporary style.
                </p>
              </div>
            </div>
            
            <motion.button 
              className="btn-primary text-xl px-12 py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHOP NOW
            </motion.button>
          </motion.div>
          

        </div>
      </div>
      

    </section>
  )
} 