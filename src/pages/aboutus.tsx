import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { Layout } from "@/components/Layout";

export default function Aboutus() {
  return (
    <Layout>
      <Stack textAlign="center" py={10} px={6} alignItems="center" minH="60vh">
        <Image src="/logo.png" height="200" width="400" alt="" />

        <Heading as="h2" size="xl" mt={6} mb={2}>
          About us
        </Heading>
        <Text color={"gray.700"} fontSize="xl">
          We are a Maharashtra-based export company providing quality
          handicrafts and Jaggery. Our commitment to trust, transparency, and
          uncompromising quality sets us apart. With a focus on customization,
          we offer a unique and personalized experience for our customers.
        </Text>
      </Stack>
    </Layout>
  );
}
