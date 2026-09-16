/* OneS — assets/js/data.js (kho nội dung website; tạo 15/09/2026) */

const SITE = {
  "name": "OneS",
  "legalName": "Công ty Cổ phần Đầu tư và Dịch vụ OneS",
  "brandName": "OneS Corporation",
  "tagline": "Kiến tạo giá trị thịnh vượng",
  "positioning": "Nền tảng phân phối bất động sản cao cấp cho đối tác & cộng tác viên",
  "domain": "onescorp.vn",
  "founded": "2024",
  "taxId": "0318749376",
  "hotline": "0903 983 737",
  "hotlineRaw": "0903983737",
  "email": "onescorporation.info@gmail.com",
  "address": "Tầng 3, số 74 - 76, Đường N3C, Khu đô thị Sài Gòn Bình An (Soho – The Global City), Khu phố 14, Phường Bình Trưng, TP. Hồ Chí Minh",
  "addressShort": "Tầng 3, 74–76 Đường N3C, Soho – The Global City, P. Bình Trưng, TP.HCM",
  "zalo": "https://zalo.me/4321344812365733664",
  "facebook": "https://www.facebook.com/onescorp.vn",
  "youtube": "https://www.youtube.com/@OneSCorporation",
  "tiktok": "https://www.tiktok.com/@onescorporation",
  "website": "https://www.onescorp.vn/",
  "formEndpoint": "",
  "leadEndpoint": "",
  "tracking": {
    "ga4": "",
    "adsId": "",
    "adsLabel": "",
    "metaPixel": ""
  },
  "mapEmbed": "https://maps.google.com/maps?q=74-76%20%C4%90%C6%B0%E1%BB%9Dng%20N3C%2C%20The%20Global%20City%2C%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
};

const NAV = [
  {
    "href": "index.html",
    "label": "Trang chủ"
  },
  {
    "href": "du-an.html",
    "label": "Dự án"
  },
  {
    "href": "gioi-thieu.html",
    "label": "Giới thiệu"
  },
  {
    "href": "doi-tac.html",
    "label": "Đối tác & CTV"
  },
  {
    "href": "lien-he.html",
    "label": "Liên hệ"
  }
];

function ph(id, w) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (w || 1200) + "&q=80"; }

const FILTERS = {
  "area": [
    "Tất cả khu vực",
    "Khu Đông TP.HCM",
    "Tây Bắc TP.HCM",
    "Cần Giờ",
    "Long An – Tây Ninh"
  ],
  "segment": [
    "Mọi phân khúc",
    "Hạng sang",
    "Cao cấp",
    "Đại đô thị"
  ],
  "type": [
    "Mọi loại hình",
    "Căn hộ",
    "Nhà phố & Biệt thự",
    "Khu đô thị"
  ],
  "price": [
    "Mọi mức giá",
    "Dưới 5 tỉ",
    "5 – 10 tỉ",
    "Trên 10 tỉ",
    "Liên hệ báo giá"
  ]
};

