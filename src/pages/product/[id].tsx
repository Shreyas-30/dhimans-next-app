import ImageSlider from "@/components/ImageSlider";
import { Layout } from "@/components/Layout";
import NotFound from "@/components/NotFound";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Prisma, Product } from "@prisma/client";
import { useRouter } from "next/router";
import useSwr from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSwr<Product>(
    query.id ? `/api/product/${query.id}` : null,
    fetcher
  );

  if (error) return <NotFound />;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Layout>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1 }}
          spacing={{ base: 8, md: 10 }}
          // py={{ base: 18, md: 24 }}
        >
          <Flex>
            {/* <Image
              rounded={"md"}
              alt={"product image"}
              src={data.images[0]}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            /> */}
            <ImageSlider images={data.images} />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {data.title}
              </Heading>
              <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                ExWork Price: ₹ {data.exworkPrice}
              </Text>
              <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                FOB Price: ₹ {data.fobPrice}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider borderColor={"gray.200"} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text color={"gray.500"} fontSize={"2xl"} fontWeight={"300"}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text>
                <Text fontSize={"lg"}>{data.description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.500"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Features
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    {data.features.map((feature) => (
                      <ListItem key={feature}>{feature}</ListItem>
                    ))}
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.500"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>
                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Color:
                    </Text>
                    {data.color}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      MOQ:
                    </Text>{" "}
                    {data.moq}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Category:
                    </Text>{" "}
                    {/* {data.categories} */}
                  </ListItem>
                </List>
              </Box>
            </Stack>

            {/* <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"gray.900"}
              color={"white"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            > */}
            {/* <MdLocalShipping /> */}
            {/* <Text>2-3 business days delivery</Text> */}
            {/* </Stack> */}
          </Stack>
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
