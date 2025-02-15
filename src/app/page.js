"use client"
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Menu from "./component/menu";
import Footer from "./component/footer";
import Link from "next/link";
import Primary from './component/primary';
import FadeInWhenVisible from "./component/FadeInWhenVisible";
import useScrollAnimation from "./hooks/useScrollAnimation";
import EventsPage from "./component/EventsSection";
import { gsap } from 'gsap';


export default function Home() {
  useScrollAnimation();
  useEffect(() => {
    // Ensure GSAP is available before running
    const svgContainer = document.getElementById("floatingSVG");

    function getRandomColor() {
      return `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    function createFloatingSVG() {
      if (!svgContainer) return;

      const shapes = ["circle", "rect", "polygon"];
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      let shape = document.createElementNS("http://www.w3.org/2000/svg", shapeType);

      if (shapeType === "circle") {
        shape.setAttribute("cx", Math.random() * window.innerWidth);
        shape.setAttribute("cy", Math.random() * window.innerHeight);
        shape.setAttribute("r", Math.random() * 50 + 10);
      } else if (shapeType === "rect") {
        shape.setAttribute("x", Math.random() * window.innerWidth);
        shape.setAttribute("y", Math.random() * window.innerHeight);
        shape.setAttribute("width", Math.random() * 80 + 20);
        shape.setAttribute("height", Math.random() * 80 + 20);
      } else {
        const x1 = Math.random() * window.innerWidth;
        const y1 = Math.random() * window.innerHeight;
        const x2 = x1 + Math.random() * 50 + 20;
        const y2 = y1 + Math.random() * 50 + 20;
        const x3 = x1 - Math.random() * 50 - 20;
        const y3 = y1 + Math.random() * 50 + 20;
        shape.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
      }

      shape.setAttribute("fill", getRandomColor());
      shape.setAttribute("opacity", "0.6");
      svgContainer.appendChild(shape);

      if (window.gsap) {
        window.gsap.to(shape, {
          y: -30,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }

    if (svgContainer) {
      for (let i = 0; i < 15; i++) {
        createFloatingSVG();
      }
    }
  }, []);
  useEffect(() => {
    const resultCards = document.querySelectorAll(".result-card");
    const expandedView = document.querySelector(".expanded-view");
    const expandedImage = expandedView?.querySelector("img");
    const closeButton = document.querySelector(".close-button");

    function openExpandedView(imgSrc) {
      if (expandedImage) {
        expandedImage.src = imgSrc;
        expandedView.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    }

    function closeExpandedView() {
      expandedView?.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // Add event listeners to each card
    resultCards.forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        if (img) openExpandedView(img.src);
      });
    });

    // Close expanded view on button click
    closeButton?.addEventListener("click", closeExpandedView);

    // Close when clicking outside the image
    expandedView?.addEventListener("click", (e) => {
      if (e.target === expandedView) {
        closeExpandedView();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeExpandedView();
      }
    });

    // Cleanup event listeners on unmount
    return () => {
      resultCards.forEach((card) =>
        card.removeEventListener("click", openExpandedView)
      );
      closeButton?.removeEventListener("click", closeExpandedView);
      expandedView?.removeEventListener("click", closeExpandedView);
      document.removeEventListener("keydown", closeExpandedView);
    };
  }, []);
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  {/* For coursels */ }
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextRef.current?.click();
    }, timeAutoNext);

    function showSlider(type) {
      const sliderItems = sliderRef.current?.querySelectorAll(".list .item");
      const thumbnailItems = thumbnailRef.current?.querySelectorAll(".thumbnail .item");

      if (!sliderItems || !thumbnailItems) return;

      if (type === "next") {
        sliderRef.current.appendChild(sliderItems[0]);
        thumbnailRef.current.appendChild(thumbnailItems[0]);
        carouselRef.current.classList.add("next");
      } else {
        sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
        thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
        carouselRef.current.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselRef.current.classList.remove("next");
        carouselRef.current.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextRef.current?.click();
      }, timeAutoNext);
    }

    if (nextRef.current && prevRef.current) {
      nextRef.current.onclick = () => showSlider("next");
      prevRef.current.onclick = () => showSlider("prev");
    }

    return () => {
      clearTimeout(runNextAuto);
      clearTimeout(runTimeOut);
    };
  }, []);


  return (
    <>

      <Primary />



      {/* Add this right after your <body> tag */}
      <main>
        <Menu />
        <FadeInWhenVisible>
          <div ref={carouselRef} className="carousel">
            {/* list item */}
            <div ref={sliderRef} className="list">
              <div className="item">
                <img src="image/img1.jpg" />
                <div className="content">
                  <div className="author">
                    The Ultimate Kickstart to a Bright Future
                  </div>
                  <div className="title">
                    Nurturing Young Minds for a Brighter Tomorrow!
                  </div>
                  <div className="topic">Vidysagar Shihu Niketan</div>
                  <div className="des">
                    {/* lorem 50 */}
                    Vidyasagar Shishu Niketan is dedicated to providing a strong
                    foundation for young learners, fostering academic excellence,
                    moral values, and holistic development. With a nurturing
                    environment, experienced faculty, and modern learning techniques,
                    we empower students to achieve their full potential and prepare
                    them for a bright future. Join us in shaping tomorrow’s leaders
                    today!
                  </div>
                  <div className="buttons">
                    <button>LEARN MORE</button>
                    <button>ADDMISSION</button>
                  </div>
                </div>
              </div>
              <div className="item">
                <img src="image/img2.jpg" />
                <div className="content">
                  <div className="author">Learn With Fun !</div>
                  <div className="title">A Strong Foundation for a Bright Future</div>
                  <div className="topic">Vidysagar Shishu Niketan(Primary)</div>
                  <div className="des">
                    At Vidyasagar Shishu Niketan, our Kindergarten to Primary branch
                    lays the foundation for lifelong learning. With a blend of
                    interactive teaching, creative activities, and value-based
                    education, we nurture curiosity, confidence, and critical thinking
                    in young minds. Our child-friendly environment and dedicated
                    faculty ensure that every student embarks on a joyful journey of
                    knowledge, growth, and success.
                  </div>
                  <div className="buttons">
                    <button>LEARN MORE</button>
                    <button>ADDMISSION</button>
                  </div>
                </div>
              </div>
              <div className="item">
                <img src="image/img3.jpg" />
                <div className="content">
                  <div className="author">Hands-On Learning: </div>
                  <div className="title">Exploring Knowledge Through Experience</div>
                  <div className="topic">
                    Workshops for Awareness &amp; Practical Learning
                  </div>
                  <div className="des">
                    Our Workshops for Awareness &amp; Practical Learning provide
                    students with hands-on experiences, real-world knowledge, and
                    essential life skills. Through interactive sessions, expert
                    guidance, and engaging activities, we foster critical thinking,
                    problem-solving, and awareness on various important topics. These
                    workshops empower students to apply their learning beyond the
                    classroom and prepare them for future challenges.
                  </div>
                  <div className="buttons">
                    <button>SEE ALL</button>
                  </div>
                </div>
              </div>
              <div className="item">
                <img src="image/img4.jpg" />
                <div className="content">
                  <div className="author">EVENTS</div>
                  <div className="title">EXCLUSIVE EVENTS</div>
                  <div className="topic">SCIENCE EXHIBITION</div>
                  <div className="des">
                    Vidyasagar Shishu Niketan Science Exhibition** is a platform for
                    young innovators to explore, experiment, and showcase their
                    scientific creativity. Through interactive models, experiments,
                    and research-based projects, students develop critical thinking,
                    problem-solving skills, and a passion for science. This exhibition
                    encourages hands-on learning and curiosity, inspiring future
                    scientists and innovators.
                  </div>
                  <div className="buttons">
                    <button>SEE ALL</button>
                  </div>
                </div>
              </div>
            </div>
            {/* list thumnail */}
            <div ref={thumbnailRef} className="thumbnail">
              <div className="item">
                <img src="image/img1.jpg" />
                <div className="content">
                  <div className="title">Higher Secondary School</div>
                  <div className="description">Vidyasagr Shishu Niketan</div>
                </div>
              </div>
              <div className="item">
                <img src="image/img2.jpg" />
                <div className="content">
                  <div className="title">Primary School</div>
                  <div className="description">Vidyasagar Shishu Niketan</div>
                </div>
              </div>
              <div className="item">
                <img src="image/img3.jpg" />
                <div className="content">
                  <div className="title">Events &amp; Workshops</div>
                  <div className="description">Fire Awareness</div>
                </div>
              </div>
              <div className="item">
                <img src="image/img4.jpg" />
                <div className="content">
                  <div className="title">Events &amp; Workshops</div>
                  <div className="description">Science Exhibition</div>
                </div>
              </div>
            </div>
            {/* next prev */}
            <div className="arrows">
              <button id="prev" ref={prevRef}>&lt;&lt; &gt;</button>
              <button id="next" ref={nextRef}>&gt;</button>
            </div>
            {/* time running */}
            <div className="time" />
          </div>
        </FadeInWhenVisible>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="main-content">
              <section className="feature-section">
                <div className="bg-gradient bg-gradient-1" />
                <div className="bg-gradient bg-gradient-2" />
                <div className="bg-gradient bg-gradient-3" />
                {/*About Us Start*/}
                <div className="section-header">
                  <FadeInWhenVisible>
                    <h2 className="section-title-about">ABOUT US</h2>
                  </FadeInWhenVisible>
                </div>
                <section className="about-us">
                  <div className="container">
                    <svg id="floatingSVG" />
                    <div className="image-container">
                      <img
                        src="image/img1.jpg"
                        alt="Stylish person with sunglasses"
                      />

                      <div className="image-frame" />
                    </div>
                    <div className="content">
                      {/*<h5>ABOUT THE INSTITUTION</h5>*/}
                      <FadeInWhenVisible>
                        <h2>Vidyasagar Shihu Niketan</h2>
                        <p>
                          Established in the year 1975 , VSN , the brainchild of the
                          Society for Betterment of Education , has now turned into a
                          source of radiant ray with endless spark . The school
                          differentiates itself totally by conforming to the concept
                          of holistic developments and by nurturing the young minds
                          towards a dynamic citizenship.
                        </p>
                        <p>
                          The school started its journey with preparatory and
                          kindergarten classes but now has emerged as a Higher
                          Secondary School with English as a medium of instruction .
                          The school is affiliated to the Council for the Indian
                          School Certificate Examinations .
                        </p>
                        <p>
                          The VSN-thinktank in the form of the Society for the
                          Betterment of Education does everything for the betterment
                          of their dream institution and constantly extend their
                          honorary services towards the upliftment of the
                          institution.The Society is under the direct supervision of
                          the District Magistrate, Paschim Medinipur and the Governing
                          Body is constituted by the Society.
                        </p>
                        <p>
                          {" "}
                          school has two campuses , one pertains to the Primary
                          section and the other the Secondary and Higher secondary
                          sections. Both the campuses ( Rangamati and Sepoy Bazar ),
                          located at outskirts far from the din and bustle , possess a
                          devoted unit of quality architects to transform potential
                          into achievement. Well equipped laboratories, a rich library
                          , dedicated and highly educated well trained professional
                          faculty members speak volumes about the institution. We
                          believe that to lead a full fledged life, academic knowledge
                          alone is not that sufficient. In VSN we take proper care of
                          a child's cognitive as well as creative faculties. Dedicated
                          facilitators frequently keep planning for several cultural
                          and co curricular activities throughout a calender year to
                          help each individual aspirant in achieving laurels in other
                          fields as well. We try to provide each student a diverse
                          education in a safe,supportive environment that promotes
                          self discipline ,motivation,and excellence in learning.The
                          whole VSN team joined with the parents’ community assist the
                          students in developing skills to become independent and
                          self-sufficient adults who will succeed to successfully
                          shoulder the responsibilities of the global community.
                        </p>
                        <p />
                      </FadeInWhenVisible>
                      <div className="stats">
                        <div className="stat-item">
                          <FadeInWhenVisible>
                            <h3 id="projectsCount">10,000+</h3>
                            <p>Sucess Students</p>
                          </FadeInWhenVisible>
                        </div>
                        <div className="stat-item">
                          <FadeInWhenVisible>
                            <h3 id="clientsCount">30+</h3>
                            <p>Experienced Staff</p>
                          </FadeInWhenVisible>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/*Motto Mission & Vision*/}
                <FadeInWhenVisible>
                  <section className="cards-section">
                    <div className="cards-container">
                      <div className="card">
                        <div className="card-icon">
                          <span className="material-symbols-outlined">target</span>
                        </div>
                        <h3>The Motto &amp; Mission</h3>
                        <p>
                          The motto of our school ‘ Transforming Potential into
                          Achievement ’, christened by the then President of the GB,
                          VSN, Mr. Surajit Roy , W.B.C.S. (Exe), ex-S.D.O. Midnapore,
                          Sadar, envisages the mission of our school: to help the new
                          buds bloom by transforming their creativity and skills in
                          various fields,intelligence into success..
                        </p>
                      </div>
                      <div className="card">
                        <div className="card-icon">
                          <span className="material-symbols-outlined">
                            eye_tracking
                          </span>
                        </div>
                        <h3>The Vision</h3>
                        <p>
                          Our vision at Vidyasagar Shishu Niketan is to empower
                          students to acquire, demonstrate, articulate and value
                          knowledge and skills that will support them to become a good
                          human being. Each child is special and we should help
                          him/her to bring out the hidden talent.Our belief is that
                          one day we would see our Vsnians to be pioneers wherever
                          they might be.
                        </p>
                      </div>
                    </div>
                  </section>
                </FadeInWhenVisible>
                {/*About US End*/}
                {/* Features Section Starts */}
                <div className="section-header">
                  <FadeInWhenVisible>
                    <h2 className="section-title">Powerful Features</h2>
                    <p className="section-subtitle">
                      Discover the Future of Learning at Vidyasagar Shishu Niketan! 🎓📚
                    </p>
                  </FadeInWhenVisible>
                </div>
                <FadeInWhenVisible>
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
                </FadeInWhenVisible>
                <FadeInWhenVisible>
                  <div className="buutons" style={{ zIndex: 1000 }}>
                    <a href="/feature">Learn More</a>
                  </div>
                </FadeInWhenVisible>

                {/* Features Section Ends */}
                {/*Board Results Section*/}
                <FadeInWhenVisible>
                  <div className="section-header">

                    <h2 className="section-title">Board Results</h2>

                  </div>
                </FadeInWhenVisible>
                <FadeInWhenVisible>
                  <section className="board-results">
                    <div className="result-card">
                      <img src="image/result/2024_isc.jpg" alt="result2024" />
                      <div className="result-info">
                        <h3>ISC 2024</h3>
                      </div>
                    </div>
                    <div className="result-card">
                      <img src="image/result/2024.jpg" alt="result2024" />
                      <div className="result-info">
                        <h3>ICSE 2024</h3>
                      </div>
                    </div>
                    {/* Expanded View Container */}
                    <div className="expanded-view">
                      <div className="expanded-content">
                        <img src="" alt="Expanded Image" />
                        <button className="close-button">×</button>
                      </div>
                    </div>

                  </section>
                  <FadeInWhenVisible>
                    <div className="buutons">
                      <a href="/result-icse">View All ICSE Result</a>
                      <a href="/result-isc">View All ISC Result</a>
                    </div>
                  </FadeInWhenVisible>
                </FadeInWhenVisible>
                {/*Board Results Section Ends*/}
                {/*Sucess  Story Section */}

                <section className="success-stories">

                  <div className="success-bg-gradient success-bg-1" />
                  <div className="success-bg-gradient success-bg-2" />
                  <div className="success-header">
                    <FadeInWhenVisible>
                      <h2 className="section-title">Meet Our Successful Students</h2>
                    </FadeInWhenVisible>
                  </div>
                  <FadeInWhenVisible>
                    <div className="success-grid">
                      <div className="success-card">
                        <div className="client-info">
                          <img
                            src="image/students/aritra_maths.PNG"
                            alt="Client Avatar"
                            className="client-avatar"
                          />
                          <div className="client-details">
                            <h3>Aritra Mondal</h3>
                            <p>Ex-Student Of Vidyasagar Shihu Niketan</p>
                          </div>
                        </div>
                        <p className="success-quote">
                          "Success is the result of hard work, perseverance, and
                          dedication. Congratulations to Aritra Mondal, an ex-student
                          of Vidyasagar Shishu Niketan, for his remarkable achievement
                          in the National Undergraduate Programme 2024 in Mathematical
                          Science. May this milestone be the beginning of many more
                          achievements in your journey ahead!" 🎓🌟"
                        </p>
                        <div className="success-metrics">
                          <div className="metric">
                            <div className="metric-value">107</div>
                            <div className="metric-label">Rank</div>
                          </div>
                          <div className="metric">
                            <div className="metric-value">
                              <a href="https://www.cmi.ac.in/">CMI</a>
                            </div>
                            <div className="metric-label">Institute</div>
                          </div>
                        </div>
                      </div>
                      <div className="success-card">
                        <div className="client-info">
                          <img
                            src="image/students/anish_iiser.PNG"
                            alt="Client Avatar"
                            className="client-avatar"
                          />
                          <div className="client-details">
                            <h3>Anish Chowdhury</h3>
                            <p>Ex-Student Of Vidyasagar Shihu Niketan</p>
                          </div>
                        </div>
                        <p className="success-quote">
                          "Success is the reward of perseverance and passion for
                          learning. Congratulations to Anish Chowdhury, an ex-student
                          of Vidyasagar Shishu Niketan, for his remarkable achievement
                          in securing a place at IISER. May this new journey in
                          scientific exploration bring you endless opportunities and
                          accomplishments. Wishing you all the best for a bright and
                          inspiring future!" 🎓🚀🌟
                        </p>
                        <div className="success-metrics">
                          <div className="metric">
                            <div className="metric-value">110</div>
                            <div className="metric-label">Rank</div>
                          </div>
                          <div className="metric">
                            <div className="metric-value">IISER</div>
                            <div className="metric-label">Institute</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                  <FadeInWhenVisible>
                    <div className="buutons">
                      <button>View More</button>
                    </div>
                  </FadeInWhenVisible>
                </section>
                {/*Sucess Story Ends*/}
                {/*Events Section Starts*/}
                <div>
                  <FadeInWhenVisible>
                    <EventsPage />
                    <div className="buutons" style={{ zIndex: 1000 }}>
                      <a href='/events'>View All Events</a>
                    </div>
                  </FadeInWhenVisible>
                </div>
                {/* Team Section Starts*/}
                <div className="section-header">
                  <FadeInWhenVisible>
                    <h2 className="section-title">Meet Our Leadership</h2>
                  </FadeInWhenVisible>
                </div>
                <section className="team-section">
                  <div className="container-team">
                    <div className="leadership-grid">
                      <FadeInWhenVisible>
                        <div className="leader-card">
                          <div className="leader-image">
                            <img src="image/pricipal.jpg" alt="Chanda Majumder" />
                          </div>
                          <h3 className="leader-name">Mrs. Chanda Majumder</h3>
                          <p className="leader-role">Principal</p>
                          <p className="leader-bio">
                            Mrs. Chanda Majumdar is the Principal of Vidyasagar Shihu Niketan, where she leads with a vision for academic excellence and holistic development. With extensive experience in education, she has played a crucial role in enhancing the school's curriculum, fostering a nurturing environment, and inspiring both students and staff. Mrs. Majumdar is known for her commitment to creating a balanced educational experience that emphasizes not only academic success but also character building, creativity, and leadership skills. Her dynamic leadership, coupled with her strong administrative acumen, has contributed to the school's continued growth and reputation for excellence.
                          </p>
                          <div className="social-links">
                            <a href="#" aria-label="LinkedIn">
                              <i className="bi bi-linkedin" />
                            </a>
                            <a href="#" aria-label="Facebook">
                              <i className="bi bi-facebook" />
                            </a>
                          </div>
                        </div>
                      </FadeInWhenVisible>
                      <FadeInWhenVisible>
                        <div className="leader-card">
                          <div className="leader-image">
                            <img
                              src="image/vice-principal.jpg"
                              alt="Vice Principal"
                            />
                          </div>
                          <h3 className="leader-name">Mrs. Saptaparni Datta</h3>
                          <p className="leader-role">Vice-Principal</p>
                          <p className="leader-bio">
                            Mrs. Saptaparni Datta is the Vice-Principal of Vidyasagar Shihu Niketan, where she plays a pivotal role in shaping the academic and administrative direction of the school. With a passion for education and a commitment to fostering holistic development, Mrs. Datta has made significant contributions to the institution's growth and success. Her leadership is characterized by her ability to motivate both students and faculty, encouraging a collaborative learning environment. With years of experience in the field of education, Mrs. Datta combines her strong administrative skills with a deep understanding of student needs, making her an invaluable asset to the school community. Her dedication to academic excellence and her innovative approach to education continue to inspire those around her.
                          </p>
                          <div className="social-links">
                            <a href="#" aria-label="LinkedIn">
                              <i className="bi bi-linkedin" />
                            </a>
                            <a href="#" aria-label="Facebook">
                              <i className="bi bi-facebook" />
                            </a>
                          </div>
                        </div>
                      </FadeInWhenVisible>
                      <FadeInWhenVisible>
                        <div className="leader-card">
                          <div className="leader-image">
                            <img
                              src="image/headmistress.jpg"
                              alt="Vice Principal"
                            />
                          </div>
                          <h3 className="leader-name">Mrs. Shubnum Dutta </h3>
                          <p className="leader-role">Head Mistress</p>
                          <p className="leader-bio">
                            Mrs. Shubnum Dutta is the Headmistress of the Primary Section at Vidyasagar Shihu Niketan. With a strong passion for early childhood education, she is dedicated to creating a warm, supportive, and engaging environment for young learners. Mrs. Dutta focuses on nurturing students' intellectual and emotional growth, ensuring a solid foundation for their academic journey. Her leadership style is characterized by a blend of compassion, discipline, and innovative teaching methods, which help foster curiosity and a love for learning among the children. Mrs. Dutta’s commitment to excellence in education has made her an essential part of the school’s success.
                          </p>
                          <div className="social-links">
                            <a href="#" aria-label="LinkedIn">
                              <i className="bi bi-linkedin" />
                            </a>
                            <a href="#" aria-label="Facebook">
                              <i className="bi bi-facebook" />
                            </a>
                          </div>
                        </div>
                      </FadeInWhenVisible>
                      {/*<div class="leader-card">
                                  <div class="leader-image">
                                      <img src="/api/placeholder/300/300" alt="Elena Rodriguez">
                                  </div>
                                  <h3 class="leader-name">Elena Rodriguez</h3>
                                  <p class="leader-role">Chief Operating Officer</p>
                                  <p class="leader-bio">Strategic operations expert known for optimizing processes and driving organizational excellence.</p>
                                  <div class="social-links">
                                      <a href="#" aria-label="LinkedIn">in</a>
                                      <a href="#" aria-label="Twitter">t</a>
                                  </div>
                              </div>*/}
                    </div>
                  </div>
                </section>
                {/* Team Section Ends*/}
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>

    </>

  );
}
