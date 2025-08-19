'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Heart, Shield, Users, Award, Sparkles } from 'lucide-react'

export default function AboutClient() {
  const values = [
    {
      icon: Shield,
      title: 'Modesty',
      description: 'Upholding Islamic values through elegant, respectful fashion choices',
      arabic: 'الحشمة'
    },
    {
      icon: Heart,
      title: 'Quality',
      description: 'Crafting each piece with care, attention to detail, and premium materials',
      arabic: 'الجودة'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive network of Muslim women who share our values',
      arabic: 'المجتمع'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for perfection in every design, stitch, and customer experience',
      arabic: 'التميز'
    }
  ]

  const milestones = [
    {
      year: 'Dec 2024',
      title: 'The Beginning',
      description: 'Started with a vision to create beautiful, modest Abayas for Muslim women'
    },
    {
      year: 'Jan 2025',
      title: 'First Collection',
      description: 'Launched our debut collection, receiving overwhelming support from the community'
    },
    {
      year: 'Mar 2025',
      title: 'Growing Reach',
      description: 'Expanded our customer base and introduced new styles and designs'
    },
    {
      year: 'Jun 2025',
      title: 'Innovation',
      description: 'Introduced sustainable practices and modern design elements'
    },
    {
      year: 'Aug 2025',
      title: 'Future Vision',
      description: 'Continuing to grow and serve the global Muslim community with pride'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-peach">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-serif text-brand-maroon mb-6">
              <span className="font-arabic text-6xl lg:text-8xl">حبيبة</span>
              <br />
              Haybah Collections
            </h1>
            <p className="text-xl lg:text-2xl text-brand-dark max-w-4xl mx-auto leading-relaxed">
              <span className="font-arabic text-2xl lg:text-3xl">مجموعة حبيبة</span>
              <br />
              Where Modesty Meets Elegance
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Star className="w-16 h-16 text-brand-maroon" />
        </div>
        <div className="absolute top-20 right-20 opacity-20">
          <Heart className="w-12 h-12 text-brand-maroon" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Sparkles className="w-14 h-14 text-brand-maroon" />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-8">
                <span className="font-arabic text-5xl lg:text-6xl">قصتنا</span>
                <br />
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-brand-dark leading-relaxed">
                <p>
                  <span className="font-arabic text-xl">حبيبة</span> (Haybah) means "beloved" in Arabic, and that's exactly how we want every woman to feel when she wears our creations.
                </p>
                <p>
                  Founded with a deep commitment to Islamic values and a passion for beautiful fashion, Haybah Collections began as a small dream to serve Muslim women who seek both modesty and style.
                </p>
                <p>
                  We believe that dressing modestly doesn't mean compromising on beauty or fashion. Every Abaya we create is designed with love, respect, and an understanding of the cultural and religious significance of modest dress.
                </p>
                <p>
                  As a growing business, we're committed to expanding our reach while maintaining the core values that make us unique: quality craftsmanship, respectful design, and a deep connection to our community.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-peach to-brand-cream rounded-2xl shadow-elegant overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src="/2women.png"
                    alt="Two women in modest fashion - Haybah Collections"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-maroon/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-peach/30 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gradient-to-br from-brand-cream to-brand-peach">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-6">
              <span className="font-arabic text-5xl lg:text-6xl">قيمنا</span>
              <br />
              Our Values
            </h2>
            <p className="text-xl text-brand-dark max-w-3xl mx-auto">
              The principles that guide every decision we make and every piece we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-8 text-center shadow-elegant hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-brand-maroon/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-brand-maroon" />
                </div>
                <h3 className="text-2xl font-serif text-brand-maroon mb-3">
                  <span className="font-arabic text-3xl block mb-2">{value.arabic}</span>
                  {value.title}
                </h3>
                <p className="text-brand-dark leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-6">
              <span className="font-arabic text-5xl lg:text-6xl">رحلتنا</span>
              <br />
              Our Journey
            </h2>
            <p className="text-xl text-brand-dark max-w-3xl mx-auto">
              Our exciting journey from December 2024 to August 2025, from humble beginnings to a growing business serving Muslim women worldwide
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px w-1 bg-brand-maroon/20 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-maroon rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gradient-to-br from-brand-peach to-brand-cream rounded-2xl p-6 shadow-elegant">
                      <div className="text-3xl font-bold text-brand-maroon mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-serif text-brand-maroon mb-3">{milestone.title}</h3>
                      <p className="text-brand-dark leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-brand-maroon to-brand-dark text-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif mb-8">
              <span className="font-arabic text-5xl lg:text-6xl">مهمتنا</span>
              <br />
              Our Mission
            </h2>
            <div className="text-xl lg:text-2xl leading-relaxed space-y-6">
              <p>
                To empower Muslim women through beautiful, modest fashion that honors their faith and celebrates their identity.
              </p>
              <p>
                <span className="font-arabic text-2xl lg:text-3xl">نحن نؤمن بأن الحشمة والأناقة يمكن أن يسيرا جنباً إلى جنب</span>
                <br />
                We believe that modesty and elegance can walk hand in hand.
              </p>
              <p>
                Every Abaya we create is a testament to our commitment to quality, respect, and the beautiful traditions of Islamic fashion.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-6">
              <span className="font-arabic text-5xl lg:text-6xl">انضمي إلينا</span>
              <br />
              Join Our Journey
            </h2>
            <p className="text-xl text-brand-dark max-w-3xl mx-auto mb-12 leading-relaxed">
              Be part of our growing community of women who embrace modesty, beauty, and Islamic values. 
              Discover our latest collections and experience the Haybah difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                Explore Collections
              </a>
              <a
                href="/"
                className="btn-secondary text-lg px-8 py-4 inline-block"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
