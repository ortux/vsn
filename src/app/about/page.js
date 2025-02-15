import Head from 'next/head';
import Image from 'next/image';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>About Us - Our School</title>
                <meta name="description" content="Learn more about our school and its two branches." />
            </Head>
            <header className={styles.header}>
                <h1>About Our School</h1>
                <p>Providing quality education with excellence in two branches.</p>
            </header>

            <section className={styles.section}>
                <div className={styles.branch}>
                    <Image src="/school_branch1.jpg" alt="Branch 1" width={400} height={250} className={styles.image} />
                    <div className={styles.text}>
                        <h2>Branch 1 - Downtown Campus</h2>
                        <p>Located in the heart of the city, our downtown campus offers state-of-the-art facilities and a vibrant learning environment.</p>
                        <p>Features:</p>
                        <ul>
                            <li>Modern classrooms with smart technology</li>
                            <li>Advanced science and computer labs</li>
                            <li>Comprehensive library and research center</li>
                            <li>Extracurricular clubs and sports facilities</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.branch}>
                    <Image src="/school_branch2.jpg" alt="Branch 2" width={400} height={250} className={styles.image} />
                    <div className={styles.text}>
                        <h2>Branch 2 - Suburban Campus</h2>
                        <p>Surrounded by greenery, our suburban campus provides a peaceful setting ideal for focused education and extracurricular activities.</p>
                        <p>Features:</p>
                        <ul>
                            <li>Spacious classrooms with interactive boards</li>
                            <li>Outdoor learning and environmental projects</li>
                            <li>Dedicated art, music, and sports programs</li>
                            <li>Safe and friendly student community</li>
                        </ul>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>Empowering students for a brighter future. Join us today!</p>
                <p>Contact us: info@ourschool.com | Phone: (123) 456-7890</p>
            </footer>
        </div>
    );
};

export default About;