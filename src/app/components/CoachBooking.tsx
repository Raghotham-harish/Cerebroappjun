import { useState } from "react";
import { Star, Calendar, Clock, Check, CreditCard, ArrowLeft } from "lucide-react";

interface CoachBookingProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Coach {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  imageColor: string;
  availability: string[];
}

const COACHES: Coach[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    title: 'Clinical Psychologist',
    specialty: 'Burnout & Stress Management',
    rating: 4.9,
    reviews: 127,
    price: 150,
    imageColor: '#A78BFA',
    availability: ['Mon 2PM', 'Wed 10AM', 'Fri 4PM']
  },
  {
    id: '2',
    name: 'James Chen',
    title: 'Executive Coach',
    specialty: 'Work-Life Balance & Leadership',
    rating: 4.8,
    reviews: 93,
    price: 120,
    imageColor: '#60A5FA',
    availability: ['Tue 11AM', 'Thu 3PM', 'Sat 9AM']
  },
  {
    id: '3',
    name: 'Dr. Maya Patel',
    title: 'Wellness Therapist',
    specialty: 'Emotional Resilience & Mindfulness',
    rating: 5.0,
    reviews: 156,
    price: 180,
    imageColor: '#34D399',
    availability: ['Mon 9AM', 'Wed 2PM', 'Thu 11AM']
  }
];

