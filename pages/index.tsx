import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  isLoading: boolean;
  error: string;
  values: FormValues;
}
const initValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

const initState: FormState = {
  isLoading: false,
  error: "",
  values: initValues,
};

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }: any) => {
    setTouched((prev) => ({ ...prev, [target.name]: true }));
  };

  const handleChange = ({ target }:any) =>
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [target.name]: target.value },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <Container maxW="450px" mt={12}>
      <Heading>Contact</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          errorBorderColor="red.300"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {touched.name && !values.name && (
          <FormErrorMessage>Required</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {touched.email && !values.email && (
          <FormErrorMessage>Required</FormErrorMessage>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={touched.message && !values.message}
        mb={5}
      >
        <FormLabel>Message</FormLabel>
        <Textarea
          typeof="text"
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {touched.message && !values.message && (
          <FormErrorMessage>Required</FormErrorMessage>
        )}
      </FormControl>

      <Button
        variant="outline"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={
          !values.name || !values.email || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}
