import { MyTextInput } from "@/components/InputField";
import { Layout } from "@/components/Layout";
import { cloudinaryUpload } from "@/types";
import {
  Stack,
  Heading,
  Box,
  Button,
  FormLabel,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadFaq() {
  const [image, setImage] = useState<File>();
  const toast = useToast();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });
  const { status } = useSession();

  let body = null;

  if (status === "authenticated") {
    body = (
      <Stack p={2} h="100%">
        <Box textAlign="center" mb={2}>
          <Heading>Add FAQ</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Formik
            initialValues={{
              question: "",
              answer: "",
              image: "",
              video: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              //   console.log({ ...values });
              let imgUrl = "";
              if (image) {
                const signResponse = await fetch("/api/getSign");
                const signData = await signResponse.json();

                const formData = new FormData();

                const cloud_name = "dlmv69lmo";
                const api_key = "324762793819118";
                const url =
                  "https://api.cloudinary.com/v1_1/" +
                  cloud_name +
                  "/image/upload";

                formData.append("file", image);
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

                imgUrl = (await data).secure_url;
              }
              const payload = { ...values, image: imgUrl };

              const response = await fetch("/api/addFaq", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
              if (!response.ok) {
                throw new Error("Failed to save form data");
              }

              console.log("Form data saved successfully");
              toast({
                title: "Success!",
                description: "FAQ was added.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              setImage(undefined);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <>
                <Form>
                  <MyTextInput
                    name="question"
                    placeholder="Question"
                    label="Question"
                  />
                  <Box mt={4}>
                    <MyTextInput
                      textarea
                      name="answer"
                      placeholder="Add answer here"
                      label="FAQ answer"
                    />
                  </Box>
                  <Box mt={4}>
                    <MyTextInput
                      name="video"
                      placeholder="Add video url here"
                      label="Video Link (optional)"
                    />
                  </Box>

                  <FormLabel htmlFor="image" mt={4}>
                    Image (optional)
                  </FormLabel>
                  <Box
                    {...getRootProps()}
                    borderWidth={2}
                    borderStyle="dashed"
                    borderRadius={8}
                    p={4}
                    cursor="pointer"
                  >
                    <input {...getInputProps()} id="image" name="image" />
                    <Box>
                      Drag &apos;n&apos; drop some image here, or click to
                      select file
                    </Box>
                    <Box fontSize="sm">(Only 1 image supported)</Box>
                  </Box>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    mt={4}
                  >
                    Add
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </Box>

        {image != undefined ? (
          <Box mt={2}>
            <Heading as="h2" size="xl">
              Uploaded image preview:
            </Heading>
            <Box mt={2}>
              <li>
                {image.name} - {(image.size / (1024 * 1024)).toFixed(2)} MB
              </li>
              <Image
                src={URL.createObjectURL(image)}
                objectFit="cover"
                alt={image.name}
              />
            </Box>
          </Box>
        ) : (
          <Text mt={2}>
            No image uploaded yet. Image preivew will appear here
          </Text>
        )}
      </Stack>
    );

    return <Layout>{body}</Layout>;
  } else
    return (
      <Layout>
        <Heading as="h2">Please login first</Heading>
      </Layout>
    );
}
