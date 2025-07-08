import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Trophy, Clock } from 'lucide-react';
import { gsap } from 'gsap';

interface StatItem {
  icon: React.ComponentType<any>;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const AnimatedStats = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const stats: StatItem[] = [
    { icon: Code, label: 'مشروع منجز', value: 150, suffix: '+', color: 'text-cyan-400' },
    { icon: Users, label: 'عميل راضٍ', value: 95, suffix: '%', color: 'text-green-400' },
    { icon: Trophy, label: 'جائزة', value: 25, suffix: '', color: 'text-yellow-400' },
    { icon: Clock, label: 'سنة خبرة', value: 8, suffix: '', color: 'text-purple-400' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    countersRef.current.forEach((counter, index) => {
      if (counter) {
        const stat = stats[index];
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: stat.value,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              const value = Math.round(this.targets()[0].textContent);
              counter.textContent = value + stat.suffix;
            }
          }
        );
      }
    });
  };

  return (
    <section ref={statsRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                    <span
                      ref={(el) => (countersRef.current[index] = el)}
                      className="tabular-nums"
                    >
                      0{stat.suffix}
                    </span>
                  </div>
                  <div className="text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;