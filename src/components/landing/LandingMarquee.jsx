import { useEffect, useRef, useState, useMemo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";

import p1 from "../../assets/photos/1.jpg";
import p2 from "../../assets/photos/2.jpg";
import p3 from "../../assets/photos/3.jpg";
import p4 from "../../assets/photos/4.jpg";
import p5 from "../../assets/photos/5.jpg";
import p6 from "../../assets/photos/6.jpg";
import p7 from "../../assets/photos/7.jpg";
import p8 from "../../assets/photos/8.jpg";
import p9 from "../../assets/photos/9.jpg";

function wrap(min, max, value) {
  const range = max - min;
  return (((value - min) % range) + range) % range + min;
}

const MotionDiv = motion.div;

const defaultTweets = [
  {
    photo: p1,
    username: "dutta.rimon",
    name: "Rimon Dutta",
    text: "reactbits has got to be the most artistic ui component lib I've seen in a while 🤌",
    link: "https://facebook.com/dutta.rimon/"
  },
  {
    photo: p2,
    username: "rimon.singha.90",
    name: "Rimon Singha",
    text: "This is so cool - animated components collection 😀🔥",
    link: "https://www.facebook.com/rimon.singha.90/"
  },
  {
    photo: p3,
    username: "nun",
    name: "Rui",
    text: "Literally the coolest react library in React",
    link: "#",
  },
  {
    photo: p4,
    username: "heybruh",
    name: "Duddy",
    text: "This website is amaizing. Thank me later devs",
    link: "https://github.com/rimondutta/"
  },
  {
    photo: p5,
    username: "শিশির",
    name: "Yuvraj Singha",
    text: "Really impressed by reactbits. Check it out.",
    link: "https://www.facebook.com/profile.php?id=100053040380614"
  },
  {
    photo: p6,
    username: "rimondutta",
    name: "Rimon Dutta",
    text: "This UI components library is mind blowing!",
    link: "https://github.com/rimondutta/"
  },
  {
    photo: p7,
    username: "Bappa Raj",
    name: "Joy Devnath",
    text: "Just fell in love with React Bits",
    link: "https://www.facebook.com/joy.devnath.96558"
  },
  {
    photo: p8,
    username: "Bro",
    name: "Bro",
    text: "Para los que trabajan en React, tírenle un ojo a este recurso!",
    link: "https://github.com/rimondutta"
  },
  {
    photo: p9,
    username: "Lorem",
    name: "Lorem",
    text: "This React library is absolutely amazing!!!",
    link: "#"
  }
];

const Card = ({ tweet, rotation, isFirst, onPause, onResume }) => (
  <Flex
    as="a"
    href={tweet.link}
    rel="noreferrer"
    target="_blank"
    direction="column"
    justifyContent="flex-start"
    className="tweet-card"
    px="6"
    py="6"
    bg="#060606"
    border="1px solid #333"
    borderRadius="25px"
    boxShadow="md"
    ml={isFirst ? 0 : "20px"}
    transform={`rotate(${rotation}deg)`}
    onMouseEnter={onPause}
    onMouseLeave={onResume}
  >
    <Flex gap={4} alignItems="center" mb={6}>
      <Image src={tweet.photo} alt={tweet.username} borderRadius="full" boxSize="50px" />
      <Flex direction="column">
        <Text fontWeight={900}>{tweet.name}</Text>
        <Text fontSize=".7rem" color="#999">
          {tweet.username}
        </Text>
      </Flex>
    </Flex>
    <Text fontWeight={300} lineHeight={1.2} color="#fff" whiteSpace="wrap">
      {tweet.text}
    </Text>
  </Flex>
);

const LandingMarquee = ({ tweets = defaultTweets, speed = 50 }) => {
  const trackRef = useRef(null);
  const baseX = useMotionValue(0);
  const [fullWidth, setFullWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  const repeatedTweets = useMemo(() => [...tweets, ...tweets], [tweets]);
  const tweetRotations = useMemo(
    () => tweets.map((_, i) => (i % 2 === 0 ? 5 : -5)),
    [tweets]
  );

  useEffect(() => {
    if (trackRef.current) {
      setFullWidth(trackRef.current.scrollWidth);
    }
  }, [repeatedTweets]);

  const halfWidth = fullWidth / 2;
  const x = useTransform(baseX, (v) => wrap(-halfWidth, 0, v));

  useAnimationFrame((_, delta) => {
    if (!paused && halfWidth > 0) {
      const moveBy = (speed * delta) / 1000;
      baseX.set(baseX.get() - moveBy);
    }
  });

  return (
    <Box position="relative" w="100vw" overflow="hidden" className="marquee-container">
      <MotionDiv ref={trackRef} className="marquee-track" style={{ x }}>
        {repeatedTweets.map((tweet, index) => {
          const rotation = tweetRotations[index % tweets.length];
          return (
            <Card
              key={index}
              tweet={tweet}
              rotation={rotation}
              isFirst={index === 0}
              onPause={() => setPaused(true)}
              onResume={() => setPaused(false)}
            />
          );
        })}
      </MotionDiv>
      <Box className="gradient-overlay" position="absolute" pointerEvents="none" />
    </Box>
  );
};

export default LandingMarquee;
