import React, { useEffect, useRef, useState } from 'react';
import { Container, Input, Button } from '@chakra-ui/react'
import styled from '@emotion/styled';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [height, setHeight] = useState(0);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  }

  const handleBlur = () => {
    setFocused(false);
  }

  const handleResize = () => {
    const innerHeight = window.innerHeight;
    const visualViewportHeight = window.visualViewport?.height || 0;
    const keyboardHeight = innerHeight - visualViewportHeight;
    setHeight(keyboardHeight);
  }

  const handleScroll = () => {
    const rect = document.body.getBoundingClientRect();
    const max = window.innerHeight;
    const value = max - (window.visualViewport?.height || 0) + rect.y;
    setHeight(value);
  }

  useEffect(() => {
    window.visualViewport?.addEventListener('scroll', handleScroll);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('scroll', handleScroll);
      window.visualViewport?.removeEventListener('resize', handleResize);
    }
  })

  return (
    <Container
      height="1000px"
      onScroll={handleScroll}
    >
      {height}
      <Input
        ref={inputRef}
        mb="8px"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Wrapper style={{
        position: focused ? 'fixed' : 'static',
        bottom: focused ? height : 0,
        left: 0,
        right: 0,
      }}>
        <Button
          width="100%"
        >
          클릭
        </Button>
      </Wrapper>
    </Container >
  );
}

const Wrapper = styled.div``;

export default App;
