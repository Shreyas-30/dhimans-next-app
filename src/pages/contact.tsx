import { MyTextInput } from "@/components/InputField";
import { Layout } from "@/components/Layout";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { BsInstagram, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { MdEmail, MdFacebook, MdLocationOn, MdPhone } from "react-icons/md";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
});

export default function Contact() {
  const toast = useToast();
  return (
    <Layout>
      <Container
        // bg="#222E50"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
        borderRadius={"xl"}
        boxShadow="xl"
      >
        <Flex>
          <Box
            bg="#1C3144"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
            boxShadow="2xl"
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text
                      mt={{ sm: 3, md: 3, lg: 5 }}
                      color="gray.400"
                      fontSize="xl"
                    >
                      Fill up the form to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3}>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<MdPhone color="#1970F1" size="20px" />}
                        >
                          +91-9405823171
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<MdEmail color="#1970F1" size="20px" />}
                        >
                          chinmaya.dhiman@gmail.com
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={
                            <MdLocationOn color="#1970F1" size="20px" />
                          }
                        >
                          Amravati, India
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <Link href="https://www.facebook.com/people/Dhimans/100089375347119/">
                        <IconButton
                          aria-label="facebook"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<MdFacebook size="28px" />}
                        />
                      </Link>
                      <Link href={"https://www.linkedin.com/company/dhiman-s/"}>
                        <IconButton
                          aria-label="Linkedin"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<BsLinkedin size="28px" />}
                        />
                      </Link>
                      <Link href={"https://www.instagram.com/dhiman_exports/"}>
                        <IconButton
                          aria-label="instagram"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<BsInstagram size="28px" />}
                        />
                      </Link>
                      <Link href={"https://wa.me/9405823171"}>
                        <IconButton
                          aria-label="whatsapp"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<BsWhatsapp size="28px" />}
                        />
                      </Link>
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <Formik
                        initialValues={{ name: "", email: "", message: "" }}
                        validationSchema={ContactSchema}
                        onSubmit={async (values, { resetForm }) => {
                          //   console.log({ ...values });
                          const response = await fetch("/api/contact", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                          });
                          if (response.status != 200) {
                            toast({
                              title: "Oops!",
                              description:
                                "Something went wrong. Please try again or connect with us over our other social media channels",
                              status: "error",
                              duration: 9000,
                              isClosable: true,
                            });
                            throw new Error("Failed to save form data");
                          }

                          toast({
                            title: "Message sent!",
                            description:
                              "Thanks for contacting us. We shall get back to you very soon.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          });
                          console.log("Form data saved successfully");
                          resetForm();
                        }}
                      >
                        {({ isSubmitting }) => (
                          <>
                            <Form>
                              <MyTextInput
                                name="name"
                                placeholder="Jane Doe"
                                label="Name"
                              />
                              <Box mt={4}>
                                <MyTextInput
                                  name="email"
                                  placeholder="jane@mtrader.com"
                                  label="Email"
                                />
                              </Box>
                              <Box mt={4}>
                                <MyTextInput
                                  textarea
                                  name="message"
                                  placeholder="Add message here"
                                  label="Message"
                                />
                              </Box>

                              <Button
                                type="submit"
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                mt={4}
                              >
                                Send message
                              </Button>
                            </Form>
                          </>
                        )}
                      </Formik>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
}
