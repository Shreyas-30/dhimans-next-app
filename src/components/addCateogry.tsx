import { cloudinaryUpload } from "@/types";
import {
  Stack,
  Heading,
  FormLabel,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import image from "next/image";
import { MyTextInput } from "./InputField";

export default function AddCategoryModal() {
  const toast = useToast();
  return (
    <Box textAlign="left" mb={2}>
      <Formik
        initialValues={{
          category: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log({ ...values });

          const resp = await fetch("/api/addCategory", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values }),
          });
          // const response = await fetch("/api/addCategory", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: { values.cateogry },
          // });
          // if (!response.ok) {
          //   throw new Error("Failed to save form data");
          // }

          console.log("Form data saved successfully");
          toast({
            title: "Success!",
            description: "Category was added.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <MyTextInput
                name="category"
                placeholder="enter name for category"
                label="Category name"
              />

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
  );
}
