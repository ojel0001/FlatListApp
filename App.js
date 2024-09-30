import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  });


  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.id}>{item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.status}>
        {item.completed ? "Completed" : "Incomplete"}
      </Text>
    </View>
  );

  
  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  id: {
    color: "red",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  completed: {
    color: "green",
  },
  todoItem: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    color: "gray",
  },
});
