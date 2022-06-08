import React, {useState, useEffect, useRef} from 'react';
import { RichText } from 'prismic-reactjs'
import "../assets/stylesheets/intro.css";
import Trainmation from "./svg/trainmation";

const Intro = ({setOffsetY, offsetY, setChapter, chapterData}) => {
    
    const [trainScale, setTrainScale] = useState(0); 
  
    const section = useRef(null);
    
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {  
      let maxScroll =  section.current.scrollHeight- window.innerHeight;
      setTrainScale(offsetY/maxScroll);
      if(Math.ceil(offsetY) >= maxScroll-0.5) {
          setChapter(2);
      }
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [offsetY]);


 return (
    <div 
        className="intro-container " 
        ref={section}>
        <div className="scroll" >
            <div className="intro-image-container">
                <Trainmation trainScale={trainScale}></Trainmation>
                {
                    chapterData && (
                        <img 
                            className="timestamp" 
                            src={chapterData.time} 
                            alt="2am timestamp"/>
                    )
                }
 
            </div>

            <div className="intro-content-container">
                <div className="intro-column-container">
                    <h1 className="intro-title">{RichText.asText(chapterData.heading)}</h1>
                    <h2 className="intro-subtitle">{RichText.asText(chapterData.subheading)}</h2> 
                    {RichText.render(chapterData.section1)}    
                </div>
                <div className="intro-column-container">
                    {RichText.render(chapterData.section2)}   
                </div>
            </div>
        </div>
    </div>
 )
}

export default Intro;