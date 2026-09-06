export interface ClientTestimonial {
  id: string;
  projectId: string;
  name: string;
  projectName: string;
  image: string;
  imagePosition?: string;
  badgeText?: string;
  comment: string;
  rating: number;
}

export const clientTestimonials: ClientTestimonial[] = [
  {
    id: "1",
    projectId: "comprevende",
    name: "براء بيطار",
    projectName: "Comprevende",
    image: "/images/co/bb.jpg",
    imagePosition: "center 22%",
    badgeText: "تجربة ممتازة",
    comment: "تجربة ممتازة في تطوير منصة البيع والشراء الخاصة بنا. الموقع سريع وسهل الاستخدام، واستجاب الفريق لكل متطلباتنا التقنية بمرونة واحترافية عالية.",
    rating: 4.8,
  },
  {
    id: "2",
    projectId: "emar-home",
    name: "محمد قنطار",
    projectName: "إعمار للتصميم الداخلي",
    image: "/images/co/mm.jpg",
    badgeText: "عمل متقن",
    comment: "كمكتب تصميم داخلي، كان يهمنا جداً أن يعكس موقعنا الجمالية، والنتيجة كانت موقعاً أنيقاً يستعرض مشاريعنا بأفضل صورة مع لوحة تحكم سهلة وواضحة.",
    rating: 4.7,
  },
  {
    id: "3",
    projectId: "arabia-swim",
    name: "الكابتن عمران",
    projectName: "أكاديمية أرابيا للسباحة",
    image: "/images/co/ss.png",
    badgeText: "شكراً محمود",
    comment: "الموقع الجديد ساهم بشكل كبير في تسهيل تواصل المتدربين معنا. واجهة عرض البرامج الرياضية والتسجيل فيها واضحة، وعكس الروح الرياضية للأكاديمية.",
    rating: 5,
  },
  {
    id: "4",
    projectId: "pro-camz",
    name: "احمد الفارس",
    projectName: "Pro Camz",
    image: "/images/co/kk.jpg",
    badgeText: "عمل رائع",
    comment: "أداء المتجر الإلكتروني أصبح أكثر سلاسة بعد التصميم الجديد. سرعة تصفح المنتجات وتصنيف المعدات الاحترافية ساعدت عملائنا على إتمام الشراء بخطوات بسيطة.",
    rating: 4.5,
  },
  {
    id: "5",
    projectId: "gold-cup",
    name: "نيازي",
    projectName: "جولد كاب - كاسة ذهبية",
    image: "/images/co/nn.jpg",
    badgeText: "إبداع مميز",
    comment: "تصميم الموقع أعطى هوية بصرية رائعة لعلامتنا. الواجهة جذابة وتتناسب تماماً مع تطلعاتنا لعرض منتجاتنا بشكل عصري ومميز. عمل متقن بصراحة.",
    rating: 4.3,
  },
];
