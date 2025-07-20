import React, { useState } from 'react';
import { Heart, Phone, X, ChevronLeft, ChevronDown}from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import {countryCodeList, countryCode} from "../../data/countryData.ts"

const RecoverMode = () => {
    const [email, setEmail] = useState('');
    return (
        <div className={"space-y-8 flex flex-col items-center justify-center"}>

            <h1 className={"text-4xl bold"}>Recover Account</h1>
            <h2 className={"text-md"}>We'll email you a link the will allow you to login!</h2>

            <div className={"w-full space-y-2"}>
                <label className={"text-xl text-start"}>Email Address</label>
                <br></br>
                <input type={"email"} onChange={(e) => setEmail(e.target.value)} name={"email"} className={"text-white bg-gray-950 border-2 border-gray-700 rounded-sm" +
                    " w-full h-12 p-2"} placeholder={"example@example.com"} ></input>
            </div>


            <button   className={"mb-12 w-full rounded-lg p-4 text-white bg-gray-950 hover:bg-gray-800 transition-colors "
                + (email == "" ? "btn-disabled":"")}>
                Send Email
            </button>




        </div>
    )

}
const SignInPhoneMode = () => {
    const [countryCode, setCountryCode] = useState<countryCode>(countryCodeList[0]);
    const [showCountryCodes, setShowCountryCodes] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <div className={"space-y-8 flex flex-col "}>
            <h1 className={"text-4xl bold"}>Can we get your number?</h1>

            <div className={"flex  flex-row gap-2 h-16 flex-none "}>
                <div className={"flex flex-col basis-1/4 w-[25%] h-full flex-none "}>
                    <label>Country</label>
                    <div  onClick={() => setShowCountryCodes((prev) => !prev)} 
                        className={"p-2 h-full  bg-gray-950 hover:bg-gray-800 transition-colors border-sm cursor-pointer border-2 border-gray-700"}>
                            <div
                                 className={" h-10 box-border flex flex-row gap-2 justify-center text-sm items-center"}>
                                <p className={"overflow-hidden"}>{countryCode.iso}</p>
                                <p>{countryCode.code}</p>
                                <ChevronDown className={"w-4 h-4"}></ChevronDown>
                            </div>

                    </div>


                    {
                        showCountryCodes &&
                        <div className={"absolute w-64 text-sm h-64 mt-24 bg-gray-800 flex flex-col overflow-y-auto z-50"}>
                            {countryCodeList.map((cc : countryCode) => (
                                <div onClick={() => {
                                    setCountryCode(cc)
                                    setShowCountryCodes(false)
                                }}
                                    className={"w-full bg-gray-800 border-t-2 border-b-2 border-gray-700 h-16 p-2 flex flex-row items-center hover:bg-gray-950 cursor-pointer transition-colors"}>
                                    <p className={"w-full text-start"}>{cc.name}</p>
                                    <p className={"w-full text-end"}>{cc.code}</p>
                                </div>
                                ))
                            }
                        </div>
                    }

                </div>
                <div className={"flex flex-col basis-3/4 h-full"}>
                    <label>Phone Number</label>
                    <input onChange={(e) => setPhoneNumber(e.target.value)}
                        className={"flex h-full flex-row gap-2 items-center justify-center p-4 bg-gray-950 hover:bg-gray-800 transition-colors border-sm border-2 border-gray-700"} />

                </div>
            </div>

            <div className={"w-full whitespace-normal text-md"}>
                <h2>We’ll text you a code to verify you’re really you.</h2>
                <h2>Message and data rates may apply.</h2>


            </div>
            <button   className={"mb-12 w-full  rounded-lg p-4 text-white bg-gray-950 hover:bg-gray-800 transition-colors  "
                + (phoneNumber == "" ? "btn-disabled":"")}>
                Send Code
            </button>

        </div>
    )
}
const SignInMode = ({mode, onToggleMode, setAuthMode} : {mode: string, onToggleMode: () => void,
    setAuthMode: React.Dispatch<React.SetStateAction<"login" | "signup" | "recover" | "phone">>}) => {
  return (
      <div className={"space-y-8 flex flex-col items-center justify-center"}>


        <h1 className={"text-4xl bold"}>{mode == "login" ? "Get Started":"Create Account"}</h1>
        <h2 className={"text-md"}>By tapping login or continue, you agree to our Terms. </h2>


        <div className={"mt-4 space-y-4"}>

          <div  onClick={() => {
            // Google Auth

          }} className={"w-screen max-w-sm h-12 rounded-3xl bg-blue-500 hover:bg-blue-400 transition-colors flex items-center cursor-pointer"}>
            <div className={"rounded-full  bg-white  p-2 ml-1"}>
              <img  src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 text-white" />

            </div>
            <p className={"text-center w-full mr-4"}>
              Continue with Google

            </p>


          </div>

          <div  onClick={() => {
            // Google Auth

          }} className={"w-screen max-w-sm h-12 rounded-3xl border-2 border-gray-700 bg-gray-900 hover:bg-gray-800 transition-colors flex items-center cursor-pointer"}>
            <div className={"rounded-full    p-2"}>
              <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 text-blue-600" />

            </div>
            <p className={"text-center w-full mr-4"}>
              Login with Facebook

            </p>


          </div>

          <div  onClick={() => {
            // Phone Auth
            setAuthMode("phone")

          }} className={"w-screen max-w-sm h-12 rounded-3xl border-2 border-gray-700 bg-gray-900 hover:bg-gray-800 transition-colors flex items-center cursor-pointer"}>
            <div className={"rounded-full    p-2"}>
              <Phone className={"w-6 h-6 text-white"}/>

            </div>
            <p className={"text-center w-full mr-4"}>
              Login with Phone Number

            </p>


          </div>


        </div>




        <p className={"text-blue-500 underline hover:text-blue-400 cursor-pointer select-none"} onClick={() => {
          setAuthMode("recover")
        }}> Trouble logging In? </p>


        <div className="mt-6 text-center">
          <button
              onClick={onToggleMode}
              className="text-white/80 hover:text-white transition-colors"
          >
            {mode === 'login'
                ? "Don't have an account? Create one"
                : "Already have an account? Log in"
            }
          </button>
        </div>
      </div>
  )
}


