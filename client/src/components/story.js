import React, {useState, useEffect} from 'react';
import Prismic from '@prismicio/client'
import Loader from './loader';
import Intro from './intro';
import Trans from './transition';
import PartOne from './partone';
import Footer from './footer';

const Story = () => {
    const [offsetY, setOffsetY] = useState(0);
    const [chapter, setChapter] = useState(0);
    const [chapterData, setChapterData] = useState(null);
    
    const apiEndpoint = process.env.REACT_APP_PRISMIC_API_ENDPOINT
    const accessToken = process.env.REACT_APP_PRISMIC_ACCESS_TOKEN
  
    const Client = Prismic.client(apiEndpoint, { accessToken });
  
    useEffect(() => {
      const fetchData = async () => {
          const book = await Client.query( Prismic.Predicates.at('document.type', 'train'));
          if (book) {
            let data = book.results[0].data;
            setChapterData({
              book: {
                title: data.book_title.text,
                author: data.author,
                designer: data.designer,
                price: 2.99
              },
              intro: {
                  time: data.timestamp.url,
                  heading: data.introheading,
                  subheading: data.introsubheading,
                  section1: data.intro_paragraph_one,
                  section2: data.intro_paragraphs_last
              },
              transition: {
                heading: data.transition_heading,
                teaser: data.transition_teaser
              },
              partOne: {
                title: data.partonetitle,
                subtitle: data.partone_subtitle,
                heading: data.part_one_heading,
                section1: data.part_one_intro_paragraphs,
                section2: data.part_one_last_paragraphs
              }
              
          });
            setTimeout(() => {
              setChapter(1);}, 3000);
          }
      }
      fetchData();
    }, []);

    return(
        <>
        { (chapter === 0) && (
          <Loader />
          )
        }
        { (chapter === 1) && (
          <Intro
            offsetY={offsetY}
            setOffsetY={setOffsetY}
            setChapter={setChapter}
            chapterData={chapterData.intro}
            />
          )
        }

        { (chapter === 2) && (
          <Trans 
            offsetY={offsetY}
            setOffsetY={setOffsetY}
            setChapter={setChapter}
            chapterData={chapterData.transition}/>
          )
        }

        { (chapter === 3) && (
          <PartOne 
            offsetY={offsetY}
            setOffsetY={setOffsetY}
            setChapter={setChapter}
            chapterData={chapterData.partOne}/>
          )
        }
        
        { (chapter === 4) && (
          <Footer
            setOffsetY={setOffsetY}
            setChapter={setChapter}
            chapterData={chapterData.book}/>
          )
        }
        </>
    )
}

export default Story;