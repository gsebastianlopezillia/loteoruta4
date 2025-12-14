import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

export function BenefitCard({ icon: Icon, title, description, link, linkText }: BenefitCardProps) {
  return (
    <div className="h-full flex flex-col items-center text-center p-6 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#27AE60] transition-all duration-300 hover:scale-105">
      <div className="p-4 bg-[#27AE60]/20 rounded-full mb-4">
        <Icon className="size-8 text-[#27AE60]" />
      </div>
      <h3 className="text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', margin: '16px 0' }}>{title}</h3>
      <p className="text-sm text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', lineHeight: '1.5' }}>{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-[#27AE60] hover:text-[#1e8449] underline transition-colors duration-300 text-sm"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
        >
          {linkText || 'Ver más'}
        </a>
      )}
    </div>
  );
}