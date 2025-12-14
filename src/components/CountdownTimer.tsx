import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date('2025-12-31T23:59:59').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

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

  return (
    <div className="flex gap-4 justify-center items-center">
      <TimeUnit value={timeLeft.days} label="Días" />
      <div className="text-[#004D40]">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="text-[#004D40]">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="text-[#004D40]">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
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
