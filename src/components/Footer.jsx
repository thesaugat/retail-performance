import React from 'react';

const Footer = ({ lastUpdated }) => {
    return (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="text-center space-y-3">

                {/* Main Info */}
                <p className="text-purple-200 text-sm">
                    Sales Tournament Dashboard • Live Data from StarPhones SPL • Built with React & Recharts
                </p>
                <p className="text-purple-300 text-xs">
                    Data updates in real-time • Last fetch: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'N/A'}
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3 py-2">
                    <div className="h-px bg-purple-500/30 w-20"></div>
                    <span className="text-purple-400 text-xs">•</span>
                    <div className="h-px bg-purple-500/30 w-20"></div>
                </div>

                {/* Creator Info with Links */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <p className="text-white font-semibold text-sm">
                        Made with <span className="text-purple-400">♥</span> by Saugat Timilsina
                    </p>

                    <div className="flex items-center gap-3">

                        {/* GitHub Link */}
                        <a
                            href="https://github.com/thesaugat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-purple-300 hover:text-white transition-colors duration-200 hover:scale-110"
                            aria-label="GitHub Profile"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
                                    0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 
                                    1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 
                                    0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 
                                    9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 
                                    1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 
                                    4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 
                                    2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 
                                    6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-xs font-medium">GitHub</span>
                        </a>

                        {/* LinkedIn Link */}
                        <a
                            href="https://www.linkedin.com/in/thesaugat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-purple-300 hover:text-white transition-colors duration-200 hover:scale-110"
                            aria-label="LinkedIn Profile"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 
                                6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 
                                1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 
                                0 3.36.86 3.36 3.66z" />
                            </svg>
                            <span className="text-xs font-medium">LinkedIn</span>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
