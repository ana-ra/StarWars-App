import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import apiPeople from "./Service/servicePeople";

const TelaPrincipal = () => {
  const personagemSelecionado = useRef(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [personagens, setPersonagens] = useState([]);
  const [mostrarFilmes, setMostrarFilmes] = useState(false);

  useEffect(() => {
    const getPersonagens = () => {
      fetch("https://swapi.dev/api/people")
        .then((response) => response.json())
        .then((json) => {
          const personagens = [];
          const results = json?.results;
          results.forEach((people) => {
            const personagem = {
              name: people.name
            };
            const films = [];
            people.films.forEach((url) => {
              fetch(url)
                .then((response) => response.json())
                .then((json) => {
                  films.push(json);
                });
            });
            personagem.films = films;
            personagens.push(personagem);
          });
          setIsLoading(false);
          setPersonagens(personagens);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getPersonagens();
  }, []);

  const onPersonagemClick = (id, itemFilms) => {
    personagemSelecionado.current = id;
    mostrarFilmes ? setMostrarFilmes(false) : setMostrarFilmes(true);
  };

  const renderFilms = (films) => {
    return films.map((film) => {
      return <Text>{film.title}</Text>;
    });
  };

  const renderListItem = (listItem) => {
    const { item } = listItem;
    return (
      <View key={item.id} style={estilo.tabela}>
        <TouchableOpacity
          style={estilo.button}
          onPress={() => onPersonagemClick(listItem.index, item.films)}
        >
          <Text>{item.name}</Text>
          {mostrarFilmes &&
            personagemSelecionado.current === listItem.index &&
            renderFilms(item.films)}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={estilo.viewA}>
            <Text style={estilo.cabecalho}> Personagens Star Wars </Text>
          </View>

          <View style={estilo.tabela}>
            <Text style={estilo.text1}>Nome</Text>
          </View>

          <View style={estilo.viewFlat}>
            <FlatList
              data={personagens}
              renderItem={(item) => renderListItem(item)}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default TelaPrincipal;

const estilo = StyleSheet.create({
  cabecalho: {
    fontSize: 18,
    backgroundColor: "black",
    color: "#ffff",
    marginLeft: 180,
    fontWeight: "bold"
  },

  tabela: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    backgroundColor: "#FFD700",
    padding: 5,
    marignTop: 15
  },
  text1: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold"
  },

  viewFlat: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },

  viewA: {
    backgroundColor: "black"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  button: {
    alignItems: "center",
    padding: 10
  }
});
