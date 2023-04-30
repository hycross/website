import { Container } from "@chakra-ui/react";

const AppContainer = ({ children }:any) => {
  return (
    <Container textAlign="center" fontSize="2xl" p="1em">
      {children}
    </Container>
  );
};
export default AppContainer;
