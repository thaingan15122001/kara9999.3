import { useRef, useState } from 'react';
import Hero from '@/components/Hero';
import ExperienceSection from '@/components/ExperienceSection';

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroContentVisible] = useState(true);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#0B0908' }}>
      <main className="relative z-[1]">
        <Hero ref={heroRef} visible={heroContentVisible} />
        <ExperienceSection />

        {/* Placeholder để test - sẽ thay bằng section Phòng VIP thật sau */}
        <section
          className="flex h-[60vh] items-center justify-center px-6 text-center"
          style={{ backgroundColor: '#0B0908', color: 'rgba(243,234,217,0.4)' }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, letterSpacing: '0.1em' }}>
            (Các section tiếp theo - Phòng VIP, Đồ uống, Gallery... sẽ được thêm sau)
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
