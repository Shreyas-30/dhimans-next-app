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

export default function PaymentShip() {
  return (
    <>
      {/* <Container maxW={"3xl"}> */}
      <div className="pay-head">Payment,Shipment and T&C</div>
      <section className="payment">
        <div className="pay-text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt veritatis ea fugit corporis eum voluptatibus ad harum quod reiciendis, placeat est
           quisquam id adipisci iure natus asperiores velit perferendis blanditiis.</p>
        <a href="#"><button className="safety-btn">Payment, Shipping and T&C</button></a>
        </div>
        <div className="pay-img">
          <img src="/images/thumb1.png" alt="image"/>
        </div>
      </section>
      {/* </Container> */}
    </>
  );
}
