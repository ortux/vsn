import { useEffect, useState } from "react";

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isPopupOpen && !event.target.closest('.popup-content')) {
                setIsPopupOpen(false);
            }
            if (isStudentDropdownOpen && !event.target.closest('.student-dropdown')) {
                setIsStudentDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isPopupOpen, isStudentDropdownOpen]);

    // Handle body scroll
    useEffect(() => {
        if (isPopupOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
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
                    {/* Left Side - Logo and Brand */}
                    <div className="brand-section">
                        <div className="logo-container">
                            <img src="/image/logo1.jpg" alt="Logo 1" className="logo" />
                            <img src="/image/logo2.jpg" alt="Logo 2" className="logo" />
                        </div>
                        <span className="brand-name">Vidyasagar Shishu Niketan</span>
                    </div>

                    {/* Middle - Navigation Links */}
                    <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                        <a href="/" className="nav-item">Home</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsPopupOpen(!isPopupOpen); }} className="nav-item">Download</a>
                        <a href="https://parent.neverskip.com/#/auth/login" className="nav-item">Online Fee</a>
                        <a href="/result-icse" className="nav-item">Result</a>
                        <a href="/notice" className="nav-item">Notice</a>
                        <a href="https://vsn.ac.in/OAF/" className="nav-item">Career</a>
                    </div>

                    {/* Right Side - Login and Admission Buttons */}
                    <div className="action-buttons">
                        <div className="student-dropdown-container">
                            <button 
                                className="login-btn"
                                onClick={(e) => { e.preventDefault(); setIsStudentDropdownOpen(!isStudentDropdownOpen); }}
                            >
                                Login 
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                </svg>
                            </button>
                            {isStudentDropdownOpen && (
                                <div className="student-dropdown">
                                    <a href="/login">Student Login</a>
                                    <a href="#">Admin Login</a>
                                    <a href="#">Parent Login</a>
                                </div>
                            )}
                        </div>
                        <button className="admission-btn">Admission</button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </header>

            {/* Download Popup */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button onClick={() => setIsPopupOpen(false)} className="close-button" aria-label="Close">×</button>
                        <div className="popup-header">
                            <h2>Downloads</h2>
                        </div>
                        <div className="download-links">
                            {downloadLinks.map((item, index) => (
                                <a key={index} href={item.link} className="download-item" target="_blank">
                                    <svg className="download-icon" viewBox="0 0 24 24">
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
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .menu-container {
                    position: relative;
                    width: 100%;
                }

                .navbar {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 95%;
                    max-width: 1400px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 30px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    transition: all 0.3s ease;
                }

                .navbar:hover {
                    background: rgba(255, 255, 255, 0.2);
                    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
                }

                .brand-section {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex: 1;
                }

                .logo-container {
                    display: flex;
                    gap: 10px;
                }

                .logo {
                    width: 45px;
                    height: 45px;
                    border-radius: 12px;
                    object-fit: cover;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                }

                .logo:hover {
                    transform: scale(1.05);
                }

                .brand-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #2d3748;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    flex: 2;
                    justify-content: center;
                }

                .nav-item {
                    position: relative;
                    color: #4a5568;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 15px;
                    padding: 8px 16px;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .nav-item::before {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                    border-radius: 1px;
                }

                .nav-item:hover {
                    color: #2d3748;
                    background: rgba(255, 255, 255, 0.25);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .nav-item:hover::before {
                    width: 80%;
                }

                .action-buttons {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex: 1;
                    justify-content: flex-end;
                }

                .student-dropdown-container {
                    position: relative;
                }

                .login-btn, .admission-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 15px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }

                .login-btn {
                    background: rgba(255, 255, 255, 0.2);
                    color: #4a5568;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .login-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                }

                .admission-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    position: relative;
                    overflow: hidden;
                }

                .admission-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s;
                }

                .admission-btn:hover::before {
                    left: 100%;
                }

                .admission-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }

                .student-dropdown {
                    position: absolute;
                    top: 120%;
                    right: 0;
                    min-width: 160px;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 15px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    animation: dropdownFade 0.3s ease;
                }

                @keyframes dropdownFade {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .student-dropdown a {
                    display: block;
                    padding: 12px 18px;
                    color: #4a5568;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .student-dropdown a:hover {
                    background: rgba(255, 255, 255, 0.2);
                    color: #2d3748;
                }

                .mobile-menu-btn {
                    display: none;
                    flex-direction: column;
                    gap: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    padding: 8px;
                    border-radius: 10px;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                .mobile-menu-btn span {
                    width: 20px;
                    height: 2px;
                    background: #4a5568;
                    border-radius: 1px;
                    transition: all 0.3s ease;
                }

                .mobile-menu-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                }

                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: overlayFade 0.3s ease;
                }

                @keyframes overlayFade {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .popup-content {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    padding: 30px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                    animation: popupSlide 0.3s ease;
                }

                @keyframes popupSlide {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .popup-header h2 {
                    color: #2d3748;
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    text-align: center;
                }

                .close-button {
                    position: absolute;
                    top: -15px;
                    right: -15px;
                    width: 35px;
                    height: 35px;
                    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                    color: white;
                    border: 3px solid white;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
                }

                .close-button:hover {
                    transform: scale(1.1) rotate(90deg);
                    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
                }

                .download-links {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .download-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    text-decoration: none;
                    color: #2d3748;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .download-item:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                }

                .download-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 12px;
                    stroke: currentColor;
                    stroke-width: 2;
                    fill: none;
                    opacity: 0.8;
                }

                @media (max-width: 1024px) {
                    .navbar {
                        width: 98%;
                        padding: 0 20px;
                    }

                    .brand-name {
                        font-size: 16px;
                    }

                    .nav-links {
                        gap: 20px;
                    }

                    .nav-item {
                        font-size: 14px;
                    }
                }

                @media (max-width: 768px) {
                    .navbar {
                        top: 10px;
                        height: 70px;
                        padding: 0 15px;
                        flex-wrap: wrap;
                    }

                    .brand-section {
                        flex: unset;
                    }

                    .brand-name {
                        display: none;
                    }

                    .logo {
                        width: 35px;
                        height: 35px;
                    }

                    .nav-links {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(255, 255, 255, 0.15);
                        backdrop-filter: blur(25px);
                        -webkit-backdrop-filter: blur(25px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 0 0 20px 20px;
                        flex-direction: column;
                        padding: 20px;
                        gap: 15px;
                        transform: translateY(-20px);
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                    }

                    .nav-links.active {
                        transform: translateY(0);
                        opacity: 1;
                        visibility: visible;
                    }

                    .action-buttons {
                        flex: unset;
                        gap: 10px;
                    }

                    .login-btn, .admission-btn {
                        padding: 10px 16px;
                        font-size: 13px;
                    }

                    .mobile-menu-btn {
                        display: flex;
                    }

                    .popup-content {
                        width: 95%;
                        padding: 25px;
                    }

                    .popup-header h2 {
                        font-size: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .navbar {
                        height: 60px;
                    }

                    .logo {
                        width: 30px;
                        height: 30px;
                    }

                    .login-btn, .admission-btn {
                        padding: 8px 12px;
                        font-size: 12px;
                    }

                    .action-buttons {
                        gap: 8px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Menu;