import { forwardRef, useEffect, useState, useId } from 'react';
import gsap from 'gsap';

const HERO_VIDEO_MOBILE =
  'https://res.cloudinary.com/dcnf2dmf/video/upload/q_auto,f_mp4/v1787709329/Hero-MobileHandbreak.mp4';
const HERO_VIDEO_DESKTOP =
  'https://res.cloudinary.com/dcnf2dmf/video/upload/q_auto,f_mp4/v1787711743/Background_Video_DesktopHandbreak.mp4';

// Poster = frame đầu (so_0) của chính video đó, để hiện ngay khi mạng chậm chưa tải kịp video
const HERO_POSTER_MOBILE =
  'https://res.cloudinary.com/dcnf2dmf/video/upload/f_jpg,q_auto,w_800,so_0/v1787709329/Hero-MobileHandbreak.jpg';
const HERO_POSTER_DESKTOP =
  'https://res.cloudinary.com/dcnf2dmf/video/upload/f_jpg,q_auto,w_1280,so_0/v1787711743/Background_Video_DesktopHandbreak.jpg';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

const PHONE_DISPLAY = '098 302 8447';
const PHONE_TEL = '0983028447';
const ADDRESS = '102 Đường Lái Thiêu, Lái Thiêu, Thuận An';
const HOURS = 'Mở cửa 08:00 – 24:00';

interface HeroProps {
  visible: boolean;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ visible }, ref) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
      : false,
  );
  const headingId = useId();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasEntered(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mql.matches);
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const contentVisible = visible && hasEntered;

  useEffect(() => {
    if (!contentVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      )
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3',
        )
        .fromTo(
          '.hero-oldname',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.45',
        )
        .fromTo(
          '#hero-scroll',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.2',
        )
        .fromTo(
          '#hero-infobar',
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4',
        );
    });

    return () => ctx.revert();
  }, [contentVisible]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-void"
    >
      {/* key theo isMobile để chỉ mount 1 <video> tại 1 thời điểm - trình duyệt chỉ request
          đúng 1 file (mobile HOẶC desktop), không bao giờ tải cả hai cùng lúc */}
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={isMobile ? HERO_POSTER_MOBILE : HERO_POSTER_DESKTOP}
        src={isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP}
        aria-label="Không gian Karaoke 9999"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay tối + vignette vàng nhẹ để giữ không khí luxury nightlife */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,9,8,0.55) 0%, rgba(11,9,8,0.30) 32%, rgba(11,9,8,0.55) 78%, rgba(11,9,8,0.85) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 160px 40px rgba(0,0,0,0.55)' }}
        aria-hidden="true"
      />

      <div className="hero-stack pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p
          className="hero-eyebrow opacity-0"
          style={{
            color: '#E8C77E',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(10px, 1.4vw, 12px)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
          }}
          aria-hidden={!contentVisible}
        >
          Karaoke VIP · Lái Thiêu - Thuận An
        </p>

        <h1
          id={headingId}
          className="hero-title select-none opacity-0"
          style={{
            marginTop: 'clamp(12px,1.8vw,18px)',
            color: '#F3EAD9',
            fontFamily: "'Fraunces', serif",
            fontWeight: 620,
            fontStyle: 'normal',
            fontVariationSettings: "'opsz' 140, 'SOFT' 40",
            fontSize: 'clamp(2.2rem, 7.2vw, 5rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            textTransform: 'uppercase',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
          }}
          aria-hidden={!contentVisible}
        >
          Karaoke 9999
        </h1>

        <p
          className="hero-oldname opacity-0"
          style={{
            marginTop: 8,
            color: 'rgba(232,199,126,0.75)',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(11px, 1.5vw, 13px)',
            letterSpacing: '0.03em',
          }}
          aria-hidden={!contentVisible}
        >
          Nhà Vàng Anh
        </p>
      </div>

      <div
        id="hero-scroll"
        className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 md:flex"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ fontFamily: "'Jost', sans-serif", color: 'rgba(243,234,217,0.45)' }}
        >
          Cuộn Xuống
        </span>
        <div className="h-10 w-px overflow-hidden" style={{ backgroundColor: 'rgba(243,234,217,0.25)' }}>
          <div className="scroll-line h-1/2 w-full" style={{ backgroundColor: '#E8C77E' }} />
        </div>
      </div>

      {/* Thanh thông tin VIP dưới cùng: địa chỉ · giờ mở cửa · hotline */}
      <div
        id="hero-infobar"
        className="absolute inset-x-0 bottom-0 z-30 opacity-0"
        style={{
          borderTop: '1px solid rgba(198,161,91,0.3)',
          backgroundColor: 'rgba(11,9,8,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <div
          className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-x-[22px] gap-y-2 px-5 py-3 text-center"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(11px, 1.6vw, 12.5px)',
            letterSpacing: '0.04em',
            color: 'rgba(243,234,217,0.8)',
          }}
        >
          <span>{ADDRESS}</span>
          <span style={{ color: 'rgba(198,161,91,0.6)' }}>•</span>
          <span>{HOURS}</span>
          <span style={{ color: 'rgba(198,161,91,0.6)' }}>•</span>
          <a
            href={`tel:+84${PHONE_TEL.slice(1)}`}
            style={{ color: '#E8C77E', textDecoration: 'none', fontWeight: 600 }}
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
