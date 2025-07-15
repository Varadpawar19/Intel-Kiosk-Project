import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Heart, Shield, Award, Phone, Video, CheckCircle, AlertTriangle, XCircle, ChevronRight, FileText, Smartphone, HelpCircle, Users } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  localName: string;
  flag: string;
}

interface HealthSchemeEligibilityScreenProps {
  selectedLanguage: Language;
  onBack: () => void;
  onContinue: () => void;
  onVoiceGuide: () => void;
}

interface HealthScheme {
  id: string;
  name: string;
  localName: string;
  icon: string;
  description: string;
  maxBenefit: string;
  eligibilityStatus: 'eligible' | 'verification' | 'not-eligible' | 'checking';
  color: string;
}

const translations = {
  hi: {
    title: 'आप मुफ्त इलाज के हकदार हो सकते हैं!',
    subtitle: 'सरकारी स्वास्थ्य योजनाओं की जांच करें',
    stepIndicator: 'चरण 4 का 6',
    backButton: 'वापस जाएं',
    checkEligibility: 'पात्रता जांचें',
    applyNow: 'अभी आवेदन करें',
    learnMore: 'और जानें',
    skipExit: 'छोड़ें और बाहर निकलें',
    needHelp: 'मदद चाहिए?',
    callSupport: 'सहायता कॉल करें',
    videoAssist: 'वीडियो सहायता',
    poweredBy: 'India Stack और AI द्वारा संचालित — आपका डेटा सुरक्षित है',
    schemes: {
      pmjay: {
        name: 'PM-JAY',
        localName: 'आयुष्मान भारत योजना',
        description: 'प्रति वर्ष ₹5 लाख तक का मुफ्त इलाज',
        maxBenefit: '₹5 लाख/वर्ष'
      },
      stateInsurance: {
        name: 'State Health Insurance',
        localName: 'राज्य स्वास्थ्य बीमा',
        description: 'राज्य सरकार की स्वास्थ्य योजना',
        maxBenefit: '₹2 लाख/वर्ष'
      },
      csrProgram: {
        name: 'CSR Health Program',
        localName: 'CSR स्वास्थ्य कार्यक्रम',
        description: 'कॉर्पोरेट सामाजिक दायित्व योजना',
        maxBenefit: '₹1 लाख/वर्ष'
      },
      abha: {
        name: 'ABHA Card',
        localName: 'आयुष्मान भारत हेल्थ अकाउंट',
        description: 'डिजिटल स्वास्थ्य पहचान पत्र',
        maxBenefit: 'डिजिटल रिकॉर्ड'
      }
    },
    status: {
      eligible: 'पात्र हैं',
      verification: 'सत्यापन आवश्यक',
      'not-eligible': 'पात्र नहीं',
      checking: 'जांच रहे हैं'
    },
    eligibilityMessages: {
      eligible: 'बधाई हो! आप इस योजना के लिए पात्र हैं',
      verification: 'कृपया अपने दस्तावेज़ सत्यापित करें',
      'not-eligible': 'वर्तमान में आप इस योजना के लिए पात्र नहीं हैं'
    }
  },
  en: {
    title: 'You may be eligible for free healthcare benefits!',
    subtitle: 'Check government health schemes',
    stepIndicator: 'Step 4 of 6',
    backButton: 'Go Back',
    checkEligibility: 'Check My Eligibility',
    applyNow: 'Apply Now',
    learnMore: 'Learn More',
    skipExit: 'Skip & Exit',
    needHelp: 'Need Help?',
    callSupport: 'Call Support',
    videoAssist: 'Video Assist',
    poweredBy: 'Powered by India Stack and AI — your data is safe',
    schemes: {
      pmjay: {
        name: 'PM-JAY',
        localName: 'Ayushman Bharat Yojana',
        description: 'Free treatment up to ₹5 lakhs per year',
        maxBenefit: '₹5 Lakh/year'
      },
      stateInsurance: {
        name: 'State Health Insurance',
        localName: 'State Health Insurance',
        description: 'State government health scheme',
        maxBenefit: '₹2 Lakh/year'
      },
      csrProgram: {
        name: 'CSR Health Program',
        localName: 'CSR Health Program',
        description: 'Corporate social responsibility scheme',
        maxBenefit: '₹1 Lakh/year'
      },
      abha: {
        name: 'ABHA Card',
        localName: 'Ayushman Bharat Health Account',
        description: 'Digital health identity card',
        maxBenefit: 'Digital Records'
      }
    },
    status: {
      eligible: 'Eligible',
      verification: 'Verification Needed',
      'not-eligible': 'Not Eligible',
      checking: 'Checking'
    },
    eligibilityMessages: {
      eligible: 'Congratulations! You are eligible for this scheme',
      verification: 'Please verify your documents',
      'not-eligible': 'You are currently not eligible for this scheme'
    }
  },
  mr: {
    title: 'तुम्ही मोफत उपचारासाठी पात्र असू शकता!',
    subtitle: 'सरकारी आरोग्य योजना तपासा',
    stepIndicator: 'पायरी 4 चा 6',
    backButton: 'मागे जा',
    checkEligibility: 'पात्रता तपासा',
    applyNow: 'आता अर्ज करा',
    learnMore: 'अधिक जाणा',
    skipExit: 'वगळा आणि बाहेर पडा',
    needHelp: 'मदत हवी?',
    callSupport: 'सहाय्य कॉल करा',
    videoAssist: 'व्हिडिओ सहाय्य',
    poweredBy: 'India Stack आणि AI द्वारे चालवले — तुमचा डेटा सुरक्षित आहे',
    schemes: {
      pmjay: {
        name: 'PM-JAY',
        localName: 'आयुष्मान भारत योजना',
        description: 'दरवर्षी ₹5 लाख पर्यंत मोफत उपचार',
        maxBenefit: '₹5 लाख/वर्ष'
      },
      stateInsurance: {
        name: 'State Health Insurance',
        localName: 'राज्य आरोग्य विमा',
        description: 'राज्य सरकारची आरोग्य योजना',
        maxBenefit: '₹2 लाख/वर्ष'
      },
      csrProgram: {
        name: 'CSR Health Program',
        localName: 'CSR आरोग्य कार्यक्रम',
        description: 'कॉर्पोरेट सामाजिक जबाबदारी योजना',
        maxBenefit: '₹1 लाख/वर्ष'
      },
      abha: {
        name: 'ABHA Card',
        localName: 'आयुष्मान भारत हेल्थ अकाउंट',
        description: 'डिजिटल आरोग्य ओळखपत्र',
        maxBenefit: 'डिजिटल रेकॉर्ड'
      }
    },
    status: {
      eligible: 'पात्र आहे',
      verification: 'सत्यापन आवश्यक',
      'not-eligible': 'पात्र नाही',
      checking: 'तपासत आहे'
    },
    eligibilityMessages: {
      eligible: 'अभिनंदन! तुम्ही या योजनेसाठी पात्र आहात',
      verification: 'कृपया तुमची कागदपत्रे सत्यापित करा',
      'not-eligible': 'तुम्ही सध्या या योजनेसाठी पात्र नाही'
    }
  }
};

