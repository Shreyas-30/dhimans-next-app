import Head from "next/head";
// import "@/styles/home.css";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Link,
} from "@chakra-ui/react";

export default function HomeFaq() {
  return (
    <>
      {/* <Container maxW={"3xl"}> */}
      <section className="yawa">
        <div className="content-head">You ask, we answer</div>
        <div className="faq">
          <p>
            Get all your doubts resolved related to product, services, delivery
            or any other topic by clicking on the given links below.
          </p>
        </div>
        <div className="thumbnail">
          <div className="thumb-card">
            <div className="img-thumb">
              <a href="/faqs"><img src="/images/thumb1.png" alt="image" /></a>
            </div>
          </div>
          <div className="thumb-card">
            <div className="img-thumb">
              <a href="/faqs"><img src="/images/thumb2.png" alt="image" /></a>
            </div>
          </div>
          <div className="thumb-card">
            <div className="img-thumb">
              <a href="/faqs"><img src="/images/thumb3.png" alt="image" /></a>
            </div>
          </div>
        </div>
      </section>
      {/* </Container> */}
    </>
  );
}
