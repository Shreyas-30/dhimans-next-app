import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface sliderProps {
  images: string[];
}

function ImageSlider({ images }: sliderProps) {
  //   const slides = [
  //     "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
  //     "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  //     "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
  //     "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
  //     "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
  //   ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <Box
      position="relative"
      className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group"
    >
      <Image
        src={images[currentIndex]}
        borderRadius="2xl"
        objectFit={"cover"}
        // className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        alt={images[currentIndex].slice(-20)}
      />
      {/* Left Arrow */}
      <ChevronLeftIcon
        // color={"white"}
        boxSize={10}
        pos="absolute"
        top={"45%"}
        left="-10"
        cursor={"pointer"}
        onClick={prevSlide}
      />
      {/* Right Arrow */}
      <ChevronRightIcon
        // color={"white"}
        boxSize={10}
        pos="absolute"
        top={"45%"}
        right="-10"
        cursor={"pointer"}
        onClick={nextSlide}
      />
      {/* className="flex top-4 justify-center py-2" */}
      <Flex
        mt={2}
        justifyContent="center"
        py={2}
        // position="absolute"
        // bottom={5}
        // left="45%"
        gap={2}
      >
        {images.map((slide, slideIndex) => (
          <Box
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            cursor={"pointer"}
          >
            <FontAwesomeIcon icon={faCircle} fontSize="xs" />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default ImageSlider;
