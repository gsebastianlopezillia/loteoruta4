import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

export function FAQItem({ question, children }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#121212] rounded-xl border border-[#2a2a2a] overflow-hidden transition-all duration-300 hover:border-[#27AE60]/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left transition-all duration-200 hover:bg-[#1a1a1a]"
        aria-expanded={isOpen}
      >
        <h3 
          className="text-[#FFFFFF] pr-8 text-[20px]"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.3px' }}
        >
          {question}
        </h3>
        <ChevronDown 
          className={`size-6 text-[#27AE60] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="p-6 pt-0 text-[#D0D0D0] text-[16px]"
          style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
