import { EyeIcon, EyeOffIcon, FormControl, Heading, HStack, Input, InputField, InputIcon, InputSlot, Text, VStack } from "@gluestack-ui/themed";
import { Container } from "./style";
import { useContext, useEffect, useState } from "react";
import ButtonProps from "../../components/Button";
import { Keyboard, TouchableOpacity } from "react-native";
import AuthContext from "../../config/auth";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation: NativeStackNavigationProp<any, any> = useNavigation();
  const { signIn } = useContext(AuthContext);
  const [user, setUser] = useState<iUser>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      await signIn({ email: user.email, password: user.password });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>

      <HStack width='100%' alignItems="center" justifyContent="center" marginTop={keyboardOpen ? 100 : 150}>
        <Text fontFamily="JostMedium" color="$white" fontSize={60}> Todolist </Text>
      </HStack>

      <HStack width='100%' paddingLeft={20} paddingRight={20} marginTop={40}>
        <FormControl flex={1}>
          <VStack>
            <VStack space="xs">
              <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
                Email:
              </Text>
              <Input height={50} $active-borderColor="$white" $focus-borderColor="white" bg="$white" >
                <InputField
                  defaultValue={user.email}
                  onChangeText={(value: string) => setUser((prevState) => ({
                    ...prevState,
                    email: value,
                  }))} type="text" color="#101025" fontFamily="JostRegular" fontSize={18} />
              </Input>
            </VStack>

            <VStack space="xs" marginTop={29}>
              <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
                Senha:
              </Text>
              <Input height={50} $active-borderColor="$white" $focus-borderColor="white" bg="$white">
                <InputField
                  defaultValue={user.password}
                  onChangeText={(value: string) => setUser((prevState) => ({
                    ...prevState,
                    password: value,
                  }))}
                  color="#101025" fontFamily="JostRegular" type={showPassword ? "text" : "password"} fontSize={18} />
                <InputSlot pr="$4" onPress={handleState}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="#101025"
                  />
                </InputSlot>
              </Input>
            </VStack>

          </VStack>
        </FormControl>
      </HStack>

      <HStack width="100%" justifyContent="center" alignItems="center" >
        <ButtonProps title="Entrar" onPress={handleSubmit} />
      </HStack>

      <HStack justifyContent="center" alignItems="center" paddingLeft={60} paddingRight={60} marginTop={10} >
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('createUser')}>
          <Text fontFamily="JostRegular" color="$white" textAlign="center">Organize seu dia!</Text>
          <Text fontFamily="JostRegular" color="#acacf3" textAlign="center" fontWeight={"$thin"}>Clique aqui e cadastre-se agora para começar.</Text>
        </TouchableOpacity>
      </HStack>
    </Container>
  )
}