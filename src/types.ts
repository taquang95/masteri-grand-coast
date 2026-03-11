export interface Project {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  tag: string;
  scale: string;
  type: string;
  legal?: string;
  amenities?: string;
  partner?: string;
  status: 'opening' | 'new' | 'luxury' | 'handover' | 'completed';
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Masteri Grand Coast',
    location: 'Ocean City, Hà Nội',
    price: 'Từ 2.21 tỷ',
    image: 'https://picsum.photos/seed/mgc/800/600',
    tag: 'Tâm điểm Ocean Park',
    scale: '7 Blocks',
    type: 'Căn hộ cao cấp',
    status: 'opening'
  },
  {
    id: '2',
    name: 'Masteri Era Landmark',
    location: 'Vinhomes Cổ Loa, Hà Nội',
    price: 'Liên hệ',
    image: 'https://picsum.photos/seed/mel/800/600',
    tag: 'New Launch',
    scale: 'Limited Edition',
    type: 'Căn hộ hạng sang',
    status: 'new'
  },
  {
    id: '3',
    name: 'Masteri Sky Quarter Đan Phượng',
    location: 'Đan Phượng, Hà Nội',
    price: 'Liên hệ',
    image: 'https://picsum.photos/seed/msq/800/600',
    tag: 'Sắp ra mắt',
    scale: '4 Blocks',
    type: 'Căn hộ',
    status: 'new'
  },
  {
    id: '4',
    name: 'Masteri Vin Cổ Loa',
    location: 'Đông Anh, Hà Nội',
    price: 'Liên hệ',
    image: 'https://picsum.photos/seed/mvc/800/600',
    tag: 'Vị trí đắc địa',
    scale: 'Đang cập nhật',
    type: 'Căn hộ',
    status: 'opening'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    category: 'Thị trường',
    title: 'Tiềm năng tăng giá của căn hộ khu đông TP.HCM năm 2024',
    description: 'Phân tích chi tiết về hạ tầng giao thông và tác động của vành đai 3 đến các dự án Masterise Homes.',
    image: 'https://picsum.photos/seed/news1/800/600'
  },
  {
    id: '2',
    category: 'Tiến độ',
    title: 'Cập nhật tiến độ thi công The Global City tháng 11/2023',
    description: 'Hạ tầng khu nhạc nước lớn nhất Đông Nam Á đã hoàn thiện 90% và sẵn sàng đón khách.',
    image: 'https://picsum.photos/seed/news2/800/600'
  },
  {
    id: '3',
    category: 'Sự kiện',
    title: 'Masterise Homes ký kết hợp tác cùng các đối tác chiến lược',
    description: 'Mở rộng mạng lưới phân phối và nâng tầm dịch vụ quản lý căn hộ chuẩn 5 sao.',
    image: 'https://picsum.photos/seed/news3/800/600'
  }
];

export const FAQS = [
  {
    q: "1. Masterise Homes là ai? Thương hiệu này thuộc tập đoàn nào?",
    a: "Masterise Homes là nhà phát triển bất động sản hàng hiệu đẳng cấp quốc tế, tiên phong áp dụng các chuẩn mực toàn cầu vào việc phát triển, vận hành và quản lý các sản phẩm, dịch vụ bất động sản tại Việt Nam và trên thế giới. Thương hiệu này là thành viên chủ lực trực thuộc Tập đoàn Masterise (Masterise Group), một tập đoàn kinh tế tư nhân lớn mạnh."
  },
  {
    q: "2. Các dự án nổi bật của Masterise Homes hiện nay gồm những dự án nào?",
    a: "Masterise Homes sở hữu một lượng lớn các dự án trải dài từ Bắc vào Nam, được chia thành các dòng sản phẩm Cao cấp (Masteri Collection), Hạng sang (LUMIÈRE series) và Bất động sản Hàng hiệu (Branded Residences). \n\n• Tại Hà Nội: Masteri Grand Coast, Masteri Era Landmark, Masteri Trinity Square, LUMIÈRE SpringBay (Ocean City); Masteri Waterfront (Ocean Park 1); Masteri West Heights (Smart City); và The Grand Hanoi.\n• Tại TP.HCM: Grand Marina Saigon, The Global City, khu dinh thự The Rivus Elie Saab, LUMIÈRE riverside, Masteri Centre Point, Masteri Thảo Điền, Masteri An Phú."
  },
  {
    q: "3. Những thương hiệu quốc tế nào hợp tác cùng Masterise Homes?",
    a: "Masterise Homes khẳng định năng lực quốc tế thông qua sự hợp tác chiến lược cùng Marriott International - tập đoàn khách sạn lớn nhất thế giới. Các thương hiệu khách sạn đình đám tham gia vào các dự án bất động sản hàng hiệu của Masterise bao gồm Marriott, JW Marriott và Ritz-Carlton."
  },
  {
    q: "4. Điểm khác biệt giữa Masterise Homes và các chủ đầu tư khác là gì?",
    a: "• Sở hữu danh mục Bất động sản hàng hiệu (Branded Residences) lớn nhất Đông Nam Á.\n• Triết lý phát triển: Định vị mình không chỉ 'bán nhà' mà là bảo chứng cho giá trị trường tồn của tài sản thông qua việc kiến tạo 'giá trị trải nghiệm sống', lấy khách hàng làm trung tâm.\n• Hệ sinh thái quản lý khép kín: Các dự án được vận hành và quản lý trực tiếp bởi Masterise Property Management (công ty thành viên) theo chuẩn quốc tế."
  },
  {
    q: "5. Lý do vì sao căn hộ Masterise Homes giữ giá tốt và có tiềm năng đầu tư cao?",
    a: "• Chất lượng vận hành xuất sắc: Masterise Property Management quản lý bài bản giúp hạn chế sự xuống cấp của các khu vực chung, giữ vững mặt bằng giá theo thời gian.\n• Tỷ lệ lấp đầy cao: Vận hành tốt dẫn đến tỷ lệ hài lòng cao, người thuê ở lâu hơn, tối ưu hóa lợi nhuận cho thuê.\n• Thương hiệu bảo chứng: 'Tem bảo hành' bất động sản hàng hiệu giúp đảm bảo tính thanh khoản và khả năng khai thác vượt trội."
  },
  {
    q: "6. Chính sách bán hàng và ưu đãi của Masterise Homes hiện tại ra sao?",
    a: "Chủ đầu tư luôn tung ra các chính sách đòn bẩy tài chính linh hoạt (ví dụ Masteri Grand Coast):\n• Thanh toán sớm: Chiết khấu lên tới 15%.\n• Thanh toán theo tiến độ: Chiết khấu khoảng 6%, giãn cách dòng tiền.\n• Vay vốn (50% hoặc 70%): Lãi suất 0%, ân hạn nợ gốc và miễn phí trả nợ trước hạn kéo dài (đến 2029).\n• Ưu đãi đặc quyền: Chiết khấu 1-2% cho khách hàng mới/cư dân cũ, tặng 12-24 tháng phí dịch vụ."
  },
  {
    q: "7. Làm thế nào để đăng ký nhận thông tin hoặc tư vấn về dự án Masterise Homes mới nhất?",
    a: "• Qua Website: Truy cập trang web chính thức và điền form 'Đăng ký nhận tin' để nhận bảng giá và tài liệu chi tiết.\n• Qua Hotline: Gọi trực tiếp Hotline 1800 6645 để nhận tư vấn chuyên sâu, khách quan và bảo mật thông tin từ đại diện chủ đầu tư."
  }
];
