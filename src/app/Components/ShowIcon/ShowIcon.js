import Image from "next/image";
import Soleil from "../../images/soleil.png";
import Nuageux from "../../images/nuageux.png";
import Pluie from "../../Images/pluie.png";
import Orage from "../../Images/orage.png";

export default function ShowIcon({showCode}){
    function getIcon(){
        switch(showCode){
            case 1:
            case 2:
            case 3:
                return Nuageux;
            case 61:
            case 62:
            case 63:
            case 80:
            case 81:
            case 82:
                return Pluie;
            case 95:
            case 96:
            case 97:
                return Orage;
            default : 
                return Soleil;
        }
    }

    return (
        <div >
            <Image src={getIcon()} width={150} alt="icône météo"/>
        </div>
        
    )
}