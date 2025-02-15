import React from 'react';

const TopBar = () => {
    return (
        <div className="top-bar-container">
            <div className="top-bar-content">
                <div className="tagline">
                    Transforming potential into achievement
                </div>
                <div className="contact-info">
                    <div className="contact-item">
                        <span>📞(03222)267325(High),275542(Primary)</span>
                    </div>
                    <div className="contact-item">
                        <span>✉ vsn162@live.com</span>
                    </div>
                    <div className="contact-item">
                        <span>📍 Midnapore,Westbengal</span>
                    </div>
                </div>
                <div className="session-info">
                    <div className="session-item">
                        <span className="icon">⏰</span>
                        <div className="session-text">
                            <div>Primary:- Morning Session</div>
                            <div>High:- Day Session</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .top-bar-container {
                    width: 100%;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .top-bar-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 5px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    border-bottom: 1px solid #eee;
                }

                .tagline {
                    color: #444;
                }

                .contact-info {
                    display: flex;
                    gap: 20px;
                }

                .contact-item {
                    color: #666;
                }

                .school-info {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .school-logo, .mascot-logo {
                    width: 80px;
                    height: auto;
                    object-fit: contain;
                }

                .school-details {
                    text-align: center;
                }

                .school-details h1 {
                    font-size: 24px;
                    color: #333;
                    margin: 0;
                    margin-bottom: 5px;
                }

                .school-details p {
                    font-size: 12px;
                    color: #666;
                    margin: 0;
                }

                .session-info {
                    display: flex;
                    align-items: center;
                }

                .session-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .icon {
                    font-size: 24px;
                }

                .session-text {
                    color: #666;
                    font-size: 14px;
                }

                @media (max-width: 768px) {
                    .top-bar-content {
                        flex-direction: column;
                        gap: 5px;
                        text-align: center;
                    }

                    .contact-info {
                        flex-direction: column;
                        gap: 5px;
                    }

                    .school-info {
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                    }

                    .logo-section {
                        flex-direction: column;
                    }

                    .school-details h1 {
                        font-size: 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default TopBar;