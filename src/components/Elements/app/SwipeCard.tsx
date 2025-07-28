import React, {useEffect, useState, useRef} from 'react';
import { MapPin, Shield } from 'lucide-react';
import { User } from '../../../types';
import { useSwipe } from '../../../hooks/useSwipe';
import checkSwipe from "../../../logic/checkSwipe.ts";

import store from "../../../../store/store.ts"

import NopeImage from "../../../images/NopeImage.png"
import LikeImage from "../../../images/LikeImage.png"
import SuperLikeImage from "../../../images/SuperLikeImage.png"


interface Props {
  user: User;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  index: number;
  style?: React.CSSProperties;
}


const SwipeCard: React.FC<Props> = ({ user, onSwipe , style, index }) => {

  const [imageIndex, setImageIndex] = useState<number>(0);

  const swipeCardRef = useRef<HTMLDivElement>(null);

  const thresholdRatio = store((state) => state.thresholdRatio);
  const setThresholdRatio = store((state) => state.setThresholdRatio);


  const swipeBias = checkSwipe();


  useSwipe(swipeCardRef, onSwipe)


    useEffect(() => {


    }, [imageIndex, ]);


  return (
      <div className={`select-none absolute overflow-hidden cursor-pointer active:cursor-grabbing bg-black lg:rounded-2xl shadow-2xl w-full h-full flex justify-center z-[${3-index}] `}>

          <div
              ref={swipeCardRef}
              style={{ ...style }}

              className={`w-full flex justify-center z-[${3-index}] bg-black`}>

              <div className={"absolute top-0 mt-2 w-full  z-10 bg-primary bg-opacity-75 rounded-lg flex flex-row p-[2px] gap-1 px-2 items-center"}>
                  {user.photos.map((_, index) => (
                      <div  onMouseDown={(e) => {
                          console.log("Index: ", index)

                          e.stopPropagation()
                          setImageIndex(index)


                      }} onPointerDown={(e) => e.stopPropagation()}

                            className={ "p-[2px] hover:bg-white w-full h-full flex items-center justify-center rounded-lg"}>
                          <div

                               className={`cursor-pointer  w-full h-1  flex items-center  rounded-lg z-[${3-index}] ` +
                                   (imageIndex == index ? "bg-white":"bg-gray-500 " )}></div>
                      </div>

                  ))}
              </div>




              {/* Content */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 text-white z-10  `}>
                  <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                          <h2 className="text-2xl font-bold">{user.name}</h2>
                          <span className="text-xl">{user.age}</span>
                          {user.verified && (
                              <div title={"Photo Verified"}>
                                  <Shield  className="h-5 w-5 text-blue-400 fill-current" />

                              </div>
                          )}
                      </div>
                  </div>

                  {user.distance && (
                      <div className="flex items-center space-x-1 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{user.distance} miles away</span>
                      </div>
                  )}

                  {/*{user.bio && (*/}
                  {/*    <p className="text-sm mb-3 line-clamp-2">{user.bio}</p>*/}
                  {/*)}*/}

                  {/*{user.interests && (*/}
                  {/*    <div className="flex flex-wrap gap-2">*/}
                  {/*      {user.interests.map((interest) => (*/}
                  {/*          <span*/}
                  {/*              key={interest}*/}
                  {/*              className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"*/}
                  {/*          >*/}
                  {/*        {interest}*/}
                  {/*      </span>*/}
                  {/*      ))}*/}
                  {/*    </div>*/}
                  {/*)}*/}

              </div>

              {/* Image */ }
              <div className={"relative  max-w-lg w-full h-full "}>
                  <div
                      className=" w-full h-full bg-white rounded-2xl"
                  >
                      <div className="relative w-full h-full ">
                          <img
                              src={user.photos[imageIndex]}
                              alt={user.name}
                              className="w-full h-full object-cover inward-shadow"
                              draggable={false}
                          />


                          { index == 0 && (<>  {
                              swipeBias == "dislike" && (
                                  <div className={"absolute  z-20 top-0 right-0  w-80 h-auto"}>
                                      <img src={NopeImage} className={`select-none `}
                                           style={{ pointerEvents: "none", transform: "rotate(25deg)", opacity: Math.floor(Math.abs(thresholdRatio[0] * 100) ) / 100}}/>
                                  </div>
                              )
                          }

                          {
                              swipeBias == "like" &&
                              (
                                  <div className={"absolute  z-20 top-0 right-0  w-80 h-auto left-0"}>
                                  <img src={LikeImage} className={`select-none `}   style={{ pointerEvents: "none", transform: "rotate(-25deg)", opacity: Math.floor(Math.abs(thresholdRatio[0] * 100) ) / 100 }}/>
                                </div>
                              )
                          }
                          {
                              swipeBias == "superlike"   &&
                              (
                                  <div className={"absolute  z-20 bottom-0 left-24  w-80 h-auto"}>
                                      <img src={SuperLikeImage} className={`select-none `}   style={{ pointerEvents: "none", opacity: Math.floor(Math.abs(thresholdRatio[1] * 100) ) / 100}}/>
                                  </div>
                              )
                          }
                      </>)}

                          {/* Gradient overlay */}


                      </div>
                  </div>
              </div>
          </div>
      </div>

  );
};

export default SwipeCard;