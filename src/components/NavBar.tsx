// import { signIn, signOut, useSession } from "next-auth/react";
// import NextLink from "next/link";
// import { Box, Button, Flex, Heading, Image, Link } from "@chakra-ui/react";
// import router from "next/router";

// export default function NavBar() {
//   const { data: session, status } = useSession();

//   let body = null;

//   if (status === "loading") {
//   } else if (status === "unauthenticated") {
//     //user not logged in
//     body = (
//       <>
//         {/* <NextLink href="/login">
//           <Link mr={2}>login</Link>
//         </NextLink> */}
//         <Button as={Link} href="/collection" mr={4}>
//           Browse Collection
//         </Button>
//         <Button
//           onClick={async () => {
//             await signIn();
//             // router.reload();
//           }}
//           // isLoading={logoutFetching}
//           variant={"link"}
//           mr={2}
//         >
//           Sign in
//         </Button>

//         {/* <Link as={NextLink} href="/register">
//           register
//         </Link> */}
//       </>
//     );
//   } else {
//     //user is logged in
//     body = (
//       <Flex align="center">
//         <Button as={Link} href="/collection" mr={4}>
//           Browse Collection
//         </Button>
//         <Button as={Link} href="/uploadProduct" mr={4}>
//           Add product
//         </Button>
//         <Button as={Link} href="/faqs" mr={4}>
//           FAQs
//         </Button>

//         {session?.user?.image ? (
//           <Image
//             src={session.user.image}
//             borderRadius="full"
//             boxSize="40px"
//             mr={2}
//           />
//         ) : (
//           <></>
//         )}

//         <Box mr={2}>{session?.user?.name?.split(" ")[0]}</Box>
//         <Button
//           onClick={async () => {
//             await signOut();
//             router.reload();
//           }}
//           // isLoading={logoutFetching}
//           variant={"link"}
//         >
//           logout
//         </Button>
//       </Flex>
//     );
//   }

//   return (
//     <Flex zIndex={1} position={"sticky"} top={1} p={4}>
//       <Flex flex={1} m="auto" maxW={1000} align="center">
//         <Link as={NextLink} href="/">
//           <Heading>Dhimans</Heading>
//         </Link>

//         <Box ml={"auto"}>{body}</Box>
//       </Flex>
//     </Flex>
//   );
// }

import { AddIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { faChartSimple, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode } from "react";

const Links = ["Collections", "About us", "FAQs"];
interface NavProps {
  children: ReactNode;
  href: string;
}
const NavLink = ({ children, href }: NavProps) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          h={20}
          alignItems={"center"}
          justifyContent={"space-between"}
          margin={"auto"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/">
              <Box>
                <Image
                  src="/logo.png"
                  alt="Dhimans"
                  width="200"
                  height="100"
                  priority
                />
              </Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink href="/collection">Collections</NavLink>
              <NavLink href="/faqs">FAQs</NavLink>
              <NavLink href="/contact">Lets connect</NavLink>
              <NavLink href="/aboutus">About us</NavLink>
            </HStack>
          </HStack>

          {session?.user ? (
            <Flex alignItems={"center"}>
              <Link href="/dashboard">
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  // onClick={() => signOut()}
                >
                  <FontAwesomeIcon icon={faChartSimple} />
                  <Text ml={2}>Dashboard</Text>
                </Button>
              </Link>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  {session.user.image ? (
                    <Avatar size={"sm"} src={session.user.image} />
                  ) : (
                    <Avatar
                      size={"sm"}
                      src={
                        "https://commons.wikimedia.org/wiki/File:No_avatar.png#/media/File:No_avatar.png"
                      }
                      border="2px"
                      borderColor="black"
                    />
                  )}
                </MenuButton>
                <MenuList>
                  <Link href="/uploadProduct">
                    <MenuItem icon={<AddIcon />}>Add Product</MenuItem>
                  </Link>
                  <Link href="/uploadFaq">
                    <MenuItem icon={<AddIcon />}>Add FAQ</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                // leftIcon={<AddIcon />}
                onClick={() => signIn()}
              >
                <FontAwesomeIcon icon={faUser} /> <Text ml={2}>Login</Text>
              </Button>
            </>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink href="/collection">Collections</NavLink>
              <NavLink href="/faqs">FAQs</NavLink>
              <NavLink href="/aboutus">About us</NavLink>
              <NavLink href="/contact">Lets connect</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
