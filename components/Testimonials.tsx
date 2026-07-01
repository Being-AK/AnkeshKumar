import React, { ReactNode } from 'react';
import { Quote, Building2, Factory, Cpu, Briefcase, ShoppingBag, PieChart } from 'lucide-react';
import { Icon3D, Icons3D } from './Icons3D';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  logo: ReactNode;
}

const testimonials: Testimonial[] = [
  {
    quote: "Ankesh handles complex audit procedures and compliance tasks with the precision of a seasoned professional. His work on our ₹300Cr transfer pricing assignment was exceptionally precise and well-documented.",
    author: "Senior Partner",
    role: "GPHK & Associates",
    logo: <Icon3D icon={Icons3D.Building} theme="corporate" size="sm" />
  },
  {
    quote: "Highly efficient, knowledgeable, and reliable. Ankesh structured our tax records, making our periodic GST filing and reconciliation processes significantly smoother.",
    author: "Client Recommendation",
    role: "Manufacturing Sector",
    logo: <Icon3D icon={Icons3D.Factory} theme="emerald" size="sm" />
  },
  {
    quote: "His clear grasp of transfer pricing guidelines and meticulous documentation support ensured a seamless annual compliance review. A highly dependable resource.",
    author: "CFO",
    role: "IT Solutions Company",
    logo: <Icon3D icon={Icons3D.Cpu} theme="blue" size="sm" />
  },
  {
    quote: "An exceptionally proactive article assistant who takes complete ownership of assigned statutory audits. He demonstrates great diligence and requires minimal supervision.",
    author: "Audit Manager",
    role: "GPHK & Associates",
    logo: <Icon3D icon={Icons3D.Briefcase} theme="gold" size="sm" />
  },
  {
    quote: "His review of our GST reconciliations was incredibly thorough. Ankesh identified critical ledger mismatches and ensured accurate filing compliance.",
    author: "Director",
    role: "Retail Chain",
    logo: <Icon3D icon={Icons3D.Cart} theme="purple" size="sm" />
  },
  {
    quote: "Consistently professional, punctual, and precise in his work. Ankesh is a highly valuable asset for executing statutory and internal audit assignments.",
    author: "Head of Finance",
    role: "SME Client",
    logo: <Icon3D icon={Icons3D.Chart} theme="emerald" size="sm" />
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-darkBg border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Professional Endorsements</h2>
        <h3 className="text-2xl md:text-3xl font-extrabold text-navy dark:text-white">Feedback from Audit Partners & Client Engagements</h3>
        <p className="mt-4 text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Verifiable reviews highlighting technical competence, compliance precision, and professional diligence across statutory audits, GST, and transfer pricing assignments.
        </p>
      </div>

      <div className="relative w-full group">
        {/* Gradient Masks for fade effect */}
        <div className="absolute top-0 left-0 w-16 md:w-40 h-full bg-gradient-to-r from-white dark:from-darkBg to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-40 h-full bg-gradient-to-l from-white dark:from-darkBg to-transparent z-10 pointer-events-none"></div>

        {/* Seamless Marquee Container */}
        <div className="flex overflow-hidden">
            {/* List 1 */}
            <div className="flex shrink-0 animate-marquee gap-6 md:gap-8 py-4 px-3 md:px-4 group-hover:[animation-play-state:paused]" style={{ animationDuration: '40s' }}>
                {testimonials.map((item, idx) => (
                    <TestimonialCard key={`orig-${idx}`} item={item} />
                ))}
            </div>
            {/* List 2 (Duplicate for seamless loop) */}
            <div className="flex shrink-0 animate-marquee gap-6 md:gap-8 py-4 px-3 md:px-4 group-hover:[animation-play-state:paused]" style={{ animationDuration: '40s' }}>
                {testimonials.map((item, idx) => (
                    <TestimonialCard key={`dup-${idx}`} item={item} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

// Helper Component for consistency
const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
    <div className="w-[320px] md:w-[480px] bg-light dark:bg-darkCard p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative group/card hover:shadow-md transition-all flex-shrink-0 whitespace-normal flex flex-col justify-between h-full hover:border-gold/30">
        <div>
            {/* Quote Icon with improved positioning/opacity - using Icon3D for consistency */}
            <div className="mb-2 absolute top-6 left-6 opacity-80">
                <Icon3D icon={Icons3D.Quote} theme="gold" size="md" />
            </div>
            <div className="relative z-10 pt-10 pl-2">
                 <p className="text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed text-sm md:text-base mb-8">
                    "{item.quote}"
                </p>
            </div>
        </div>
        
        {/* Author Section with Logo */}
        <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-700 pt-4 mt-auto">
            <div className="shrink-0">
                {item.logo}
            </div>
            <div>
                <h4 className="font-bold text-navy dark:text-white text-base leading-tight">{item.author}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mt-1">{item.role}</p>
            </div>
        </div>
    </div>
);

export default Testimonials;