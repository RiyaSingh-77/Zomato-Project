import React, { useRef, useEffect } from 'react';
import '../../styles/reels.css';

const sampleVideos = [
    {
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        desc: 'Delicious homemade pizza with fresh ingredients and tasty toppings. Order now from our partner store.',
        store: '#'
    },
    {
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        desc: 'Handcrafted pastries made daily — warm, flaky, and irresistible. Visit the store for specials.',
        store: '#'
    },
    {
        src: 'https://www.w3schools.com/html/movie.mp4',
        desc: 'Refreshing beverages and healthy bowls to keep you energized all day.',
        store: '#'
    }
];

const Home = () => {
    const containerRef = useRef(null);
    const videoRefs = useRef([]);

    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, sampleVideos.length);

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const vid = entry.target;
                    if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
                        vid.play().catch(() => {});
                    } else {
                        vid.pause();
                    }
                });
            },
            { threshold: [0.45, 0.75] }
        );

        videoRefs.current.forEach((v) => {
            if (v) obs.observe(v);
        });

        return () => obs.disconnect();
    }, []);

    return (
        <div className="reels-container" ref={containerRef}>
            {sampleVideos.map((item, idx) => (
                <section className="reel" key={idx}>
                    <video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        className="reel-video"
                        src={item.src}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                    />

                    <div className="overlay">
                        <div className="description">{item.desc}</div>
                        <a className="visit-btn" href={item.store}>Visit store</a>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Home;