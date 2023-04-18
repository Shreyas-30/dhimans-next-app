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

export default function EnquiryForm() {
  return (
    <>
      {/* <Container maxW={"3xl"}> */}
      <section className="contact" id="contact">
        <div className="enquiry-head">
          <span className="heading">Enquiry form</span>
        </div>
        <div className="enquiry">
          <form >
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="jane@trade.com"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                name="phone"
                placeholder="918888888888"
                maxLength={15}
                title="country code + phone number "
                required
              />
            </div>

            <div className="field">
              <label htmlFor="country">Country</label>
              <input type="text" name="country" id="country" required />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                cols={30}
                rows={10}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="map">
            <span>Find us at:</span>
            <div className="frame">
              <iframe
                src="http://www.google.com/maps?q=20.920715, 77.748138&z=15&output=embed"
                // style={"border: 0; border-radius: 5px"}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* </Container> */}
    </>
  );
}
