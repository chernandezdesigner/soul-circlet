
import { useState, useRef, useEffect } from "react";
import { format, addDays, isSameDay } from "date-fns";

interface DateSelectorProps {
  onSelectDate: (date: Date) => void;
}

const DateSelector = ({ onSelectDate }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate date range (7 days before today and 7 days after)
  useEffect(() => {
    const today = new Date();
    const dateRange: Date[] = [];
    
    for (let i = -7; i <= 7; i++) {
      dateRange.push(addDays(today, i));
    }
    
    setDates(dateRange);
    
    // Select today by default
    setSelectedDate(today);
    onSelectDate(today);
  }, [onSelectDate]);

  // Center active date when it changes
  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [selectedDate]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="w-full mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto py-2 px-2 scrollbar-hide gap-1 snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {dates.map((date, i) => (
          <div 
            key={i}
            className="snap-center flex-shrink-0 px-1"
          >
            <button
              onClick={() => handleSelectDate(date)}
              data-selected={isSameDay(date, selectedDate)}
              className={`day-selector ${
                isSameDay(date, selectedDate) ? "active" : "hover:bg-gray-100"
              }`}
            >
              {format(date, "dd")}
            </button>
            {isSameDay(date, selectedDate) && (
              <div className="mt-1 h-1 w-4 mx-auto bg-primary rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
