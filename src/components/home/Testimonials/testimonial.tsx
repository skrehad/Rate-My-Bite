"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "Regular Customer",
    message:
      "The food was fresh, delicious, and delivered on time. I'm definitely ordering again!",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    name: "Sadia Akter",
    role: "Food Blogger",
    message:
      "Such amazing flavors! The service and packaging were top-notch. Highly recommend!",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 4,
  },
  {
    name: "Tanvir Hossain",
    role: "Event Organizer",
    message:
      "We ordered for a corporate event and everyone loved the food. Super impressed!",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
  },
  {
    name: "Mithila Khatun",
    role: "Nutritionist",
    message:
      "Healthy and tasty! I’m truly impressed with the freshness and hygiene.",
    image: "https://i.pravatar.cc/150?img=52",
    rating: 4,
  },
  {
    name: "Arif Chowdhury",
    role: "Teacher",
    message:
      "Affordable and yummy meals. Perfect for busy weekdays. Highly satisfied!",
    image: "https://i.pravatar.cc/150?img=60",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Fitness Coach",
    message:
      "Great quality ingredients and fast service. Would definitely recommend!",
    image: "https://i.pravatar.cc/150?img=39",
    rating: 4,
  },
  {
    name: "Hasib Khan",
    role: "Entrepreneur",
    message:
      "Perfectly balanced meals. Definitely ordering again for office lunches!",
    image: "https://i.pravatar.cc/150?img=44",
    rating: 5,
  },
  {
    name: "Lamia Hossain",
    role: "Designer",
    message: "Loved the packaging and taste. Aesthetic and tasty!",
    image: "https://i.pravatar.cc/150?img=50",
    rating: 5,
  },
  {
    name: "Shahidul Islam",
    role: "Engineer",
    message: "Tasty and healthy combo meals. My kids loved it!",
    image: "https://i.pravatar.cc/150?img=33",
    rating: 4,
  },
  {
    name: "Farhana Akter",
    role: "Photographer",
    message: "The meals were picture perfect and delicious!",
    image: "https://i.pravatar.cc/150?img=66",
    rating: 5,
  },
  {
    name: "Nazmul Hasan",
    role: "Chef",
    message: "As a chef, I must say—great balance of flavors!",
    image: "https://i.pravatar.cc/150?img=24",
    rating: 4,
  },
  {
    name: "Shanta Akter",
    role: "Student",
    message: "Easy to order and super yummy. Great for hostel life!",
    image: "https://i.pravatar.cc/150?img=14",
    rating: 5,
  },
];

const Testimonial = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(
        (prevIndex) => (prevIndex + 1) % testimonials.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" py-12 bg-white">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-primary mb-12">
        Customer Testimonials
      </h2>

      <div className="bg-gray-50 rounded-xl  ">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials
            .slice(currentTestimonialIndex, currentTestimonialIndex + 3)
            .map((item) => (
              <div
                key={item.name}
                className="flex hover:shadow-lg flex-col items-center text-center bg-white p-8 rounded-lg shadow-md"
              >
                <div className="relative w-14 h-14 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-lg">{item.name}</h4>
                <p className="text-md text-gray-500">{item.role}</p>
                <p className="text-gray-700 text-md my-4 leading-relaxed italic mb-3">
                  “{item.message}”
                </p>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < item.rating ? "text-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
