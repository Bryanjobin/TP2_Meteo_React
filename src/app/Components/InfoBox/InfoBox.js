import styles from './InfoBox.module.css'

export default function InfoBox({titre,value,unity}){
    // state (etat, données)



    // comportements


    //affichage (rendre)
    return (
        <div className={styles.box}>
            <p className={styles.titre}>{titre} :</p>
            <div className={styles.infoBox}>
                <p className={styles.info}>{value}<span>{unity}</span></p>
            </div>
        </div>
    )
}