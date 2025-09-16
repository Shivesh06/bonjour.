import { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  GlobeIcon,
  ShuffleIcon,
  CameraIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: [],
    newLanguage: "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:6969/api/countries");
        const data = await response.json();
        setCountries(data.countries);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formState.learningLanguage)
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const handleAddLanguage = () => {
    if (
      formState.newLanguage &&
      formState.learningLanguage.length < 3 &&
      !formState.learningLanguage.includes(formState.newLanguage)
    ) {
      setFormState((prev) => ({
        ...prev,
        learningLanguage: [...prev.learningLanguage, formState.newLanguage],
        newLanguage: "",
      }));
      if (formState.learningLanguage.length + 1 === 3) {
        toast.success("You have selected 3 languages!");
      }
    }
  };

  const handleRemoveLanguage = (lang) => {
    setFormState({
      ...formState,
      learningLanguage: formState.learningLanguage.filter((l) => l !== lang),
    });
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Languages</span>
                </label>
                <div className="flex flex-col gap-2">
                  {formState.learningLanguage.map((lang, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="select select-bordered w-full flex-grow flex items-center justify-center">
                        <span className="capitalize text-left w-full">
                          {lang}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-error btn-square"
                        onClick={() => handleRemoveLanguage(lang)}
                      >
                        <XIcon className="size-4" />
                      </button>
                    </div>
                  ))}

                  {formState.learningLanguage.length < 3 && (
                    <div className="flex gap-2 mb-2">
                      <select
                        value={formState.newLanguage}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            newLanguage: e.target.value,
                          })
                        }
                        className="select select-bordered flex-grow"
                      >
                        <option value="" disabled>
                          Select a language
                        </option>
                        {LANGUAGES.filter(
                          (lang) =>
                            !formState.learningLanguage.includes(
                              lang.toLowerCase()
                            )
                        ).map((lang) => (
                          <option key={lang} value={lang.toLowerCase()}>
                            {lang}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn btn-accent"
                        onClick={handleAddLanguage}
                        disabled={!formState.newLanguage}
                      >
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                name="location"
                value={formState.location}
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
                className="select select-bordered w-full"
              >
                <option value="">Select your country</option>
                {countries.length === 0 ? (
                  <option value="">Loading countries...</option>
                ) : (
                  countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <GlobeIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
