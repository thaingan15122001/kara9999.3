import { useEffect, useRef, useState } from 'react';

interface ExperienceCard {
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  alt: string;
}

const CARDS: ExperienceCard[] = [
  {
    eyebrow: 'Tiếp Đối Tác',
    headline: 'Đêm Kín Đáo',
    description: 'Không gian riêng tư cho những cuộc gặp quan trọng',
    image: 'https://res.cloudinary.com/dcnf2dmf/image/upload/f_webp,q_auto,w_900/v1787719461/test_2.jpg',
    alt: 'Không gian VIP tiếp đối tác tại Karaoke 9999',
  },
  {
    eyebrow: 'Cuối Tuần',
    headline: 'Hội Bạn Tụ Họp',
    description: 'Đồng nghiệp, hội nhóm, bạn bè - cùng nhau xả hơi cuối tuần',
    image: 'https://res.cloudinary.com/dcnf2dmf/image/upload/f_webp,q_auto,w_900/v1787719463/test_5.jpg',
    alt: 'Nhóm bạn bè, đồng nghiệp hát karaoke cuối tuần',
  },
  {
    eyebrow: 'Tiệc & Sự Kiện',
    headline: 'Bùng Nổ Đêm Tiệc',
    description: 'Sinh nhật, tất niên, tiệc công ty - nhảy nhót, ca hát thả ga',
    image: 'https://res.cloudinary.com/dcnf2dmf/image/upload/f_webp,q_auto,w_900/v1787719462/test_3.jpg',
    alt: 'Tiệc sinh nhật, sự kiện, party tại Karaoke 9999',
  },
];

function ExperienceCardItem({ card, index }: { card: ExperienceCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const textBlock = (variant: 'mobile' | 'desktop') => (
    <>
      <p
        style={{
          color: '#E8C77E',
          fontFamily: "'Jost', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(10px, 1.4vw, 12px)',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(14px)',
          transition: `opacity 0.7s ease ${0.1 + index * 0.12}s, transform 0.7s ease ${0.1 + index * 0.12}s`,
        }}
      >
        {card.eyebrow}
      </p>

      <h3
        style={{
          marginTop: 10,
          color: variant === 'mobile' ? '#F3EAD9' : '#F3EAD9',
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontVariationSettings: "'opsz' 100, 'SOFT' 30",
          fontSize: 'clamp(1.9rem, 4.2vw, 2.7rem)',
          lineHeight: 1.05,
          textShadow: variant === 'desktop' ? '0 4px 24px rgba(0,0,0,0.5)' : undefined,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(18px)',
          transition: `opacity 0.75s ease ${0.2 + index * 0.12}s, transform 0.75s ease ${0.2 + index * 0.12}s`,
        }}
      >
        {card.headline}
      </h3>

      <p
        style={{
          marginTop: 10,
          maxWidth: 340,
          color: 'rgba(243,234,217,0.82)',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(13px, 1.6vw, 15px)',
          lineHeight: 1.55,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(18px)',
          transition: `opacity 0.75s ease ${0.3 + index * 0.12}s, transform 0.75s ease ${0.3 + index * 0.12}s`,
        }}
      >
        {card.description}
      </p>
    </>
  );

  return (
    <div
      ref={ref}
      className="group relative w-full md:h-screen md:flex-1 md:overflow-hidden"
      style={{
        borderRight: index < CARDS.length - 1 ? '1px solid rgba(198,161,91,0.25)' : undefined,
      }}
    >
      {/* ── Mobile: ảnh lớn phía trên (không chữ đè lên), khối chữ nền đặc riêng phía dưới ── */}
      <div className="flex flex-col md:hidden">
        <div className="relative w-full overflow-hidden" style={{ height: '74svh' }}>
          <img
            src={card.image}
            alt={card.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.9s ease',
            }}
          />
          {/* Fade rất mỏng ở đáy chỉ để làm mượt đường nối sang khối chữ, không che ảnh */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: '18%',
              background: 'linear-gradient(180deg, rgba(11,9,8,0) 0%, rgba(11,9,8,0.9) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div className="px-6 pb-9 pt-6" style={{ backgroundColor: '#0B0908' }}>
          {textBlock('mobile')}
        </div>
      </div>

      {/* ── Desktop: ảnh full-bleed, hover zoom nhẹ, chữ đè đáy trên gradient tối ── */}
      <div className="relative hidden h-full w-full overflow-hidden md:block">
        <img
          src={card.image}
          alt={card.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-100 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          style={{
            opacity: inView ? 1 : 0,
            transitionProperty: 'transform, opacity',
            transitionDuration: '700ms, 900ms',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,9,8,0.05) 0%, rgba(11,9,8,0.15) 45%, rgba(11,9,8,0.75) 85%, rgba(11,9,8,0.92) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-[1] flex h-full flex-col justify-end px-9 pb-16">
          {textBlock('desktop')}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="trai-nghiem" className="relative flex w-full flex-col md:flex-row" style={{ backgroundColor: '#0B0908' }}>
      {CARDS.map((card, index) => (
        <ExperienceCardItem key={card.headline} card={card} index={index} />
      ))}
    </section>
  );
}
