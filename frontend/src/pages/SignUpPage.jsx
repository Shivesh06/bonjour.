import { useState } from "react" 
import { GlobeIcon } from "lucide-react" 
import { Link } from "react-router" 

import useSignUp from "../hooks/useSignUp" 

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  }) 

  const { isPending, error, signupMutation } = useSignUp() 

  const handleSignup = (e) => {
    e.preventDefault() 
    signupMutation(signupData) 
  } 

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-6">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/*LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <GlobeIcon className="h-8 w-8 sm:h-9 sm:w-9 text-primary" />
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Bonjour
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground -mt-1 font-semibold">
                Learn. Teach. Connect.
              </p>
            </div>
          </div>
          {error && (
            <div className="alert alert-error mb-4 text-sm sm:text-base">
              <span>
                {error.response?.data?.message ||
                  error.message ||
                  "Something went wrong"}
              </span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Create an Account
                  </h2>
                  <p className="text-xs sm:text-sm opacity-70">
                    Join Bonjour and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="input input-bordered w-full text-sm sm:text-base"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input input-bordered w-full text-sm sm:text-base"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Create a strong password"
                      className="input input-bordered w-full text-sm sm:text-base"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs sm:text-sm leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full text-sm sm:text-base"
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-xs sm:text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/*RIGHT SIDE */}
        <div className="w-full lg:w-1/2 bg-primary/10 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-md w-full">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-lg sm:text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="text-xs sm:text-sm opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
} 

export default SignUpPage 
