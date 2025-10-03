'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/back.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-white mb-2 sm:mb-3 drop-shadow-lg leading-tight">
              ELEGANT
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-white font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight">
              MODESTY
            </h2>
            
            {/* Enhanced paragraph with Arabic/Asian cultural references */}
            <div className="max-w-lg sm:max-w-xl mx-auto space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed drop-shadow-md">
                Timeless Abaya collections for the modern woman, inspired by the rich heritage of 
                <span className="font-arabic text-brand-gold"> الحضارة الإسلامية</span> (Islamic civilization) 
                and the elegance of <span className="font-arabic text-brand-gold">الثقافة العربية</span> (Arabic culture).
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed drop-shadow-md">
                Each piece embodies the grace of <span className="font-arabic text-brand-gold">الأناقة</span> (elegance) 
                and the dignity of <span className="font-arabic text-brand-gold">الكرامة</span> (dignity), 
                crafted for women who embrace both tradition and contemporary style.
              </p>
            </div>
          </div>
          
          <Link href="/shop">
            <motion.button 
              className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHOP NOW
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 