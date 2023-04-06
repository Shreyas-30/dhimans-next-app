import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Faq } from "@prisma/client";
import { useEffect, useState } from "react";

export default function faqs() {
  const [data, setData] = useState<Faq[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/getFaqs")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <Layout>
      <Box minH={"70vh"}>
        <Accordion defaultIndex={[1]} allowMultiple>
          {data.map((faq) => {
            return (
              <AccordionItem key={faq.id}>
                <Heading as="h2">
                  <AccordionButton _expanded={{ bg: "tomato", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel pb={4}>
                  <Box px={2}>{faq.answer}</Box>
                  {faq.video ? (
                    <Box
                      mx="auto"
                      as="iframe"
                      src={faq.video}
                      width="80%"
                      sx={{
                        aspectRatio: "16/9",
                      }}
                      allow="autoplay"
                      mt={2}
                    />
                  ) : (
                    <></>
                  )}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </Layout>
  );
}
