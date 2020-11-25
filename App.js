import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard, Alert } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from 'react-native-paper';

export default function App() {
  const [task, setTask] = useState([  ]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('#7aeba3');


  async function addTask() {
    const data = {
      text: newTask,
      priority: priority
    }

    if (newTask === "") {
      return;
    }

    const buscar = task.filter(task => task === data.text);

    if (buscar.length != 0) {
      Alert.alert("Atenção", "Tarefa repetida!")
      return;
    }

    setTask([ ... task , data]);
    setNewTask("");

    Keyboard.dismiss();
  }

  async function removeTask(item) {

    setTask(task.filter(tasks => tasks != item));

  }



  return (
    <>
      
      <View style={styles.container}>
        <View style={styles.Body}>
          <FlatList 
          style={styles.FlatList}
          data={task}
          key={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={( {item} ) => (
            <View style={[styles.containerView, {backgroundColor: item.priority}]}>
              <Text style={styles.Texto}>{item.text}</Text>
              <TouchableOpacity style={{
                    height: 25,
                    width: 25,
                    backgroundColor: item.priority,
                    borderRadius: 4,
                    position: 'absolute',
                    right: 0,
                    marginRight:10
                  }}>
                </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTask(item)} >
                <MaterialIcons name="delete" size={25} color="#ff1a1a" />
              </TouchableOpacity>
            </View>
          )}
          />
        </View>
        <View style={styles.priority}>
          <Button mode="outlined" color={"black"} onPress={() => setPriority("#f79cb1")} style={styles.priorityButton}>Alta</Button>
          <Button mode="outlined" color={"black"} onPress={() => setPriority("#f2f7b5")} style={styles.priorityButton}>Média</Button>
          <Button mode="outlined" color={"black"} onPress={() => setPriority("#7aeba3")} style={styles.priorityButton}>Baixa</Button>
        </View>
        <View style={styles.Form}>
          <TextInput 
            style={styles.Input} 
            placeholderTextColor="#999"
            autoCorrect={true}
            placeholder="Adicione uma task"
            maxLength={30}
            onChangeText={text => setNewTask(text)}
            value={newTask}
          />
          <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
            <MaterialIcons name="add" size={25} color="#fff"/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20
  },
  Body: {
    flex: 1
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee"
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 20,
    marginLeft: 10
  },
  FlatList: {
    flex: 1,
    marginTop: 5
  },
  containerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee"
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
     marginTop: 4,
     textAlign: "center"
  },
  priority: {
    flex: 0,
    alignItems: 'center',
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    color: "black"
  },
  priorityButton: {
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginLeft: 10
  }
});
