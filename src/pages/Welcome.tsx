import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import AuthForm from '../components/Auth/AuthForm';
import { useAuth } from '../hooks/useAuth';
import TopNav from '../components/Layout/TopNav'
import AutoSlider from "../components/Elements/AutoSlider.tsx"

import QuoteCard from "../components/Elements/QuoteCard.tsx"


const Welcome: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleAuth = async (email: string, password: string) => {
    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/app');
    } catch (error) {
      console.error('Auth error:', error);
    }
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const slider = scrollContainerRef.current;
    if(!slider) return;




  })

  return (
      <div>
        <div className="h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 ">
          <TopNav onAuth={(mode: 'login' | 'signup') => {
            setAuthMode(mode)
            setShowAuth(true)

          }}
          ></TopNav>

          {showAuth && <AuthForm
              mode={authMode}
              onClose={() => setShowAuth(false)}
          />}



          <div className={" flex flex-col items-center justify-center p-4 relative min-h-screen"}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-32 right-16 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full"></div>
              <div className="absolute bottom-32 right-8 w-12 h-12 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10 text-center text-white max-w-md w-full">
              {!showAuth ? (
                  <>
                    <div className="mb-8">
                      <Heart className="h-16 w-16 mx-auto mb-4 fill-current" />
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Swipe Right<sup className="text-lg">®</sup>
                      </h1>
                      <p className="text-xl text-pink-100">
                        Find your perfect match
                      </p>
                    </div>

                    <div className="space-y-4">
                      <button
                          onClick={() => {
                            setAuthMode('signup');
                            setShowAuth(true);
                          }}
                          className="w-full bg-white text-pink-500 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-colors"
                      >
                        Create account
                      </button>


                    </div>


                  </>
              ) : (
                  <>
                    <div className="mb-8">
                      <Heart className="h-12 w-12 mx-auto mb-4 fill-current" />
                      <h2 className="text-2xl font-bold mb-2">
                        {authMode === 'login' ? 'Welcome Back' : 'Join Tinder'}
                      </h2>
                    </div>



                    <button
                        onClick={() => setShowAuth(false)}
                        className="mt-4 text-white/80 hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                  </>
              )}
            </div>
          </div>



        </div>

        <div>

        </div>
        <div className={"w-screen h-screen bg-primary"}>
          <div className={"h-screen w-full  mx-auto "}>
            <AutoSlider>
              <QuoteCard title={"Maya and Josh"} description={
                  "We were both feeling disconnected and unsure about online dating, but Heartl felt different from the start. \n" +
                  "\n" +
                  "One swipe turned into hours of talking. That first match led to coffee, then adventures, and now a shared life. I still can’t believe how natural it all felt. Thank you, Heartl."
              } />
              <QuoteCard title={"Sara and Luca"} description={
                  "I had just moved to a new city and was feeling pretty isolated. A friend convinced me to try Heartl and within days, I met Luca. \n" +
                  "\n" +
                  "It felt like something clicked instantly. If not for this app, I would’ve missed out on the most meaningful connection I’ve ever had."
              } />
              <QuoteCard title={"Nina and Elijah"} description={
                  "We downloaded Heartl just to see what was out there — no expectations. \n" +
                  "\n" +
                  "What we found was something neither of us could’ve planned. Our first date turned into hours, then days, then months. All thanks to one swipe that changed everything."
              } />
              <QuoteCard title={"Jasmine and Carlos"} description={
                  "After a string of disappointing dates, I was ready to give up. But Heartl gave me a second chance at love. \n" +
                  "\n" +
                  "Carlos and I matched instantly, and the rest felt effortless. It’s wild to think we almost never met — Heartl made it possible."
              } />
              <QuoteCard title={"Leah and Ryan"} description={
                  "We both had profiles on Heartl for months before we actually matched. \n" +
                  "\n" +
                  "Turns out timing really is everything. From our first message, we felt like we’d known each other forever. We owe it all to that one connection through Heartl."
              } />
              <QuoteCard title={"Olivia and Theo"} description={
                  "Neither of us were looking for anything serious, but Heartl brought us together at just the right time. \n" +
                  "\n" +
                  "What started as casual messages turned into late-night calls and weekend getaways. We never expected this, but we’re so glad it happened."
              } />
              <QuoteCard title={"Emma and Kai"} description={
                  "Heartl helped me meet someone who saw me for exactly who I am. \n" +
                  "\n" +
                  "Kai and I connected over music and memes, and that turned into something so real. I’ll always be grateful for the app that made our story possible."
              } />
              <QuoteCard title={"Talia and Micah"} description={
                  "We were both new in town and decided to give Heartl a shot. \n" +
                  "\n" +
                  "From our first chat, we just clicked. No awkward pauses, no pressure — just honesty and connection. We’ve been together ever since. Thank you, Heartl."
              } />

            </AutoSlider>
          </div>
        </div>


      </div>
  );
};

export default Welcome;