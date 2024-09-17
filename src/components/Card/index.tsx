import { HStack, Text, VStack } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Card({ id, title, dataInicial, concluido, onDelete, prioridade, list }: iCard) {
 const [completed, setCompleted] = useState(concluido);
 const [finalizedDate, setFinalizedDate] = useState('');

 useEffect(() => {
  setCompleted(concluido);
 }, [concluido]);

 const handleCompleted = async () => {
  const currentDate = new Date().toLocaleDateString();
  setCompleted(prevState => {
   const newCompleted = !prevState;
   if (newCompleted) {
    setFinalizedDate(currentDate);
   } else {
    setFinalizedDate('');
   }

   // Atualizar o AsyncStorage
   updateTaskStatus(id, newCompleted, currentDate);
   return newCompleted;
  });
 };

 const updateTaskStatus = async (taskId: string, isCompleted: boolean, date: string) => {
  try {
   const jsonValue = await AsyncStorage.getItem('tasks');
   const tasksArray = jsonValue != null ? JSON.parse(jsonValue) : [];

   // Encontrar e atualizar a tarefa específica
   const updatedTasksArray = tasksArray.map(task =>
    task.id === taskId ? { ...task, concluido: isCompleted, finalizedDate: date } : task
   );

   // Salvar a lista de volta no AsyncStorage
   const updatedJsonValue = JSON.stringify(updatedTasksArray);
   await AsyncStorage.setItem('tasks', updatedJsonValue);

   list();

  } catch (error) {
   console.error('Error updating task status:', error);
  }
 };

 const getPriorityColor = () => {
  switch (prioridade) {
   case 'urgente':
    return '#FF0000';
   case 'media_urgencia':
    return '#FF6400';
   case 'baixa_urgencia':
    return '#008000';
   default:
    return '#d3d3d3';
  }
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
       }]}
      >
       {completed && <AntDesign name="check" size={18} color="white" />}
      </TouchableOpacity>

      <VStack marginLeft={10} flex={1}>
       <Text fontSize={18} color='$white'>
        {title}
       </Text>
       <Text fontSize={11} color='#C8C8C8' marginBottom={5}>
        Adicionado dia {dataInicial} {completed === true ? `~ Finalizado dia ${finalizedDate}` : ''}
       </Text>
       {/* Aplicando a cor de prioridade na barra */}
       <View style={{ backgroundColor: getPriorityColor(), width: 150, height: 6, borderRadius: 100 }} />
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
