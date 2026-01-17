import React, { useState, useEffect } from 'react';
import { Users, Map, Star, Target, Compass, Smartphone } from 'lucide-react';

const AsambePamojaLanding = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentFact, setCurrentFact] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [planeFlying, setPlaneFlying] = useState(false);

  const destinations = [
    {
      name: "Machu Picchu, Peru",
      fact: "This 15th-century Incan citadel sits at 7,970 feet and was hidden from the Spanish during their conquest.",
      mustSee: "Watch sunrise from the Sun Gate for a breathtaking view of the ancient ruins.",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80"
    },
    {
      name: "Santorini, Greece",
      fact: "The island's famous blue-domed churches and white buildings are built on volcanic cliffs.",
      mustSee: "Experience the sunset in Oia - consistently ranked among the world's most beautiful.",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80"
    },
    {
      name: "Kyoto, Japan",
      fact: "Home to over 2,000 temples and shrines, including 17 UNESCO World Heritage Sites.",
      mustSee: "Visit Fushimi Inari Shrine with its thousands of vibrant orange torii gates.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
    },
    {
      name: "Serengeti, Tanzania",
      fact: "Hosts the world's largest terrestrial mammal migration with over 1.5 million wildebeest.",
      mustSee: "Witness the Great Migration between July and October for an unforgettable safari.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80"
    },
    {
      name: "Banff, Canada",
      fact: "Located in the Canadian Rockies, it's home to turquoise glacial lakes and abundant wildlife.",
      mustSee: "Visit Lake Louise and Moraine Lake for stunning mountain reflections.",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80"
    },
    {
      name: "Iceland",
      fact: "The land of fire and ice has more than 130 volcanic mountains and countless waterfalls.",
      mustSee: "Chase the Northern Lights from September to April or relax in the Blue Lagoon.",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80"
    },
    {
      name: "Bali, Indonesia",
      fact: "Known as the 'Island of the Gods', it has over 20,000 temples and lush rice terraces.",
      mustSee: "Visit Tanah Lot temple at sunset and explore the Tegalalang Rice Terraces.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
    },
    {
      name: "Patagonia, Argentina",
      fact: "This vast region features glaciers, mountains, and unique wildlife found nowhere else on Earth.",
      mustSee: "Trek to see the Perito Moreno Glacier, one of the few advancing glaciers in the world.",
      image: "https://images.unsplash.com/photo-1552732371-7f0389e6d4b5?w=800&q=80"
    },
    {
      name: "Maldives",
      fact: "This island nation has 1,192 coral islands and is the flattest country on Earth.",
      mustSee: "Experience bioluminescent beaches at Vaadhoo Island where the water glows at night.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80"
    }
  ];

  useEffect(() => {
    setPlaneFlying(true);
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const throwDart = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowFact(false);
    
    setTimeout(() => {
      const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
      setCurrentFact(randomDestination);
      setIsSpinning(false);
      setShowFact(true);
    }, 2000);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
        <div 
          className={`absolute text-8xl transition-all duration-3000 ${planeFlying ? 'left-[80%] top-[10%]' : 'left-[-10%] top-[90%]'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          ✈️
        </div>
        <div className="text-center animate-fade-in">
          <h1 className="text-7xl font-black text-white tracking-tight">
            AsambePamoja
          </h1>
          <p className="text-2xl text-white mt-4 opacity-90">Plan Adventures Together</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-8 flex justify-between items-center">
          <div className="text-3xl font-black">
            ✈️ AsambePamoja
          </div>
          <button className="bg-white bg-opacity-20 border-2 border-white border-opacity-30 px-6 py-3 rounded-full font-semibold hover:bg-opacity-30 transition-all">
            Sign In
          </button>
        </nav>

        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            Plan Adventures<br />Together
          </h1>
          <p className="text-xl sm:text-2xl mb-10 opacity-95 max-w-3xl mx-auto">
            Connect with friends, create unforgettable itineraries, and explore the world smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="bg-white text-purple-600 px-12 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl">
              Get Started Free
            </button>
            <button className="bg-white bg-opacity-15 border-2 border-white border-opacity-30 px-12 py-4 rounded-full text-lg font-bold hover:bg-opacity-25 transition-all">
              Watch Demo
            </button>
          </div>
        </section>

        {/* Interactive Globe Section */}
        <section className="py-16 mb-16">
          <div className="bg-white bg-opacity-10 rounded-3xl p-8 sm:p-12 border border-white border-opacity-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Discover Your Next Destination</h2>
            <p className="text-center text-lg mb-8 opacity-90">
              Click the globe to discover where you should go next!
            </p>
            
            <div className="flex flex-col items-center">
              <div className="relative w-80 h-80 mb-8 cursor-pointer" onClick={throwDart}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Rotating_globe.gif"
                  className={`w-full h-full object-contain ${isSpinning ? 'opacity-50' : 'hover:scale-105 transition-transform'}`}
                />
              </div>

              {isSpinning && (
                <p className="text-2xl font-bold mb-8 animate-pulse">
                  Discovering your destination...
                </p>
              )}

              {showFact && currentFact && (
                <div className="bg-white bg-opacity-15 rounded-2xl p-8 max-w-4xl w-full border border-white border-opacity-30 space-y-6">
                  <h3 className="text-3xl sm:text-4xl font-bold text-yellow-300">
                    📍 {currentFact.name}
                  </h3>
                  
                  <img 
                    src={currentFact.image} 
                    alt={currentFact.name}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm uppercase tracking-wide mb-2 text-yellow-300 font-bold">
                        Interesting Fact
                      </p>
                      <p className="text-lg leading-relaxed">{currentFact.fact}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wide mb-2 text-yellow-300 font-bold">
                        Must See
                      </p>
                      <p className="text-lg leading-relaxed">{currentFact.mustSee}</p>
                    </div>
                  </div>

                  <button
                    onClick={throwDart}
                    className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full text-lg font-bold hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl w-full"
                  >
                    ✈️ Discover Another Destination
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 mb-16">
          <div className="bg-white bg-opacity-10 rounded-3xl p-8 sm:p-12 md:p-16 border border-white border-opacity-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6">Everything You Need</h2>
            <p className="text-center text-lg sm:text-xl mb-12 sm:mb-16 opacity-90">
              Powerful features to make trip planning effortless
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Users className="w-12 h-12" />,
                  title: "Collaborative Planning",
                  description: "Add friends, share ideas, and plan trips together in real-time. Everyone stays in sync."
                },
                {
                  icon: <Map className="w-12 h-12" />,
                  title: "Smart Itineraries",
                  description: "Create detailed day-by-day plans with activities, dining, and attractions all organized."
                },
                {
                  icon: <Star className="w-12 h-12" />,
                  title: "Reviews & Ratings",
                  description: "Rate trips and travel companions. Build trust within the community."
                },
                {
                  icon: <Target className="w-12 h-12" />,
                  title: "AI Suggestions",
                  description: "Get personalized recommendations for destinations, activities, and experiences."
                },
                {
                  icon: <Compass className="w-12 h-12" />,
                  title: "Discover Trips",
                  description: "Browse curated trips from other travelers and join group adventures."
                },
                {
                  icon: <Smartphone className="w-12 h-12" />,
                  title: "Mobile Ready",
                  description: "Access your plans anywhere. Offline mode keeps you connected on the go."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 p-6 sm:p-8 rounded-2xl hover:bg-opacity-20 hover:-translate-y-2 transition-all cursor-pointer border border-white border-opacity-10"
                >
                  <div className="mb-5 text-white opacity-90">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="opacity-90 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Ready to Start Your Next Adventure?</h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90">
            Join thousands of travelers planning smarter trips
          </p>
          <button className="bg-white text-purple-600 px-12 py-5 rounded-full text-lg sm:text-xl font-bold hover:scale-105 transition-transform shadow-2xl">
            Create Free Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default AsambePamojaLanding;