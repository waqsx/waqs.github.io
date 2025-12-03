import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  MessageSquare, Target, Palette, Award, Users, BookOpen, Star, ChevronRight,
  Mail, Phone, Calendar, Download, Instagram, ExternalLink, GraduationCap,
  Briefcase, Code, Stethoscope, Sparkles, Zap, TrendingUp, ArrowRight,
  FileText, PenTool, MessageCircle, Monitor, Cloud
} from 'lucide-react'

// Импортируем фото
import arthurPhoto from './arthur.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const testimonialsRef = useRef(null)
  
  // Параллакс эффекты
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  
  // Пружинные анимации
  const springY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Отслеживание мыши для эффектов
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Для отслеживания активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'goals', 'reviews', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Данные для отзывов
  const testimonials = [
    {
      name: "Анна",
      role: "Экзамены в школу 'Летово'",
      text: "Артур очень понятно и кратко объясняет грамматику, быстро создается полная, ясная картина. Занимался с ребенком пару месяцев по два раза в неделю, за это время Артуру удалось значительно поднять уровень английского у ребенка. Результат впечатлил, особенно за такой короткий срок.",
      highlights: ["понятно и кратко", "полная картина", "результат впечатлил"]
    },
    {
      name: "Михаил",
      role: "IT-разработчик",
      text: "Обратился с очень сложным кейсом: за 2 месяца подготовиться к техническому интервью. Артур не спасовал, помог подтянуть грамматику, дал много практики, погрузился в техническую специфику, составил шпаргалки и текстовые заготовки.",
      highlights: ["не спасовал", "техническая специфика", "увереннее и свободнее"]
    },
    {
      name: "Светлана",
      role: "Ассистент / Строительство",
      text: "Профиль Артура сильно отличался от всех прочих. Мы сразу поставили цель - повышение уровня для работы в строительной сфере. Артур выстроил план так, что мы охватили не только стройку, но и смежные отрасли.",
      highlights: ["профиль отличается", "цель поставлена", "прогресс виден"]
    },
    {
      name: "Анастасия",
      role: "PR-manager",
      text: "Это единственный преподаватель с живыми отзывами. Презентации Артура - отдельный вид искусства. Материал обработан и собран воедино, все по полочкам, легко воспринимается и запоминается.",
      highlights: ["живые отзывы", "вид искусства", "все по полочкам"]
    },
    {
      name: "Дмитрий",
      role: "Врач-хирург",
      text: "Нужно было подготовиться к международной конференции. Артур помог не только с медицинской терминологией, но и с подачей материала. Результат - успешное выступление и новые профессиональные контакты.",
      highlights: ["медицинская терминология", "успешное выступление", "профессиональные контакты"]
    }
  ]

  // Полезные сайты
  const usefulSites = [
    { name: "WordHunt", icon: "🔍", url: "https://wordhunt.io" },
    { name: "Cambridge", icon: "📚", url: "https://dictionary.cambridge.org" },
    { name: "Longman", icon: "📖", url: "https://www.ldoceonline.com" },
    { name: "Collins", icon: "📘", url: "https://www.collinsdictionary.com" },
    { name: "WordReference", icon: "📖", url: "https://www.wordreference.com" },
    { name: "StackExchange", icon: "💬", url: "https://english.stackexchange.com" }
  ]

  // Элементы инфографики с анимациями
  const infoItems = [
    { label: "Опыт работы", value: "10 лет", icon: <TrendingUp />, delay: 0 },
    { label: "Образование", value: "CELTA • CAE • NLP", icon: <GraduationCap />, delay: 0.1 },
    { label: "Формат", value: "ОНЛАЙН", icon: <Monitor />, delay: 0.2 },
    { label: "Уровни", value: "Elementary — Upper", icon: <TrendingUp />, delay: 0.3 },
    { label: "Материалы", value: "Оцифрованы", icon: <Cloud />, delay: 0.4 },
    { label: "Экзамены", value: "IELTS, BEC, FCE", icon: <FileText />, delay: 0.5 }
  ]

  return (
    <div className="min-h-screen overflow-hidden" ref={containerRef}>
      {/* Улучшенный анимированный фон */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        {/* Основной градиент */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-dark-bg via-black to-primary-900/30"
          animate={{
            background: [
              'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #581c87 100%)',
              'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #9333ea 100%)',
              'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #7c3aed 100%)',
              'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #581c87 100%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        
        {/* Плавающие градиентные формы */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-600/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 50, -100, 0],
            scale: [1, 0.8, 1.3, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        
        <motion.div
          className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-2xl"
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 150, 0],
            rotate: [0, 180, 360, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 10 }}
        />
        
        {/* Анимированные линии */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M0,100 Q250,50 400,200 T800,100"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M0,100 Q250,50 400,200 T800,100",
                "M0,150 Q250,100 400,250 T800,150",
                "M0,200 Q250,150 400,300 T800,200",
                "M0,100 Q250,50 400,200 T800,100"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.path
            d="M0,300 Q500,250 600,400 T1200,300"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M0,300 Q500,250 600,400 T1200,300",
                "M0,350 Q500,300 600,450 T1200,350",
                "M0,400 Q500,350 600,500 T1200,400",
                "M0,300 Q500,250 600,400 T1200,300"
              ]
            }}
            transition={{ duration: 25, repeat: Infinity, delay: 3 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Плавающие частицы */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Плавающие геометрические фигуры */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-primary-500/20 rounded-lg"
            style={{
              width: 40 + Math.random() * 60,
              height: 40 + Math.random() * 60,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-xl font-bold gradient-text">Arthur Pankratz</span>
            </motion.div>

            <nav className="hidden md:flex items-center gap-8">
              {['home', 'about', 'goals', 'reviews', 'contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className={`capitalize transition-colors relative group ${
                    activeSection === item 
                      ? 'text-primary-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item === 'home' ? 'Главная' :
                   item === 'about' ? 'Обо мне' :
                   item === 'goals' ? 'Цели' :
                   item === 'reviews' ? 'Отзывы' : 'Контакты'}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            <motion.button
              className="btn-primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(147, 51, 234, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(147, 51, 234, 0.3)",
                  "0 0 40px rgba(147, 51, 234, 0.5)",
                  "0 0 20px rgba(147, 51, 234, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Записаться на урок
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <div className="section-container py-20 relative">
          <motion.div 
            className="absolute top-10 left-10 text-4xl opacity-30"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.div 
            className="absolute bottom-10 right-10 text-4xl opacity-30"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          >
            🚀
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900/30 border border-primary-700 mb-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare size={16} />
                <span className="text-sm font-medium text-primary-300">Коуч по английскому языку</span>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Артур <span className="gradient-text">Панкрац</span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                10 лет опыта • CELTA • CAE • NLP • Graphic Design
                <br />
                Подготовка к IELTS, BEC, FCE, ЕГЭ, ОГЭ
              </motion.p>

              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { value: '10+', label: 'Лет опыта', icon: <TrendingUp /> },
                  { value: '500+', label: 'Студентов', icon: <Users /> },
                  { value: '95%', label: 'Успешных экзаменов', icon: <Award /> },
                  { value: '100%', label: 'Онлайн формат', icon: <Monitor /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-card group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <motion.div 
                      className="text-3xl mb-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button 
                  className="btn-primary group"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -2, 2, 0]
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(147, 51, 234, 0.3)",
                      "0 0 40px rgba(147, 51, 234, 0.5)",
                      "0 0 20px rgba(147, 51, 234, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Записаться на пробный урок
                  </motion.span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Calendar className="ml-2" size={18} />
                  </motion.span>
                </motion.button>
                
                <motion.button 
                  className="btn-outline group"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(168, 85, 247, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Скачать материалы
                  <motion.span
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Download className="ml-2" size={18} />
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Фото Артура - уменьшенная версия */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                x: mousePosition.x * 0.2,
                y: mousePosition.y * 0.2
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              className="relative max-w-lg mx-auto"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-primary-600/30 group perspective-1000">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-purple-900/20"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(168,85,247,0.2) 0%, rgba(147,51,234,0.2) 100%)',
                      'linear-gradient(45deg, rgba(147,51,234,0.2) 0%, rgba(236,72,153,0.2) 100%)',
                      'linear-gradient(45deg, rgba(236,72,153,0.2) 0%, rgba(168,85,247,0.2) 100%)'
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                
                {/* Фото */}
                <motion.img 
                  src={arthurPhoto}
                  alt="Артур Панкрац - коуч по английскому языку"
                  className="w-full h-full object-cover relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Градиентные оверлеи */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary-900/60 to-transparent"
                  animate={{ opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent flex items-end p-4"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="w-full">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Артур Панкрац
                    </motion.h3>
                    <motion.p 
                      className="text-primary-300 text-sm mb-1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      Коуч по английскому языку
                    </motion.p>
                    <motion.p 
                      className="text-gray-400 text-xs"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      @ArthurDesignEnglish
                    </motion.p>
                  </div>
                </motion.div>
                
                {/* Плавающие элементы вокруг фото - теперь видны */}
                <motion.div
                  className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl -z-10 rotate-12 opacity-30"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [12, 24, 12]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl -z-10 -rotate-12 opacity-30"
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [-12, -24, -12]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                
                {/* Свечение */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/10 to-primary-600/0 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {/* Инфографика вокруг фото - теперь видны */}
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 360 }}
              >
                <Sparkles size={10} className="inline mr-1" />10 лет опыта
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-2 -left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-20"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.7, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: -360 }}
              >
                <Zap size={10} className="inline mr-1" />CELTA Certified
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight className="w-6 h-6 text-primary-400 rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* Для кого? */}
      <motion.section 
        className="py-20 bg-dark-card/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" }}
            >
              <span className="gradient-text">Для кого?</span>
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Специализированная подготовка для разных сфер деятельности
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: "Бизнес",
                items: ["Конференции", "Презентации", "Переговоры"],
                color: "from-blue-500 to-cyan-500",
                delay: 0
              },
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "Медицина",
                items: ["Семинары", "Воркшопы", "Научные статьи"],
                color: "from-emerald-500 to-teal-500",
                delay: 0.1
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "IT",
                items: ["Дизайн", "Кодинг", "Продажи"],
                color: "from-violet-500 to-purple-500",
                delay: 0.2
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: item.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="glass-card p-8 hover:border-primary-500/50 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div 
                  className={`absolute -inset-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 blur transition-opacity duration-500`}
                />
                
                <motion.div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 relative z-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.icon}
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold mb-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay + 0.1 }}
                >
                  {item.title}
                </motion.h3>
                
                <ul className="space-y-2 relative z-10">
                  {item.items.map((subItem, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-center gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: item.delay + 0.2 + idx * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-primary-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                      />
                      {subItem}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Научу и Задизайним */}
      <section className="py-20 relative">
        <motion.div 
          className="absolute inset-0 bg-grid-pattern opacity-5"
          style={{ y: y2 }}
        />
        
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Научу */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileInView={{ scale: [0.9, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-600 to-pink-600 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Target className="w-6 h-6" />
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold gradient-text"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Научу
                </motion.h2>
              </motion.div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Воспринимать",
                    desc: "Через НЛП-техники",
                    icon: "🧠",
                    delay: 0
                  },
                  {
                    title: "Говорить",
                    desc: "Без барьеров",
                    icon: "🗣️",
                    delay: 0.1
                  },
                  {
                    title: "Действовать",
                    desc: "Через мотивацию",
                    icon: "⚡",
                    delay: 0.2
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    whileHover={{ 
                      scale: 1.02,
                      x: 10,
                      transition: { duration: 0.3 }
                    }}
                    className="glass-card p-6 flex items-center gap-4 hover:border-primary-500/50 transition-all duration-300 group"
                  >
                    <motion.div 
                      className="text-3xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: index }}
                      whileHover={{ scale: 1.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold mb-1"
                        whileHover={{ color: "#a855f7" }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-400"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {item.desc}
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      className="ml-auto opacity-0 group-hover:opacity-100"
                      initial={{ rotate: -180 }}
                      whileHover={{ rotate: 0 }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary-500" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Задизайним */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileInView={{ scale: [0.9, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Palette className="w-6 h-6" />
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold gradient-text"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                >
                  Задизайним
                </motion.h2>
              </motion.div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Презентацию",
                    desc: "Для работы/учебы",
                    icon: "📊",
                    delay: 0.3
                  },
                  {
                    title: "Резюме",
                    desc: "Как у дизайнеров",
                    icon: "📄",
                    delay: 0.4
                  },
                  {
                    title: "Визитку",
                    desc: "Чтобы красиво",
                    icon: "💳",
                    delay: 0.5
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    whileHover={{ 
                      scale: 1.02,
                      x: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="glass-card p-6 flex items-center gap-4 hover:border-primary-500/50 transition-all duration-300 group"
                  >
                    <motion.div 
                      className="text-3xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index }}
                      whileHover={{ scale: 1.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold mb-1"
                        whileHover={{ color: "#a855f7" }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-400"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {item.desc}
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      className="ml-auto opacity-0 group-hover:opacity-100"
                      initial={{ rotate: 180 }}
                      whileHover={{ rotate: 0 }}
                    >
                      <PenTool className="w-5 h-5 text-primary-500" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Обо мне */}
      <section id="about" className="py-20 bg-dark-card/30 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ rotate }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="pattern-dots pattern-primary-500 pattern-size-4 pattern-opacity-20" />
          </div>
        </motion.div>
        
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Обо мне</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Инфографика */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-primary-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500"
              />
              
              <h3 className="text-2xl font-bold mb-6 gradient-text">Инфографика</h3>
              <div className="space-y-6">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(168, 85, 247, 0.1)'
                    }}
                    className="flex items-center justify-between p-4 rounded-lg bg-dark-card/50 hover:bg-primary-900/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="text-2xl"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: index }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-medium group-hover:text-primary-300 transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <motion.span 
                      className="font-bold gradient-text"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {item.value}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Детальная информация */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-6"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="glass-card p-6 hover:border-primary-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </motion.div>
                  <span className="gradient-text group-hover:scale-105 transition-transform">
                    Специализация
                  </span>
                </h3>
                <p className="text-gray-300 mb-3">
                  <motion.span 
                    className="highlight-text"
                    animate={{ textShadow: [
                      "0 0 20px rgba(168, 85, 247, 0)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(168, 85, 247, 0)"
                    ]}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Тяжелые случаи
                  </motion.span> + {' '}
                  <motion.span 
                    className="highlight-text"
                    animate={{ textShadow: [
                      "0 0 20px rgba(236, 72, 153, 0)",
                      "0 0 20px rgba(236, 72, 153, 0.5)",
                      "0 0 20px rgba(236, 72, 153, 0)"
                    ]}}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    Оперативная подготовка
                  </motion.span>
                </p>
                <p className="text-gray-400">
                  Успешные кейсы со студентами МГИМО и ВАВТ. 
                  Продвинутый подход: коучинг + креативная инфографика.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="glass-card p-6 hover:border-primary-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>
                  <span className="gradient-text">С кем работаю</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['IT-специалисты', 'Дизайнеры', 'Экономисты', 'Врачи', 'Юристы', 'Маркетологи'].map((item, idx) => (
                    <motion.span
                      key={item}
                      className="skill-badge group"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      animate={{ 
                        y: [0, -5, 0],
                        transition: { duration: 3, repeat: Infinity, delay: idx * 0.5 }
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="glass-card p-6 hover:border-primary-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </motion.div>
                  <span className="gradient-text">Бонусы</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Шпаргалки', 'Алгоритмы', 'Мемы', 'Статьи', 'Презентации', 'Сериалы', 'Книги'].map((item, idx) => (
                    <motion.span
                      key={item}
                      className="skill-badge group"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                        transition: { duration: 0.5 }
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="glass-card p-6 hover:border-primary-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Award className="w-5 h-5" />
                  </motion.div>
                  <span className="gradient-text">Первое занятие</span>
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { number: '1', label: 'Тест', color: 'from-primary-600 to-purple-600' },
                    { number: '2', label: 'Обратная связь', color: 'from-purple-600 to-pink-600' },
                    { number: '3', label: 'Рекомендации', color: 'from-pink-600 to-rose-600' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.number}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{item.label}</div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Цели обучения */}
      <section id="goals" className="py-20 relative overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="gradient-text">Цель обучения</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "#Популярное",
                color: "from-primary-600 to-purple-600",
                items: ["Путешествия", "Учеба", "Работа", "Переезд", "Экзамен", "Самообучение", "Проф. литература"],
                icon: "🌟",
                delay: 0
              },
              {
                title: "#Сферы",
                color: "from-purple-600 to-pink-600",
                items: ["Юриспруденция", "Маркетинг", "Логистика", "IT", "Графический дизайн", "Финансы", "B2B"],
                icon: "🎯",
                delay: 0.1
              },
              {
                title: "#Бизнес",
                color: "from-pink-600 to-rose-600",
                items: ["Переговоры", "Телефон", "Презентации", "Договоры", "Корреспонденция", "Скрипты продаж"],
                icon: "💼",
                delay: 0.2
              },
              {
                title: "#Основа",
                color: "from-rose-600 to-orange-600",
                items: ["Чтение", "Письмо", "Грамматика", "Лексика", "Аудирование", "Говорение", "Фразовые глаголы"],
                icon: "📚",
                delay: 0.3
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: category.delay,
                  type: "spring"
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  rotateZ: [0, -2, 2, 0],
                  transition: { duration: 0.5 }
                }}
                className="glass-card p-6 relative overflow-hidden group"
              >
                <motion.div 
                  className="text-3xl mb-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: index }}
                >
                  {category.icon}
                </motion.div>
                
                <motion.div 
                  className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-4`}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, delay: index }}
                >
                  {category.title}
                </motion.div>
                
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-center gap-2 text-gray-300 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: category.delay + idx * 0.05 }}
                      whileHover={{ x: 5, color: "#fff" }}
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-primary-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      />
                      {item}
                      <motion.div 
                        className="ml-auto opacity-0 group-hover/item:opacity-100"
                        initial={{ rotate: -180 }}
                        whileHover={{ rotate: 0 }}
                      >
                        <ChevronRight className="w-3 h-3 text-primary-500" />
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/5 to-primary-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Полезные сайты */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <motion.h3 
              className="text-3xl font-bold text-center mb-8 gradient-text"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Полезные сайты
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {usefulSites.map((site, index) => (
                <motion.a
                  key={index}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                  className="glass-card p-4 text-center hover:border-primary-500/50 transition-all duration-300 group relative"
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {site.icon}
                  </motion.div>
                  
                  <motion.div 
                    className="font-medium group-hover:text-primary-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {site.name}
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/10 to-primary-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  >
                    <ExternalLink className="w-4 h-4 mx-auto mt-2" />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Отзывы - креативная горизонтальная прокрутка */}
      <section id="reviews" className="py-20 bg-dark-card/30 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(147,51,234,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="gradient-text">Отзывы</span>
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Что говорят студенты о результатах обучения
            </motion.p>
          </motion.div>

          {/* Горизонтальная прокрутка отзывов */}
          <div className="relative">
            <div 
              ref={testimonialsRef}
              className="flex overflow-x-auto pb-8 gap-8 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0% 0% -20% 0%" }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.2,
                    type: "spring"
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="testimonial-card group relative overflow-hidden min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-center"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/5 to-primary-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        scale: { duration: 3, repeat: Infinity },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <span className="text-xl font-bold">{testimonial.name.charAt(0)}</span>
                    </motion.div>
                    
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-primary-400 text-sm">{testimonial.role}</p>
                    </div>
                    
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          whileHover={{ scale: 1.3, rotate: 360 }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.p 
                    className="text-gray-300 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {testimonial.text}
                  </motion.p>
                  
                  <div className="flex flex-wrap gap-2">
                    {testimonial.highlights.map((highlight, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4 + idx * 0.1 }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: 'rgba(168, 85, 247, 0.3)'
                        }}
                        className="px-3 py-1 rounded-full bg-primary-900/30 text-primary-300 text-sm cursor-pointer"
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="absolute -bottom-2 -right-2 text-6xl opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    "
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Индикаторы прокрутки */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-600"
                  whileHover={{ scale: 1.5, backgroundColor: "#a855f7" }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => {
                    if (testimonialsRef.current) {
                      testimonialsRef.current.scrollTo({
                        left: index * 400,
                        behavior: 'smooth'
                      })
                    }
                  }}
                />
              ))}
            </div>
            
            {/* Подсказка для прокрутки */}
            <motion.div 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-400 hidden md:block"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronRight className="w-8 h-8" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring" }}
            >
              <motion.h2 
                className="text-4xl font-bold mb-6"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="gradient-text">Записаться на урок</span>
              </motion.h2>
              
              <motion.form 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { label: "Email", type: "email", placeholder: "example@email.com" },
                  { 
                    label: "Цель обучения", 
                    type: "select", 
                    options: [
                      "Выберите цель",
                      "Экзамен (IELTS, BEC, FCE)",
                      "Бизнес-английский",
                      "IT-английский",
                      "Медицинский английский",
                      "Общее улучшение",
                      "Подготовка к собеседованию"
                    ]
                  },
                  { label: "Сообщение", type: "textarea", placeholder: "Расскажите о ваших целях и уровне..." }
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group"
                  >
                    <label className="block text-sm font-medium mb-2 group-hover:text-primary-300 transition-colors">
                      {field.label}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select className="w-full px-4 py-3 rounded-lg bg-dark-card border border-dark-border focus:border-primary-500 focus:outline-none transition-colors group-hover:border-primary-500/50">
                        {field.options?.map((option, idx) => (
                          <option key={idx}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-dark-card border border-dark-border focus:border-primary-500 focus:outline-none transition-colors group-hover:border-primary-500/50 resize-none"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-4 py-3 rounded-lg bg-dark-card border border-dark-border focus:border-primary-500 focus:outline-none transition-colors group-hover:border-primary-500/50"
                        placeholder={field.placeholder}
                      />
                    )}
                  </motion.div>
                ))}
                
                <motion.button 
                  type="submit" 
                  className="btn-primary w-full group"
                  whileHover={{ 
                    scale: 1.02,
                    rotate: [0, -1, 1, 0]
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(147, 51, 234, 0.3)",
                      "0 0 40px rgba(147, 51, 234, 0.5)",
                      "0 0 20px rgba(147, 51, 234, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Отправить заявку
                  </motion.span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Mail className="ml-2" size={18} />
                  </motion.span>
                </motion.button>
              </motion.form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div 
                className="glass-card p-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text">Контакты</h3>
                
                <div className="space-y-4">
                  {[
                    { icon: <Phone />, title: "Телефон / WhatsApp", value: "+7 (XXX) XXX-XX-XX" },
                    { icon: <Mail />, title: "Email", value: "hello@arthur-english.com" },
                    { icon: <Instagram />, title: "Instagram / Telegram", value: "@ArthurDesignEnglish" }
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 group cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-lg bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-900/50 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                      >
                        {contact.icon}
                      </motion.div>
                      <div>
                        <p className="text-sm text-gray-400 group-hover:text-primary-300 transition-colors">
                          {contact.title}
                        </p>
                        <p className="font-medium group-hover:text-white transition-colors">
                          {contact.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="glass-card p-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text">Формат занятий</h3>
                
                <div className="space-y-3">
                  {[
                    { label: "Платформы:", value: "Zoom, Skype, Discord, WhatsApp" },
                    { label: "Длительность:", value: "60-90 минут" },
                    { label: "Материалы:", value: "Бесплатно" },
                    { label: "Конспекты:", value: "В цифровом виде" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-gray-300 group-hover:text-primary-300 transition-colors">
                        {item.label}
                      </span>
                      <span className="font-medium group-hover:text-white transition-colors">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="glass-card p-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-4 gradient-text">Социальные сети</h3>
                <p className="text-gray-400 mb-4">Подписывайтесь для полезных материалов</p>
                <div className="flex gap-4">
                  {[
                    { label: "Instagram", color: "from-primary-600 to-purple-600", icon: <Instagram /> },
                    { label: "Telegram", color: "from-blue-500 to-cyan-500", icon: <MessageCircle /> }
                  ].map((social, index) => (
                    <motion.button 
                      key={index}
                      className={`flex-1 py-3 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center gap-2`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -5
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(0,0,0,0)",
                          `0 0 30px ${social.color.split(' ')[1]}`,
                          "0 0 20px rgba(0,0,0,0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {social.icon}
                      {social.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="py-8 border-t border-dark-border/50 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-primary-900/10 to-transparent"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 md:mb-0"
            >
              <div className="text-2xl font-bold gradient-text mb-2">Артур Панкрац</div>
              <p className="text-gray-400">Коуч по английскому языку</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-gray-400 mb-2">@ArthurDesignEnglish</p>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Все права защищены
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-4 md:mt-0"
            >
              <motion.button 
                className="btn-outline group"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -5, 5, 0]
                }}
                whileTap={{ scale: 0.95 }}
              >
                Скачать визитку (PDF)
                <motion.span
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Download className="ml-2" size={16} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        {/* Floating elements in footer */}
        <motion.div 
          className="absolute bottom-0 left-10 text-2xl opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          🎯
        </motion.div>
        
        <motion.div 
          className="absolute top-0 right-10 text-2xl opacity-20"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -360]
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 2 }}
        >
          📚
        </motion.div>
      </footer>
    </div>
  )
}

export default App