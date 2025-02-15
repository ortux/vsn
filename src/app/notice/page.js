"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./SchoolNotice.css";
import Primary from "../component/primary";
import Menu from "../component/menu";
import Footer from "../component/footer";

const SchoolNotice = () => {
    const tableRef = useRef(null);
    const headerRef = useRef(null);

    const initialNotices = [
        {
            id: 1,
            date: "2025-02-14",
            type: "Holiday Notice",
            title: "Independence Day Holiday",
            description: "The school will remain closed on 15th August for Independence Day celebrations.",
            pdfLink: "/notices/independence_day.pdf"
        },
        {
            id: 2,
            date: "2025-02-10",
            type: "Sports Event",
            title: "Annual Sports Meet",
            description: "Join us for the Annual Sports Meet on 20th September. All students are invited!",
            pdfLink: "/notices/sports_meet.pdf"
        },
        {
            id: 3,
            date: "2025-02-05",
            type: "Admission Notice",
            title: "New Admission Open",
            description: "Admission forms for the next academic session are now available online.",
            pdfLink: "/notices/admission_forms.pdf"
        }
    ];

    const [notices, setNotices] = useState([]);
    const [visibleNotices, setVisibleNotices] = useState([]);

    useEffect(() => {
        setNotices(initialNotices);

        // Header animation
        gsap.from(headerRef.current, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Table animation
        gsap.from(tableRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
        });

        let index = 0;
        const interval = setInterval(() => {
            if (index < initialNotices.length) {
                setVisibleNotices((prev) => [...prev, initialNotices[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Animate new rows as they appear
        if (visibleNotices.length > 0) {
            const lastRow = document.querySelector('.notice-item:last-child');
            if (lastRow) {
                gsap.from(lastRow, {
                    x: -100,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }
    }, [visibleNotices]);

    return (
        <>
            <Primary />
            <Menu />
            <div className="bg-gradient bg-gradient-1" />
            <div className="bg-gradient bg-gradient-2" />
            <div className="bg-gradient bg-gradient-3" />
            <div className="notice-wrapper">
                <div className="notice-container">
                    <h1 ref={headerRef} className="notice-header">
                        School Notices
                    </h1>

                    <div ref={tableRef} className="table-container">
                        <table className="notice-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleNotices.length > 0 ? (
                                    visibleNotices.map((notice, index) => (
                                        <tr key={notice?.id || index} className="notice-item">
                                            <td>{index + 1}</td>
                                            <td>{notice?.date || "N/A"}</td>
                                            <td>{notice?.type || "N/A"}</td>
                                            <td>{notice?.title || "N/A"}</td>
                                            <td>{notice?.description || "N/A"}</td>
                                            <td>
                                                <a href={notice?.pdfLink || "#"} className="download-btn">
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="loading-message">Loading Notices...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SchoolNotice;