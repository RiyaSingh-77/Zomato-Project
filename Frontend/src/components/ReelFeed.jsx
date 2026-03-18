import React, { useRef, useEffect } from 'react'
import '../styles/reels.css'

const getVideoSrc = (item) => item.videoUrl || item.video || item.src || '';

const ReelFeed = ({ items = [], onLike = () => {}, onSave = () => {}, emptyMessage = 'No items' }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, items.length);

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

    videoRefs.current.forEach((v) => v && obs.observe(v));
    return () => obs.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
    return <div className="reels-container" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{emptyMessage}</div>;
  }

  return (
    <div className="reels-container">
      {items.map((item, idx) => (
        <section className="reel" key={item._id || idx}>
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            className="reel-video"
            src={getVideoSrc(item)}
            muted
            playsInline
            loop
            preload="metadata"
          />

          <div className="overlay">
            <div className="description">{item.description || item.desc || item.title || ''}</div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={() => onLike(item)} className="visit-btn">Like {item.likeCount ? `(${item.likeCount})` : ''}</button>
              <button onClick={() => onSave(item)} className="visit-btn">Save {item.savesCount ? `(${item.savesCount})` : ''}</button>
              <a className="visit-btn" href={item.store || '#'}>Visit store</a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ReelFeed;
