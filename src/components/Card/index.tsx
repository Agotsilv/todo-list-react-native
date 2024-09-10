import { HStack, Text, VStack } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function Card({ id, title, dataInicial, concluido, onDelete }: iCard) {
 const [completed, setCompleted] = useState(concluido);
 const [finalizedDate, setFinalizedDate] = useState('');

 useEffect(() => {
  setCompleted(concluido);
 }, [concluido]);

 const handleCompleted = () => {
  const currentDate = new Date().toLocaleDateString();
  setCompleted(prevState => {
   if (!prevState) {
    setFinalizedDate(currentDate);
   } else {
    setFinalizedDate('');
   }
   return !prevState;
  });
 };

 return (
  <HStack w="$full" justifyContent="center" marginTop={5}>
   <HStack bgColor="#090918" h={70} w='95%' borderRadius={10} alignItems="center">
    <HStack w="95%" alignItems="center" justifyContent="space-between" paddingHorizontal={15}>

     <HStack alignItems="center">
      <TouchableOpacity
       onPress={handleCompleted}
       style={[completed ? styles.completed : styles.incompleted, {
        width: 40, height: 40,
        borderRadius: 100, alignItems: 'center', justifyContent: 'center'
       }]}>
       {completed && <AntDesign name="check" size={18} color="white" />}
      </TouchableOpacity>

      <VStack marginLeft={10} flex={1}>
       <Text fontSize={18} color='$white'>
        {title}
       </Text>
       <Text fontSize={11} color='#C8C8C8'>
        Iniciado dia {dataInicial} {completed === true ? `~ Finalizado dia ${finalizedDate}` : ''}
       </Text>
      </VStack>

     </HStack>

     <TouchableOpacity onPress={() => onDelete(id)}>
      <AntDesign name="delete" size={20} color="white" />
     </TouchableOpacity>
    </HStack>
   </HStack>
  </HStack>
 );
}

const styles = StyleSheet.create({
 completed: {
  backgroundColor: '#6161F3'
 },
 incompleted: {
  borderWidth: 1,
  borderColor: '#8282FD'
 }
});
