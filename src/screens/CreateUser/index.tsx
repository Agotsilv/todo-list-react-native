import { EyeIcon, EyeOffIcon, FormControl, Heading, HStack, Input, InputField, InputIcon, InputSlot, Text, VStack } from "@gluestack-ui/themed";
import { Container } from "./style";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import ButtonProps from "../../components/Button";

export default function CreateUser() {
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

 return (
  <Container>

   <HStack paddingLeft={8} paddingRight={8} width='100%' justifyContent="center" marginTop={keyboardOpen ? 100 : 150}>
    <Text textAlign="center" fontFamily="JostMedium" color="$white" fontSize={20}> Seu planejamento começa aqui.
     Preencha os campos abaixo para se cadastrar. </Text>
   </HStack>


   <HStack width='100%' paddingLeft={20} paddingRight={20} marginTop={40}>
    <FormControl flex={1}>
     <VStack>
      <VStack space="xs">
       <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
        Nome:
       </Text>
       <Input height={50} $active-borderColor="$white" $focus-borderColor="white" bg="$white" >
        <InputField
         defaultValue={''}
         onChangeText={(value: string) => console.log(value)} type="text" color="#101025" fontFamily="JostRegular" fontSize={18} />
       </Input>
      </VStack>

      <VStack space="xs" marginTop={29}>
       <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
        Email:
       </Text>
       <Input height={50} $active-borderColor="$white" $focus-borderColor="white" bg="$white" >
        <InputField
         defaultValue={''}
         onChangeText={(value: string) => console.log(value)} type="text" color="#101025" fontFamily="JostRegular" fontSize={18} />
       </Input>
      </VStack>

      <VStack space="xs" marginTop={29}>
       <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
        Senha:
       </Text>
       <Input height={50} $active-borderColor="$white" $focus-borderColor="white" bg="$white">
        <InputField
         defaultValue={'user.password'}
         onChangeText={(value: string) => (value: string) => console.log(value)}
         color="#101025" fontFamily="JostRegular" type={showPassword ? "text" : "password"} fontSize={18} />
        <InputSlot pr="$4" onPress={() => null}>
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

   <HStack width="100%" justifyContent="center" alignItems="center" marginTop={30} >
    <ButtonProps title="Cadastrar" onPress={() => null} />
   </HStack>

  </Container >
 )
}