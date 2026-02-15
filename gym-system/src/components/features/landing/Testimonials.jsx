// src/components/features/landing/Testimonials.jsx
import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import Card from '../../common/Card';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Member since 2023",
    review: "The app tracking is a game changer. I know exactly what to eat and lift every single day. Down 15kg in 6 months.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Mike T.",
    role: "Pro Athlete",
    review: "The equipment here is world-class, but the community is what keeps me coming back. Best gym in the city, hands down.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    role: "Yoga Instructor",
    review: "Love the clean aesthetic and the automated check-in. It feels like a futuristic club rather than a sweaty old gym.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
  }
];

const TestimonialCard = ({ name, role, review, image }) => (
  <Card hover className="h-full flex flex-col justify-between relative bg-zinc-900/50">
    {/* Background Decor */}
    <Quote className="absolute top-4 right-4 text-zinc-800/50 rotate-180" size={60} />
    
    <div>
      {/* Stars */}
      <div className="flex gap-1 text-red-500 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      
      {/* Review Text */}
      <p className="text-zinc-300 italic leading-relaxed mb-8 relative z-10">
        "{review}"
      </p>
    </div>

    {/* User Info */}
    <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover ring-2 ring-red-600/50 p-0.5" 
        />
        <div className="absolute -bottom-1 -right-1 bg-black rounded-full text-green-500">
          <CheckCircle2 size={14} fill="black" />
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold text-sm uppercase tracking-wide">{name}</h4>
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{role}</p>
      </div>
    </div>
  </Card>
);

const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2">Success Stories</h2>
          <h3 className="text-4xl font-black text-white italic uppercase">
            Real <span className="text-white">Results</span>
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <TestimonialCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;