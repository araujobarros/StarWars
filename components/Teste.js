import React, { useEffect, useRef, useState } from 'react';
// https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react
// https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/
function Teste() {
  const positions = useRef({
    position: 'teste',
  });
  // const [position, setPosition] = useState('');
  const [size, setSize] = useState('0.9em');

  // useEffect(() => {
  //   window.addEventListener('scroll',
  //     () => setSize(
  //       (`${parseFloat(size) - 0.05}em`),
  //     ));
  // }, []);
  // useEffect(() => {
  //   setPosition(inputRef.current.getBoundingClientRect().y);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('scroll',
  //     () => setPosition(
  //       (inputRef.current.getBoundingClientRect().y),
  //     ));
  // }, []);
  // console.log(hooks);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }
  const { height } = useWindowDimensions();
  console.log(height);

  function createRef(el) {
    if (!el) return el;
    console.log(el.getClientRects()); // prints 200px
    const position = el.getBoundingClientRect().y;
    console.log(position);
    const dinamicFontSize = `${el.getBoundingClientRect().y / 30}px`;
    console.log(dinamicFontSize);
    if (position <= height) {
      console.log('position menor que height');
      el.style.fontSize = dinamicFontSize;
      window.addEventListener('scroll',
        () => {
          console.log('scrol sendo usado');
          el.style.fontSize = `${el.getBoundingClientRect().y / 30}px`;
        });
    } else {
      console.log('position maior que height');
      el.style.fontSize = `${height / 30}px`;
    }
  }

  return (
    <div>
      <div
        ref={ createRef }
        // ref={ () => {
        //   positions = { ...positions, position2: 'teste2' };
        //   return positions.position2;
        // } }
        style={ {
          color: 'yellow',
          display: 'inline-block',
          width: '200px',
          height: '100px',
          // fontSize: `${parseFloat(position) / 20}px`,
        } }
      >
        Teste
      </div>
      {/* <button type="button" onClick={ () => console.log(divTeste) }>clickme</button> */}
    </div>
  );
}

export default Teste;
