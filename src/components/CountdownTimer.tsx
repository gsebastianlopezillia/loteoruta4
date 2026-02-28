import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate?: string;
}

export function CountdownTimer({ targetDate = '2026-03-31T23:59:59' }: CountdownTimerProps) {
  const { t } = useTranslation();
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  if (isExpired) return null;

  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center flex-wrap">
      <TimeUnit value={timeLeft.days} label={t('countdown.days')} />
      <div className="text-white font-bold">:</div>
      <TimeUnit value={timeLeft.hours} label={t('countdown.hours')} />
      <div className="text-white font-bold">:</div>
      <TimeUnit value={timeLeft.minutes} label={t('countdown.minutes')} />
      <div className="text-white font-bold">:</div>
      <TimeUnit value={timeLeft.seconds} label={t('countdown.seconds')} />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#004D40] text-white px-4 py-3 rounded-lg min-w-[70px] text-center">
        <span className="text-3xl md:text-4xl text-[24px]">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs mt-2 text-[#F5F5F5]/70">{label}</span>
    </div>
  );
}
