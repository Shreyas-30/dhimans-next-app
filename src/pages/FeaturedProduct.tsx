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

export default function FeaturedProduct() {
  return (
    <>
    {/*    <Container maxW={"3xl"}> */}
      <section>
        <div className="featured-header">
          <a href="#">Featured</a>
        </div>
        <div className="feature-container">
            <div className="prod-1">
              <a href="/collection">
                <img src="/images/1/DSC1.jpg" alt="" className="featured-img" />
                <img src="/images/2/DSC1.JPG" alt="" className="featured-img" />
                <img src="/images/3/DSC1.jpg" alt="" className="featured-img" />
                <img src="/images/4/DSC1.jpg" alt="" className="featured-img" />
                <img src="/images/feature-3.jpg" alt="" className="featured-img" />
              </a>
            </div>
  
            <div className="prod-4">
              <a href="/collection">
                <div className="prod-2">
                  <img src="/images/feature-2.jpg" alt="" className="featured-img" />
                  <img src="/images/5/DSC2.JPG" alt="" className="featured-img" />
                  <img src="/images/5/DSC1.JPG" alt="" className="featured-img" />
                  <img src="/images/5/DSC3.JPG" alt="" className="featured-img" />
                  <img
                    src="/images/6/homecenter.jpeg"
                    alt=""
                    className="featured-img"
                  />
                </div>
              </a>
              <a href="/collection">
                <div className="prod-3">
                  <img src="/images/feature-1.jpg" alt="" className="featured-img" />
                  <img src="/images/5/DSC2.JPG" alt="" className="featured-img" />
                  <img src="/images/5/DSC1.JPG" alt="" className="featured-img" />
                  <img src="/images/5/DSC3.JPG" alt="" className="featured-img" />
                  <img
                    src="/images/6/homecenter.jpeg"
                    alt=""
                    className="featured-img"
                  />
                </div>
              </a>
            </div>
        </div>
      </section>
       {/* </Container> */}
    </>
  );
}