const PROJECTS = [
  {
    "id": "the-prive",
    "name": "The Privé",
    "developer": "Tập đoàn Đất Xanh",
    "location": "Nam Rạch Chiếc, P. An Phú (cũ), TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "badge": "Đối tác phân phối chính thức",
    "priceText": "Từ ~6,6 tỉ",
    "priceValue": 6.6,
    "beds": "1–3 PN, Duplex & Penthouse",
    "size": "49,8 – 98,5 m²",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/the-prive-2.jpg",
    "gallery": [
      "assets/img/media/the-prive-2.jpg",
      "assets/img/media/the-prive-1.jpg",
      "assets/img/media/the-prive-3.jpg",
      "assets/img/media/ky-ket-the-prive-1.jpg",
      "assets/img/media/the-prive-card.jpg"
    ],
    "short": "Tổ hợp căn hộ hạng sang 6,7 ha của Tập đoàn Đất Xanh tại Nam Rạch Chiếc — 12 tháp, 3.175 căn, hai mặt giáp sông Giồng Ông Tố, thiết kế chuẩn resort.",
    "description": [
      "The Privé là dự án căn hộ hạng sang quy mô 6,7 ha do Tập đoàn Đất Xanh phát triển tại khu Nam Rạch Chiếc, phường An Phú (cũ), TP. Thủ Đức — cạnh đường Song Hành cao tốc, hai mặt giáp sông Giồng Ông Tố. Dự án gồm 12 tháp cao 33–35 tầng với 3.175 căn hộ 1–3 phòng ngủ, duplex và penthouse, diện tích phổ biến 49,8–98,5 m², mật độ xây dựng chỉ 25%.",
      "Đơn giá tham khảo từ khoảng 133 triệu/m² (chưa VAT, tính theo tim tường — 07/2026). Hệ tiện ích nội khu dày đặc theo phong cách resort: 3 hồ bơi, phòng gym & boxing, golf 3D, sân tennis và pickleball, rạp phim mini, khu co-working, trường mầm non và trạm sạc xe điện.",
      "OneS là đối tác phân phối chính thức của The Privé — lễ ký kết với Tập đoàn Đất Xanh diễn ra tháng 4/2025. Đối tác và cộng tác viên OneS được cung cấp giỏ hàng, chính sách bán hàng và tài liệu dự án theo từng đợt mở bán."
    ],
    "amenities": [
      "3 hồ bơi resort",
      "Đường dạo ven sông Giồng Ông Tố",
      "Gym, boxing & golf 3D",
      "Sân tennis & pickleball",
      "Rạp phim mini & co-working",
      "Trường mầm non nội khu",
      "Trạm sạc xe điện",
      "Mật độ xây dựng 25%"
    ],
    "featured": true,
    "scale": "6,7 ha",
    "units": "3.175 căn hộ",
    "card": "assets/img/media/the-prive-card.jpg",
    "zones": []
  },
  {
    "id": "the-global-city",
    "name": "The Global City",
    "developer": "Masterise Homes (CĐT: SDI Corp)",
    "location": "Đỗ Xuân Hợp, P. An Phú (cũ), TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Hạng sang",
    "type": "Khu đô thị",
    "status": "Đang mở bán",
    "badge": "Khu đô thị 117,4 ha",
    "priceText": "Theo phân khu",
    "priceValue": 15,
    "beds": "Nhà phố · Căn hộ · Biệt thự",
    "size": "6 phân khu",
    "handover": "Theo phân khu",
    "cover": "assets/img/media/the-global-city-cover.jpg",
    "gallery": [
      "assets/img/media/the-global-city-cover.jpg",
      "assets/img/media/the-global-city-1.jpg",
      "assets/img/media/the-global-city-2.jpg",
      "assets/img/media/the-global-city-3.jpg",
      "assets/img/media/the-global-city-card.jpg"
    ],
    "short": "Khu đô thị 117,4 ha do Masterise Homes phát triển tại Đỗ Xuân Hợp, TP. Thủ Đức — trung tâm mới của TP.HCM với 6 phân khu từ nhà phố SOHO đến các tháp căn hộ Masteri, LUMIÈRE.",
    "description": [
      "The Global City là khu đô thị quy mô 117,4 ha tại đường Đỗ Xuân Hợp, phường An Phú (cũ), TP. Thủ Đức, do Masterise Homes phát triển (chủ đầu tư: SDI Corp). Dự án được quy hoạch làm \"downtown mới\" của TP.HCM với đầy đủ căn hộ cao tầng, nhà phố, biệt thự, tòa văn phòng hạng A, trung tâm mua sắm và khu nhạc nước ngoài trời thuộc nhóm lớn nhất Đông Nam Á.",
      "Sáu phân khu chính: nhà phố thương mại SOHO (đã vận hành, hình thành phố kinh doanh sầm uất), khu thấp tầng SOLA, cùng bốn dòng căn hộ cao tầng — Masteri Grand View (đang mở bán), LUMIÈRE Midtown, Masteri Park Place và Masteri Cosmo Central (các giai đoạn kế tiếp). Mỗi phân khu có chính sách giá và tiến độ riêng.",
      "Trụ sở OneS đặt ngay trong khu đô thị này (Tầng 3, số 74–76 Đường N3C, khu SOHO) — đội ngũ OneS theo sát giỏ hàng từng phân khu và hỗ trợ đối tác dẫn khách tham quan thực tế."
    ],
    "amenities": [
      "Khu nhạc nước ngoài trời quy mô hàng đầu ĐNÁ",
      "Trung tâm mua sắm quy mô lớn",
      "Tòa văn phòng hạng A",
      "Quảng trường & hồ cảnh quan",
      "Công viên ven kênh",
      "Hạ tầng đồng bộ toàn khu"
    ],
    "zones": [
      {
        "name": "SOHO",
        "type": "Nhà phố thương mại",
        "status": "Đã vận hành",
        "note": "Dãy phố kinh doanh đầu tiên của khu đô thị"
      },
      {
        "name": "SOLA",
        "type": "Khu thấp tầng",
        "status": "Đang triển khai"
      },
      {
        "name": "Masteri Grand View",
        "type": "Căn hộ cao tầng",
        "status": "Đang mở bán",
        "note": "Phân khu cao tầng đầu tiên, trục trung tâm"
      },
      {
        "name": "LUMIÈRE Midtown",
        "type": "Căn hộ cao tầng",
        "status": "Đang triển khai"
      },
      {
        "name": "Masteri Park Place",
        "type": "Căn hộ cao tầng",
        "status": "Giai đoạn kế tiếp"
      },
      {
        "name": "Masteri Cosmo Central",
        "type": "Căn hộ cao tầng",
        "status": "Sắp ra mắt"
      }
    ],
    "featured": true,
    "scale": "117 ha",
    "units": "10.000 sản phẩm",
    "card": "assets/img/media/the-global-city-card.jpg"
  },
  {
    "id": "eaton-park",
    "name": "Eaton Park",
    "developer": "Gamuda Land",
    "location": "Mặt tiền Mai Chí Thọ, P. An Phú (cũ), TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "badge": "Bàn giao từ 2026",
    "priceText": "Từ 9,5 tỉ",
    "priceValue": 9.5,
    "beds": "1–3 PN & Penthouse",
    "size": "51,9 – 104,8 m²",
    "handover": "Từ Q2/2026",
    "cover": "assets/img/media/eaton-park-1.jpg",
    "gallery": [
      "assets/img/media/eaton-park-1.jpg",
      "assets/img/media/eaton-park-2.jpg",
      "assets/img/media/eaton-park-3.jpg",
      "assets/img/media/eaton-park-card.jpg"
    ],
    "short": "Tổ hợp căn hộ hạng sang 3,76 ha của Gamuda Land (Malaysia) ngay mặt tiền Mai Chí Thọ — 6 tháp, 1.980 căn hộ, bàn giao từ Quý 2/2026.",
    "description": [
      "Eaton Park do Gamuda Land — nhà phát triển Malaysia hoạt động tại Việt Nam từ 2007 — xây dựng trên khu đất 3,76 ha mặt tiền đại lộ Mai Chí Thọ, phường An Phú (cũ), TP. Thủ Đức. Quy mô 6 tháp cao 29–39 tầng gồm 1.980 căn hộ cùng 72 shophouse; kết nối thẳng về Thủ Thiêm, Quận 1 và cao tốc đi sân bay Long Thành.",
      "Cơ cấu căn: 1PN (51,9–55,8 m²), 2PN (71,7–79,5 m²), 3PN (103,7–104,8 m²) và penthouse. Giá tham khảo giai đoạn 3 (07/2026): 1PN từ 9,5–10,5 tỉ; 2PN 13,5–15 tỉ; 3PN 20,5–21,5 tỉ. Bàn giao dự kiến từ Quý 2/2026 — thuộc nhóm dự án hạng sang hiếm hoi tại Khu Đông nhận nhà ngay trong năm."
    ],
    "amenities": [
      "Hồ bơi resort & gym, yoga",
      "Sân golf 3D",
      "Sân thể thao đa năng (Pickleball, Basketball)",
      "Công viên thú cưng",
      "Công viên ven sông & khu BBQ",
      "Phố thương mại khối đế",
      "Sân chơi trẻ em"
    ],
    "zones": [
      {
        "name": "Phân khu 1",
        "type": "Tháp A1 Alpine · A2 Forest · A3 Cove · A4 Lagoon",
        "status": "Đang bàn giao"
      },
      {
        "name": "Phân khu 2",
        "type": "Tháp A5 Grove · A6 Strait",
        "status": "Đang mở bán"
      }
    ],
    "featured": true,
    "scale": "3,7 ha",
    "units": "1.968 căn hộ",
    "card": "assets/img/media/eaton-park-card.jpg"
  },
  {
    "id": "vinhomes-grand-park",
    "name": "Vinhomes Grand Park",
    "developer": "Vinhomes",
    "location": "Nguyễn Xiển, P. Long Bình (Quận 9 cũ), TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Cao cấp",
    "type": "Khu đô thị",
    "status": "Đang mở bán",
    "badge": "Đại đô thị 271 ha",
    "priceText": "Từ 8,0 tỉ",
    "priceValue": 8,
    "beds": "Căn hộ · Biệt thự · Shophouse",
    "size": "30 – 95 m²",
    "handover": "Bàn giao",
    "cover": "assets/img/media/vinhomes-grand-park-cover.jpg",
    "gallery": [
      "assets/img/media/vinhomes-grand-park-cover.jpg",
      "assets/img/media/vinhomes-grand-park-1.jpg",
      "assets/img/media/vinhomes-grand-park-2.jpg",
      "assets/img/media/vinhomes-grand-park-3.jpg",
      "assets/img/media/vinhomes-grand-park-card.jpg"
    ],
    "short": "Đại đô thị công viên 271 ha của Vinhomes tại Quận 9 cũ (TP. Thủ Đức) — 44.000 sản phẩm gồm căn hộ, biệt thự, shophouse; công viên trung tâm 36 ha, tiện ích trọn gói Vinschool – Vinmec – Vincom.",
    "description": [
      "Vinhomes Grand Park là đại đô thị quy mô 271 ha do Vinhomes phát triển tại Khu Đông TP.HCM, với công viên trung tâm 36 ha, hệ tiện ích nội khu hoàn chỉnh (Vinschool, Vinmec, Vincom Mega Mall, xe buýt điện nội khu) và cộng đồng cư dân lớn.",
      "Danh mục sản phẩm đa dạng: căn hộ (Studio – 3PN), biệt thự và shophouse thuộc nhiều phân khu (Rainbow, Origami, Manhattan, Beverly, The Glory Heights, Lumière Boulevard, Masteri Centre Point…) — phù hợp cả khách ở thực lẫn nhà đầu tư cho thuê.",
      "OneS đã và đang phân phối nhiều phân khu tại Vinhomes Grand Park; đối tác được cập nhật giỏ hàng sơ cấp lẫn quỹ căn chuyển nhượng theo từng thời điểm."
    ],
    "amenities": [
      "Công viên 36 ha",
      "Hồ thể thao",
      "Vinschool – Vinmec",
      "TTTM Vincom",
      "Tuyến buýt nội khu",
      "An ninh đa lớp"
    ],
    "featured": true,
    "scale": "271 ha",
    "units": "44.000 sản phẩm",
    "card": "assets/img/media/vinhomes-grand-park-card.jpg",
    "zones": []
  },
  {
    "id": "lotte-eco-smart-city",
    "name": "Lotte Eco Smart City",
    "developer": "Tập đoàn Lotte (Hàn Quốc)",
    "location": "Khu đô thị mới Thủ Thiêm, TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Sản phẩm chiến lược 2025",
    "featured": true,
    "badge": "Thủ Thiêm",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ · Văn phòng · Thương mại",
    "size": "7,6 ha",
    "scale": "7,6 ha",
    "units": "1.200 căn hộ",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/lotte-eco-smart-city-cover.jpg",
    "gallery": [
      "assets/img/media/lotte-eco-smart-city-cover.jpg",
      "assets/img/media/lotte-eco-smart-city-card.jpg"
    ],
    "card": "assets/img/media/lotte-eco-smart-city-card.jpg",
    "short": "Tổ hợp đô thị thông minh 7,6 ha của Tập đoàn Lotte tại Thủ Thiêm — khoảng 1.200 căn hộ cùng văn phòng, khách sạn và trung tâm thương mại.",
    "description": [
      "Lotte Eco Smart City là tổ hợp đô thị thông minh quy mô 7,6 ha do Tập đoàn Lotte (Hàn Quốc) phát triển tại Khu đô thị mới Thủ Thiêm — khu vực có mặt bằng giá và tốc độ hoàn thiện hạ tầng thuộc nhóm cao nhất TP.HCM.",
      "Dự án gồm khoảng 1.200 căn hộ kết hợp văn phòng, khách sạn và khối thương mại. Thông tin giỏ hàng, chính sách bán hàng và tài liệu sản phẩm được OneS cập nhật cho đối tác theo từng đợt công bố của chủ đầu tư."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "vinhomes-can-gio",
    "name": "Vinhomes Cần Giờ (Vinhomes Green Paradise)",
    "developer": "Vinhomes",
    "location": "Long Hòa – Cần Thạnh, Cần Giờ, TP.HCM",
    "area": "Cần Giờ",
    "segment": "Đại đô thị",
    "type": "Khu đô thị",
    "status": "Sản phẩm chiến lược 2025",
    "featured": true,
    "badge": "2.870 ha",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ · Biệt thự · Nhà phố",
    "size": "2.870 ha",
    "scale": "2.870 ha",
    "units": "Đang cập nhật",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/vinhomes-can-gio-cover.jpg",
    "gallery": [
      "assets/img/media/vinhomes-can-gio-cover.jpg",
      "assets/img/media/vinhomes-can-gio-card.jpg"
    ],
    "card": "assets/img/media/vinhomes-can-gio-card.jpg",
    "short": "Khu đô thị du lịch lấn biển quy mô 2.870 ha của Vinhomes tại Cần Giờ — căn hộ, biệt thự, nhà phố hướng tới mô hình đô thị nghỉ dưỡng ven biển ngay cửa ngõ TP.HCM.",
    "description": [
      "Vinhomes Cần Giờ (tên thương mại Vinhomes Green Paradise) là khu đô thị du lịch lấn biển quy mô 2.870 ha do Vinhomes phát triển tại huyện Cần Giờ — một trong những dự án lớn nhất từng được triển khai tại TP.HCM.",
      "Danh mục sản phẩm dự kiến gồm căn hộ, biệt thự và nhà phố theo nhiều phân khu, mở bán theo từng giai đoạn. OneS cung cấp cho đối tác thông tin phân khu, chính sách và giỏ hàng ngay khi chủ đầu tư công bố."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "palm-city",
    "name": "Palm City",
    "developer": "Keppel Land & Công ty Nam Rạch Chiếc (Tiến Phước – Trần Thái)",
    "location": "Song Hành cao tốc, Nam Rạch Chiếc, TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Hạng sang",
    "type": "Khu đô thị",
    "status": "Sắp ra mắt",
    "badge": "2,7 km ven sông",
    "priceText": "GĐ mới: sắp công bố",
    "priceValue": 12,
    "beds": "Nhà phố · Căn hộ",
    "size": "30,2 ha · 4 phân khu",
    "handover": "GĐ mới từ 2026",
    "cover": "assets/img/media/palm-city-cover.jpg",
    "gallery": [
      "assets/img/media/palm-city-cover.jpg",
      "assets/img/media/palm-river-1.jpg",
      "assets/img/media/palm-river-2.jpg",
      "assets/img/media/palm-city-card.jpg"
    ],
    "short": "Khu đô thị ven sông 30,2 ha tại Nam Rạch Chiếc với 2,7 km bờ sông, trường và bệnh viện quốc tế Mỹ nội khu — giai đoạn mới Palm River (căn hộ hạng sang) triển khai từ 2026.",
    "description": [
      "Palm City là khu đô thị 30,2 ha do Công ty TNHH Nam Rạch Chiếc (liên doanh Tiến Phước – Trần Thái – Gateway Thủ Thiêm) phát triển bên đường Song Hành cao tốc, TP. Thủ Đức. Điểm hiếm có: 2,7 km đường ven sông Giồng Ông Tố – Mương Kinh, mật độ xây dựng toàn khu 33%, cùng Trường Quốc tế Mỹ (TAS) và Bệnh viện Quốc tế Mỹ (AIH) ngay trong nội khu.",
      "Các giai đoạn đã hình thành và có sổ hồng: Palm Residence (135 nhà phố – biệt thự), Palm Heights (3 tháp, 816 căn hộ) và Palm Garden. Cộng đồng cư dân hiện hữu đông đúc giúp Palm City là một trong những khu compound vận hành ổn định nhất Khu Đông."
    ],
    "amenities": [
      "2,7 km đường dạo ven sông",
      "Trường Quốc tế Mỹ (TAS) nội khu",
      "Bệnh viện Quốc tế Mỹ (AIH) nội khu",
      "Hồ bơi resort 50 m & 25 m",
      "Clubhouse, tennis, gym & yoga",
      "Khu BBQ & sân chơi trẻ em",
      "Mật độ xây dựng 33%"
    ],
    "zones": [
      {
        "name": "Palm Residence",
        "type": "Nhà phố & biệt thự — 135 căn",
        "status": "Đã bàn giao, có sổ hồng"
      },
      {
        "name": "Palm Heights",
        "type": "Căn hộ — 3 tháp, 816 căn",
        "status": "Đã bàn giao, có sổ hồng"
      },
      {
        "name": "Palm Garden",
        "type": "Căn hộ — hồ bơi tràn bờ 25 m",
        "status": "Đã bàn giao"
      },
      {
        "name": "Palm River",
        "type": "Căn hộ hạng sang ven sông",
        "status": "Triển khai từ 2026",
        "note": "Quỹ đất cao tầng view sông trực diện — giai đoạn được chờ đợi nhất Palm City"
      }
    ],
    "featured": false,
    "scale": "30,2 ha",
    "card": "assets/img/media/palm-city-card.jpg",
    "units": ""
  },
  {
    "id": "vinhomes-hoc-mon",
    "name": "Vinhomes Hóc Môn",
    "developer": "Vinhomes",
    "location": "Hóc Môn, TP.HCM",
    "area": "Tây Bắc TP.HCM",
    "segment": "Đại đô thị",
    "type": "Khu đô thị",
    "status": "Sản phẩm chiến lược 2025",
    "featured": false,
    "badge": "",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ · Biệt thự · Shophouse",
    "size": "924 ha",
    "scale": "924 ha",
    "units": "GĐ1: ~2.000 căn hộ & 255 nhà liên kế",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/vinhomes-hoc-mon-cover.jpg",
    "gallery": [
      "assets/img/media/vinhomes-hoc-mon-cover.jpg",
      "assets/img/media/vinhomes-hoc-mon-card.jpg"
    ],
    "card": "assets/img/media/vinhomes-hoc-mon-card.jpg",
    "short": "Đại đô thị 924 ha của Vinhomes tại Hóc Môn (Tây Bắc TP.HCM). Giai đoạn 1 dự kiến khoảng 2.000 căn hộ và 255 nhà liên kế.",
    "description": [
      "Vinhomes Hóc Môn là đại đô thị quy mô 924 ha do Vinhomes phát triển tại huyện Hóc Môn — khu vực Tây Bắc TP.HCM đang được đầu tư mạnh về hạ tầng kết nối.",
      "Giai đoạn 1 dự kiến cung cấp khoảng 2.000 căn hộ và 255 nhà liên kế; loại hình sản phẩm gồm căn hộ, biệt thự và shophouse. Chi tiết tiến độ, chính sách và giỏ hàng: liên hệ OneS."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "vinhomes-cu-chi",
    "name": "Vinhomes Củ Chi",
    "developer": "Vinhomes",
    "location": "Củ Chi, TP.HCM",
    "area": "Tây Bắc TP.HCM",
    "segment": "Đại đô thị",
    "type": "Khu đô thị",
    "status": "Sản phẩm chiến lược 2025",
    "featured": false,
    "badge": "",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ · Biệt thự · Nhà phố",
    "size": "1.000 ha",
    "scale": "1.000 ha",
    "units": "Đang cập nhật",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/vinhomes-cu-chi-cover.jpg",
    "gallery": [
      "assets/img/media/vinhomes-cu-chi-cover.jpg",
      "assets/img/media/vinhomes-cu-chi-card.jpg"
    ],
    "card": "assets/img/media/vinhomes-cu-chi-card.jpg",
    "short": "Đại đô thị quy mô khoảng 1.000 ha của Vinhomes tại Củ Chi — căn hộ, biệt thự, nhà phố; số lượng sản phẩm cập nhật theo công bố của chủ đầu tư.",
    "description": [
      "Vinhomes Củ Chi là đại đô thị quy mô khoảng 1.000 ha do Vinhomes phát triển tại huyện Củ Chi, hưởng lợi từ các trục hạ tầng lớn phía Tây Bắc TP.HCM.",
      "Loại hình sản phẩm dự kiến: căn hộ, biệt thự và nhà phố. Thông tin phân khu, số lượng và chính sách sẽ được OneS cập nhật cho đối tác theo tiến độ công bố."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "vinhomes-duc-hoa",
    "name": "Vinhomes Đức Hòa",
    "developer": "Vinhomes",
    "location": "Đức Hòa, Long An (nay thuộc Tây Ninh)",
    "area": "Long An – Tây Ninh",
    "segment": "Đại đô thị",
    "type": "Khu đô thị",
    "status": "Sản phẩm chiến lược 2025",
    "featured": false,
    "badge": "",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ · Biệt thự · Nhà phố",
    "size": "900 ha",
    "scale": "900 ha",
    "units": "Đang cập nhật",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/vinhomes-duc-hoa-cover.jpg",
    "gallery": [
      "assets/img/media/vinhomes-duc-hoa-cover.jpg",
      "assets/img/media/vinhomes-duc-hoa-card.jpg"
    ],
    "card": "assets/img/media/vinhomes-duc-hoa-card.jpg",
    "short": "Đại đô thị 900 ha của Vinhomes tại Đức Hòa — cửa ngõ phía Tây TP.HCM; căn hộ, biệt thự, nhà phố.",
    "description": [
      "Vinhomes Đức Hòa là đại đô thị quy mô 900 ha do Vinhomes phát triển tại Đức Hòa (Long An cũ, nay thuộc tỉnh Tây Ninh) — khu vực giáp ranh phía Tây TP.HCM, kết nối qua các trục Tỉnh lộ 10, Vành đai 3 và cao tốc TP.HCM – Mộc Bài.",
      "Loại hình sản phẩm dự kiến gồm căn hộ, biệt thự và nhà phố. Số lượng, phân khu và chính sách bán hàng sẽ được OneS cập nhật cho đối tác khi chủ đầu tư công bố."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "senturia-an-phu",
    "name": "Senturia An Phú",
    "developer": "Công ty Bất động sản Tiến Phước",
    "location": "P. An Phú (Quận 2 cũ), TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Hạng sang",
    "type": "Nhà phố & Biệt thự",
    "status": "Sản phẩm chiến lược 2025",
    "featured": false,
    "badge": "",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Nhà phố · Biệt thự",
    "size": "8,5 ha",
    "scale": "8,5 ha",
    "units": "335 sản phẩm",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/senturia-an-phu-cover.jpg",
    "gallery": [
      "assets/img/media/senturia-an-phu-cover.jpg",
      "assets/img/media/senturia-an-phu-card.jpg"
    ],
    "card": "assets/img/media/senturia-an-phu-card.jpg",
    "short": "Khu compound nhà phố và biệt thự 8,5 ha của Tiến Phước tại An Phú (Quận 2 cũ) — 335 sản phẩm thấp tầng, sát khu The Global City.",
    "description": [
      "Senturia An Phú là khu compound thấp tầng quy mô 8,5 ha do Công ty Bất động sản Tiến Phước phát triển tại phường An Phú (Quận 2 cũ), TP. Thủ Đức — kề cận The Global City và trục Đỗ Xuân Hợp – Mai Chí Thọ.",
      "Dự án gồm 335 sản phẩm nhà phố và biệt thự. Giỏ hàng, chính sách và tài liệu bán hàng: liên hệ OneS."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "saigon-sports-city",
    "name": "Saigon Sports City",
    "developer": "Keppel Land",
    "location": "P. An Phú (Quận 2 cũ), TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Cao cấp",
    "type": "Căn hộ",
    "status": "Sản phẩm chiến lược 2025",
    "featured": false,
    "badge": "",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ",
    "size": "64 ha",
    "scale": "64 ha",
    "units": "4.300 căn hộ",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/saigon-sports-city-cover.jpg",
    "gallery": [
      "assets/img/media/saigon-sports-city-cover.jpg",
      "assets/img/media/saigon-sports-city-card.jpg"
    ],
    "card": "assets/img/media/saigon-sports-city-card.jpg",
    "short": "Khu đô thị thể thao 64 ha của Keppel Land tại An Phú — khoảng 4.300 căn hộ quy hoạch quanh tổ hợp thể thao, giải trí và thương mại.",
    "description": [
      "Saigon Sports City là khu đô thị tích hợp thể thao – giải trí quy mô 64 ha do Keppel Land (Singapore) phát triển tại phường An Phú (Quận 2 cũ), TP. Thủ Đức, ngay nút giao Mai Chí Thọ – cao tốc Long Thành – Dầu Giây.",
      "Dự án dự kiến cung cấp khoảng 4.300 căn hộ cùng khu thương mại, trung tâm thể thao và công viên. Thông tin mở bán và chính sách: OneS cập nhật cho đối tác theo từng giai đoạn."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "east-valley",
    "name": "East Valley",
    "developer": "Refico",
    "location": "Khu Đông TP.HCM (Quận 2 cũ), TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Cao cấp",
    "type": "Căn hộ",
    "status": "Sản phẩm chiến lược 2025",
    "featured": false,
    "badge": "",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ",
    "size": "Đang cập nhật",
    "scale": "Đang cập nhật",
    "units": "3.200 căn hộ",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/east-valley-cover.jpg",
    "gallery": [
      "assets/img/media/east-valley-cover.jpg",
      "assets/img/media/east-valley-card.jpg"
    ],
    "card": "assets/img/media/east-valley-card.jpg",
    "short": "Dự án căn hộ của Refico tại Khu Đông TP.HCM — khoảng 3.200 căn hộ; thông tin chi tiết cập nhật theo công bố của chủ đầu tư.",
    "description": [
      "East Valley là dự án căn hộ do Refico phát triển tại Khu Đông TP.HCM (Quận 2 cũ), quy mô khoảng 3.200 căn hộ.",
      "Thông tin quy hoạch, thiết kế và chính sách bán hàng sẽ được OneS cập nhật cho đối tác ngay khi chủ đầu tư công bố chính thức."
    ],
    "amenities": [],
    "zones": []
  },
  {
    "id": "zeit-river",
    "name": "Zeit River",
    "developer": "GS Engineering & Construction (Hàn Quốc)",
    "location": "Khu đô thị mới Thủ Thiêm, TP. Thủ Đức",
    "area": "Khu Đông TP.HCM",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Sản phẩm chiến lược 2025",
    "featured": false,
    "badge": "Thủ Thiêm",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Căn hộ",
    "size": "3,3 ha",
    "scale": "3,3 ha",
    "units": "1.750 căn hộ",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/zeit-river-cover.jpg",
    "gallery": [
      "assets/img/media/zeit-river-cover.jpg",
      "assets/img/media/zeit-river-card.jpg"
    ],
    "card": "assets/img/media/zeit-river-card.jpg",
    "short": "Căn hộ hạng sang 3,3 ha của GS E&C tại Thủ Thiêm — khoảng 1.750 căn, hai tháp cao tầng cùng khối đế thương mại ven sông.",
    "description": [
      "Zeit River là dự án căn hộ hạng sang quy mô 3,3 ha do GS Engineering & Construction (Hàn Quốc) phát triển tại Khu đô thị mới Thủ Thiêm, TP. Thủ Đức.",
      "Dự án có khoảng 1.750 căn hộ cùng khối đế thương mại – dịch vụ. Giỏ hàng, chính sách và tài liệu bán hàng: liên hệ OneS."
    ],
    "amenities": [],
    "zones": []
  }
];

const POSTS = [];

const VALUES = [
  {
    "n": "01",
    "t": "Sáng tạo",
    "d": "Tìm cách tiếp cận mới và giải quyết vấn đề phức tạp bằng giải pháp đột phá, phù hợp nhu cầu khách hàng cao cấp."
  },
  {
    "n": "02",
    "t": "Thích ứng",
    "d": "Nắm bắt nhanh biến động thị trường, linh hoạt điều chỉnh chiến lược để đáp ứng kịp thời nhu cầu của khách hàng và đối tác."
  },
  {
    "n": "03",
    "t": "Tốc độ",
    "d": "Kết nối và phản hồi nhanh, xử lý hiệu quả để mọi cơ hội đầu tư luôn được nắm bắt kịp thời."
  },
  {
    "n": "04",
    "t": "Nhân văn",
    "d": "Phụng sự tận tâm, tôn trọng và quan tâm lợi ích con người; coi trọng quan hệ lâu dài dựa trên tin tưởng lẫn nhau."
  }
];

const JOBS = [];

const PARTNERS = [];

const FAQS = [];

const PAGES = {
  "home": {
    "name": "Trang chủ",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Nền tảng phân phối bất động sản cao cấp"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Nguồn sản phẩm cho đối tác."
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (màu xanh lá)",
        "value": "Phí dịch vụ xứng đáng."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "OneS là công ty công nghệ trong lĩnh vực bất động sản. Chúng tôi kết nối đối tác và cộng tác viên với giỏ hàng từ các chủ đầu tư hàng đầu: thông tin dự án đầy đủ, chính sách rõ ràng, công cụ hỗ trợ bán hàng."
      },
      {
        "k": "featured_title",
        "label": "Dự án nổi bật · tiêu đề",
        "value": "Sản phẩm chiến lược đang phân phối"
      },
      {
        "k": "cta_title",
        "label": "CTA cuối · tiêu đề",
        "value": "Nhận giỏ hàng & chính sách mới nhất từ OneS"
      },
      {
        "k": "cta_sub",
        "label": "CTA cuối · mô tả",
        "type": "textarea",
        "value": "Để lại thông tin, đội ngũ OneS sẽ gửi tài liệu dự án, bảng giá và chính sách hợp tác phù hợp với bạn."
      }
    ]
  },
  "about": {
    "name": "Giới thiệu",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Về OneS"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Công ty công nghệ"
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (màu xanh lá)",
        "value": "trong lĩnh vực bất động sản cao cấp."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "OneS cung cấp cho đối tác nguồn sản phẩm từ các chủ đầu tư uy tín và nền tảng công nghệ hỗ trợ bán hàng. Đối tác tập trung bán hàng, OneS lo phần còn lại và nhận phí dịch vụ."
      }
    ]
  },
  "partner": {
    "name": "Đối tác & CTV",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Chính sách hợp tác"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Bán hàng cùng OneS."
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (màu xanh lá)",
        "value": "Doanh thu chia sẻ từ 70% đến 86%."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "Mô hình chia sẻ doanh thu OneS NextGen: đối tác và cộng tác viên nhận tỷ lệ cao trên mọi giao dịch, được cấp giỏ hàng, tài liệu sản phẩm, hỗ trợ marketing và không gian làm việc chung."
      }
    ]
  },
  "contact": {
    "name": "Liên hệ",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Liên hệ OneS"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Kết nối với"
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (màu xanh lá)",
        "value": "đội ngũ OneS."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "Đối tác cần giỏ hàng, chính sách hoặc tài liệu dự án, hãy để lại thông tin hoặc gọi hotline. OneS phản hồi trong giờ làm việc."
      }
    ]
  }
};

