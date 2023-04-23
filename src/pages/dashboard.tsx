import { Layout } from "@/components/Layout";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Skeleton,
  Spacer,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatUpArrow,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Category, ContactLead, Faq, Product } from "@prisma/client";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const {
    data: products,
    error,
    isLoading,
  } = useSwr<Product[]>("/api/collection", fetcher);

  const { data: inbounds } = useSwr<ContactLead[]>("/api/getLeads", fetcher);
  const { data: categories } = useSwr<Category[]>("/api/category", fetcher);
  const { data: faqs } = useSwr<Faq[]>("/api/getFaqs", fetcher);

  async function deleteProduct(id: string) {
    // throw new Error("Function not implemented.");

    const resp = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });

    const d = await resp.json();

    console.log("product delete:", d);
  }

  function handleEditClick(id: string) {
    console.log("product edit", id);
  }

  return (
    <Layout>
      <Stack spacing={10} px={4}>
        <Box>
          <Flex alignItems={"center"} gap={8}>
            <Heading mb={4}>Inbounds</Heading>
            <Text fontSize={"large"}>Count: {inbounds?.length}</Text>
          </Flex>
          {inbounds ? (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Message</Th>
                    <Th>Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {inbounds.map((lead) => (
                    <Tr key={lead.id}>
                      <Td>{lead.name}</Td>
                      <Td>{lead.email}</Td>
                      <Td>{lead.message}</Td>
                      <Td>{lead.updatedAt.toLocaleString("en-IN")}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Text>No data to display</Text>
          )}
        </Box>
        <Box>
          <Heading mb={4}>Collection</Heading>
          <Stack gap={4}>
            <Skeleton isLoaded={!isLoading}>
              <StatGroup>
                <Stat>
                  <StatLabel>Products</StatLabel>
                  <StatNumber>{products?.length}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Count
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Categories</StatLabel>
                  <StatNumber>{categories?.length}</StatNumber>
                  <StatHelpText>Count</StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>FAQs</StatLabel>
                  <StatNumber>{faqs?.length}</StatNumber>
                  <StatHelpText>Count</StatHelpText>
                </Stat>
              </StatGroup>
            </Skeleton>

            <Flex gap={4}>
              <Text fontSize={"2xl"}>Actions: </Text>

              <Link href="/uploadProduct">
                <Button> Add Product</Button>
              </Link>

              <Link href="/uploadFaq">
                <Button>Add FAQ</Button>
              </Link>
            </Flex>

            {products && (
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Description</Th>
                      <Th>ExWork Price</Th>
                      <Th>FOB Price</Th>
                      <Th>Image</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {products.map((product) => (
                      <Tr key={product.id}>
                        <Td>{product.title}</Td>
                        <Td>{product.description.slice(0, 25)}</Td>
                        <Td>₹ {product.exworkPrice}</Td>
                        <Td>₹ {product.fobPrice}</Td>
                        <Td>
                          <Popover>
                            <PopoverTrigger>
                              <Image
                                src={product.images[0]}
                                width={50}
                                height={50}
                                alt={product.title}
                              />
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader>Quick view</PopoverHeader>
                              <PopoverBody>
                                <Image
                                  src={product.images[0]}
                                  width={"100%"}
                                  height={"100%"}
                                  alt={product.title}
                                />
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>
                        <Td>
                          <DeleteIcon
                            cursor="pointer"
                            color="red.500"
                            mr="6"
                            // onClick={() => deleteProduct(product.id)}
                          />
                          <EditIcon
                            cursor="pointer"
                            // onClick={() => handleEditClick(product.id)}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
}
