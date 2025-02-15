import { useEffect, useState } from "react";

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isPopupOpen && !event.target.closest('.popup-content')) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isPopupOpen]);

    // Handle body scroll
    useEffect(() => {
        if (isPopupOpen) {
            // Store current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isPopupOpen]);

    const downloadLinks = [
        { title: "School Prospectus(Session:2024-25)", link: "https://vsn.ac.in/Download/prospectus2024_25.pdf" },
        { title: "List of Holidays(Session:2024-25)", link: "https://vsn.ac.in/Download/List%20of%20Holidays2425_rev.pdf" },
    ];

    return (
        <div className="menu-container">
            <header>
                <nav className="navbar">
                    {/* Brand Name */}
                    <a href="#" className="brand-name">
                        Vidyasagar Shishu Niketan
                    </a>

                    {/* Centered Logo */}
                    <div className="logo-container">
                        <a href="/"><img src="/image/logo1.jpg" alt="Logo 1" width={50} height={50} className="logo" /></a>
                        <a href="/"><img src="/image/logo2.jpg" alt="Logo 2" width={50} height={50} className="logo" /></a>
                    </div>

                    {/* Navigation Links */}
                    <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                        <a href="/">Home</a>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setIsPopupOpen(!isPopupOpen);
                        }}>Download</a>
                        <a href="https://parent.neverskip.com/#/auth/login">Online Fee</a>
                        <a href="/login">Student Login</a>
                        <a href="/result-icse">Result</a>
                        <a href="/notice">Notice</a>
                        <a href="https://vsn.ac.in/OAF/">Carrer</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        ☰
                    </button>
                </nav>
            </header>

            {/* Download Popup */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button 
                            onClick={() => setIsPopupOpen(false)}
                            className="close-button"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <div className="popup-header">
                            <h2>Downloads</h2>
                        </div>
                        <div className="download-links">
                            {downloadLinks.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="download-item"
                                    target="_blank"
                                >
                                    <svg 
                                        className="download-icon" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .menu-container {
                    position: relative;
                }

                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .popup-content {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    width: 90%;
                    max-width: 500px;
                    margin: 20px;
                    position: relative;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                .close-button {
                    position: absolute;
                    top: -12px;
                    right: -12px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: #ff4444;
                    color: white;
                    border: 2px solid white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    line-height: 1;
                    padding: 0;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    transition: all 0.2s ease;
                    z-index: 1001;
                }

                .close-button:hover {
                    background-color: #ff0000;
                    transform: scale(1.1);
                }

                .popup-header {
                    margin-bottom: 20px;
                }

                .popup-header h2 {
                    margin: 0;
                    font-size: 1.5rem;
                    color: #333;
                }

                .download-links {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .download-item {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    background-color: #f5f5f5;
                    border-radius: 6px;
                    text-decoration: none;
                    color: #333;
                    transition: background-color 0.2s;
                }

                .download-item:hover {
                    background-color: #e5e5e5;
                }

                .download-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 12px;
                    stroke: currentColor;
                    stroke-width: 2;
                    fill: none;
                }

                @media (max-width: 768px) {
                    .popup-content {
                        width: 95%;
                        margin: 10px;
                        padding: 15px;
                    }

                    .download-item {
                        padding: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Menu;