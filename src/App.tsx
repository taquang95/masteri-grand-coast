import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  Globe,
  Share2,
  Mail,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  MapPin,
  Zap,
  Gem,
  Sparkles,
  Building2,
  Leaf,
  CheckCircle2,
  FileText
} from 'lucide-react';
import MasteriGrandCoast from './pages/MasteriGrandCoast';
import SEO from './components/SEO';
import { NEWS, FAQS } from './types';

// --- Animation Variants ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

// --- Components ---

const SectionHeading = ({ title, subtitle, light = false, center = true }: { title: string, subtitle?: string, light?: boolean, center?: boolean }) => (
  <div className={`mb-20 ${center ? 'text-center' : 'text-left'}`}>
    <motion.div
      {...fadeInUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6"
    >
      <Sparkles className="w-4 h-4 text-primary" />
      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Masterise Homes</span>
    </motion.div>
    <motion.h2 
      {...fadeInUp}
      className={`text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 leading-tight tracking-tight ${light ? 'text-white' : 'text-earth'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        {...fadeInUp}
        transition={{ delay: 0.1 }}
        className={`text-lg md:text-xl max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-earth/60'} font-light leading-relaxed`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormData({ name: '', phone: '' });
        }, 2000);
      } else {
        alert(result.error || "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi thông tin. Vui lòng kiểm tra kết nối mạng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-earth/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-5xl rounded-[32px] md:rounded-[48px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-black/20 md:bg-transparent text-white md:text-earth/40 md:hover:text-earth rounded-full p-2 md:p-0 transition-colors backdrop-blur-sm"
            >
              <X size={20} />
            </button>

            {/* Left Side: Info & Benefits */}
            <div className="bg-earth text-white p-6 md:p-12 md:w-5/12 flex flex-col justify-center relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-4 md:mb-6">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Ưu đãi độc quyền</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-serif font-light mb-2 leading-tight">Masteri <br/><span className="text-primary italic">Grand Coast</span></h3>
                    <p className="text-white/60 font-light text-xs md:text-sm mb-6 md:mb-8">Tâm điểm nghỉ dưỡng tại Ocean Park</p>
                    
                    <ul className="space-y-3 md:space-y-4">
                        {[
                            "Chỉ từ 2,1 tỷ Full nội thất cao cấp liền tường",
                            "Chiết khấu đợt đầu tiên tới 17,3%",
                            "Full bảng giá + Thiết kế 3D căn hộ",
                            "Thanh toán chỉ 10% - Ký hợp đồng",
                            "Miễn hoàn toàn gốc + lãi đến 2029"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                                </div>
                                <span className="text-xs md:text-sm font-light text-white/90">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-6 md:p-12 md:w-7/12 bg-white flex flex-col justify-center">
              {isSuccess ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-light mb-2">Gửi yêu cầu thành công!</h3>
                  <p className="text-earth/60 font-light">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-serif font-light mb-2 text-earth">Đăng ký tư vấn</h3>
                    <p className="text-earth/60 font-light text-xs md:text-sm">Điền thông tin để nhận trọn bộ tài liệu và bảng giá chi tiết qua Zalo.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-earth/40 ml-4">Họ và tên</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Nguyễn Văn A" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3 md:px-6 md:py-4 bg-bg-light border border-earth/5 rounded-xl md:rounded-2xl focus:border-primary/50 text-earth font-light outline-none transition-all text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-earth/40 ml-4">Số điện thoại</label>
                      <input 
                        required
                        type="tel" 
                        pattern="[0-9]{10,11}"
                        title="Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)"
                        placeholder="0xxx xxx xxx" 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-3 md:px-6 md:py-4 bg-bg-light border border-earth/5 rounded-xl md:rounded-2xl focus:border-primary/50 text-earth font-light outline-none transition-all text-sm md:text-base"
                      />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full btn-gradient text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu ngay'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ onNavigate, currentPage, onOpenConsultation }: { onNavigate: (page: string) => void, currentPage: string, onOpenConsultation: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Các trang có ảnh Hero tối màu ở đầu
  const hasDarkHero = ['home', 'projects', 'about', 'masteri-grand-coast'].includes(currentPage);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightMode = isScrolled || !hasDarkHero;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center relative">
          {/* Left: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-10">
            {[
              { id: 'home', label: 'Trang chủ' },
              { id: 'news', label: 'Tin tức' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs font-black uppercase tracking-widest transition-all hover:text-primary ${currentPage === item.id ? 'text-primary' : (isLightMode ? 'text-earth' : 'text-white')}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer lg:absolute lg:left-1/2 lg:-translate-x-1/2" 
            onClick={() => onNavigate('home')}
          >
            <img 
              src="https://i.postimg.cc/q748VGDd/logo-masteri-grand-coast.png" 
              alt="Masteri Grand Coast Logo" 
              className={`h-12 w-auto transition-all duration-300 ${!isLightMode ? 'brightness-0 invert' : ''}`}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center space-x-10">
              {[
                { id: 'about', label: 'Giới thiệu' },
                { id: 'contact', label: 'Liên hệ' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-xs font-black uppercase tracking-widest transition-all hover:text-primary ${currentPage === item.id ? 'text-primary' : (isLightMode ? 'text-earth' : 'text-white')}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button 
              onClick={onOpenConsultation}
              className={`hidden md:block px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg ${isLightMode ? 'bg-primary text-white shadow-primary/20' : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'}`}
            >
              Tư vấn
            </button>
            <button 
              className={`lg:hidden p-2 rounded-xl transition-colors ${isLightMode ? 'text-earth hover:bg-earth/5' : 'text-white hover:bg-white/10'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-earth/5 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-10 space-y-6">
              {['home', 'news', 'about', 'contact'].map(id => (
                <button 
                  key={id}
                  onClick={() => { onNavigate(id); setIsMobileMenuOpen(false); }} 
                  className={`block w-full text-left text-2xl font-serif font-light capitalize ${currentPage === id ? 'text-primary' : 'text-earth'}`}
                >
                  {id === 'home' ? 'Trang chủ' : id === 'news' ? 'Tin tức' : id === 'about' ? 'Giới thiệu' : 'Liên hệ'}
                </button>
              ))}
              <button 
                onClick={() => { onOpenConsultation(); setIsMobileMenuOpen(false); }}
                className="w-full btn-gradient text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20"
              >
                Yêu cầu tư vấn
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = ({ onOpenConsultation, onNavigate }: { onOpenConsultation: () => void, onNavigate: (page: string) => void }) => {
  return (
    <footer className="bg-earth text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="mb-8">
              <img 
                src="https://i.postimg.cc/q748VGDd/logo-masteri-grand-coast.png" 
                alt="Masteri Grand Coast Logo" 
                className="h-12 w-auto brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/60 text-sm font-light mb-8 leading-relaxed">
              Địa chỉ: Sao Biển 01 SP25-01 Vinhomes Ocean Park Gia Lâm Hà Nội
            </p>
            <div className="flex gap-4">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Khám phá</h4>
            <ul className="space-y-4 text-white/60 text-sm font-light">
              {['home', 'about', 'news', 'contact'].map(id => (
                <li key={id}>
                  <button onClick={() => onNavigate(id)} className="hover:text-white transition-colors capitalize">
                    {id === 'home' ? 'Trang chủ' : id === 'about' ? 'Giới thiệu' : id === 'news' ? 'Tin tức' : 'Liên hệ'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="hidden sm:block">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Dự án Hà Nội</h4>
            <ul className="space-y-4 text-white/60 text-sm font-light">
              {['The Grand Hanoi', 'Masteri West Heights', 'Masteri Waterfront', 'Lumiere Evergreen'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Đăng ký tư vấn</h4>
            <p className="text-white/60 text-sm font-light mb-6">Nhận thông tin bảng giá và chính sách ưu đãi mới nhất.</p>
            <div className="space-y-3">
              <input 
                type="tel" 
                placeholder="Số điện thoại của bạn" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none text-white placeholder-white/20"
              />
              <button 
                onClick={onOpenConsultation}
                className="w-full btn-gradient text-white font-black py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Gửi thông tin
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-center">
          <p>© 2024 Masterise Homes. Designed for Excellence.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const AboutPage = (_props: { key?: string }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Masterise Homes",
    "description": "Masterise Homes® là nhà phát triển bất động sản hàng hiệu đẳng cấp quốc tế tiên phong áp dụng các chuẩn mực toàn cầu.",
    "url": window.location.origin,
    "logo": "https://i.postimg.cc/q748VGDd/logo-masteri-grand-coast.png",
    "sameAs": [
      "https://www.facebook.com/MasteriseHomesOfficial",
      "https://www.instagram.com/masterisehomes"
    ]
  };

  const timeline = [
    { year: '2007', title: 'Thành lập', desc: 'Tiền thân là Thảo Điền Investment.' },
    { year: '2014', title: 'Masteri Thảo Điền', desc: 'Ra mắt dự án đầu tay gây tiếng vang lớn.' },
    { year: '2016 - 2019', title: 'Khẳng định uy tín', desc: 'Bàn giao Millennium, M-One, Masteri An Phú.' },
    { year: '2019', title: 'Masterise Homes', desc: 'Chính thức đổi tên và định vị phân khúc cao cấp.' },
    { year: '2020 - 2021', title: 'Vươn tầm quốc tế', desc: 'Ra mắt Grand Marina Saigon, Masteri Waterfront.' },
    { year: '2022 - Nay', title: 'Biểu tượng mới', desc: 'The Global City, The Rivus, Masteri Grand Coast.' }
  ];

  const collections = [
    {
      title: "Bất động sản hàng hiệu",
      items: [
        { name: "Grand Marina, Saigon", desc: "JW Marriott & Marriott đầu tiên tại VN" },
        { name: "The Grand, Hanoi", desc: "The Ritz-Carlton Residences đầu tiên tại VN" },
        { name: "The Rivus", desc: "Dinh thự Elie Saab đầu tiên tại Châu Á" }
      ],
      icon: Gem
    },
    {
      title: "Masteri Collection",
      items: [
        { name: "TP.HCM", desc: "Masteri Thảo Điền, Centre Point" },
        { name: "Hà Nội", desc: "Waterfront, West Heights, Grand Coast" }
      ],
      icon: Building2
    },
    {
      title: "LUMIÈRE Series",
      items: [
        { name: "TP.HCM", desc: "LUMIÈRE riverside, Boulevard" },
        { name: "Hà Nội", desc: "SpringBay, Evergreen, Orient Pearl" }
      ],
      icon: Leaf
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      <SEO 
        title="Về Masterise Homes - Nhà Phát Triển Bất Động Sản Hàng Hiệu Số 1"
        description="Tìm hiểu hành trình kiến tạo những biểu tượng kiến trúc của Masterise Homes. Danh mục Branded Residences lớn nhất Đông Nam Á."
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-earth/60 z-10"></div>
          <img 
            src="https://picsum.photos/seed/masterise-hq/1920/1080" 
            alt="Masterise Homes" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full mb-8">
              <Gem className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">World-Class Developer</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-light text-white tracking-tighter mb-8 uppercase leading-[0.9]">
              Masterise <br />
              <span className="text-primary italic">Homes®</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
              Nhà phát triển bất động sản hàng hiệu đẳng cấp quốc tế tiên phong áp dụng các chuẩn mực toàn cầu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phần 1: Định vị & Vị thế */}
      <section className="py-32 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading 
                title="Vị Thế Dẫn Đầu" 
                subtitle="Năng lực quốc tế được khẳng định qua những con số ấn tượng và danh mục dự án độc bản."
                center={false}
              />
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Số 1 Đông Nam Á</h4>
                    <p className="text-earth/50 font-light">Sở hữu danh mục Bất động sản hàng hiệu (Branded Residences) lớn nhất khu vực.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Top 3 Đông Nam Á</h4>
                    <p className="text-earth/50 font-light">Thương hiệu Bất động sản giá trị nhất khu vực Đông Nam Á.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Gem className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Top 2 Việt Nam</h4>
                    <p className="text-earth/50 font-light">Thương hiệu Bất động sản giá trị nhất tại thị trường Việt Nam.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[64px] overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/seed/masterise-status/800/1000" alt="Masterise Position" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[40px] shadow-xl border border-earth/5 hidden md:block">
                <p className="text-5xl font-serif text-primary mb-2">15+</p>
                <p className="text-xs font-black uppercase tracking-widest text-earth/40">Năm kinh nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần 2: Lịch sử hình thành */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Hành Trình Kiến Tạo" subtitle="Những mốc son chói lọi trên con đường trở thành nhà phát triển BĐS hàng đầu." />
          
          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-earth/10 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[32px] border border-earth/5 hover:shadow-xl transition-all group"
                >
                  <div className="text-primary font-serif text-2xl mb-4 italic">{item.year}</div>
                  <div className="w-3 h-3 bg-primary rounded-full mb-6 group-hover:scale-150 transition-transform"></div>
                  <h4 className="font-serif text-lg mb-2">{item.title}</h4>
                  <p className="text-earth/50 text-xs font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Phần 3: Tầm nhìn & Đối tác */}
      <section className="py-32 bg-earth text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://picsum.photos/seed/masterise-partner/800/600" alt="Partners" className="rounded-[48px] shadow-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-8">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Global Partnerships</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-light mb-10 leading-tight">Bắt tay cùng những <br /><span className="text-primary italic">"Gã khổng lồ"</span></h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                    <Sparkles className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif mb-3">Marriott International</h4>
                    <p className="text-white/50 font-light leading-relaxed">Hợp tác chiến lược cùng tập đoàn khách sạn lớn nhất thế giới, bảo chứng cho các thương hiệu Marriott, JW Marriott và Ritz-Carlton.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif mb-3">Bảo chứng vận hành</h4>
                    <p className="text-white/50 font-light leading-relaxed">Duy trì chất lượng sống và giá trị tài sản bền vững nhờ Masterise Property Management theo tiêu chuẩn quốc tế.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần 4: Hệ sinh thái sản phẩm */}
      <section className="py-32 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Hệ Sinh Thái Sản Phẩm" subtitle="Kiến tạo trải nghiệm sống phong phú cho giới tinh hoa qua đa dạng dòng sản phẩm." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((col, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[48px] border border-earth/5 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all">
                  <col.icon size={32} />
                </div>
                <h3 className="text-3xl font-serif font-light mb-8">{col.title}</h3>
                <div className="space-y-6">
                  {col.items.map((item, j) => (
                    <div key={j} className="border-l-2 border-primary/20 pl-6">
                      <h5 className="font-bold text-earth mb-1">{item.name}</h5>
                      <p className="text-earth/40 text-xs font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phần 5: Thành tựu & Cam kết */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Our Commitment</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-earth mb-10">Giá Trị Vượt Thời Gian</h2>
          <div className="bg-bg-light p-12 md:p-20 rounded-[64px] border border-earth/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <p className="text-2xl md:text-3xl font-serif font-light text-earth/80 leading-relaxed mb-12 italic">
              "Trong năm 2023, chúng tôi đã hoàn thành bàn giao xuất sắc hơn 8.000 căn hộ. Masterise Homes cam kết mang đến những công trình kiến trúc đẳng cấp, là tài sản bảo chứng cho sự thịnh vượng của khách hàng."
            </p>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <p className="text-4xl font-serif text-primary mb-2">8.000+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-earth/40">Căn hộ bàn giao 2023</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-primary mb-2">40.200</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-earth/40">Căn hộ Masteri Collection</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-primary mb-2">14.500</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-earth/40">Căn hộ LUMIÈRE Series</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 border-t border-earth/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Q&A</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-earth mb-6 tracking-tight">Câu hỏi thường gặp</h2>
            <p className="text-earth/60 font-light text-xl">Giải đáp những thắc mắc phổ biến nhất về Masterise Homes.</p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {FAQS.slice(0, 5).map((faq, i) => (
              <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-earth/5 hover:border-primary/20 transition-all duration-500 shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left p-6 md:p-8 hover:bg-bg-light transition-colors"
                >
                  <span className="font-serif text-xl text-earth pr-8 font-light">{faq.q}</span>
                  <div className={`flex-none w-10 h-10 rounded-full bg-bg-light flex items-center justify-center shadow-sm transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-primary text-white shadow-lg shadow-primary/20' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 text-earth/50 font-light text-lg leading-relaxed whitespace-pre-line border-t border-earth/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ContactPage = ({ onOpenConsultation }: { onOpenConsultation: () => void, key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEO 
        title="Liên Hệ Masterise Homes - Hỗ Trợ Tư Vấn 24/7"
        description="Liên hệ với Masterise Homes để được tư vấn chi tiết về các dự án bất động sản hàng hiệu. Hotline: 0359 622 268."
      />
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Get in Touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-earth mb-8 tracking-tighter uppercase">Liên hệ</h1>
            <p className="text-2xl text-earth/60 mb-16 font-light leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn tìm kiếm không gian sống lý tưởng nhất.
            </p>

            <div className="space-y-12">
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center flex-none group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-light mb-2">Địa chỉ văn phòng</h4>
                  <p className="text-earth/50 font-light text-lg">Sao Biển 01 SP25-01 Vinhomes Ocean Park Gia Lâm Hà Nội</p>
                  <a href="https://maps.app.goo.gl/Bj2y2bztJVctPWD28" target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-black uppercase tracking-widest mt-4 inline-block hover:underline">Xem trên bản đồ</a>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center flex-none group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-light mb-2">Hotline tư vấn</h4>
                  <p className="text-earth font-serif text-3xl italic">0359 622 268</p>
                  <p className="text-[10px] text-primary font-black uppercase mt-2 tracking-widest">Hỗ trợ 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 md:p-16 rounded-[64px] shadow-2xl shadow-earth/5 border border-earth/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-3xl font-serif font-light text-earth mb-4">Gửi lời nhắn</h3>
            <p className="text-earth/50 font-light mb-12">Chuyên viên của chúng tôi sẽ phản hồi bạn trong vòng 24h.</p>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onOpenConsultation(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-earth/40 ml-4">Họ tên</label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-6 py-4 bg-bg-light border border-earth/5 rounded-2xl focus:border-primary/50 text-earth font-light outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-earth/40 ml-4">Số điện thoại</label>
                  <input type="tel" placeholder="0xxx xxx xxx" className="w-full px-6 py-4 bg-bg-light border border-earth/5 rounded-2xl focus:border-primary/50 text-earth font-light outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-earth/40 ml-4">Nội dung</label>
                <textarea rows={4} placeholder="Tôi quan tâm đến dự án..." className="w-full px-6 py-4 bg-bg-light border border-earth/5 rounded-2xl focus:border-primary/50 text-earth font-light outline-none transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full btn-gradient text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Gửi yêu cầu ngay
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const NewsPage = (_props: { key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEO 
        title="Tin Tức & Phân Tích Thị Trường - Masterise Homes"
        description="Cập nhật những tin tức mới nhất về thị trường bất động sản và các dự án của Masterise Homes."
      />
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Insights & News</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-light text-earth mb-20 tracking-tighter uppercase">Tin Tức</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {NEWS.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="rounded-[40px] overflow-hidden mb-8 h-72 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">{item.category}</p>
              <h4 className="text-2xl font-serif font-light mb-4 group-hover:text-primary transition-colors leading-tight">{item.title}</h4>
              <p className="text-earth/50 font-light text-sm line-clamp-2 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const openConsultation = () => setIsConsultationOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-bg-light">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        onOpenConsultation={openConsultation}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <MasteriGrandCoast onOpenConsultation={openConsultation} />
          )}
          {currentPage === 'about' && (
            <AboutPage key="about" />
          )}
          {currentPage === 'contact' && (
            <ContactPage key="contact" onOpenConsultation={openConsultation} />
          )}
          {currentPage === 'news' && (
            <NewsPage key="news" />
          )}
        </AnimatePresence>
      </main>

      <Footer onOpenConsultation={openConsultation} onNavigate={setCurrentPage} />

      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />

      {/* Floating Action Buttons - REMOVED */}
      
      {/* Middle-Right Shaking Consultation Button */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50 flex flex-col items-end">
        <motion.button 
          initial="initial"
          whileHover="hover"
          animate="animate"
          variants={{
            initial: { width: '64px' },
            hover: { width: 'auto', paddingRight: '24px' },
            animate: { 
              x: [0, -5, 5, -5, 5, 0],
              rotate: [0, -5, 5, -5, 5, 0],
              scale: [1, 1.1, 1, 1.1, 1],
              transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }
            }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={openConsultation}
          className="btn-gradient text-white h-16 rounded-l-full flex items-center shadow-[-10px_10px_30px_rgba(169,107,17,0.3)] border-y border-l border-white/20 backdrop-blur-md overflow-hidden"
        >
          <div className="flex items-center justify-center min-w-[64px] h-full">
            <div className="relative">
              <MessageSquare size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
            </div>
          </div>
          <motion.span 
            variants={{
              initial: { opacity: 0, x: 20, width: 0 },
              hover: { opacity: 1, x: 0, width: 'auto' }
            }}
            className="font-black uppercase tracking-widest text-[10px] md:text-xs whitespace-nowrap overflow-hidden"
          >
            Tư vấn ngay
          </motion.span>
        </motion.button>
      </div>

      {/* Fixed Bottom Bar (Mobile Style on Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-transparent p-4 md:p-6 flex gap-3 md:gap-4 items-center justify-center pointer-events-none">
        <motion.a 
          href="tel:0359622268"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.1)",
              "0 20px 25px -5px rgba(37, 99, 235, 0.5), 0 10px 10px -5px rgba(37, 99, 235, 0.2)",
              "0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.1)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 max-w-sm bg-[#0068FF] text-white h-12 md:h-14 rounded-full flex items-center justify-center gap-2 md:gap-3 font-black uppercase tracking-widest text-xs md:text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors pointer-events-auto relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          <Phone size={20} className="animate-bounce" />
          <span className="relative z-10">Gọi ngay</span>
        </motion.a>

        <motion.button 
          onClick={openConsultation}
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 10px 15px -3px rgba(169, 107, 17, 0.3), 0 4px 6px -2px rgba(169, 107, 17, 0.1)",
              "0 20px 25px -5px rgba(169, 107, 17, 0.5), 0 10px 10px -5px rgba(169, 107, 17, 0.2)",
              "0 10px 15px -3px rgba(169, 107, 17, 0.3), 0 4px 6px -2px rgba(169, 107, 17, 0.1)"
            ]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 max-w-sm btn-gradient text-white h-12 md:h-14 rounded-full flex items-center justify-center gap-2 md:gap-3 font-black uppercase tracking-widest text-xs md:text-sm shadow-lg shadow-primary/20 transition-all pointer-events-auto relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "linear",
              repeatDelay: 3
            }}
          />
          <MessageSquare size={20} />
          <span className="relative z-10">Đăng ký tư vấn</span>
        </motion.button>
      </div>
    </div>
  );
}
