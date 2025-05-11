import styles from './FallingLeaves.module.css';

export default function FallingLeaves() {
  const leaves = Array.from({ length: 60 });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {leaves.map((_, i) => (
        <div
          key={i}
          className={styles.fallingLeaf}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
