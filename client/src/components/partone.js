import React, {useState, useEffect, useRef} from 'react';

import HalongBay from './svg/halongBay';
import MountainRight from './svg/mountainRight'
import MountainLeft from './svg/mountainLeft'

import '../assets/stylesheets/partone.css';

const PartOne = ({setOffsetY, offsetY, setChapter}) => {

    const handleScrollpo = () => setOffsetY(window.pageYOffset);
    const [zoom, setZoom] = useState(1);
    const fix = useRef(false);
    const reveal = useRef(false);
    const backgroundContainer = useRef(null);
    const partonescroll= useRef(null);
    const [height, setHeight] = React.useState(window.innerHeight);
    const breakpoint = 800;
    const mountainLeftBase = height > breakpoint ? -10 : -5;
    const mountainRightBase = height > breakpoint ? -20 : -10;
    const fixBase = height > breakpoint ? 0.3 : 0.5;

    const handleWindowResize = () => setHeight(window.innerHeight)
    
    useEffect(() => {
     handleWindowResize();
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
 
    useEffect(() => {  
      setZoom((offsetY - window.innerHeight)/70);
         if( offsetY >= 70){
            reveal.current = true;
        } else {
            reveal.current= false;
        };

        if( offsetY > backgroundContainer.current.offsetHeight*fixBase){
            fix.current = true;
        } else {
            fix.current= false;
        };

        if( offsetY >= partonescroll.current.offsetHeight-window.innerHeight-1){
            setTimeout(()=>{
                setOffsetY(0);
                setChapter(4);
            },500)
            
        };

      window.addEventListener("scroll", handleScrollpo);
      
      return () => window.removeEventListener("scroll", handleScrollpo);
    }, [offsetY]);

    return (
        <div className="partone-container">
              
            <div 
                className="scroll scroll-partone" 
                ref={partonescroll}>
            
                <div className="partone__title">
                    <div 
                        className={reveal.current ? "partone_main_title reveal-text" : "partone_main_title"}>
                        part one
                    </div>

                    <div 
                        className={reveal.current ? "partone_sub_title reveal-text": "partone_sub_title"}>
                        Rogue Pants in Halong Bay
                    </div>
                </div>

                <div 
                    className={fix.current ? "partone-background-container fixed-background" : "partone-background-container" } 
                    ref={backgroundContainer}
                    style={{
                        width: `${fix.current ? 100+zoom : 100}%`
                    }}>

                   
                        <HalongBay></HalongBay>
                      
                   
                        <div 
                            className="partone-mountain-left" 
                            style={{
                                width: `${80+zoom}%`,
                                left: `${50+zoom}%`,
                                bottom: `${mountainLeftBase-zoom}%`
                        }}>
                            <MountainLeft/>
                        </div>
              
                        <div
                            className="partone-mountain-right" 
                            style={{
                                width: `${80+zoom}%`,
                                right: `${45+zoom}%`,
                                bottom: `${mountainRightBase-zoom}%`
                        }}>
                            <MountainRight/>
                        </div>
                 
                </div>

                <div 
                    className="partone-content-container">
                    <div className="partone-column-container">
                        <h1 className="partone-title">Ha Long Bay</h1> 

                        <p>Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Volutpat consequat mauris nunc congue nisi vitae suscipit. Posuere urna nec tincidunt praesent semper feugiat. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Ultrices dui sapien eget mi proin sed. Purus non enim praesent elementum facilisis. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. </p>
                        
                        <p>Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Volutpat consequat mauris nunc congue nisi vitae suscipit. Posuere urna nec tincidunt praesent semper feugiat. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Ultrices dui sapien eget mi proin sed. Purus non enim praesent elementum facilisis. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. </p>
                    </div>

                    <div className="partone-column-container">
                        <p>Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Volutpat consequat mauris nunc congue nisi vitae suscipit. Posuere urna nec tincidunt praesent semper feugiat. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Ultrices dui sapien eget mi proin sed. Purus non enim praesent elementum facilisis. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. </p>
                        
                        <p>Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Volutpat consequat mauris nunc congue nisi vitae suscipit. Posuere urna nec tincidunt praesent semper feugiat. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Ultrices dui sapien eget mi proin sed. Purus non enim praesent elementum facilisis. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. </p>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default PartOne;