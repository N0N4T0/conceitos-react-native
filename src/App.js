import React, {useEffect, useState} from "react";

import {
  SafeAreaView, View, FlatList, Text, StatusBar, StyleSheet, TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      //Visualizando elementos no console
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`)

    const likesOnRepository = response.data;

    const updateTheRepositories = repositories.map(repository => {
      //checar se o id existe e o retorna atualizado
      if (repository.id === id){
        return likesOnRepository;
      } else {
        return repository;
      }
    });

    setRepositories(updateTheRepositories);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#35014F" />
      
      <SafeAreaView style={styles.container}>
        <FlatList
            data={repositories}
            keyExtractor={repository => repository.id}
            renderItem={({ item:repository }) => (
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>
                
                <View style={styles.techsContainer}>
                  {repository.techs.map(tech => (
                    <Text key={tech} style={styles.tech}>
                      {tech}
                    </Text>
                  ))} 
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    testID={`repository-likes-${repository.id}`}
                  >
                  {repository.likes} curtidas
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.6}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>
                    Curtir
                    </Text>
                </TouchableOpacity>
              </View>
            )}
         />        
      </SafeAreaView>
    </>        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#35014F",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#DEE0E6",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#F9BB2A",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#472A89",
    padding: 15,
  },
});
