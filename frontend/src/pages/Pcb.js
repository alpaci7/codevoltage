import PCB from '../images/pcb1.jpg';
import CCE from '../images/cce.jpeg'
import NavBar from "../components/NavBar";
import arduinoCode from '../images/arduino-code.png';
import arduinoSchematic from '../images/arduino-schematic.jpeg';
import arduinoCircuit from '../images/arduino-circuit.jpeg';

import { useTranslation } from "react-i18next";
import '../styles/Course.css'
import { Button } from "../components/Button";
import ParticlesComponent from "../components/Particles";
import SocialNetwork from "../components/SocialNetwork";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import ImageSlider from '../components/ImageSlider';
const Pcb = ({user,checked, setChecked}) => {
    const {t} = useTranslation();
    const [headerIsSticky, setHeaderIsSticky] = useState(false);
    const [firstMonthIsSticky, setFirstMonthIsSticky] = useState(false);
    const [firstPartIsSticky, setFirstPartIsSticky] = useState(false);
    const [secondMonthIsSticky, setSecondMonthIsSticky] = useState(false);

    const [buttonIsSticky, setButtonIsSticky] = useState(true);






    const headerRef = useRef(null);

    const firstMonthRef = useRef(null);
    const firstPartRef = useRef(null);
    const secondMonthRef = useRef(null);

    const unStickRef = useRef(null);
    const secondPartUnStickRef = useRef(null);
    const secondMonthUnStickRef = useRef(null);
    const thirdMonthUnStickRef = useRef(null);

    const buttonStickRef = useRef(null);


    const images = [
        require('../images/arduino.png'),
        require('../images/esp32.jpeg'),
        require('../images/zilog.png'),
        require('../images/proteus.png'),
        require('../images/altium.png'),        
      ];

    useEffect(() => {
        let lastScrollPosition = 0; 
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const isScrollingDown = scrollPosition > lastScrollPosition; // Determine scroll direction (down or up)

            const header = headerRef.current;
            const firstMonth = firstMonthRef.current;
            const firstPart = firstPartRef.current;
            const secondMonth = secondMonthRef.current;


            const unStick = unStickRef.current;
            const secondPartUnStick = secondPartUnStickRef.current;
            const secondMonthUnStick = secondMonthUnStickRef.current;
            const thirdMonthUnStick = thirdMonthUnStickRef.current;

            const buttonStick = buttonStickRef.current;

            if(isScrollingDown){
                if(header){
                    const offset = header.offsetTop;
                    setHeaderIsSticky(scrollPosition >= offset);
                }
                if(firstMonth){
                    const offset = firstMonth.offsetTop;
                    setFirstMonthIsSticky(scrollPosition >= offset);
                }
                if(firstPart){
                    const offset = firstPart.offsetTop;
                    setFirstPartIsSticky(scrollPosition >= offset);
                }
                
                if(secondMonth){
                    const offset = secondMonth.offsetTop;
                    if(scrollPosition >= offset){
                        setSecondMonthIsSticky(true); 
                        setFirstMonthIsSticky(false);
                        setFirstPartIsSticky(false);
                    }
                }
                
            }
            else{
                if(thirdMonthUnStick){
                    const offset = thirdMonthUnStick.offsetTop;
                    if(scrollPosition <= offset){
                        setSecondMonthIsSticky(true)
                    }
                }
                if(secondMonthUnStick){
                    const offset = secondMonthUnStick.offsetTop;
                    if(scrollPosition <= offset){
                        setSecondMonthIsSticky(false);
                        setFirstMonthIsSticky(true);
                        setFirstPartIsSticky(true);
                    }
                }

                if(secondPartUnStick){
                    const offset = secondPartUnStick.offsetTop;
                    if(scrollPosition <= offset){
                        setFirstPartIsSticky(true);
                        setFirstMonthIsSticky(true);

                    }
                }
                if(unStick){
                    const offset = unStick.offsetTop;
                    if(scrollPosition <= offset){
                        setFirstPartIsSticky(false);
                        setFirstMonthIsSticky(false);
                        setHeaderIsSticky(false)
                    }
                }
            }

            if(buttonStick){
                const offset = buttonStick.offsetTop;
                if(scrollPosition >= offset){
                    setButtonIsSticky(false);
                }
                else{
                    setButtonIsSticky(true);
                }
            }
            lastScrollPosition = scrollPosition;

        };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return (
        <div>
            <NavBar user={user} checked={checked} setChecked={setChecked}/>
            <ParticlesComponent/>
            <SocialNetwork/>
            <div>

            </div>
            <div>
                <div className="course-container">
                    <div className="course-info-container">
                        <div className='course-image'><img  src={PCB} alt="Cartes électronique"/></div>

                        <div className="course-info">
                            <div className='course-topic'>
                                <h2>{t('Course')}:</h2>
                                <p className="contenu1">{t('Smart Home & IoT')}</p>
                            </div>

                            <div className='course-duration'>
                                <h2>{t('Duration')}:</h2>
                                <p className="contenu1">64 {t('Hours')} {t('in')} 4 {t('Months')} </p>
                            </div>
                            <div className='course-level'>
                                <h2>{t('Level')} :</h2>
                                <p className="contenu1">{t('Intermediate')} </p>
                            </div>
                            <div className='course-price'>
                                <h2>{t('Price')} :</h2>
                                <p className="contenu1">600 DH/{t('Month')}{t('Matériels inclut')} </p>

                            </div>

                        </div>
                        
                    </div>
                    <div className="course-cible-video"> 
                        <div className="course-cible">
                            
                                <p>{t('Découvrez notre formation complète en Conception et Fabrication de Circuits Imprimés (PCB). Apprenez à maîtriser chaque étape du processus, de la simulation des schémas à la réalisation de projets concrets de circuits électroniques. Cette formation pratique vous permettra d\'acquérir des compétences approfondies en électronique, simulation de circuits, et conception de PCB, en passant par des projets couvrant l’automatisation et le contrôle de systèmes.')}</p>
                                <h4>{t('À qui s\'adresse cette formation ?')}</h4>
                                <p>{t('Cette formation est destinée à plusieurs profils intéressés par la conception de circuits imprimés et l\'électronique :')}</p>
                            <ul>
                           

                                <li><h4>{t('Étudiants et Professionnels de l\'Électronique :')}</h4>
                                    <p>{t('Ceux qui souhaitent développer des compétences pointues en simulation de circuits, conception de PCB et intégration de systèmes embarqués.')}</p>
                                </li>
                                <li><h4>{t('Techniciens et Ingénieurs en Automatisation :')}</h4>
                                    <p>{t('Les professionnels cherchant à approfondir leurs connaissances en conception de circuits imprimés pour des systèmes embarqués et industriels.')}</p>
                                </li>

                                <li><h4>{t('Passionnés de Technologie et Makers :')}</h4>
                                    <p>{t('Les amateurs de projets électroniques qui veulent concevoir leurs propres systèmes électroniques à partir de zéro, depuis la simulation jusqu\'à la fabrication de PCB.')}</p>
                                </li>

                            
                                <li><h4>{t('Entrepreneurs dans l\'Électronique :')}</h4>
                                    <p>{t('Ceux qui souhaitent lancer des produits innovants dans le domaine de l\'électronique et apprendre à concevoir et fabriquer des circuits imprimés pour divers projets.')}</p>
                                </li>
                            </ul>                      

                        </div>
                    
                    
                        <div className="course-video">
                            <iframe  src="https://www.youtube.com/embed/GW3CMm8oK1k?si=FqTM7dnNJRmg9_a6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            <iframe  src="https://www.youtube.com/embed/GW3CMm8oK1k?si=FqTM7dnNJRmg9_a6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        
                        </div>
                    </div>
                   
                    <div className="course-objectif-images">
                    <div className="course-objectif">
                            <h2>{t('Objectif :')}</h2>
                            <p>{t('Cette formation a pour objectif de vous enseigner la conception, la simulation, et la fabrication de circuits imprimés (PCB). Vous apprendrez à maîtriser les outils de simulation de schémas électroniques, à concevoir des PCB professionnels, et à réaliser des projets concrets comme des alimentations électriques, des drivers de moteurs, et des systèmes embarqués avec Arduino et ESP32. Vous découvrirez également les étapes de fabrication et de prototypage de circuits.')}</p>
                            <ul>
                            <p>{t('À la fin de la formation, vous serez capable de faire :')}</p>
                                <li><h4>{t('La Simulation de circuits :')}</h4><p>{t('Concevoir et simuler des circuits électroniques complexes (RLC, compteurs, décodeurs, multiplexeurs).')}</p></li>
                                <li><h4>{t('La Conception de PCB :')}</h4><p>{t('Réaliser des schémas électroniques et concevoir des circuits imprimés pour divers projets électroniques.')}</p></li>
                                <li><h4>{t('Le Prototypage avec Arduino et ESP32 :')}</h4><p>{t('Programmer et intégrer des microcontrôleurs dans des projets électroniques pratiques comme des alimentations, des drivers de moteurs, et des systèmes connectés.')}</p></li>
                                <li><h4>{t('La Fabrication de circuits :')}</h4><p>{t('Comprendre le processus complet de fabrication de PCB, de la conception à l’assemblage, en passant par les tests et le prototypage.')}</p></li>
                             </ul>

                        </div>
                        <div className="images-container">
                            <div className="image1"><img src={arduinoCode} alt="Arduino Code"></img></div>
                            <div className="image2"><img src={CCE} alt="Carte électronique"></img></div>
                            <div ref={unStickRef} className="image3"><img src={arduinoCircuit} alt="Arduino Circuit"></img></div>

                        </div>
                    </div>
                    <div className="course-description">
                        <h2 ref={headerRef} className={headerIsSticky ? "header-stick" : "unstick"}>{t('Programme')} :</h2>
                        <div className="course-content">
                            <div className="first-month">
                                <h3 ref={firstMonthRef} className={firstMonthIsSticky ? "first-month-stick":"unstick"}>{t('1ér et 2ème Mois')}</h3>
                                
                                <div className="content-part1">
                                    <h4 ref={firstPartRef} className={firstPartIsSticky ? "first-part-stick":"unstick"}>{t('Partie 1 : Schémas et simulation')}</h4>
                                    
                                    <ol  className="ol">
                                        <li><p>{t('Circuit RLC')}</p></li>
                                        <li><p>{t('Bascules RS, D, JK, T')}</p></li>
                                        <li><p>{t('Compteur synchrone modulo 8')}</p></li>
                                        <li><p>{t('Compteur synchrone modulo 16')}</p></li>
                                        <li><p>{t('Compteur synchrone modulo 32')}</p></li>
                                        <li><p>{t('Compteur asynchrone modulo 8')}</p></li>
                                        <li><p>{t('Compteur asynchrone modulo 16')}</p></li>
                                        <li><p>{t('Compteur asynchrone modulo 32')}</p></li>
                                        <li><p>{t('Compteur modulo 99')}</p></li>
                                        <li><p>{t('Décodeur 7 Segments')}</p></li>
                                        <li><p>{t('Multiplexeur')}</p></li>
                                        <li><p>{t('Redresseur')}</p></li>
                                        <li><h4>{t('Outils')}</h4>
                                            <li><p>{t('Instrument Virtuel')}</p></li>
                                            <li><p>{t('Modes du générateur')}</p></li>
                                            <li><p>{t('Modes de sonde')}</p></li>
                                            <li><p>{t('Bus')}</p></li>
                                            <li><p>{t('Modes terminaux')}</p></li>
                                            <li><p>{t('Création de sous-circuits')}</p></li>
                                            <li><p>{t('Création des composants')}</p></li>
                                            <li><p>{t('Création des footprints')}</p></li>

                                        </li>
                                        <li>
                                            <ol><h4>{t('Arduino')}</h4>
                                                <li><p>{t('Clignotter une LED')}</p></li>
                                                <li><p>{t('Feux de carrefour')}</p></li>
                                                <li><p>{t('Moteur à courant continue')}</p></li>
                                                <li><p>{t('LCD')}</p></li>
                                            </ol>
                                        </li>

                                        <li>
                                            <ol><h4>{t('PIC16F84A')}</h4>
                                                <li><p>{t('Clignotter une LED')}</p></li>
                                                <li><p>{t('Feux de carrefour')}</p></li>
                                                <li><p>{t('Moteur à courant continue')}</p></li>
                                                <li><p>{t('LCD')}</p></li>
                                            </ol>
                                        </li>

                                        <li>
                                            <ol><h4>{t('Microprocesseur Z80')}</h4>
                                                <li><p>{t('Clignotter une LED')}</p></li>
                                                <li><p>{t('Feux de carrefour')}</p></li>
                                                <li><p>{t('LCD')}</p></li>
                                                <li ref={secondMonthUnStickRef}><p>{t('Calculatrice')}</p></li>
                                            </ol>
                                        </li>
  
                                        
                                    </ol>
                                    

                                </div>
                            </div>
                            <div className="content-part3">
                                <div className="second-month">
                                    <h3 ref={secondMonthRef} className={secondMonthIsSticky ? "second-month-stick":"unstick"}>{t('3ème et 4ème Mois')}</h3>
                                    <h4 className={secondMonthIsSticky ? "third-part-stick":"unstick"}>{t('Partie 2 : Conception et fabrication de PCB')}</h4>

                                    <ol className="ol">
                                        <li ref={buttonStickRef}><h4>{t('Projet 1 : Alimentation 5V')}</h4></li>

                                        <li><h4>{t('Projet 2 : Contacteur Moteur')}</h4></li>

                                        <li><h4>{t('Projet 3 : PIC Carte')}</h4></li>

                                        <li><h4>{t('Projet 4 : CodeVoltage Carte 1')}</h4></li>

                                        <li><h4>{t('Projet 5 : Driver Moteur pas-à-pas')}</h4></li>

                                        <li><h4>{t('Projet 6 : Arduino Uno Carte')}</h4></li>

                                        <li><h4>{t('Projet 7 : ESP32 Carte')}</h4></li>

                                        <li><h4>{t('Projet 8 : CodeVoltage Carte 2')}</h4></li>
                                        
                                    </ol>
                                </div>
                                <div>
                                    <h2>{t('Ce qui est utilisé dans ce cours :')}</h2>
                                    <ImageSlider images={images}/>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    <div className={buttonIsSticky ? "course-button" : "unstick-button" }>
                        <Button $BackgroundColor="var(--button-subscribe)" $HoverBackgroundColor="var(--button-subscribe-hover)" $Border="2px solid #428b52">{t('Subscribe to this course')}</Button>
                    </div>

                   

                   

                   
                </div>  
            </div>
            <Footer/>
        </div>
        
    );
}
 
export default Pcb;