export function CoachBooking({ onBack, onComplete }: CoachBookingProps) {
  const [step, setStep] = useState<'select' | 'schedule' | 'payment' | 'confirmation'>('select');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleSelectCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setStep('schedule');
  };

  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleContinueToPayment = () => {
    if (selectedSlot) {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setStep('confirmation');
    }, 2000);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (step === 'select') {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto py-4">
            {/* Header */}
            <div className="mb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 mb-3"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#8B5CF6',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h2
                className="text-xl mb-1"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                Select a Coach
              </h2>
              <p
                className="text-sm"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                Choose a certified professional for your session
              </p>
            </div>

            {/* Coach Cards */}
            <div className="space-y-3">
              {COACHES.map((coach) => (
                <button
                  key={coach.id}
                  onClick={() => handleSelectCoach(coach)}
                  className="w-full p-4 rounded-3xl text-left transition-all"
                  style={{
                    background: 'white',
                    border: '2px solid #E5E7EB'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: coach.imageColor }}
                    >
                      <span
                        className="text-xl"
                        style={{
                          fontFamily: 'Lora, serif',
                          color: 'white',
                          fontWeight: 600
                        }}
                      >
                        {coach.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-base mb-0.5"
                        style={{
                          fontFamily: 'Lora, serif',
                          fontWeight: 500,
                          color: '#15113C'
                        }}
                      >
                        {coach.name}
                      </h3>
                      <p
                        className="text-xs mb-1"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B7280'
                        }}
                      >
                        {coach.title}
                      </p>
                      <p
                        className="text-xs mb-2"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#8B5CF6',
                          fontWeight: 600
                        }}
                      >
                        {coach.specialty}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                          <span
                            className="text-xs"
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              color: '#15113C',
                              fontWeight: 600
                            }}
                          >
                            {coach.rating}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              color: '#9CA3AF'
                            }}
                          >
                            ({coach.reviews})
                          </span>
                        </div>
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: '#15113C',
                            fontWeight: 600
                          }}
                        >
                          ${coach.price}/session
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pb-4" />
          </div>
        </div>
      </div>
    );
  }

  if (step === 'schedule' && selectedCoach) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto py-4">
            {/* Header */}
            <div className="mb-4">
              <button
                onClick={() => setStep('select')}
                className="flex items-center gap-2 mb-3"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#8B5CF6',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h2
                className="text-xl mb-1"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                Select Time Slot
              </h2>
              <p
                className="text-sm"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                Choose a time for your session with {selectedCoach.name}
              </p>
            </div>

            {/* Available Slots */}
            <div className="space-y-2 mb-4">
              {selectedCoach.availability.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => handleSelectSlot(slot)}
                    className="w-full p-3 rounded-2xl flex items-center gap-3 transition-all"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)'
                        : 'white',
                      border: `2px solid ${isSelected ? '#8B5CF6' : '#E5E7EB'}`
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isSelected ? '#8B5CF6' : '#F3F4F6'
                      }}
                    >
                      <Clock className="w-5 h-5" style={{ color: isSelected ? 'white' : '#6B7280' }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#15113C',
                          fontWeight: 600
                        }}
                      >
                        {slot}
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B7280'
                        }}
                      >
                        60 minutes • ${selectedCoach.price}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pb-4" />
          </div>
        </div>

        {/* Continue Button */}
        <div
          className="flex-shrink-0 px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
            borderTop: '1px solid rgba(229, 231, 235, 0.3)'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleContinueToPayment}
              disabled={!selectedSlot}
              className="w-full py-3 rounded-full transition-all disabled:opacity-40"
              style={{
                background: selectedSlot
                  ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'
                  : '#E5E7EB',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px'
              }}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'payment' && selectedCoach && selectedSlot) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto py-4">
            {/* Header */}
            <div className="mb-4">
              <button
                onClick={() => setStep('schedule')}
                className="flex items-center gap-2 mb-3"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#8B5CF6',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h2
                className="text-xl mb-1"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                Payment
              </h2>
              <p
                className="text-sm"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                Complete your booking
              </p>
            </div>

            {/* Booking Summary */}
            <div
              className="p-4 rounded-3xl mb-3"
              style={{
                background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)',
                border: '2px solid #C4B5FD'
              }}
            >
              <h3
                className="text-sm mb-2"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                Booking Summary
              </h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    Coach
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 600
                    }}
                  >
                    {selectedCoach.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    Time Slot
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 600
                    }}
                  >
                    {selectedSlot}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2" style={{ borderColor: '#C4B5FD' }}>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      Total
                    </span>
                    <span
                      className="text-base"
                      style={{
                        fontFamily: 'Lora, serif',
                        color: '#8B5CF6',
                        fontWeight: 600
                      }}
                    >
                      ${selectedCoach.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dummy Payment Form */}
            <div
              className="p-4 rounded-3xl mb-3"
              style={{
                background: 'white',
                border: '2px solid #E5E7EB'
              }}
            >
              <h3
                className="text-sm mb-3 flex items-center gap-2"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                <CreditCard className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                Payment Details
              </h3>

              <div className="space-y-3">
                <div>
                  <label
                    className="text-xs mb-1 block"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280',
                      fontWeight: 500
                    }}
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full p-2 rounded-xl text-sm"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      border: '1px solid #E5E7EB',
                      color: '#15113C'
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="text-xs mb-1 block"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#6B7280',
                        fontWeight: 500
                      }}
                    >
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 rounded-xl text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        border: '1px solid #E5E7EB',
                        color: '#15113C'
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs mb-1 block"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#6B7280',
                        fontWeight: 500
                      }}
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-2 rounded-xl text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        border: '1px solid #E5E7EB',
                        color: '#15113C'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-4" />
          </div>
        </div>

        {/* Pay Button */}
        <div
          className="flex-shrink-0 px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
            borderTop: '1px solid rgba(229, 231, 235, 0.3)'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handlePayment}
              disabled={paymentProcessing}
              className="w-full py-3 rounded-full transition-all disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px'
              }}
            >
              {paymentProcessing ? 'Processing...' : `Pay $${selectedCoach.price}`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'confirmation' && selectedCoach && selectedSlot) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto py-4 flex flex-col items-center justify-center min-h-full">
            {/* Success Icon */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ background: '#EDE9FE' }}
            >
              <Check className="w-10 h-10" style={{ color: '#8B5CF6' }} />
            </div>

            <h2
              className="text-2xl mb-2 text-center"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: '#15113C'
              }}
            >
              Booking Confirmed!
            </h2>

            <p
              className="text-sm mb-6 text-center"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Your session has been scheduled
            </p>

            {/* Booking Details */}
            <div
              className="w-full p-4 rounded-3xl mb-4"
              style={{
                background: 'white',
                border: '2px solid #10B981'
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    Coach
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 600
                    }}
                  >
                    {selectedCoach.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    Session
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 600
                    }}
                  >
                    {selectedSlot}
                  </span>
                </div>
              </div>
            </div>

            <p
              className="text-xs text-center mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF',
                fontStyle: 'italic'
              }}
            >
              A confirmation email has been sent to you
            </p>
          </div>
        </div>

        {/* Done Button */}
        <div
          className="flex-shrink-0 px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
            borderTop: '1px solid rgba(229, 231, 235, 0.3)'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleComplete}
              className="w-full py-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px'
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
