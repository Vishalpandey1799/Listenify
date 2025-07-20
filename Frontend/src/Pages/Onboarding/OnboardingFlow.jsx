import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  MessageCircle,
  Terminal,
  Brain,
  Target,
  Zap,
  Earth,
  User,
  Smile,
} from "lucide-react";
import { useAuthStore } from "../../Apicalls/Auth.api.js";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { profileUpdate } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    learningType: "",
    nativeLanguages: [],
    programmingLanguages: [],
    goal: [],
  });

  const steps = [
    { id: "name", title: "Your Name", icon: User },
    { id: "type", title: "Learning Type", icon: Brain },
    { id: "selection", title: "Language Selection", icon: Target },
    { id: "skills", title: "Skill Assessment", icon: Zap },
    { id: "goals", title: "Learning Goals", icon: MessageCircle },
  ];

  const nativeLanguages = [
    { name: "English", flag: "🇺🇸" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Korean", flag: "🇰🇷" },
    { name: "Chinese", flag: "🇨🇳" },
    { name: "Portuguese", flag: "🇧🇷" },
    { name: "Italian", flag: "🇮🇹" },
    { name: "Russian", flag: "🇷🇺" },
    { name: "Hindi", flag: "🇮🇳" },
    { name: "Arabic", flag: "🇸🇦" },
  ];

  const programmingLanguages = [
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "Go",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    },
    {
      name: "Rust",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    },
    {
      name: "Swift",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    },
    {
      name: "Flutter",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    },
    {
      name: "Vue.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
  ];

  const skillLevels = [
    {
      level: "Beginner",
      description: "Just starting out",
      color: "bg-emerald-500",
    },
    {
      level: "Intermediate",
      description: "Some experience",
      color: "bg-amber-500",
    },
    { level: "Advanced", description: "Quite skilled", color: "bg-orange-500" },
    { level: "Expert", description: "Very experienced", color: "bg-red-500" },
  ];

  const learningGoals = [
    {
      id: "Casual Conversation",
      title: "Casual Conversation",
      desc: "Chat and practice with peers",
    },
    {
      id: "Professional Development",
      title: "Professional Development",
      desc: "Advance your career skills",
    },
    {
      id: "Teaching Others",
      title: "Teaching Others",
      desc: "Share knowledge and mentor",
    },
    {
      id: "Collaborative Projects",
      title: "Collaborative Projects",
      desc: "Work on real projects together",
    },
    {
      id: "Cultural Exchange",
      title: "Cultural Exchange",
      desc: "Learn about different cultures",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleLanguage = (language, type) => {
    setUserData((prev) => {
      const languageArray = prev[type];
      const isSelected = languageArray.some(
        (lang) => lang.language === language.name
      );

      if (isSelected) {
        return {
          ...prev,
          [type]: languageArray.filter(
            (lang) => lang.language !== language.name
          ),
        };
      } else {
        return {
          ...prev,
          [type]: [
            ...languageArray,
            {
              language: language.name,
              level: "",
            },
          ],
        };
      }
    });
  };

  const setLanguageLevel = (language, level, type) => {
    setUserData((prev) => ({
      ...prev,
      [type]: prev[type].map((lang) =>
        lang.language === language ? { ...lang, level } : lang
      ),
    }));
  };

  const toggleGoal = (goal) => {
    setUserData((prev) => ({
      ...prev,
      goal: prev.goal.includes(goal)
        ? prev.goal.filter((g) => g !== goal)
        : [...prev.goal, goal],
    }));
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        name: userData.name.trim(),
        learningType: userData.learningType,
        nativeLanguages: userData.nativeLanguages,
        codingLanguages: userData.programmingLanguages,
        goal: userData.goal,
      };

      console.log(apiData);

      let res = await profileUpdate(apiData);

      if (res.success) {
        toast.success("Onboarding Completed!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderNameStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smile className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          What should we call you?
        </h2>
        <p className="text-gray-600">This is how you'll appear to others</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Enter your name or nickname"
            className="w-full px-6 py-4 text-black border-2 border-gray-200 rounded-xl text-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
          {userData.name && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Check className="w-6 h-6 text-green-500" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  const renderLearningType = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          What interests you?
        </h2>
        <p className="text-gray-600">Choose your learning adventure</p>
      </div>

      <div className="grid gap-6">
        <div
          onClick={() => setUserData({ ...userData, learningType: "native" })}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
            userData.learningType === "native"
              ? "border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 shadow-lg"
              : "border-gray-200 hover:border-pink-300 bg-white"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                Native Languages
              </h3>
              <p className="text-gray-600">
                Learn real languages, connect with cultures
              </p>
            </div>
            <div className="text-2xl">🌍</div>
          </div>
        </div>

        <div
          onClick={() => setUserData({ ...userData, learningType: "coding" })}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
            userData.learningType === "coding"
              ? "border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg"
              : "border-gray-200 hover:border-blue-300 bg-white"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                Programming Languages
              </h3>
              <p className="text-gray-600">
                Master coding skills, build the future
              </p>
            </div>
            <div className="text-2xl">💻</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSelection = () => {
    const showNative = userData.learningType === "native";
    const showCoding = userData.learningType === "coding";

    return (
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Pick Your Languages
          </h2>
          <p className="text-gray-600">
            Select what you want to learn or teach
          </p>
        </div>

        {showNative && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Earth className="w-5 h-5" />
              <span>Native Languages</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {nativeLanguages.map((lang) => {
                const isSelected = userData.nativeLanguages.some(
                  (l) => l.language === lang.name
                );
                return (
                  <button
                    key={lang.name}
                    onClick={() => toggleLanguage(lang, "nativeLanguages")}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-pink-500 bg-pink-50 shadow-md transform scale-[1.02]"
                        : "border-gray-200 hover:border-pink-300 bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {showCoding && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Terminal className="w-5 h-5" />
              <span>Programming Languages</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {programmingLanguages.map((lang) => {
                const isSelected = userData.programmingLanguages.some(
                  (l) => l.language === lang.name
                );
                return (
                  <button
                    key={lang.name}
                    onClick={() => toggleLanguage(lang, "programmingLanguages")}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]"
                        : "border-gray-200 hover:border-blue-300 bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={lang.icon}
                        alt={lang.name}
                        className="w-6 h-6"
                      />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSkills = () => {
    const languages =
      userData.learningType === "native"
        ? userData.nativeLanguages
        : userData.programmingLanguages;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Rate Your Skills</h2>
          <p className="text-gray-600">
            Help us match you with the right partners
          </p>
        </div>

        <div className="space-y-6">
          {languages.map(({ language }) => (
            <div
              key={language}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {language}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {skillLevels.map((skill) => (
                  <button
                    key={skill.level}
                    onClick={() =>
                      setLanguageLevel(
                        language,
                        skill.level,
                        userData.learningType === "native"
                          ? "nativeLanguages"
                          : "programmingLanguages"
                      )
                    }
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      languages.find((l) => l.language === language)?.level ===
                      skill.level
                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                        : "border-gray-200 hover:border-indigo-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${skill.color}`}
                      ></div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          {skill.level}
                        </div>
                        <div className="text-sm text-gray-500">
                          {skill.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">What's Your Goal?</h2>
        <p className="text-gray-600">Select what you want to achieve</p>
      </div>

      <div className="grid gap-4">
        {learningGoals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              userData.goal.includes(goal.id)
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-gray-200 hover:border-green-300 bg-white hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                <p className="text-sm text-gray-600">{goal.desc}</p>
              </div>
              {userData.goal.includes(goal.id) && (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          You're All Set! 🎉
        </h3>
        <p className="text-gray-600">
          Ready to connect with amazing people and start your learning journey?
        </p>
      </div>
    </div>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return userData.name.trim().length > 0;
      case 1:
        return userData.learningType !== "";
      case 2:
        return (
          (userData.learningType === "native" &&
            userData.nativeLanguages.length > 0) ||
          (userData.learningType === "coding" &&
            userData.programmingLanguages.length > 0)
        );
      case 3:
        const languages =
          userData.learningType === "native"
            ? userData.nativeLanguages
            : userData.programmingLanguages;
        return languages.every((lang) => lang.level);
      case 4:
        return userData.goal.length > 0;
      default:
        return true;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderNameStep();
      case 1:
        return renderLearningType();
      case 2:
        return renderSelection();
      case 3:
        return renderSkills();
      case 4:
        return renderGoals();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-blue-500">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            <div className="flex items-center space-x-4 min-w-max">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div key={step.id} className="flex items-center space-x-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-500 text-white shadow-lg"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-indigo-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-0.5 mx-2 ${
                          isCompleted ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={(e) => {
              if (currentStep < steps.length - 1) {
                handleNext();
              } else {
                handleOnboardingSubmit(e);
              }
            }}
            disabled={!canProceed()}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
              canProceed()
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg transform hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>
              {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
