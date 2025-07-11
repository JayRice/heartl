import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import AuthForm from '../components/Auth/AuthForm';
import { useAuth } from '../hooks/useAuth';
import TopNav from '../components/Layout/TopNav';

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
        <div ref={scrollContainerRef} className={"h-screen bg-primary "}>
          <QuoteCard title={"Amy and Eliot"} description={"I was feeling lonely back in my hometown because most of my friends had started romantic relationships while I was abroad. We both decided to download Tinder and see what happened. \n" +
              "\n" +
              "Without the app we may have never met and embarked on this wild, wonderful journey. Thank you for bringing us and so many other couples together around the world. I will forever be grateful."}/>
        </div>
      </div>
  );
};

export default Welcome;