interface AuthFormProps {
  mode: 'login' | 'signup';
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onClose }) => {

  const [authMode, setAuthMode] = useState<"login" | "signup" | "recover" | "phone">(mode);




  return (
    <div className="fixed w-full  mx-auto z-50 bg-gray-900 bg-opacity-70 h-full flex justify-center select-none">
      <div className={""}>

        <div className=" w-500px max-w-[500px] bg-gray-900 flex flex-col text-white items-center p-8 mt-[10vh] rounded-lg justify-center ">


            <div className={"flex gap-[20rem]"}>
                <div className={"w-8 h-8"}>
                    {(authMode != "login" && authMode != "signup") &&  <ChevronLeft onClick={() => {
                        setAuthMode("login")
                    }} className={"w-8 h-8 text-white mr-auto cursor-pointer hover:text-gray-400 "}></ChevronLeft>}
                </div>

                <X onClick={() => {
                    onClose()
                }} className={"w-8 h-8 text-white ml-auto cursor-pointer hover:text-gray-400 "}></X>



            </div>



            <div className="w-12 h-12 p-2 mb-8 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-full h-full text-white" />
            </div>




          {
            (authMode === 'login' || authMode === 'signup') &&
              <SignInMode mode={authMode} onToggleMode={()=>setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                          setAuthMode={setAuthMode}></SignInMode>

          }
          {
            (authMode == "phone") && <SignInPhoneMode></SignInPhoneMode>
          }
        {
            (authMode == "recover") && <RecoverMode></RecoverMode>
        }






        </div>


      </div>

    </div>
  );
};

export default AuthForm;