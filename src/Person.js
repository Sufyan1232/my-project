import { useState, useEffect } from "react";
import styled from "styled-components";
import Post from './post/Post';
import { db } from './firebase';

const Container = styled.div`
  width: 40%;
  height: 120vh;
  display: flex;
    background-color: white;
    position: relative;
    overflow: hidden;
    padding: 20px;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props=> props.direction === "left" && "10px"};
  right: ${props=> props.direction === "right" && "10px"};
  margin:auto;
  cursor: pointer;
  opacity: 0.5;
  z-index:2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform:translateX(${props=>props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${props=>props.bg};
`;



const Person = ({ username, caption, imageUrl }) => {
      const [slideIndex, setSlideIndex] = useState(0)
      const handleClick = (direction) => {

        if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      }
      };


      const [posts, setPosts] = useState([]);

    useEffect(() => {
        //this is where the code run
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
       id: doc.id, 
       post: doc.data()
      }
       )));
    })
      },
      
      []);
  return (
    <Container>
     <Arrow direction="left" onClick={()=> handleClick("left")}>
        <img width="30px" src="https://img.icons8.com/external-febrian-hidayat-outline-color-febrian-hidayat/512/external-left-arrow-user-interface-febrian-hidayat-outline-color-febrian-hidayat.png"/>
     </Arrow>
     <Wrapper slideIndex={slideIndex}>
     {
    posts.map(({id, post}) => (
      <Slide key={post.id}>
         
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />   
        </Slide>
        ))
    }
     </Wrapper>
     <Arrow direction="right" onClick={()=> handleClick("right")}>
        <img width="30px" src="https://img.icons8.com/external-febrian-hidayat-outline-color-febrian-hidayat/512/external-right-arrow-user-interface-febrian-hidayat-outline-color-febrian-hidayat.png"/>
     </Arrow>

    

    </Container>
  );
};

export default Person;
