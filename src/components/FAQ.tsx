import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What is Digital Marketing? Why it is important",
    answer: "Digital marketing is the strategic deployment of internet-facing campaigns to locate, hook, and convert high-intent audiences. It is vital because modern purchase decisions start and end online static brands get left behind."
  },
  {
    id: 2,
    question: "Why WordPress Website are better than any other website",
    answer: "WordPress blends absolute modularity with an optimized, lightweight CMS layer. It is built natively for custom SEO structures, rapid load times, and simple management overhead."
  },
  {
    id: 3,
    question: "Why SEO is important for any website and how it helps business",
    answer: "Organic Search Engine Optimization acts as a 24/7 client generation engine. It places your solutions directly in front of prospects exactly when they have a problem, reducing acquisition costs drastically over PPC."
  },
  {
    id: 4,
    question: "Why SMO is important",
    answer: "Social Media Optimization is the foundation of brand trust. Engaging regularly on modern platforms fosters immediate community backing, validates authority, and accelerates organic discovery."
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
    <section id="faq" className="relative py-20 bg-[#070b14] border-t border-slate-900/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header matching Figma */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
            FAQ ACCORDION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1.5 mb-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Everything you need to know about our modern marketing process and performance standards.
          </p>
        </div>

        {/* FAQ Accordion List matching Figma */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? 'bg-[#0a1120] border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-[#090e1a] border-slate-800/80 hover:border-slate-700'
                  }`}
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'
                    }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
