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
                    <a href="#" className="brand-name">Vidyasagar Shishu Niketan</a>
                    <div className="logo-container">
                        <a href="/"><img src="/image/logo1.jpg" alt="Logo 1" width={50} height={50} className="logo" /></a>
                        <a href="/"><img src="/image/logo2.jpg" alt="Logo 2" width={50} height={50} className="logo" /></a>
                    </div>
                    <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                        <a href="/">Home</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsPopupOpen(!isPopupOpen); }}>Download</a>
                        <a href="https://parent.neverskip.com/#/auth/login">Online Fee</a>
                        <div className="student-dropdown-container">
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsStudentDropdownOpen(!isStudentDropdownOpen); }}>Login <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg></a>
                            {isStudentDropdownOpen && (
                                <div className="student-dropdown">
                                    <a href="/login">Student Login</a>
                                    <a href="#">Admin Login</a>
                                    <a href="#">Parent Login</a>
                                </div>
                            )}
                        </div>
                        <a href="/result-icse">Result</a>
                        <a href="/notice">Notice</a>
                        <a href="https://vsn.ac.in/OAF/">Career</a>
                    </div>
                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
                </nav>
            </header>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button onClick={() => setIsPopupOpen(false)} className="close-button" aria-label="Close">×</button>
                        <div className="popup-header"><h2>Downloads</h2></div>
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
                .menu-container { position: relative; }
                .student-dropdown-container { position: relative; display: inline-block; }
                .student-dropdown { position: absolute; background: black; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); top: 100%; left: 0; min-width: 150px; z-index: 1000; }
                .student-dropdown a { display: block; padding: 10px; text-decoration: none; color: white; }
                .popup-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                .popup-content { background: white; border-radius: 8px; padding: 20px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto; }
                .close-button { position: absolute; top: -12px; right: -12px; background: #ff4444; color: white; border: 2px solid white; cursor: pointer; font-size: 20px; padding: 5px; border-radius: 50%; }
                .download-links { display: flex; flex-direction: column; gap: 10px; }
                .download-item { display: flex; align-items: center; padding: 12px; background: #f5f5f5; border-radius: 6px; text-decoration: none; color: #333; }
                .download-icon { width: 20px; height: 20px; margin-right: 12px; stroke: currentColor; stroke-width: 2; fill: none; }
                @media (max-width: 768px) { .popup-content { width: 95%; } }
            `}</style>
        </div>
    );
};

export default Menu;
