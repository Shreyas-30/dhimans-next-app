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

export default function certifications() {
  return (
    <>
      {/* <Container maxW={"3xl"}> */}
      <section className="certifications">
        <div className="cert-head">Memberships and Certifications</div>
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img src="/images/certifications/apeda.png" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/dgft.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/fda.png" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/fieo.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/gcci.png" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/gmp.png" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/gstc.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/halal.png" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/msme.png" alt="" />
            </div>
            <div className="slide">
              <img src="/images/certifications/spbi.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* </Container> */}
    </>
  );
}
