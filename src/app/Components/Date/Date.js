import styles from './Date.module.css'

export default function Date({jour}){
    return (
        <div className={styles.p}>
            <p>{jour}</p>
        </div>
    )
}