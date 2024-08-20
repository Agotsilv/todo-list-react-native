import { useContext, useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, FormControl, HStack, Input, InputField, InputIcon, VStack } from "@gluestack-ui/themed";
import { Container } from "./style";
import { View, Text } from "@gluestack-ui/themed";
import { Keyboard } from "react-native";
import { InputSlot } from "@gluestack-ui/themed";
import ButtonProps from "../../components/Button";
import AuthContext from "../../config/auth";

export default function RegisterUser() {
 const { register } = useContext(AuthContext);
 const [user, setUser] = useState<iUser>({
  email: "",
  password: "",
 })
 const [showPassword, setShowPassword] = useState<boolean>(false)
 const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

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

 const handleState = () => {
  setShowPassword((showState) => {
   return !showState
  })
 }

 const registerUser = async () => {
  await register({ email: user.email, password: user.password });
 }

 return (
  <Container>

   <VStack width='100%' alignItems="center" justifyContent="center" alignContent="center" marginTop={keyboardOpen ? 100 : 200}>
    <Text fontFamily="JostMedium" color="$white" fontSize={18} textAlign="center"> Seu planejamento começa aqui.</Text>
    <Text fontFamily="JostMedium" color="$white" fontSize={18} textAlign="center">Preencha os campos abaixo para se cadastrar. </Text>
   </VStack>

   <HStack width='100%' paddingLeft={20} paddingRight={20} marginTop={40}>
    <FormControl flex={1}>
     <VStack>
      <VStack space="xs">
       <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
        Login:
       </Text>
       <Input height={50} $active-borderColor="$white" $focus-borderColor="white" >
        <InputField
         defaultValue={user.email}
         onChangeText={(value: string) => setUser((prevState) => ({
          ...prevState,
          email: value,
         }))} type="text" color="white" fontFamily="JostRegular" fontSize={18} />
       </Input>
      </VStack>

      <VStack space="xs" marginTop={29}>
       <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
        Senha:
       </Text>
       <Input height={50} $active-borderColor="$white" $focus-borderColor="white">
        <InputField
         defaultValue={user.password}
         onChangeText={(value: string) => setUser((prevState) => ({
          ...prevState,
          password: value,
         }))}
         color="white" fontFamily="JostRegular" type={showPassword ? "text" : "password"} fontSize={18} />
        <InputSlot pr="$4" onPress={handleState}>
         <InputIcon
          as={showPassword ? EyeIcon : EyeOffIcon}
          color="$white"
         />
        </InputSlot>
       </Input>
      </VStack>

     </VStack>
    </FormControl>
   </HStack>

   <HStack width="100%" justifyContent="center" alignItems="center" >
    <ButtonProps title="Cadastrar" onPress={registerUser} />
   </HStack>


  </Container>
 )
}