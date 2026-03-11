import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Play, 
  Maximize2, 
  CheckCircle2, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  X,
  Info,
  Calendar,
  FileText,
  User,
  Users,
  Star,
  ShieldCheck,
  TrendingUp,
  Layout,
  Wallet,
  Image as ImageIcon,
  Building2,
  ArrowRight,
  Sparkles,
  Gem,
  Compass,
  Zap,
  Layers,
  ChefHat,
  Droplets
} from 'lucide-react';
import SEO from '../components/SEO';

// --- Animation Variants ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

// --- Shared Components ---

const ZoomableImage = ({ src, alt }: { src: string, alt: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative group cursor-zoom-in overflow-hidden rounded-3xl border border-earth/5 shadow-sm" onClick={() => setIsOpen(true)}>
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="bg-white/90 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl scale-90 group-hover:scale-100">
            <Maximize2 className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-earth/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-10">
              <X className="w-10 h-10" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={src} 
              alt={alt} 
              className="max-w-full max-h-full object-contain cursor-zoom-out"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionHeading = ({ title, subtitle, light = false, center = true }: { title: string, subtitle?: string, light?: boolean, center?: boolean }) => (
  <div className={`mb-20 ${center ? 'text-center' : 'text-left'}`}>
    <motion.div
      {...fadeInUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6"
    >
      <Sparkles className="w-4 h-4 text-primary" />
      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Masteri Grand Coast</span>
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

const InlineConsultationForm = ({ dark = false, horizontal = false }: { dark?: boolean, horizontal?: boolean }) => {
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
        setFormData({ name: '', phone: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(result.error || "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi thông tin. Vui lòng kiểm tra kết nối mạng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-10 px-6 rounded-3xl ${dark ? 'bg-white/10 text-white' : 'bg-green-50 text-green-800 border border-green-100'}`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${dark ? 'bg-primary/20 text-primary' : 'bg-green-100 text-green-600'}`}>
          <ShieldCheck size={32} />
        </div>
        <h4 className="text-xl font-serif mb-2">Gửi yêu cầu thành công!</h4>
        <p className="text-sm font-light opacity-80">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
      </motion.div>
    );
  }

  const inputClass = dark 
    ? "w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary/50 transition-all font-light placeholder:text-white/20"
    : "w-full px-6 py-4 rounded-2xl bg-bg-light border border-earth/5 text-earth outline-none focus:border-primary/50 transition-all font-light placeholder:text-earth/20";
  
  const labelClass = dark
    ? "text-[10px] font-black uppercase tracking-widest text-white/40 ml-4"
    : "text-[10px] font-black uppercase tracking-widest text-earth/40 ml-4";

  return (
    <form onSubmit={handleSubmit} className={horizontal ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-5"}>
      <div className="space-y-2">
        <label className={labelClass}>Họ và tên</label>
        <input 
          required
          type="text" 
          placeholder="Nguyễn Văn A" 
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className={inputClass} 
        />
      </div>
      <div className="space-y-2">
        <label className={labelClass}>Số điện thoại</label>
        <input 
          required
          type="tel" 
          pattern="[0-9]{10,11}"
          title="Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)"
          placeholder="0xxx xxx xxx" 
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass} 
        />
      </div>
      <div className={horizontal ? "flex items-end" : "pt-2"}>
        <button 
          disabled={isSubmitting}
          type="submit"
          className={`w-full btn-gradient text-white font-black py-4 md:py-5 rounded-2xl shadow-2xl shadow-primary/40 text-lg hover:scale-[1.02] active:scale-95 transition-all ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu ngay'}
        </button>
      </div>
    </form>
  );
};

const Accordion = ({ items, dark = false }: { items: { q: string, a: string }[], dark?: boolean }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, index) => (
        <motion.div 
          key={index}
          {...fadeInUp}
          className={`border rounded-[32px] overflow-hidden transition-all duration-500 ${dark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-earth/5 hover:border-primary/20 shadow-sm'}`}
        >
          <button 
            className={`w-full flex items-center justify-between p-6 md:p-8 text-left font-medium transition-colors ${dark ? 'text-white' : 'text-earth'}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-lg md:text-xl pr-4 font-serif font-light">{item.q}</span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${dark ? 'bg-white/10' : 'bg-primary/10'} ${openIndex === index ? 'rotate-180 bg-primary text-white shadow-lg shadow-primary/20' : ''}`}>
              <ChevronRight className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-90' : ''}`} />
            </div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-8 pt-0 leading-relaxed border-t text-lg font-light whitespace-pre-line ${dark ? 'text-white/60 border-white/10' : 'text-earth/60 border-earth/5'}`}>
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// --- Main Page ---

export default function MasteriGrandCoast({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const [activeTab, setActiveTab] = useState('Studio');
  const [activeWaveTab, setActiveWaveTab] = useState('Tòa L1');
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [floorPlanSlide, setFloorPlanSlide] = useState(0);

  useEffect(() => {
    setFloorPlanSlide(0);
  }, [activeTab]);

  const galleryImages = [
    { src: "https://i.postimg.cc/x1dFs4X2/V020_CT05_OVERVIEW_01.jpg", alt: "Phối cảnh Flycam toàn dự án view Biển hồ" },
    { src: "https://i.postimg.cc/tgZvbnds/V03_CT05_OVERVIEW_02.jpg", alt: "Kiến trúc kính ghép cong ban công" },
    { src: "https://i.postimg.cc/cJgkWt7t/V040_CT05_OVERVIEW_03.jpg", alt: "Đại dương tiện ích: Bể bơi Olympic, Business Lounge..." },
    { src: "https://i.postimg.cc/PJhS16g2/V070_CT05_FACADE_GOLDEN_HOUR_(3).jpg", alt: "Mặt đứng dự án giờ vàng" },
    { src: "https://i.postimg.cc/RZ0bPDWM/V010_CT05_MASTERPLAN_01.jpg", alt: "Tổng mặt bằng dự án" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (label: string) => {
    console.log(`GA4: click_cta_${label}`);
  };

  const faqItems = [
    { 
      q: "Vị trí chính xác của Masteri Grand Coast ở đâu?", 
      a: "Dự án nằm tại trung tâm khu đô thị Ocean Park 2 (thuộc xã Nghĩa Trụ, huyện Văn Giang, tỉnh Hưng Yên). Tọa độ chính xác nằm giữa 2 trục đường San Hô và Đại Dương, kế bên phân khu Lumiere SpringBay và đối diện trực tiếp với biển hồ tạo sóng Wonder Wave Park 18ha." 
    },
    { 
      q: "Chủ đầu tư dự án là ai?", 
      a: "Dự án được phát triển bởi Masterise Homes®, trực thuộc Tập đoàn Masterise." 
    },
    { 
      q: "Tiêu chuẩn bàn giao của căn hộ như thế nào?", 
      a: "Căn hộ được bàn giao theo tiêu chuẩn cao cấp chuẩn Masteri Collection. Cụ thể, bàn giao hoàn thiện nội thất liền tường bao gồm: hệ thống cửa kính chạm trần (full-height), trần thạch cao kèm đèn downlight, điều hòa 2 chiều, sàn gỗ cao cấp, ban công kính. Khu vực bếp được trang bị đầy đủ tủ bếp sang trọng, mặt đá nung kết và các thiết bị nhập khẩu (bếp từ, máy hút mùi, chậu rửa,...)." 
    },
    { 
      q: "Khi nào dự án dự kiến bàn giao?", 
      a: "Thời điểm bàn giao dự kiến vào Quý 3/2028 (thời điểm cụ thể dự kiến khoảng giữa tháng 09/2028)." 
    },
    { 
      q: "Có hỗ trợ vay ngân hàng không?", 
      a: "Có. Chủ đầu tư hỗ trợ vay vốn đòn bẩy 50% hoặc 70% giá trị căn hộ với lãi suất 0%, ân hạn nợ gốc và miễn phí trả nợ trước hạn trong thời gian ưu đãi. Cụ thể:\n\n- Gói vay 70%: Hỗ trợ lãi suất 0% tới hết tháng 02/2029.\n- Gói vay 50%: Hỗ trợ lãi suất 0% tới hết tháng 05/2029." 
    },
    { 
      q: "Pháp lý dự án như thế nào?", 
      a: "Pháp lý căn hộ là sở hữu lâu dài (đối với người Việt Nam) and 50 năm (đối với người nước ngoài)." 
    },
    { 
      q: "Mật độ xây dựng của dự án là bao nhiêu?", 
      a: "Dự án có mật độ xây dựng cực kỳ thấp, chỉ 15,8% nhằm ưu tiên quỹ đất cho cảnh quan xanh và tiện ích." 
    },
    { 
      q: "Dự án có bao nhiêu tầng hầm đỗ xe?", 
      a: "Dự án có 02 tầng hầm đỗ xe liên thông toàn bộ khu đất với tổng diện tích lên tới 140.042m², giúp giải quyết triệt để nỗi lo thiếu chỗ đỗ xe tại chung cư." 
    },
    { 
      q: "Tiện ích nội khu nổi bật nhất là gì?", 
      a: "Dự án sở hữu khu compound khép kín với 4 công viên nội khu (rộng hơn 53.000m² cảnh quan) cùng hơn 180 tiện ích liên hoàn. Các tiện ích nổi bật nhất bao gồm: Bể bơi Olympic dài 50m, Bể bơi vô cực, Vườn BBQ, không gian làm việc hạng thương gia Business Lounge thông tầng, phòng Gym, phòng tập Yoga và Khu vui chơi trẻ em (Kid Zone)." 
    },
    { 
      q: "Giá bán căn hộ Masteri Grand Coast là bao nhiêu?", 
      a: "Đơn giá trung bình dao động từ 62 - 80 triệu/m² (chưa VAT và KPBT). Các căn hộ góc hoặc hướng view trực diện biển hồ có giá trị cao hơn.\n\nTổng giá tham khảo (dự kiến): Dao động từ khoảng 2,21 tỷ đồng (đối với căn Studio view hồ thấp nhất) đến mức cao nhất khoảng 11,37 tỷ đồng (cho căn 4 phòng ngủ view trực diện biển hồ Wonder Wave Park)." 
    }
  ];

  const objections = [
    { 
      q: "Đơn giá 62 - 80 triệu/m² ở Hưng Yên có quá cao không?", 
      a: "Mức giá này phản ánh giá trị của một \"bất động sản hàng hiệu\". Nó hoàn toàn xứng đáng với mật độ xây dựng chỉ 15,8%, 2 tầng hầm siêu rộng, tiêu chuẩn bàn giao cao cấp và hệ tiện ích compound được vận hành bởi Masterise chuẩn quốc tế." 
    },
    { 
      q: "Về Ocean Park 2 đi làm có xa không?", 
      a: "Khái niệm khoảng cách nay được đo bằng \"phút di chuyển\". Nhờ cao tốc Hà Nội - Hải Phòng, từ dự án đi Ocean Park 1 chỉ mất 10 phút (8,6km), đi Hồ Gươm khoảng 35 phút. Đặc biệt, việc đón sóng Vành đai 3.5, Vành đai 4 và cầu Mễ Sở (dự kiến hoàn thành 2027-2028) sẽ giúp kết nối nội đô cực kỳ nhanh chóng." 
    },
    { 
      q: "Nghe nói dự án nằm gần khu vực nghĩa trang?", 
      a: "Thực tế khu vực đó nằm cách dự án 250 - 300m và đã được che chắn hoàn toàn bởi dải cây xanh và khu nhà shophouse thấp tầng nên không ảnh hưởng sinh hoạt. Nếu e ngại, khách hàng hoàn toàn có thể chọn các căn hộ hướng Tây Nam view hồ tạo sóng 18ha hoặc view tiện ích nội khu tuyệt đẹp." 
    },
    { 
      q: "Liệu sau này có khó bán lại hay khó cho thuê không?", 
      a: "Đây là \"bộ sưu tập Masteri cuối cùng\" tại Ocean City nên có tính khan hiếm cao. Việc quản lý bởi Masterise Property Management giúp tòa nhà không bị xuống cấp, thu hút tệp khách thuê chuyên gia trả giá cao và duy trì thanh khoản bền vững." 
    },
    { 
      q: "Bây giờ mua mà đến năm 2028 mới bàn giao, pháp lý có an toàn?", 
      a: "Dự án có pháp lý sở hữu lâu dài (với người Việt Nam). Việc dự kiến ký HĐMB vào tháng 6/2026 và bàn giao Quý 3/2028 giúp tiến độ đóng tiền cực kỳ thảnh thơi. Hiện dự án đang được thi công hầm móng rầm rộ 24/24." 
    }
  ];

  const targetGroups = [
    {
      title: "Cư dân Masteri Grand Coast & Gia đình đa thế hệ",
      desc: "Những người tìm kiếm một môi trường sống khoáng đạt tại Masteri Grand Coast với tỷ lệ mảng xanh lớn, đa dạng tiện ích cho con trẻ và giải quyết triệt để nỗi lo thiếu chỗ đỗ xe.",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      image: "https://i.postimg.cc/Kjnrk2mc/V100_CT05_ZONE3_AMEN_POND_GARDEN.jpg"
    },
    {
      title: "Giới chuyên gia tại Masteri Grand Coast",
      desc: "Tầng lớp tinh hoa cần một không gian sống riêng tư tuyệt đối tại Masteri Grand Coast, dịch vụ quản lý chuẩn quốc tế 5 sao và các không gian làm việc sang trọng.",
      icon: ShieldCheck,
      color: "bg-amber-50 text-amber-600",
      image: "https://i.postimg.cc/B6RMPpDp/Lounge.jpg"
    },
    {
      title: "Nhà đầu tư Masteri Grand Coast",
      desc: "Những nhà đầu tư nhắm tới việc tích sản giữ giá trị nhờ sự khan hiếm của Masteri Grand Coast và khai thác dòng tiền cho thuê vượt trội tại Ocean City.",
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600",
      image: "https://i.postimg.cc/zGp7F8KY/V050_CT05_LANDSCAPE_01.jpg"
    }
  ];

  const highlights = [
    { 
      title: "Vị thế độc bản Masteri Grand Coast", 
      desc: "Tọa lạc tại trung tâm Ocean Park 2, Masteri Grand Coast ôm trọn trực diện khoảng không biển hồ tạo sóng Wonder Wave Park 18ha, mang đến tầm nhìn panorama tuyệt mỹ.", 
      icon: Gem 
    },
    { 
      title: "Đặc quyền đỗ xe tại Masteri Grand Coast", 
      desc: "Masteri Grand Coast giải quyết triệt để nỗi lo thiếu chỗ đỗ xe với 2 tầng hầm liên thông toàn bộ khu đất, đáp ứng trung bình 1,65 slot đỗ xe ô tô cho mỗi căn hộ.", 
      icon: Building2 
    },
    { 
      title: "Mật độ xây dựng Masteri Grand Coast", 
      desc: "Mật độ xây dựng Masteri Grand Coast thấp kỷ lục 15,8%, nhường chỗ cho 4 công viên nội khu rợp bóng cây xanh, tạo ra không gian sống khoáng đạt.", 
      icon: Sparkles 
    },
    { 
      title: "Tiện ích compound Masteri Grand Coast", 
      desc: "Masteri Grand Coast sở hữu hơn 180 tiện ích nội khu liên hoàn chỉ dành riêng cho cư dân, mang lại sự riêng tư và an toàn tuyệt đối.", 
      icon: Zap 
    },
    { 
      title: "Bàn giao cao cấp Masteri Grand Coast", 
      desc: "Căn hộ Masteri Grand Coast bàn giao liền tường chuẩn Masteri Collection với hệ kính Full-height kịch trần và kính ghép cong tại các căn góc sang trọng.", 
      icon: ShieldCheck 
    },
    { 
      title: "Chính sách tài chính Masteri Grand Coast", 
      desc: "Mua Masteri Grand Coast chỉ cần vốn ban đầu 25-30%, ngân hàng hỗ trợ vay tới 70% với lãi suất 0% và ân hạn nợ gốc dài hạn.", 
      icon: Wallet 
    }
  ];

  const floorPlans = {
    'Studio': { 
      size: '28.7 – 32.6 m²', 
      desc: 'Nhỏ gọn, tối ưu dòng vốn đầu tư', 
      image: 'https://i.postimg.cc/RZ0bPDWM/V010_CT05_MASTERPLAN_01.jpg',
      subImages: [
        { title: 'Toà L1', src: 'https://i.postimg.cc/NjCjDDmh/C5L1-cut-page-0008.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/MZt21T1D/C5L2-cut-page-0008.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/LsjG56HT/C5Z1-cut-page-0008.jpg' }
      ]
    },
    '1PN': { 
      size: '42.6 m²', 
      desc: 'Phù hợp người trẻ, chuyên gia', 
      image: 'https://i.postimg.cc/rFhLFW4h/TMB_01.png',
      subImages: [
        { title: 'Toà L1', src: 'https://i.postimg.cc/nr1Dhm58/C5L1-cut-page-0009.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/9F8DgcHB/C5L2-cut-page-0009.jpg' }
      ]
    },
    '1PN+': { 
      size: '47 – 50.4 m²', 
      desc: 'Không gian "+1" linh hoạt, tối ưu công năng', 
      image: 'https://i.postimg.cc/rFhLFW4h/TMB_01.png',
      subImages: [
        { title: 'Toà L1', src: 'https://i.postimg.cc/5tjT5qS1/C5L1-cut-page-0010.jpg' },
        { title: 'Toà L1', src: 'https://i.postimg.cc/6QTgVLfX/C5L1-cut-page-0011.jpg' },
        { title: 'Toà L1', src: 'https://i.postimg.cc/PqN9bzQH/C5L1-cut-page-0012.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/s2BHGf3D/C5L2-cut-page-0010.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/VNSZ0szf/C5L2-cut-page-0011.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/Bv87PZJZ/C5L2-cut-page-0012.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/Y963QhVJ/C5Z1-cut-page-0009.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/0QYf7b3n/C5Z1-cut-page-0010.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/ydmP0k5n/C5Z1-cut-page-0011.jpg' }
      ]
    },
    '2PN': { 
      size: '64.6 – 70 m²', 
      desc: 'Thiết kế thông minh, tối ưu công năng', 
      image: 'https://i.postimg.cc/RZ0bPDWM/V010_CT05_MASTERPLAN_01.jpg',
      subImages: [
        { title: 'Toà L1', src: 'https://i.postimg.cc/tJvJmGmS/C5L1-cut-page-0013.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/TwRPd3zH/C5L2-cut-page-0013.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/NfWfyDh4/C5Z1-cut-page-0012.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/SNwNXd0G/C5Z1-cut-page-0013.jpg' }
      ]
    },
    '2PN+': { 
      size: '70 – 83.8 m²', 
      desc: 'Không gian "+1" linh hoạt, tối ưu công năng', 
      image: 'https://i.postimg.cc/RZ0bPDWM/V010_CT05_MASTERPLAN_01.jpg',
      subImages: [
        { title: 'Toà L1', src: 'https://i.postimg.cc/Dwwkwb0H/C5L1-cut-page-0014.jpg' },
        { title: 'Toà L1', src: 'https://i.postimg.cc/XYYSYyqh/C5L1-cut-page-0015.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/RhB25W2K/C5L2-cut-page-0014.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/ZnSXtWXN/C5L2-cut-page-0015.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/SNwNXd0G/C5Z1-cut-page-0013.jpg' }
      ]
    },
    '3PN': { 
      size: '92.8 – 131.3 m²', 
      desc: 'Gia đình đa thế hệ, view góc siêu đẹp', 
      image: 'https://i.postimg.cc/rFhLFW4h/TMB_01.png',
      subImages: [
        { title: 'Toà L1', src: 'https://i.postimg.cc/sXw5y8LR/C5L1-cut-page-0016.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/vHpfQ53N/C5L2-cut-page-0016.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/5tmCqTby/C5Z1-cut-page-0015.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/jjh7Qmt5/C5Z1-cut-page-0016.jpg' }
      ]
    },
    '4PN': { 
      size: '124.8 – 130.4 m²', 
      desc: 'Siêu rộng, khẳng định vị thế', 
      image: 'https://i.postimg.cc/cJgkWt7t/V040_CT05_OVERVIEW_03.jpg',
      subImages: [
        { title: 'Toà L1', src: 'https://i.postimg.cc/zGZHm8fV/C5L1-cut-page-0017.jpg' },
        { title: 'Toà L2', src: 'https://i.postimg.cc/QCKCPyG7/C5L2-cut-page-0017.jpg' },
        { title: 'Toà Z1', src: 'https://i.postimg.cc/CLDHnvBp/C5Z1-cut-page-0017.jpg' }
      ]
    },
    'DUPLEX': {
      size: '> 150 m²',
      desc: 'Đẳng cấp thượng lưu, tầm view panorama',
      image: 'https://i.postimg.cc/Z543BJz6/C5L1-cut-page-0018.jpg',
      subImages: [
        { title: 'Toà L1 (Tầng 1)', src: 'https://i.postimg.cc/Z543BJz6/C5L1-cut-page-0018.jpg' },
        { title: 'Toà L1 (Tầng 2)', src: 'https://i.postimg.cc/CxSDBwp4/C5L1-cut-page-0019.jpg' },
        { title: 'Toà L1 (Tầng 1)', src: 'https://i.postimg.cc/MpqRMzJV/C5L1-cut-page-0020.jpg' },
        { title: 'Toà L1 (Tầng 2)', src: 'https://i.postimg.cc/8zNWJTgh/C5L1-cut-page-0021.jpg' },
        { title: 'Toà L1 (Tầng 2)', src: 'https://i.postimg.cc/7Zw7Gqr3/C5L1-cut-page-0022.jpg' },
        { title: 'Toà L2 (Tầng 1)', src: 'https://i.postimg.cc/PqqwyKxb/C5L2-cut-page-0018.jpg' },
        { title: 'Toà L2 (Tầng 2)', src: 'https://i.postimg.cc/ZqqdHjRc/C5L2-cut-page-0019.jpg' },
        { title: 'Toà L2 (Tầng 1)', src: 'https://i.postimg.cc/W44k8S3g/C5L2-cut-page-0020.jpg' },
        { title: 'Toà L2 (Tầng 2)', src: 'https://i.postimg.cc/s22hmKX5/C5L2-cut-page-0021.jpg' },
        { title: 'Toà L2 (Tầng 2)', src: 'https://i.postimg.cc/hGGdsMj9/C5L2-cut-page-0022.jpg' },
        { title: 'Toà Z1 (Tầng 1)', src: 'https://i.postimg.cc/JnfH1LQg/C5Z1-cut-page-0018.jpg' },
        { title: 'Toà Z1 (Tầng 2)', src: 'https://i.postimg.cc/fLGSwNvp/C5Z1-cut-page-0019.jpg' },
        { title: 'Toà Z1 (Tầng 1)', src: 'https://i.postimg.cc/MTCfWSYs/C5Z1-cut-page-0020.jpg' },
        { title: 'Toà Z1 (Tầng 2)', src: 'https://i.postimg.cc/FRMk94xT/C5Z1-cut-page-0021.jpg' },
        { title: 'Toà Z1 (Tầng 2)', src: 'https://i.postimg.cc/wvCR6pkG/C5Z1-cut-page-0022.jpg' }
      ]
    }
  };

  const waveFloorPlans: Record<string, string> = {
    'Tòa L1': 'https://i.postimg.cc/CMkNGgFL/mat_bang_tang_8_22_toa_l1_phan_khu_the_wave_masteri_grand_coast_2048x1412_20260121054500_0ak_4.jpg',
    'Tòa L2': 'https://i.postimg.cc/Y2Y36HpC/mat_bang_tang_8_22_toa_l2_phan_khu_the_wave_masteri_grand_coast_2048x1412_20260121054757_ieznz.jpg',
    'Tòa Z1': 'https://i.postimg.cc/ryxJ1k8V/mat_bang_tang_5_22_toa_z1_phan_khu_the_wave_masteri_grand_coast_2048x1412_20260121054814_mbdd8.jpg'
  };

  return (
    <div className="bg-bg-light font-sans text-earth overflow-x-hidden">
      <SEO 
        title="Masteri Grand Coast | Nam BĐS"
        description="Masteri Grand Coast - Dự án căn hộ cao cấp nhất tại Ocean Park 2. Cập nhật bảng giá, chính sách bán hàng và tiến độ dự án Masteri Grand Coast mới nhất."
        image="https://i.postimg.cc/PJhS16g2/V070_CT05_FACADE_GOLDEN_HOUR_(3).jpg"
        type="website"
      />

      {/* Sticky CTA Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/80 backdrop-blur-md border-t border-earth/5 p-3 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <a 
          href="tel:0359622268" 
          className="flex-1 flex items-center justify-center gap-2 bg-earth/5 text-earth font-bold py-3.5 rounded-2xl"
          onClick={() => handleCTAClick('call')}
        >
          <Phone className="w-5 h-5" />
          Gọi ngay
        </a>
        <a 
          href="https://zalo.me/0359622268" 
          target="_blank"
          className="flex-1 flex items-center justify-center gap-2 btn-gradient text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20"
          onClick={() => handleCTAClick('zalo')}
        >
          <MessageCircle className="w-5 h-5" />
          Zalo tư vấn
        </a>
      </div>

      {/* Section 1: HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src="https://i.postimg.cc/j5S88J22/V03-CT05-OVERVIEW-02.jpg" 
            alt="Masteri Grand Coast Facade" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth/95 via-earth/60 to-transparent"></div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-3/5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full mb-8">
                  <Gem className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">The Pinnacle of Luxury</span>
                </div>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-light text-white mb-6 md:mb-8 leading-[0.9] tracking-tighter">
                  Masteri <br />
                  <span className="text-primary italic">Grand Coast</span>
                </h1>
                <p className="text-lg md:text-2xl text-white/70 mb-8 md:mb-12 font-light leading-relaxed max-w-xl">
                  Kiến tạo chuẩn mực sống quốc tế thông qua các dự án bất động sản hàng hiệu hàng đầu Việt Nam.
                </p>

                <div className="hidden md:grid grid-cols-2 gap-6 mb-12">
                  {[
                    { icon: Compass, text: "Vị trí tâm điểm Ocean City" },
                    { icon: Zap, text: "180+ Tiện ích đặc quyền" },
                    { icon: Building2, text: "2 Tầng hầm đỗ xe liên thông" },
                    { icon: ShieldCheck, text: "Quản lý vận hành quốc tế" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium tracking-wide">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:w-2/5 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[32px] md:rounded-[48px] shadow-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-2">Đăng ký tư vấn</h3>
                <p className="text-white/50 text-xs md:text-sm mb-8 md:mb-10 font-light">Nhận bảng giá và tài liệu dự án mới nhất.</p>
                <InlineConsultationForm dark />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 3 Nhóm khách hàng phù hợp */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Dành Cho Những Chủ Nhân Tương Lai Tại Masteri Grand Coast" 
            subtitle="Masteri Grand Coast được kiến tạo để đáp ứng những tiêu chuẩn khắt khe nhất của tầng lớp tinh hoa."
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          >
            {targetGroups.map((group, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="group relative h-[400px] md:h-[500px] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <img src={group.image} alt={group.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/20 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className={`w-12 h-12 md:w-14 md:h-14 ${group.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                    <group.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-3 md:mb-4">{group.title}</h3>
                  <p className="text-white/70 text-sm md:text-base font-light leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">{group.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3: 6 Lý do nổi bật */}
      <section className="py-32 bg-bg-light">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="6 LÝ DO NÊN SỞ HỮU MASTERI GRAND COAST" 
            subtitle="Khám phá những giá trị độc bản tạo nên sức hút khó cưỡng của dự án Masteri Grand Coast."
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {highlights.map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="p-10 rounded-[40px] bg-white border border-earth/5 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-serif font-light text-earth mb-4">{item.title}</h4>
                <p className="text-earth/50 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3.5: 360 View */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="TRẢI NGHIỆM THỰC TẾ ẢO 360° MASTERI GRAND COAST" 
            subtitle="Khám phá không gian sống đẳng cấp tại dự án Masteri Grand Coast qua công nghệ thực tế ảo hiện đại."
          />
          <motion.div 
            {...fadeInUp}
            className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5 w-full h-[500px] md:h-[700px]"
          >
             <iframe 
               width="100%" 
               height="100%" 
               style={{ width: '100%', height: '100%', border: 'none' }} 
               frameBorder="0" 
               allow="xr-spatial-tracking; gyroscope; accelerometer" 
               allowFullScreen 
               scrolling="no" 
               src="https://kuula.co/share/collection/7Hwpc?logo=0&info=0&fs=1&vr=1&sd=1&thumbs=1"
             ></iframe>
          </motion.div>
          <p className="text-center mt-6 text-earth/60 font-light italic">
            Masteri Grand Coast | Thành Phát F1 Masterise Homes
          </p>
        </div>
      </section>

      {/* Section 4: 5 Nỗi lo thường gặp */}
      <section className="py-32 bg-earth text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading 
            title="GIẢI ĐÁP NHỮNG NỖI LO THƯỜNG GẶP" 
            subtitle="Chúng tôi thấu hiểu những băn khoăn của bạn và sẵn sàng giải đáp một cách minh bạch nhất."
            light
          />
          <Accordion items={objections} dark />
        </div>
      </section>

      {/* Section 5: Thông tin tổng quan */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Thông Tin Tổng Quan Dự Án Masteri Grand Coast" 
            subtitle="Cái nhìn toàn cảnh về quy mô, vị trí và các thông số kỹ thuật của Masteri Grand Coast."
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Tên dự án", value: "Masteri Grand Coast.", icon: Info },
              { label: "Vị trí", value: "Trung tâm Ocean Park 2, Ocean City (Đối diện Wonder Wave Park).", icon: MapPin },
              { label: "Chủ đầu tư & Phát triển", value: "Masterise Homes®.", icon: User },
              { label: "Đơn vị quản lý vận hành", value: "Masterise Property Management (Tiêu chuẩn quốc tế).", icon: ShieldCheck },
              { label: "Quy mô", value: "72.498 m². Gồm 7 tòa tháp cao 27 tầng, 2 tầng hầm liên thông.", icon: Building2 },
              { label: "Phân khu", value: "The Wave (Mở bán trước: L1, L2, Z1) và The Sand.", icon: Layout },
              { label: "Mật độ xây dựng", value: "Cực thấp, chỉ 15,8%.", icon: Zap },
              { label: "Tổng số căn hộ", value: "Khoảng 3.400 căn.", icon: Users },
              { label: "Loại hình căn hộ", value: "Đa dạng từ Studio, 1PN, 1PN+, 2PN, 2PN+, 3PN, 4PN đến các dòng đặc biệt giới hạn như Duplex, Penthouse.", icon: Gem },
              { label: "Tiện ích", value: "4 công viên nội khu, 180+ tiện ích compound khép kín.", icon: Star },
              { label: "Pháp lý", value: "Sở hữu lâu dài (đối với người Việt Nam) và 50 năm (đối với người nước ngoài).", icon: FileText },
              { label: "Thời gian bàn giao", value: "Dự kiến Quý 3/2028.", icon: Calendar },
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="bg-bg-light p-8 md:p-10 rounded-[40px] border border-earth/5 text-center group hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-earth/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.label}</div>
                <div className="text-earth font-serif text-xl">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5.5: Tổng mặt bằng phân khu The Wave */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="TỔNG MẶT BẰNG PHÂN KHU THE WAVE - MASTERI GRAND COAST" 
            subtitle="Chi tiết bố trí các tòa tháp và tiện ích tại phân khu The Wave thuộc Masteri Grand Coast."
          />
          <motion.div 
            {...fadeInUp}
            className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5"
          >
             <img 
               src="https://i.postimg.cc/ZqQSxZYs/tong-mat-bang-phan-khu-the-wave-masteri-grand-coast-2048x1374-20260121054202-6qinh.jpg" 
               alt="Tổng mặt bằng phân khu The Wave" 
               loading="lazy"
               className="w-full h-auto object-cover"
               referrerPolicy="no-referrer"
             />
          </motion.div>
        </div>
      </section>

      {/* Section 5.6: Các phân khu */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="CÁC PHÂN KHU MASTERI GRAND COAST" 
          />
          <motion.p 
            {...fadeInUp}
            className="text-lg md:text-xl text-earth/60 font-light leading-relaxed text-center max-w-4xl mx-auto mb-16 -mt-10"
          >
            Masteri Grand Coast là dự án cuối cùng tại Ocean City thuộc Bộ sưu tập căn hộ cao cấp Masteri Collection, chính vì vậy mà dự án được Masterise Homes ưu ái kiến tạo nên một khu căn hộ với phong thái tự tại, một không gian sang trọng được dẫn lối đa tầng trải nghiệm với hệ sinh thái tiện ích đẳng cấp. Dự án bao gồm 7 tòa căn hộ cao 27 tầng với mật độ xây dựng chỉ 15,8% và được chia thành 2 phân khu như sau:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            <motion.div 
              {...fadeInUp}
              className="bg-white p-10 rounded-[32px] border border-earth/5 text-center shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h3 className="text-4xl font-serif text-primary mb-2">The Wave</h3>
              <p className="text-earth/40 text-xs font-black uppercase tracking-widest mb-6">Phân khu 1</p>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
                Phân khu mở bán đầu tiên
              </div>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-[32px] border border-earth/5 text-center shadow-xl hover:shadow-2xl transition-all duration-500 opacity-80"
            >
              <h3 className="text-4xl font-serif text-earth mb-2">The Sand</h3>
              <p className="text-earth/40 text-xs font-black uppercase tracking-widest mb-6">Phân khu 2</p>
              <div className="inline-block px-4 py-2 bg-earth/10 rounded-full text-earth/60 font-medium">
                Dự kiến 18/3
              </div>
            </motion.div>
          </div>

          <motion.div 
            {...fadeInUp}
            className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5"
          >
             <img 
               src="https://i.postimg.cc/hvd3xzpM/masteri-grand-coast-vi-tri-cac-toa-20260121053717-1xypz.jpg" 
               alt="Vị trí các tòa Masteri Grand Coast" 
               loading="lazy"
               className="w-full h-auto object-cover"
               referrerPolicy="no-referrer"
             />
          </motion.div>
          <p className="text-center mt-6 text-earth/60 font-light italic">
            Phân khu mở bán đầu tiên
          </p>
        </div>
      </section>

      {/* Section 5.7: Mặt bằng căn hộ The Wave */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="MẶT BẰNG CĂN HỘ THE WAVE MASTERI GRAND COAST" 
            subtitle="Chi tiết mặt bằng các tòa tháp L1, L2 và Z1 tại phân khu The Wave Masteri Grand Coast."
          />
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(waveFloorPlans).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveWaveTab(tab)}
                className={`px-10 py-4 rounded-full font-bold transition-all duration-500 text-sm tracking-widest uppercase ${activeWaveTab === tab ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105' : 'bg-white text-earth/40 hover:text-earth border border-earth/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div 
            key={activeWaveTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5"
          >
            <img 
              src={waveFloorPlans[activeWaveTab]} 
              alt={`Mặt bằng ${activeWaveTab}`} 
              loading="lazy"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 6: Mặt bằng */}
      <section className="py-32 bg-bg-light">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Kiến Trúc & Không Gian Masteri Grand Coast" 
            subtitle="Không gian sống tại Masteri Grand Coast được tối ưu hóa, mang lại sự thoải mái tuyệt đối."
          />

          {/* Static Info */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-4xl font-serif font-light text-earth leading-tight mb-6 text-center">Mặt bằng thiết kế tối ưu</h3>
            <div className="space-y-6 text-earth/70 font-light text-lg bg-white p-8 md:p-10 rounded-[32px] border border-earth/5 shadow-sm">
              <p>
                Phân khu mở bán đầu tiên là <span className="text-primary font-medium">The Wave</span> gồm 3 tòa tháp:
              </p>
              <ul className="space-y-4 list-none">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></div>
                  <span><strong className="text-earth font-medium">Tòa L1 & L2:</strong> Thiết kế hình chữ L (22 căn/sàn, 4 thang máy). Điểm nhấn là các căn góc 3PN (~106m²) và 4PN (~130m²) sở hữu kính ghép cong panorama đẳng cấp.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></div>
                  <span><strong className="text-earth font-medium">Tòa Z1:</strong> Thiết kế hình chữ Z với mật độ thấp hơn chỉ 18 căn/sàn (4 thang máy), tầm nhìn rộng mở tối đa.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {Object.keys(floorPlans).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-4 rounded-full font-bold transition-all duration-500 text-sm tracking-widest uppercase ${activeTab === tab ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105' : 'bg-white text-earth/40 hover:text-earth border border-earth/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-6 text-earth/70 font-light text-lg">
                <div className="pt-6 border-t border-earth/10">
                  <p className="mb-4 font-medium text-earth uppercase tracking-widest text-xs">Căn hộ {activeTab}</p>
                  <p className="text-2xl font-serif text-primary italic mb-2">Diện tích: {floorPlans[activeTab as keyof typeof floorPlans].size}</p>
                  <p className="text-earth/60 italic">({(floorPlans[activeTab as keyof typeof floorPlans] as any).desc})</p>
                </div>
                <p className="text-sm italic text-earth/40">* Sản phẩm giới hạn: Duplex và Penthouse.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Nội thất cao cấp", "Kính Low-E", "Ban công panorama", "Thiết bị Kohler"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-earth/80 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <button 
                onClick={onOpenConsultation}
                className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs group"
              >
                Xem chi tiết mặt bằng <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
            <motion.div
              key={`${activeTab}-img`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {(floorPlans[activeTab as keyof typeof floorPlans] as any).subImages ? (
                <div className="relative group">
                  <div className="overflow-hidden rounded-3xl border border-earth/5 shadow-sm">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={(floorPlans[activeTab as keyof typeof floorPlans] as any).subImages[floorPlanSlide].src}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ZoomableImage 
                          src={(floorPlans[activeTab as keyof typeof floorPlans] as any).subImages[floorPlanSlide].src} 
                          alt={`${activeTab} - ${(floorPlans[activeTab as keyof typeof floorPlans] as any).subImages[floorPlanSlide].title}`} 
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-primary shadow-lg z-10">
                    {(floorPlans[activeTab as keyof typeof floorPlans] as any).subImages[floorPlanSlide].title}
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {(floorPlans[activeTab as keyof typeof floorPlans] as any).subImages.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setFloorPlanSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === floorPlanSlide ? 'w-6 bg-primary' : 'w-2 bg-earth/30 hover:bg-earth/50'}`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={() => setFloorPlanSlide((prev) => (prev - 1 + (floorPlans[activeTab as keyof typeof floorPlans] as any).subImages.length) % (floorPlans[activeTab as keyof typeof floorPlans] as any).subImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-earth hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    onClick={() => setFloorPlanSlide((prev) => (prev + 1) % (floorPlans[activeTab as keyof typeof floorPlans] as any).subImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-earth hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              ) : (
                <ZoomableImage src={floorPlans[activeTab as keyof typeof floorPlans].image} alt={`Mặt bằng ${activeTab}`} />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6.1: Tiêu chuẩn bàn giao */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="TIÊU CHUẨN BÀN GIAO HẠNG SANG – MASTERI COLLECTION" 
            subtitle="Là dấu ấn kết tinh nơi phong cách sống được nâng tầm, các căn hộ tại Masteri Grand Coast được hoàn thiện theo tiêu chuẩn khắt khe của Masteri Collection."
          />
          
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto text-center mb-16 text-earth/70 font-light text-lg leading-relaxed"
          >
            Mọi vật liệu và trang thiết bị liền tường đều được tuyển chọn từ những thương hiệu nổi tiếng thế giới như <span className="text-primary font-medium">Kohler, Hafele, Daikin, Hitachi...</span>, mang đến sự bền bỉ, tính thẩm mỹ cao và trải nghiệm "xách vali vào ở" xứng tầm đẳng cấp gia chủ.
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "SÀN – TRẦN – HỆ KÍNH TẦM NHÌN",
                content: "Toàn bộ không gian phòng khách, phòng bếp và phòng ngủ đều được lát sàn gỗ cao cấp, mang lại cảm giác ấm cúng và sang trọng. Trần nhà được hoàn thiện bằng thạch cao kết hợp hệ thống đèn downlight hiện đại. Đặc biệt, dự án sử dụng hệ cửa kính kịch trần (Full-height) Low-E cách nhiệt cùng ban công kính, giúp mở rộng tối đa không gian và thu trọn ánh sáng tự nhiên. Riêng các căn góc được trang bị hệ kính ghép cong panorama độc bản.",
                icon: Layers
              },
              {
                title: "HỆ THỐNG CƠ ĐIỆN",
                content: "Căn hộ được bàn giao sẵn hệ thống điều hòa 2 chiều cục bộ, đảm bảo không khí luôn mát mẻ vào mùa hè và ấm áp vào mùa đông.",
                icon: Zap
              },
              {
                title: "KHÔNG GIAN BẾP TỐI ƯU",
                content: "Khu vực bếp được trang bị đầy đủ hệ tủ bếp trên và dưới với thiết kế sang trọng, gãy gọn. Chủ đầu tư bàn giao trọn bộ thiết bị bếp nhập khẩu cao cấp bao gồm: bếp từ, máy hút mùi âm tủ, chậu rửa và vòi nóng lạnh. Điểm nhấn đắt giá nhất là mặt bếp lát đá và tường khu vực bếp sử dụng vật liệu đá nung kết, giúp không gian thêm phần đẳng cấp và dễ dàng vệ sinh.",
                icon: ChefHat
              },
              {
                title: "KHÔNG GIAN PHÒNG TẮM",
                content: "Bàn giao đầy đủ các trang thiết bị vệ sinh liền tường cao cấp đến từ các thương hiệu quốc tế uy tín, đảm bảo tiêu chuẩn vận hành như tại các khu nghỉ dưỡng 5 sao.",
                icon: Droplets
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-light p-8 md:p-10 rounded-[32px] border border-earth/5 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-earth mb-4 uppercase tracking-wide">{item.title}</h3>
                <p className="text-earth/60 font-light leading-relaxed text-justify">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6.2: Hình ảnh căn hộ mẫu */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="HÌNH ẢNH CĂN HỘ MẪU MASTERI GRAND COAST" 
            subtitle="Trải nghiệm không gian sống thực tế qua các hình ảnh căn hộ mẫu Masteri Grand Coast sang trọng."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Căn hộ 2 Phòng ngủ", src: "https://i.postimg.cc/jjFWRF04/260108-Dream-City-CT5-L-Tower-2BR-Master-Bedroom-v2.jpg" },
              { title: "Căn hộ 3 Phòng ngủ", src: "https://i.postimg.cc/k5pV7p3Y/260110-CT5-Z-Tower-Unit-3BR-Living-Kitchen.jpg" },
              { title: "Căn hộ 4 Phòng ngủ (Phòng khách)", src: "https://i.postimg.cc/DzZJkKDd/260110-CT5-L-Tower-Unit-4BR-Livingroom.jpg" },
              { title: "Căn hộ 4 Phòng ngủ (Phòng ngủ Master)", src: "https://i.postimg.cc/cJbKdbyD/CT05-Z-Tower-Unit-4BR-Masterbedroom-6k.jpg" }
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[32px] shadow-lg"
              >
                <ZoomableImage src={img.src} alt={img.title} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 pointer-events-none">
                  <h4 className="text-white font-serif text-xl">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6.3: Sống giữa đại dương tiện ích */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="SỐNG GIỮA “ĐẠI DƯƠNG TIỆN ÍCH” MASTERI GRAND COAST" 
          />
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto text-center mb-16 text-earth/70 font-light text-lg leading-relaxed"
          >
            <p className="mb-6">
              Nằm tại vị trí tâm điểm độc tôn của khu đô thị Ocean Park 2 – Ocean City, dự án Masteri Grand Coast kế thừa trọn vẹn hệ sinh thái tiện ích đa dạng, chuẩn quốc tế ngay bên thềm nhà.
            </p>
            <p className="mb-6">
              Chỉ với vài bước chân, cư dân có thể hòa mình vào không khí hội hè bất tận tại Mega Grand World, K-Town hay phố đêm Little Hong Kong; chạm tay vào làn nước mát lành của biển hồ tạo sóng Wonder Wave Park; và thảnh thơi mua sắm tại Trung tâm thương mại Vincom Mega Mall sầm uất.
            </p>
            <p>
              Có thể nói, đây là đặc quyền sống giữa một “đại dương” trải nghiệm, nơi sự sôi động của phố thị hiện đại và nét tĩnh tại của tâm hồn được giao hòa, kiến tạo một cuộc sống trọn vẹn, thư thái và đầy cảm hứng.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Chuỗi 4 công viên chủ đề liên hoàn", src: "https://i.postimg.cc/zGp7F8KY/V050_CT05_LANDSCAPE_01.jpg" },
              { title: "Công viên nội khu đặc quyền", src: "https://i.postimg.cc/Kjnrk2mc/V100_CT05_ZONE3_AMEN_POND_GARDEN.jpg" },
              { title: "Hệ sinh thái tiện ích cảnh quan", src: "https://i.postimg.cc/C5ysx1Tt/V062_CT05_LANDSCAPE_02.jpg" },
              { title: "Hệ thống Bể bơi vô cực & Bể bơi chuẩn Olympic 50m", src: "https://i.postimg.cc/J0bcDLRr/V110_CT05_ZONE3_AMEN_FAMILY_POOL.jpg" },
              { title: "Sảnh chờ đón khách tiêu chuẩn 5 sao", src: "https://i.postimg.cc/WpJ9cRLB/Reception_Lobby.jpg" },
              { title: "Thư viện & Không gian làm việc hạng thương gia", src: "https://i.postimg.cc/B6RMPpDp/Lounge.jpg" },
              { title: "Phòng tập Gym & Yoga trang thiết bị hiện đại", src: "https://i.postimg.cc/NfqdgNB3/Dream_City_CT5_Z_Tower_Gym_6k.jpg" },
              { title: "Khu vui chơi trẻ em (Kid Zone) chủ đề khám phá", src: "https://i.postimg.cc/brQHDhqs/260110_kidroom_v2.jpg" }
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all duration-500"
              >
                <ZoomableImage src={img.src} alt={img.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                  <h4 className="text-white font-medium text-sm md:text-base line-clamp-2 group-hover:line-clamp-none transition-all">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6.4: Hệ tiện ích cảnh quan */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="HỆ TIỆN ÍCH CẢNH QUAN COMPOUND MASTERI GRAND COAST" 
          />
          
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto text-center mb-12 text-earth/70 font-light text-lg leading-relaxed space-y-6"
          >
            <p>
              Với mật độ xây dựng cực thấp chỉ <span className="font-medium text-primary">15,8%</span>, Masteri Grand Coast dành trọn không gian để phát triển 4 công viên nội khu đặc quyền với hơn 5,3ha tổng diện tích cảnh quan. Nơi đây quy tụ hệ sinh thái hơn 180 tiện ích liên hoàn đa dạng và đẳng cấp. Đặc biệt, toàn bộ không gian cảnh quan nội khu cùng hệ tiện ích được quy hoạch theo mô hình compound (khép kín) chỉ dành riêng cho cư dân, mở ra một hành trình trải nghiệm sống riêng tư trọn vẹn, an toàn tuyệt đối và đầy cảm hứng.
            </p>
            <p>
              Tại Masteri Grand Coast, mọi trải nghiệm đều được chăm chút tỉ mỉ bằng sự thấu hiểu và chuẩn mực vận hành quốc tế từ <span className="font-medium text-primary">Masterise Property Management</span> – thành viên của Tập đoàn Masterise. Từ Sảnh chính cư dân sang trọng ngập tràn ánh sáng, Thư viện, Khu vui chơi trẻ em (Kid Zone) chủ đề khám phá, Phòng tập Gym hiện đại, cho đến không gian làm việc hạng thương gia Business Lounge. Mỗi không gian không chỉ đáp ứng trọn vẹn công năng sử dụng, mà còn là chất liệu tinh tế kiến tạo nên chuẩn sống tiện nghi, tôn vinh vị thế gia chủ và dẫn lối nhịp sống ung dung, tự tại mỗi ngày.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5"
          >
             <ZoomableImage 
               src="https://i.postimg.cc/d17KKWw9/tien-ich-dai-do-thi-ocean-city-masteri-grand-coast.jpg" 
               alt="Hệ tiện ích cảnh quan Masteri Grand Coast" 
             />
          </motion.div>
        </div>
      </section>

      {/* Section 6.5: Tổng mặt bằng tiện ích */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="TỔNG MẶT BẰNG CÁC TIỆN ÍCH MASTERI GRAND COAST" 
            subtitle="Hệ thống tiện ích đẳng cấp được bố trí hài hòa, mang lại trải nghiệm sống trọn vẹn."
          />
          <motion.div 
            {...fadeInUp}
            className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5"
          >
             <ZoomableImage 
               src="https://i.postimg.cc/cCmJBH94/masteri-grand-coast-tong-mat-bang-tien-ich-2048x1316-20260121060449-pzk92.jpg" 
               alt="Tổng mặt bằng các tiện ích Masteri Grand Coast" 
             />
          </motion.div>
        </div>
      </section>

      {/* Section 6.6: Dấu ấn kiến trúc & Tiện ích */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {/* Item 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 space-y-6"
              >
                <h3 className="text-3xl md:text-4xl font-serif text-earth leading-tight">
                  DẤU ẤN KIẾN TRÚC: BIỂU TƯỢNG KIÊU HÃNH GIỮA TẦNG KHÔNG
                </h3>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Lấy cảm hứng từ phong cách kiến trúc cao tầng đương đại tại các đô thị sầm uất trên toàn cầu, Masteri Grand Coast vươn mình kiêu hãnh giữa tầng không với những đường nét mạnh mẽ, hình khối thanh thoát và màu sắc thanh lịch.
                </p>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Điểm nhấn đắt giá nhất trên mặt dựng (Facade) chính là sự đột phá trong vật liệu với hệ kính Low-E kịch trần (Full-height glass) hiện đại, cùng thiết kế kính ghép cong panorama độc bản tại các căn góc. Sự sắp đặt thông minh của các khối tòa nhà không chỉ mang lại diện mạo sang trọng, mà còn giúp tối ưu hóa khả năng đón ánh sáng tự nhiên, lưu thông khí tươi và mở rộng tối đa tầm nhìn tuyệt mỹ hướng ra biển hồ Wonder Wave Park 18ha.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <div className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5">
                  <ZoomableImage src="https://i.postimg.cc/j5S88J22/V03_CT05_OVERVIEW_02.jpg" alt="Dấu ấn kiến trúc Masteri Grand Coast" />
                </div>
              </motion.div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 space-y-6"
              >
                <h3 className="text-3xl md:text-4xl font-serif text-earth leading-tight">
                  GIẢI PHÁP ĐỖ XE VƯỢT TRỘI: XÓA BỎ MỌI NỖI LO TẠI CHUNG CƯ
                </h3>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Được quy hoạch bài bản với 7 tòa tháp chia thành 2 phân khu (The Wave và The Sand), Masteri Grand Coast mang đến một trong những đặc quyền hiếm có nhất trên thị trường: 02 tầng hầm đỗ xe liên thông toàn bộ khu đất.
                </p>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Với tổng diện tích sàn tầng hầm khổng lồ lên tới 140.042 m², dự án đảm bảo tỷ lệ đỗ xe lý tưởng đạt mức trung bình 1,65 vị trí đỗ ô tô cho mỗi căn hộ. Cùng với đó, hệ thống an ninh đa lớp, camera giám sát hiện đại 24/7 dưới sự vận hành của Masterise Property Management chuẩn quốc tế, giúp cư dân hoàn toàn an tâm khi bảo quản phương tiện cá nhân và trải nghiệm sự tiện nghi tuyệt đối mỗi ngày.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <div className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5">
                  <ZoomableImage src="https://i.postimg.cc/gJTxtyL1/bai-goi-xe-quan-3.jpg" alt="Giải pháp đỗ xe Masteri Grand Coast" />
                </div>
              </motion.div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 space-y-6"
              >
                <h3 className="text-3xl md:text-4xl font-serif text-earth leading-tight">
                  SẢNH CHÍNH CƯ DÂN CHUẨN KHÁCH SẠN 5 SAO
                </h3>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Ngay từ những bước chân đầu tiên trở về nhà, cư dân và khách quý sẽ được chào đón bởi không gian sảnh chính (Lounge) sang trọng, ngập tràn ánh sáng.
                </p>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Mọi chi tiết thiết kế tại đây đều được Masterise Homes chăm chút tỉ mỉ từ hệ thống nội thất sofa cao cấp, ánh sáng hài hòa đến nghệ thuật sắp đặt không gian. Đặc biệt, quầy lễ tân hoạt động 24/24 luôn sẵn sàng hỗ trợ, kết hợp với đội ngũ an ninh chuyên nghiệp không chỉ mang lại cảm giác thư thái, an tâm mà còn tôn vinh vị thế và gu thẩm mỹ tinh tế của gia chủ.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <div className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5">
                  <ZoomableImage src="https://i.postimg.cc/WpJ9cRLB/Reception_Lobby.jpg" alt="Sảnh chính cư dân Masteri Grand Coast" />
                </div>
              </motion.div>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 space-y-6"
              >
                <h3 className="text-3xl md:text-4xl font-serif text-earth leading-tight">
                  SẢNH CHỜ THANG MÁY HIỆN ĐẠI & ĐẲNG CẤP
                </h3>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Tại Masteri Grand Coast, giao thông trục đứng được tối ưu hóa hoàn hảo với mật độ cực thấp: chỉ 18 đến 22 căn hộ/mặt sàn nhưng được trang bị tới 4 thang máy tốc độ cao.
                </p>
                <p className="text-earth/70 font-light text-lg leading-relaxed">
                  Không gian sảnh chờ thang máy được thiết kế bởi các đối tác kiến trúc hàng đầu thế giới, nổi bật với hệ thống vật liệu hoàn thiện cao cấp, màu sắc trang nhã và ánh sáng ấm áp. Từng chi tiết nhỏ được đầu tư đồng bộ với phong cách thiết kế chung của tòa nhà, góp phần tạo nên một hành trình trải nghiệm sống xuyên suốt, nâng tầm chất lượng sống của cộng đồng cư dân tinh hoa toàn cầu.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <div className="rounded-[40px] overflow-hidden shadow-2xl border border-earth/5">
                  <ZoomableImage src="https://i.postimg.cc/MTQn4M0n/thang-may.png" alt="Sảnh chờ thang máy Masteri Grand Coast" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 7: Giá / chính sách */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="GIÁ BÁN & CHÍNH SÁCH MASTERI GRAND COAST" 
            subtitle="Khoảng giá tham khảo Masteri Grand Coast (Phụ thuộc tầm nhìn & Tầng)"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-2 bg-bg-light p-10 md:p-16 rounded-[64px] border border-earth/5"
            >
              <h3 className="text-3xl font-serif font-light text-earth mb-12 flex items-center gap-4">
                <Wallet className="text-primary w-8 h-8" /> Khoảng giá tham khảo
              </h3>
              <div className="space-y-8 mb-12">
                <div className="p-6 bg-white rounded-3xl border border-earth/5 shadow-sm">
                  <p className="text-earth/70 leading-relaxed">
                    <strong className="text-earth font-medium">Đơn giá trung bình:</strong> 62 - 80 triệu/m². Các căn góc kính cong, view trực diện hồ có thể chạm mức gần 90 triệu/m².
                  </p>
                  <p className="text-earth/70 leading-relaxed mt-2">
                    <strong className="text-earth font-medium">Tổng giá:</strong> Từ 2,21 tỷ (Căn Studio view hồ) đến khoảng 11,37 tỷ (Căn 4PN góc view hồ).
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                {[
                  { type: "Studio", size: "28.7 – 32.6 m²", price: "Từ 2.21 tỷ" },
                  { type: "1PN / 1PN+", size: "42.6 – 50.4 m²", price: "Từ 3.44 tỷ" },
                  { type: "2PN / 2PN+", size: "64.6 – 83.8 m²", price: "Từ 4.57 tỷ" },
                  { type: "3PN", size: "92.8 – 131.3 m²", price: "Từ 7.08 tỷ" },
                  { type: "4PN", size: "124.8 – 130.4 m²", price: "Từ 9.61 tỷ" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between pb-6 border-b border-earth/5 group">
                    <div>
                      <div className="text-2xl font-serif text-earth group-hover:text-primary transition-colors">{item.type}</div>
                      <div className="text-earth/40 text-sm font-light">{item.size}</div>
                    </div>
                    <div className="text-3xl font-serif text-primary italic">{item.price}</div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-earth/40 text-sm italic">
                (Lưu ý: Khách hàng hiện tại chỉ cần đặt cọc 50 triệu, sau 7 ngày ký Thỏa thuận ký quỹ đóng đủ 10%)
              </p>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-earth p-12 rounded-[64px] text-white shadow-2xl relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-3xl font-serif font-light mb-10 relative z-10">Chính Sách <br />Tài Chính</h3>
              <ul className="space-y-8 relative z-10">
                {[
                  { title: "Vay vốn 70%", desc: "HTLS 0% và ân hạn gốc tới 02/2029 (Nhận nhà xong miễn lãi thêm 6 tháng)." },
                  { title: "Vay vốn 50%", desc: "HTLS 0% và ân hạn gốc tới 05/2029." },
                  { title: "Thanh toán Sớm", desc: "Chiết khấu siêu khủng lên tới 15%." },
                  { title: "Thanh toán Tiến độ", desc: "Chiết khấu 6%. Dòng tiền cực giãn (10%/quý)." },
                  { title: "Early Bird", desc: "Chiết khấu 1-2%. Tặng 12 tháng phí quản lý." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-xl mb-1">{item.title}</div>
                      <div className="text-white/50 text-sm font-light leading-snug">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: Thư viện */}
      <section className="py-32 bg-bg-light">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="THƯ VIỆN HÌNH ẢNH / VIDEO / TIẾN ĐỘ" 
            subtitle="Cập nhật những hình ảnh phối cảnh và tiến độ thi công mới nhất của dự án."
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[48px] shadow-2xl aspect-video md:aspect-[21/9] relative group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentSlide}
                  src={galleryImages[currentSlide].src} 
                  alt={galleryImages[currentSlide].alt} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Thư viện hình ảnh</p>
                  <h3 className="text-2xl md:text-4xl font-serif text-white">{galleryImages[currentSlide].alt}</h3>
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-earth transition-all duration-300 group/btn"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-earth transition-all duration-300 group/btn"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-8 right-8 flex gap-3">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              {...fadeInUp}
              className="p-8 md:p-10 bg-white rounded-[40px] border border-earth/5 shadow-sm"
            >
              <h4 className="text-2xl font-serif font-light text-earth mb-6 flex items-center gap-3">
                <Building2 className="text-primary w-6 h-6" /> Tiến độ thực tế (Cập nhật 2026)
              </h4>
              <p className="text-earth/60 font-light leading-relaxed">
                Dự án hiện đang thi công tấp nập hạng mục hầm móng với hệ thống 2 tầng hầm rộng 140.042m². Đội ngũ kỹ sư và công nhân làm việc 24/7 để đảm bảo tiến độ cam kết.
              </p>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="p-8 md:p-10 bg-earth text-white rounded-[40px] shadow-xl"
            >
              <h4 className="text-2xl font-serif font-light mb-6 flex items-center gap-3">
                <Calendar className="text-primary w-6 h-6" /> Timeline Dự Kiến
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/60 font-light">Dự kiến Ký HĐMB</span>
                  <span className="font-bold text-primary">Tháng 06/2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-light">Bàn giao nhà</span>
                  <span className="font-bold text-primary">Quý 3/2028</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 9: Niềm tin */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="NIỀM TIN - CHỦ ĐẦU TƯ & QUẢN LÝ VẬN HÀNH" 
            subtitle="Chúng tôi cam kết mang lại giá trị thực và sự an tâm tuyệt đối cho khách hàng."
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              { 
                icon: Building2, 
                title: "Nhà phát triển Masterise Homes", 
                desc: "Trực thuộc Masterise Group, tự hào sở hữu danh mục Bất động sản Hàng hiệu lớn nhất Đông Nam Á, hợp tác cùng Marriott International. Top 2 thương hiệu BĐS giá trị nhất Việt Nam.", 
                color: "bg-blue-50 text-blue-600" 
              },
              { 
                icon: ShieldCheck, 
                title: "Quản lý chuẩn Quốc tế", 
                desc: "Dự án được quản lý bởi Masterise Property Management. Điều này đảm bảo an ninh đa lớp, sảnh tiện ích luôn như mới, tỷ lệ khách thuê hài lòng cao, giúp tài sản giữ giá và sinh lời bền vững.", 
                color: "bg-emerald-50 text-emerald-600" 
              },
              { 
                icon: FileText, 
                title: "Pháp lý minh bạch", 
                desc: "Căn hộ sở hữu lâu dài (với người Việt Nam) và 50 năm (với người nước ngoài). Đảm bảo tính kế thừa truyền đời vững chắc.", 
                color: "bg-amber-50 text-amber-600" 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="bg-bg-light p-10 md:p-12 rounded-[40px] border border-earth/5 text-center group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-light text-earth mb-6">{item.title}</h3>
                <p className="text-earth/50 font-light leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 10: Form CTA 2 */}
      <section className="py-20 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            {...fadeInUp}
            className="max-w-5xl mx-auto bg-white p-8 md:p-20 rounded-[40px] md:rounded-[80px] shadow-2xl"
          >
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-earth mb-4 md:mb-6">Đừng Bỏ Lỡ Cơ Hội Đầu Tư</h2>
              <p className="text-earth/60 font-light text-lg md:text-xl">Số lượng căn hộ view biển hồ có hạn. Đăng ký ngay để nhận ưu đãi đặc quyền.</p>
            </div>
            <InlineConsultationForm horizontal />
          </motion.div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Câu Hỏi Thường Gặp" 
            subtitle="Giải đáp những thắc mắc phổ biến nhất về dự án Masteri Grand Coast."
          />
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Section 12: CTA chốt cuối */}
      <section className="py-20 md:py-32 bg-earth text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://i.postimg.cc/PJhS16g2/V070_CT05_FACADE_GOLDEN_HOUR_(3).jpg" alt="Masteri Grand Coast Ocean City Background" loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-8xl font-serif font-light mb-8 md:mb-10 leading-tight">Sẵn Sàng Cho <br /><span className="text-primary italic">Cuộc Sống Mới?</span></h2>
            <p className="text-lg md:text-2xl mb-12 md:mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Liên hệ ngay với chúng tôi để được tư vấn chi tiết về bảng giá, chính sách và tham quan nhà mẫu dự án Masteri Grand Coast Ocean City.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
              <a 
                href="tel:0359622268" 
                className="flex items-center justify-center gap-3 md:gap-4 bg-white text-earth px-8 md:px-12 py-4 md:py-6 rounded-[24px] md:rounded-[32px] font-black text-xl md:text-2xl hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl group"
                onClick={() => handleCTAClick('final_call')}
              >
                <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-white transition-colors" />
                0359 622 268
              </a>
              <a 
                href="https://zalo.me/0359622268" 
                target="_blank"
                className="flex items-center justify-center gap-3 md:gap-4 bg-[#0068FF] text-white px-8 md:px-12 py-4 md:py-6 rounded-[24px] md:rounded-[32px] font-black text-xl md:text-2xl hover:bg-blue-700 transition-all duration-500 shadow-2xl"
                onClick={() => handleCTAClick('final_zalo')}
              >
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
                Zalo Tư Vấn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer SEO */}
      <footer className="py-10 bg-bg-light border-t border-earth/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-earth/40 text-xs font-light max-w-4xl mx-auto leading-relaxed">
            © 2026 Masteri Grand Coast Ocean City. Dự án căn hộ cao cấp Masteri Grand Coast được phát triển bởi Masterise Homes. 
            Thông tin về bảng giá, chính sách và tiến độ Masteri Grand Coast được cập nhật liên tục từ chủ đầu tư. 
            Masteri Grand Coast - Biểu tượng sống thượng lưu tại trung tâm Ocean City.
          </p>
        </div>
      </footer>
    </div>
  );
}