export default function HealthSchemeEligibilityScreen({ 
  selectedLanguage, 
  onBack, 
  onContinue, 
  onVoiceGuide 
}: HealthSchemeEligibilityScreenProps) {
  const [schemes, setSchemes] = useState<HealthScheme[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const currentTranslation = translations[selectedLanguage.code as keyof typeof translations] || translations.en;

  // Initialize schemes data
  useEffect(() => {
    const initialSchemes: HealthScheme[] = [
      {
        id: 'pmjay',
        name: currentTranslation.schemes.pmjay.name,
        localName: currentTranslation.schemes.pmjay.localName,
        icon: '🏥',
        description: currentTranslation.schemes.pmjay.description,
        maxBenefit: currentTranslation.schemes.pmjay.maxBenefit,
        eligibilityStatus: 'eligible',
        color: 'green'
      },
      {
        id: 'stateInsurance',
        name: currentTranslation.schemes.stateInsurance.name,
        localName: currentTranslation.schemes.stateInsurance.localName,
        icon: '🛡️',
        description: currentTranslation.schemes.stateInsurance.description,
        maxBenefit: currentTranslation.schemes.stateInsurance.maxBenefit,
        eligibilityStatus: 'verification',
        color: 'yellow'
      },
      {
        id: 'csrProgram',
        name: currentTranslation.schemes.csrProgram.name,
        localName: currentTranslation.schemes.csrProgram.localName,
        icon: '🤝',
        description: currentTranslation.schemes.csrProgram.description,
        maxBenefit: currentTranslation.schemes.csrProgram.maxBenefit,
        eligibilityStatus: 'not-eligible',
        color: 'red'
      },
      {
        id: 'abha',
        name: currentTranslation.schemes.abha.name,
        localName: currentTranslation.schemes.abha.localName,
        icon: '💳',
        description: currentTranslation.schemes.abha.description,
        maxBenefit: currentTranslation.schemes.abha.maxBenefit,
        eligibilityStatus: 'eligible',
        color: 'blue'
      }
    ];
    setSchemes(initialSchemes);
  }, [currentTranslation]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'eligible': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'verification': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'not-eligible': return <XCircle className="w-6 h-6 text-red-600" />;
      case 'checking': return <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'border-green-300 bg-green-50 hover:bg-green-100';
      case 'verification': return 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100';
      case 'not-eligible': return 'border-red-300 bg-red-50 hover:bg-red-100';
      case 'checking': return 'border-blue-300 bg-blue-50 hover:bg-blue-100';
      default: return 'border-gray-300 bg-gray-50 hover:bg-gray-100';
    }
  };

  const handleSchemeClick = (schemeId: string) => {
    setSelectedScheme(schemeId);
    const scheme = schemes.find(s => s.id === schemeId);
    
    // Voice announcement
    if ('speechSynthesis' in window && scheme) {
      const message = `${scheme.localName}. ${currentTranslation.eligibilityMessages[scheme.eligibilityStatus]}`;
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
    }
  };

  const handleCheckEligibility = (schemeId: string) => {
    setSchemes(prev => prev.map(scheme => 
      scheme.id === schemeId 
        ? { ...scheme, eligibilityStatus: 'checking' }
        : scheme
    ));

    // Simulate eligibility check
    setTimeout(() => {
      setSchemes(prev => prev.map(scheme => 
        scheme.id === schemeId 
          ? { ...scheme, eligibilityStatus: Math.random() > 0.5 ? 'eligible' : 'verification' }
          : scheme
      ));
    }, 3000);
  };

  const handleApplyNow = (schemeId: string) => {
    console.log(`Applying for scheme: ${schemeId}`);
    // Here you would navigate to application process
  };

  const handleCallSupport = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Connecting you to support helpline');
      speechSynthesis.speak(utterance);
    }
    console.log('Calling support helpline');
  };

  const handleVideoAssist = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Starting video assistance with ASHA worker');
      speechSynthesis.speak(utterance);
    }
    console.log('Starting video assistance');
  };

  // Auto-play welcome message on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentTranslation.title);
        speechSynthesis.speak(utterance);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <header className="flex justify-between items-center p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100"
          aria-label={currentTranslation.backButton}
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
          <span className="font-semibold text-gray-700">{currentTranslation.backButton}</span>
        </button>

        <div className="flex items-center gap-4">
          {/* Progress Indicator */}
          <div className="bg-white border-2 border-green-200 rounded-xl px-4 py-2 shadow-md">
            <span className="text-green-800 font-semibold">{currentTranslation.stepIndicator}</span>
          </div>

          {/* Language Display */}
          <div className="flex items-center gap-2 bg-white border-2 border-green-200 rounded-xl px-4 py-2 shadow-md">
            <span className="text-2xl">{selectedLanguage.flag}</span>
            <span className="font-semibold text-green-800">{selectedLanguage.localName}</span>
          </div>

          {/* Voice Guide Button */}
          <button
            onClick={onVoiceGuide}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200"
            aria-label="Voice guidance"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Heart className="w-20 h-20 text-red-500 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            {currentTranslation.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {currentTranslation.subtitle}
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 bg-gray-200 rounded-full h-3 mx-auto">
            <div className="bg-green-500 h-3 rounded-full w-2/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Health Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className={`
                bg-white rounded-3xl shadow-xl border-4 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 cursor-pointer
                ${getStatusColor(scheme.eligibilityStatus)}
                ${selectedScheme === scheme.id ? 'ring-4 ring-blue-200 scale-105' : ''}
              `}
              onClick={() => handleSchemeClick(scheme.id)}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{scheme.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{scheme.name}</h3>
                      <p className="text-lg text-gray-600">{scheme.localName}</p>
                    </div>
                  </div>
                  {getStatusIcon(scheme.eligibilityStatus)}
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  {scheme.description}
                </p>

                {/* Benefit Amount */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-blue-600" />
                    <span className="font-bold text-blue-800 text-lg">{scheme.maxBenefit}</span>
                  </div>
                </div>

                {/* Status Message */}
                <div className="mb-6">
                  <div className={`
                    p-3 rounded-xl text-center font-semibold
                    ${scheme.eligibilityStatus === 'eligible' ? 'bg-green-100 text-green-800' : ''}
                    ${scheme.eligibilityStatus === 'verification' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${scheme.eligibilityStatus === 'not-eligible' ? 'bg-red-100 text-red-800' : ''}
                    ${scheme.eligibilityStatus === 'checking' ? 'bg-blue-100 text-blue-800' : ''}
                  `}>
                    {currentTranslation.status[scheme.eligibilityStatus]}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {currentTranslation.eligibilityMessages[scheme.eligibilityStatus]}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  {scheme.eligibilityStatus === 'eligible' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyNow(scheme.id);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Smartphone className="w-5 h-5" />
                      {currentTranslation.applyNow}
                    </button>
                  )}
                  
                  {scheme.eligibilityStatus === 'verification' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckEligibility(scheme.id);
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      {currentTranslation.checkEligibility}
                    </button>
                  )}

                  {scheme.eligibilityStatus === 'not-eligible' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckEligibility(scheme.id);
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <HelpCircle className="w-5 h-5" />
                      {currentTranslation.checkEligibility}
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Learn more about ${scheme.id}`);
                    }}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    {currentTranslation.learnMore}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-blue-200 p-8 max-w-4xl mx-auto mb-12">
          <div className="text-center mb-6">
            <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-800 mb-2">{currentTranslation.needHelp}</h3>
            <p className="text-gray-600">Connect with our support team for assistance</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCallSupport}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              {currentTranslation.callSupport}
            </button>
            
            <button
              onClick={handleVideoAssist}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Video className="w-6 h-6" />
              {currentTranslation.videoAssist}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto mb-12">
          <button
            onClick={onContinue}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Continue to Next Step</span>
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <button
            onClick={onBack}
            className="flex items-center gap-3 bg-gray-600 hover:bg-gray-700 text-white px-12 py-6 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {currentTranslation.skipExit}
          </button>
        </div>

        {/* Trust Bar */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-green-200 p-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg shadow-md">
                <Award className="w-8 h-8 text-green-600" />
                <span className="font-semibold text-green-800">PM-JAY</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg shadow-md">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-blue-800">ABHA</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg shadow-md">
                <Heart className="w-8 h-8 text-orange-600" />
                <span className="font-semibold text-orange-800">Digital India</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="text-lg font-medium">{currentTranslation.poweredBy}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}