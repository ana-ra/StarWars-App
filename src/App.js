import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import TelaPrincipal from "./TelaPrincipal";

export default () => {
  return (
    <View>
      <TelaPrincipal />
    </View>
  );
};
