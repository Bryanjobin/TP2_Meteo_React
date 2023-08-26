import styles from './Temperature.module.css'

export default function Temperature({valeur}){

    return (
        <div className={styles.box}>
            <p className={styles.valeur}>{valeur}°</p>
        </div>
        
    )
}