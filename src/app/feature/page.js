"use client"
import Menu from "../component/menu";
import Footer from "../component/footer";
import Script from 'next/script';
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Primary from "../component/primary";

const Feature = () => {
    const features = [
        {
            title: "Smart Classrooms",
            description:
                "At Vidyasagar Shishu Niketan, we believe in integrating technology with education to create an engaging and effective learning environment. Our Smart Classrooms are designed to enhance the teaching-learning experience with modern digital tools and interactive resources.",
            image: "/image/smart_class.jpg",
            icon: "📱",
            tags: ["Smart", "Class Room", "Intuitive"],
        },
        {
            title: "Advanced Student Portal",
            description:
                "Our Advanced Student Portal is a one-stop digital platform that provides students, parents, and teachers with real-time access to academic progress, reports, and essential school resources.",
            image: "/image/std_portal.jpg",
            icon: "📊",
            tags: ["Data", "Analytics", "Reports"],
        },
        {
            title: "Parent-Teacher Communication App",
            description:
                "Our Parent-Teacher Communication App is designed to keep parents informed, engaged, and connected with their child’s academic progress in real time.",
            image: "/image/parent_app.jpg",
            icon: "☁️",
            tags: ["Cloud", "Sync", "Real-time"],
        },
        {
            title: "CCTV Surveillance & Smart Access Control",
            description: "At Vidyasagar Shishu Niketan, the safety of our students and staff is our top priority. Our CCTV Surveillance & Smart Access Control System provides a secure, monitored, and technology-driven environment to ensure peace of mind for parents, teachers, and administrators.With our CCTV Surveillance & Smart Access Control System, Vidyasagar Shishu Niketan ensures a safe, disciplined, and well-monitored learning environment where students can focus on education without security concerns. 🏫🔒📡",
            image: "/image/cctv.jpg",
            icon: "🔒",
            tags: ["Security", "Privacy", "Protected"]
        },
        {
            title: "GPS-Enabled School Transport System",
            description: "At Vidyasagar Shishu Niketan, we prioritize student safety beyond the classroom. Our GPS-Enabled School Transport System ensures a secure, efficient, and real-time monitored commute for students, giving parents peace of mind.With GPS-Enabled School Transport, Vidyasagar Shishu Niketan ensures a safe, efficient, and hassle-free transportation experience, making every journey secure and convenient for students, parents, and school administrators. 🚀🔍🏫",
            image: "/image/gps_bus.jpg",
            icon: "🔒",
            tags: ["Security", "Transport", "Protected"]
        },
        {
            title: "STEM & Robotics Labs – Igniting Innovation & Creativity 🤖🔬",
            description: "At Vidyasagar Shishu Niketan, we believe in preparing students for the future by fostering a love for Science, Technology, Engineering, and Mathematics (STEM) through hands-on learning. Our STEM & Robotics Labs provide an interactive environment where students can explore, experiment, and innovate using cutting-edge technology.Our STEM & Robotics Labs empower students with 21st-century skills, encouraging critical thinking, problem-solving, and innovation, making learning both fun and futuristic. 🌍✨🚀",
            image: "/image/stem.jpg",
            icon: "🔒",
            tags: ["Practical", "Lab", "Innovation"]
        },
    ];
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const cards = document.querySelectorAll(".feature-card");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }
                });
            },
            { threshold: 0.1 }
        );

        cards.forEach((card, index) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(50px)";
            card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2
                }s`;
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);
    return (
        <>
            <Primary />
            <div>
                <Menu />
                <section className="feature-section">
                    <div className="bg-gradient bg-gradient-1" />
                    <div className="bg-gradient bg-gradient-2" />
                    <div className="bg-gradient bg-gradient-3" />
                    {/* Features Section Starts */}
                    <div className="section-header">
                        <h2 className="section-title" style={{ marginTop: 2 + 'em' }}>Powerful Features</h2>
                        <p className="section-subtitle">
                            Discover the Future of Learning at Vidyasagar Shishu Niketan! 🎓📚
                        </p>
                    </div>
                    <div className="features-container" id="featuresContainer">
                        {features.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <div className="feature-image-container">
                                    <img src={feature.image} alt={feature.title} className="feature-image" />
                                    <div className="image-overlay"></div>
                                </div>
                                <div className="feature-content">
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                    <div className="feature-tags">
                                        {feature.tags.map((tag, i) => (
                                            <span className="feature-tag" key={i}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="buutons" style={{ zIndex: 1000 }}>
                        <a href='/'>Home</a>
                    </div>
                </section>


                <Footer />
            </div>
        </>
    );
};
export default Feature;