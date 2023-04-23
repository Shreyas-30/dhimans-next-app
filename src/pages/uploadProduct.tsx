import { MyTextInput } from "@/components/InputField";
import { Layout } from "@/components/Layout";
import AddCategoryModal from "@/components/addCateogry";
import { cloudinaryUpload } from "@/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Category } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UploadProduct() {
  const [images, setImages] = useState<File[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setImages(acceptedFiles);
    },
  });

  const { data: session, status } = useSession();
  const { data: category, error } = useSwr<Category[]>(
    "/api/category",
    fetcher
  );

  let body = null;

  if (status === "authenticated") {
    body = (
      <>
        <Stack p={2}>
          <Box textAlign="center">
            <Heading>Add New Product</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{
                title: "",
                description: "",
                fobPrice: "",
                exworkPrice: "",
                moq: "",
                color: "",
                features: "",
                category: [],
                images: [],
              }}
              onSubmit={async (values, { resetForm }) => {
                console.log({ ...values });

                const signResponse = await fetch("/api/getSign");
                const signData = await signResponse.json();

                const formData = new FormData();

                const cloud_name = "dpzazvckq";
                const api_key = "387695247418433";
                const url =
                  "https://api.cloudinary.com/v1_1/" +
                  cloud_name +
                  "/image/upload";

                let imgUrls: String[] = [];

                for (let i = 0; i < images.length; i++) {
                  let file = images[i];
                  formData.append("file", file);
                  formData.append("api_key", api_key);
                  formData.append("timestamp", signData.timestamp);
                  formData.append("signature", signData.signature);
                  formData.append(
                    "eager",
                    "c_pad,h_300,w_400|c_crop,h_200,w_260"
                  );
                  formData.append("folder", "signed_upload_demo_form");

                  const data = fetch(url, {
                    method: "POST",
                    body: formData,
                  })
                    .then((response) => {
                      // console.log(response);
                      return response.text();
                    })
                    .then((data) => {
                      // console.log(data);
                      return JSON.parse(data) as cloudinaryUpload;
                    });

                  //   // console.log(await data);

                  //   // based on the public_id and the version that the (potentially malicious) user is submitting...
                  //   // we can combine those values along with our SECRET key to see what we would expect the signature to be if it was innocent / valid / actually coming from Cloudinary
                  //   //   const expectedSignature = cloudinary.utils.api_sign_request({ public_id: req.body.public_id, version: req.body.version }, cloudinaryConfig.api_secret)

                  //   // We can trust the visitor's data if their signature is what we'd expect it to be...
                  //   // Because without the SECRET key there's no way for someone to know what the signature should be...
                  //   //   if (expectedSignature === req.body.signature) {
                  //   // Do whatever you need to do with the public_id for the photo

                  imgUrls.push((await data).secure_url);
                }

                const response = await fetch("/api/addNewProduct", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ...values, images: imgUrls }),
                });
                if (!response.ok) {
                  toast({
                    title: "Oops!",
                    description: "Failed to save data. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                  throw new Error("Failed to save form data");
                }

                toast({
                  title: "Success!",
                  description: "Product added to collections.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                console.log("Form data saved successfully");

                setImages([]);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <>
                  <Form>
                    <MyTextInput
                      name="title"
                      placeholder="Title"
                      label="Title"
                    />
                    <Box mt={4}>
                      <MyTextInput
                        textarea
                        name="description"
                        placeholder="Add product description here"
                        label="Product Description"
                      />
                    </Box>
                    <Box mt={4}>
                      <MyTextInput
                        name="fobPrice"
                        placeholder="499"
                        label="FOB Price"
                      />
                    </Box>
                    <Box mt={4}>
                      <MyTextInput
                        name="exworkPrice"
                        placeholder="649"
                        label="ExWork Price"
                      />
                    </Box>
                    <Box mt={4}>
                      <MyTextInput
                        name="moq"
                        placeholder="1000"
                        label="Minimum order quantity (MOQ)"
                      />
                    </Box>
                    <Box mt={4}>
                      <MyTextInput
                        name="color"
                        placeholder="Silver"
                        label="Color"
                      />
                    </Box>
                    <Box mt={4}>
                      <MyTextInput
                        name="features"
                        placeholder="Spray painted, LED lighting, Light weight"
                        label="Features (use comma seperation to add multiple features)"
                      />
                    </Box>
                    <Box mt={4}>
                      <FormLabel htmlFor="category">Category</FormLabel>
                      {/* Todo: reset form is not applying to checkbox */}
                      {category ? (
                        <CheckboxGroup colorScheme="green">
                          <Stack spacing={[1, 5]} direction={["column", "row"]}>
                            {category.map((category) => (
                              <Field
                                as={Checkbox}
                                name="category"
                                key={category.id}
                                value={category.id}
                              >
                                {category.name}
                              </Field>
                            ))}
                            <Button size={"sm"} onClick={onOpen}>
                              <AddIcon mr={2} /> new cateogry
                            </Button>
                          </Stack>
                        </CheckboxGroup>
                      ) : (
                        <Box>Add new category</Box>
                      )}
                    </Box>
                    <Box mt={4}>
                      <FormLabel htmlFor="images">Images</FormLabel>
                      <Box
                        {...getRootProps()}
                        borderWidth={2}
                        borderStyle="dashed"
                        borderRadius={8}
                        mt={4}
                        p={4}
                        cursor="pointer"
                      >
                        <input {...getInputProps()} id="images" name="images" />
                        {images.length === 0 ? (
                          <Box>
                            <Box>
                              Drag &apos;n&apos; drop some files here, or click
                              to select files
                            </Box>
                          </Box>
                        ) : (
                          <Box>
                            <Box>{images.length} files selected</Box>
                            <Box fontSize="sm">
                              (Click to add more images or drag to rearrange)
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Stack direction={"row"} spacing="10" mt={4}>
                      <Button
                        type="submit"
                        colorScheme="teal"
                        isLoading={isSubmitting}
                      >
                        Add
                      </Button>
                      {/* <Button
                      type="reset"
                      colorScheme="gray"
                      //   isLoading={isSubmitting}
                    >
                      Reset
                    </Button> */}
                    </Stack>
                  </Form>
                  <Box mt={4}>
                    <Heading as="h2" size="xl">
                      Image Preview:
                    </Heading>
                    <SimpleGrid columns={2} spacing={10} my={4}>
                      {images.map((file) => (
                        <Box key={file.name}>
                          <li>
                            {file.name} -{" "}
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </li>
                          <Image
                            src={URL.createObjectURL(file)}
                            //   boxSize="500"
                            objectFit="cover"
                            alt={file.name}
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                </>
              )}
            </Formik>
          </Box>
        </Stack>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddCategoryModal />
            </ModalBody>

            {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    body = (
      <Heading as="h2" size="xl">
        Please login first
      </Heading>
    );
  }

  return <Layout>{body}</Layout>;
}
