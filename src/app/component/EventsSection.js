// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './styles/Events.module.css';
import Link from 'next/link';

const events = [
    {
        id: 1,
        date: 'FEBRUARY 3, 2025',
        title: 'Saraswati Puja',
        description: 'The verdant campus of our school reverberated with devotion and joy as we celebrated Saraswati Puja on 3rd February 2025. The goddess of knowledge and arts was invoked with fervent prayers, amidst the sweet fragrance of flowers and the soft chanting of mantras. A sumptuous feast followed, satiating the taste buds of students, teachers, and staff. As we savoured the delicacies, our hearts swelled with gratitude for the blessings of Saraswati, illuminating our minds and guiding us toward wisdom and excellence.',
        imageUrl: '/image/events/saraswati_puja.jpg',
        buttonText: 'See More',
        buttonLink: "https://www.facebook.com/share/p/15vP19cu14/"
    },
    {
        id: 2,
        date: 'JANUARY 30, 2025',
        title: 'Road Safety Seminar',
        description: 'Safety begins with awareness! VSN had the privilege of hosting a thought-provoking road safety seminar conducted by Paschim Medinipur District Police. Our students gained crucial insights into why accidents happen and how they can be prevented. The session was made even more engaging with an interactive quiz on road safety, where knowledge met excitement, and winners were rewarded! Let’s pledge to be responsible on the roads because every life counts.',
        imageUrl: '/image/events/road_safety.jpg',
        buttonText: 'See More',
        buttonLink: "https://www.facebook.com/share/p/15uD8171y8/"
    },
    {
        id: 3,
        date: 'JANUARY 11, 2025',
        title: 'Velocity: Annual Sports Day',
        description: "Play hard, play fair, and may the spirit of victory reign supreme!The echoes of triumph reverberated, as the grand curtain fell on the Annual Sports Meet, a vibrant tapestry woven with sweat, smiles, and sheer athleticism, the concluding event of the year long celebration of the institution's Golden Jubilee completion. A symphony of cheers and applause filled the air, celebrating the indomitable spirit of our young champions. As we bid adieu to this exhilarating spectacle, we cherished the memories forged in the crucible of competition, the bonds of camaraderie strengthened, and the values of sportsmanship deeply ingrained in our institution. This momentous occasion, a Golden Jubilee Celebration ending, was graced by the remarkable presence of Mr.Debashis Manna(District Education Officer,SSM,Paschim Medinipur), Chandan Bose, General Secretary of District Chamber of Commerce and the honourable member of VSN Golden Jubilee Advisory Committee, Mr. Kunal Banerjee , distinguished Social Worker and honourable member of VSN Golden Jubilee Advisory Committee. It marked a milestone in our school's illustrious journey, a testament to its unwavering commitment to nurturing well-rounded individuals.",
        imageUrl: '/image/events/velocity.jpg',
        buttonText: 'See More',
        buttonLink: "https://www.facebook.com/share/p/15nHkgJB8s/"
    }
];

export default function EventsCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        let interval;
        if (autoPlay) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % events.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [autoPlay]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <Head>
                <title>Events Carousel</title>
                <meta name="description" content="Upcoming Events" />
            </Head>

            <section className={styles.section}>
                <div className={styles.sectionTitleWrapper}>
                    <h1 className={styles.sectionTitle}>Latest Events</h1>
                    <div className={styles.sectionUnderline}></div>
                </div>

                <div className={styles.carouselContainer}
                    onMouseEnter={() => setAutoPlay(false)}
                    onMouseLeave={() => setAutoPlay(true)}>
                    <div className={styles.carousel}>
                        <button className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>
                            ‹
                        </button>

                        <div className={styles.slideWrapper}>
                            <div
                                className={styles.slideContainer}
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`
                                }}
                            >
                                {events.map((event) => (
                                    <div key={event.id} className={styles.slide}>
                                        <div className={styles.imageWrapper}>
                                            <Image
                                                src={event.imageUrl}
                                                alt={event.title}
                                                width={800}
                                                height={400}
                                                className={styles.eventImage}
                                                priority
                                            />
                                        </div>
                                        <div className={styles.content}>
                                            <div className={styles.eventDate}>{event.date}</div>
                                            <h2 className={styles.eventTitle}>{event.title}</h2>
                                            <p className={styles.eventDescription}>{event.description}</p>
                                            {event.buttonLink ? (
                                                <Link href={event.buttonLink} passHref>
                                                    <button className={styles.eventButton}>{event.buttonText}</button>
                                                </Link>
                                            ) : (
                                                <p className="error-message">Link not available</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>
                            ›
                        </button>
                    </div>

                    <div className={styles.dots}>
                        {events.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}