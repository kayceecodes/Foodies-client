import styles from './CirclesBackground.module.css';

export default function CirlclesBackground ({children}: {children: React.ReactNode}) {
    return (
        <div className={styles.background}>
             {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={styles[`circle${i + 1}`]}>
                    {children}
                </div>
            ))}
        </div>
    )}