const HERO_SLIDES = [];

const HERO_SLIDES_REPO = "";
const HERO_SLIDES_BRANCH = "main";

if (typeof window !== "undefined") {
  window.SITE = SITE; window.NAV = NAV; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.FILTERS = FILTERS; window.VALUES = VALUES; window.JOBS = JOBS; window.PARTNERS = PARTNERS; window.FAQS = FAQS; window.PAGES = PAGES; window.HERO_SLIDES = HERO_SLIDES; window.HERO_SLIDES_REPO = HERO_SLIDES_REPO; window.HERO_SLIDES_BRANCH = HERO_SLIDES_BRANCH; window.ph = ph;
}

/* CMS override (admin.html lưu trong trình duyệt) */
(function () {
  if (typeof window === 'undefined') return;
  try {
    var cms = JSON.parse(localStorage.getItem('pl_cms') || 'null');
    if (!cms) return;
    if (cms.site) Object.assign(SITE, cms.site);
    function r(a, d) { if (Array.isArray(d)) { a.length = 0; d.forEach(function (x) { a.push(x); }); } }
    r(PROJECTS, cms.projects);
    if (cms.pages) { for (var pg in cms.pages) { if (PAGES[pg]) PAGES[pg].fields.forEach(function (f) { if (cms.pages[pg][f.k] != null) f.value = cms.pages[pg][f.k]; }); } }
    window.SITE = SITE; window.PROJECTS = PROJECTS; window.PAGES = PAGES;
  } catch (e) {}
})();
