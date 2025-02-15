// pages/events.js
"use client"
import React, { useState } from 'react';
import styles from './Events.module.css';
import Primary from '../component/primary';
import Menu from '../component/menu';
import Footer from '../component/footer';


const EventsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    const upcomingEvents = [
        {
            id: 1,
            title: 'Tech Conference 2023',
            date: 'October 15, 2023',
            location: 'San Francisco, CA',
            description: 'Join us for the biggest tech conference of the year!',
            image: '/image/events/velocity.jpg',
            link: 'https://techconference.com',
            buttonText: 'Register Now'
        },
        {
            id: 2,
            title: 'Design Workshop',
            date: 'November 5, 2023',
            location: 'New York, NY',
            description: 'Learn the latest design trends and techniques.',
            image: '/images/design-workshop.jpg',
            link: 'https://designworkshop.com',
            buttonText: 'Join Us'
        },
    ];

    return (
        <>
            <Primary />
            <Menu />
            <div className={styles.container}>
                <h1 className={styles.pageHeading}>Events</h1>

                <section className={styles.section}>
                    <h2 className={styles.sectionHeading}>Memorable Events</h2>
                    <div className={styles.eventsGrid}>
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className={styles.eventCard}>
                                <div className={styles.eventImageContainer} onClick={() => openModal(event.image)}>
                                    <img src={event.image} alt={event.title} className={styles.eventImage} />
                                </div>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <p className={styles.eventDate}>{event.date}</p>
                                <p className={styles.eventLocation}>{event.location}</p>
                                <p className={styles.eventDescription}>{event.description}</p>
                                <a href={event.link} className={styles.eventButton} target="_blank" rel="noopener noreferrer">{event.buttonText}</a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />

            {/* Fullscreen Image Modal */}
            {modalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent}>
                        <img src={selectedImage} alt="Event" className={styles.fullscreenImage} />
                        <button className={styles.closeButton} onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventsPage;