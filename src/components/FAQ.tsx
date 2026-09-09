import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants, standardEase } from '../lib/animations';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What is digital marketing and why is it critical for business growth?",
    answer: "Digital marketing is the strategic deployment of internet-facing channels (search, social media, web architecture, and paid advertising) to attract, engage, and convert high-intent customers. Over 80% of commercial purchasing decisions now begin online—making an authoritative digital presence essential to avoid losing market share to competitors."
  },
  {
    id: 2,
    question: "Why are custom and WordPress websites preferred for business?",
    answer: "Custom WordPress and modern web architectures combine complete aesthetic freedom with a lightweight, secure CMS. They are engineered natively for high-speed Core Web Vitals, mobile-first responsiveness, modular scalability, and simple day-to-day management without technical debt."
  },
  {
    id: 3,
    question: "How does Search Engine Optimization (SEO) generate qualified leads?",
    answer: "Organic SEO acts as a 24/7 client generation engine. By ranking on page one of Google for high-intent commercial keywords, your business intercepts prospects right when they are searching for solutions—delivering compounding inbound inquiries with zero ongoing per-click fees."
  },
  {
    id: 4,
    question: "What is Social Media Optimization (SMO) and how does it drive sales?",
    answer: "Social Media Optimization establishes brand prestige and organic community trust across Instagram, LinkedIn, and Facebook. Regular branded posting and active engagement turn casual scrollers into loyal brand advocates and create direct inbound traffic funnels to your website."
  },
  {
    id: 5,
    question: "How quickly can we launch campaigns and see measurable results?",
    answer: "Paid search (PPC) and targeted social advertising can generate qualified buyer traffic within 48 to 72 hours of campaign launch. Full website design and e-commerce deployments typically take 2 to 4 weeks, while organic SEO delivers compounding market leadership over a 3 to 6-month period."
  }
];

export default function FAQ() {
  const [openIds, setOpenIds] = useState<number[]>([1]); // First item open by default like in preview

  const toggle = (id: number) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(i => i !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-24 bg-[#070b14] border-t border-slate-900/90">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

        {/* Section Header matching Figma */}
        <div className="text-center max-w-2xl xl:max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
            FAQ ACCORDION
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1.5 mb-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Everything you need to know about our modern marketing process and performance standards.
          </p>
        </div>

        {/* FAQ Accordion List - Staggered entrance with smooth height animation */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="space-y-3.5 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto"
        >
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                key={faq.id}
                variants={staggerItemVariants}
                className={`rounded-xl sm:rounded-2xl border transition-colors duration-200 overflow-hidden ${isOpen
                    ? 'bg-[#0a1120] border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-[#090e1a] border-slate-800/80 hover:border-slate-700'
                  }`}
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base xl:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'
                    }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: standardEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 pt-1 text-xs sm:text-sm xl:text-base text-slate-300 leading-relaxed border-t border-slate-800/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
