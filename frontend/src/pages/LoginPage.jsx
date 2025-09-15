import { useState } from "react" 
import { GlobeIcon } from "lucide-react" 
import { Link } from "react-router" 
import useLogin from "../hooks/useLogin" 

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  }) 

  const { isPending, error, loginMutation } = useLogin() 

  const handleLogin = (e) => {
    e.preventDefault() 
    loginMutation(loginData) 
  } 

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-6"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
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
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Welcome Back
                  </h2>
                  <p className="text-xs sm:text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input input-bordered w-full text-sm sm:text-base"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full text-sm sm:text-base"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full text-sm sm:text-base"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-xs sm:text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
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

export default LoginPage 