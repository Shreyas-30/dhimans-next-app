import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export type WrapperVariant = "small" | "regular";

interface LayoutProps {
  children: React.ReactNode;
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <>
      <NavBar />
      <Box
        // mt={8}
        mx="auto"
        maxW={variant === "regular" ? "1000px" : "400px"}
        w="100%"
        p="2"
        my={8}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};
