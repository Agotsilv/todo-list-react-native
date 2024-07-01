import { EyeIcon, EyeOffIcon, FormControl, HStack, Input, InputField, InputIcon, InputSlot, Text, VStack } from "@gluestack-ui/themed";
import { Container } from "./style";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import ButtonProps from "../../components/Button";
import Toast from 'react-native-toast-message';
import api from "../../config/api";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "@react-navigation/native";

export default function CreateUser() {
  const navigation: NativeStackNavigationProp<any, any> = useNavigation();
  const [user, setUser] = useState<iUser>({
    name: "",
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

  const handleSubmit = () => {
    if (user.name === '' && user.password === '' && user.email === '') {
      Toast.show({
        type: 'error',
        text1: 'Atenção!',
        text2: 'Por favor, preencha os campos.',
        text2Style: {
          fontSize: 14
        },
        text1Style: {
          fontSize: 14
        }
      });

    } else {
      if (user.password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Atenção!',
          text2: 'A senha precisa ter pelo menos 6 caracteres.',
          text2Style: {
            fontSize: 14
          },
          text1Style: {
            fontSize: 14
          }
        });
        return;
      }

      try {
        api.post('/user', {
          name: user.name,
          email: user.email,
          password: user.password
        }).then((response) => {
          if (response.data) {
            Toast.show({
              type: 'success',
              text1: 'Sucesso!',
              text2: 'Cadastro realizado com sucesso.',
              text2Style: {
                fontSize: 14
              },
              text1Style: {
                fontSize: 14
              }
            });

            setUser({
              name: "",
              email: "",
              password: "",
            })

            setTimeout(() => {
              navigation.navigate('Login')
            }, 2000)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
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
                  onChangeText={(value: string) =>
                    setUser((prevState) => ({
                      ...prevState,
                      name: value,
                    }))}
                  type="text" color="#101025" fontFamily="JostRegular" fontSize={18} />
              </Input>
            </VStack>

            <VStack space="xs" marginTop={29}>
              <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
                Email:
              </Text>
              <Input height={50} $active-borderColor="$white" $focus-borderColor="white" bg="$white" >
                <InputField
                  defaultValue={''}
                  onChangeText={(value: string) =>
                    setUser((prevState) => ({
                      ...prevState,
                      email: value,
                    }))}
                  type="text" color="#101025" fontFamily="JostRegular" fontSize={18} />
              </Input>
            </VStack>

            <VStack space="xs" marginTop={29}>
              <Text fontFamily="JostRegular" color="white" lineHeight="$xs">
                Senha:
              </Text>
              <Input height={50} $active-borderColor="$white" $focus-borderColor="white" bg="$white">
                <InputField
                  defaultValue={user.password}
                  onChangeText={(value: string) =>
                    setUser((prevState) => ({
                      ...prevState,
                      password: value,
                    }))}
                  color="#101025" fontFamily="JostRegular" type={showPassword ? "text" : "password"} fontSize={18} />
                <InputSlot pr="$4" onPress={() => handleState()}>
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
        <ButtonProps title="Cadastrar" onPress={() => handleSubmit()} />
      </HStack>
      <Toast />
    </Container >
  )
}