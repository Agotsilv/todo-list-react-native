import { HStack, Button, ButtonText } from "@gluestack-ui/themed";
import { TouchableOpacityProps } from "react-native";


interface IProps extends TouchableOpacityProps {
 title: string;
}

export default function ButtonProps({ title, ...rest }: IProps) {
 return (
  <HStack padding={19}>
   <Button
    borderRadius={5}
    bgColor="#6161F3"
    $active-bgColor="#5959d8"
    height={45}
    width="100%"
    {...rest}
   >
    <ButtonText color="$white" fontFamily="JostMedium" fontSize={18} >{title}</ButtonText>
   </Button>
  </HStack>
 )
}