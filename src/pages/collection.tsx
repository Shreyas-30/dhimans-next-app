import { Layout } from "@/components/Layout";
import {
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import NextLink from "next/link";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Collection() {
  // const [data, setData] = useState<Product[]>();
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/collection")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  //whats the difference in fetch by useSwr vs useEffect?
  const { data, error, isLoading } = useSwr<Product[]>(
    "/api/collection",
    fetcher
  );

  if (isLoading)
    return (
      <Center h="100%" w={"100vw"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  if (!data) return <p>No data</p>;
  //   const data = await fetch("/api/collection");
  //   console.log(data.json());

  return (
    <Layout>
      <SimpleGrid spacing={4} minChildWidth="300px" spacingY={6}>
        {data.map((product) => (
          <Card maxW="400" key={product.id}>
            <CardBody>
              <Image
                src={product.images[0]}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <NextLink href="product/[id]" as={`product/${product.id}`}>
                  <Heading size="md" cursor="pointer">
                    {product.title}
                  </Heading>
                </NextLink>
                <Text>
                  {product.description.split(" ").splice(0, 15).join(" ")}...
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  $450
                </Text>
              </Stack>
            </CardBody>
            {/* <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter> */}
          </Card>
        ))}
      </SimpleGrid>
    </Layout>
  );
}

// export async function getStaticProps() {
//     const results = await cloudinary.v2.search
//       .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
//       .sort_by('public_id', 'desc')
//       .max_results(400)
//       .execute()
//     let reducedResults: ImageProps[] = []
