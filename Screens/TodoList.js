import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CheckBox } from '@rneui/base';
import { Slider } from '@rneui/themed';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import { Swipeable } from 'react-native-gesture-handler';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(database, 'todos'));
      const fetchedTodos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTodos(fetchedTodos);
      updateProgress(fetchedTodos);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim()) {
      const docRef = await addDoc(collection(database, 'todos'), {
        text: newTodo,
        completed: false,
      });
      setTodos([...todos, { text: newTodo, completed: false, id: docRef.id }]);
      setNewTodo('');
      updateProgress([...todos, { text: newTodo, completed: false, id: docRef.id }]);
    }
  };

  const toggleComplete = async (id) => {
    const updatedTodos = todos.map(t => {
      if (t.id === id) {
        const updatedTodo = { ...t, completed: !t.completed };
        updateDoc(doc(database, 'todos', id), updatedTodo);
        return updatedTodo;
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    updateProgress(updatedTodos);
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(database, 'todos', id));
    setTodos(todos.filter(t => t.id !== id));
    updateProgress(todos.filter(t => t.id !== id));
  };

  const updateProgress = (todosArray) => {
    const completedCount = todosArray.filter(todo => todo.completed).length;
    const totalCount = todosArray.length;
    const newProgress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
    setProgress(newProgress);
    setCompleted(newProgress === 100);
  };

  const renderRightActions = (id) => (
    <TouchableOpacity onPress={() => deleteTodo(id)} style={styles.deleteButton}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.todoItem}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleComplete(item.id)}
        />
        <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none', flex: 1 }}>
          {item.text}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.progressSlider}
              value={progress}
              maximumValue={100}
              minimumValue={0}
              step={1}
              thumbTintColor={completed ? '#2089dc' : '#ccc'}
              minimumTrackTintColor={completed ? '#2089dc' : '#ccc'}
              maximumTrackTintColor="#ccc"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <Button title="Add Todo" onPress={addTodo} />
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  progressSlider: {
    marginBottom: 20,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 75,
  },
  deleteText: {
    color: 'white',
  }
});

export default TodoList;
