import React, { useState, useEffect } from "react";
import { View, Image, Alert } from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import formStyles from "./FormStyles";
import Event from '../../../api/firebase/models/event'
import moment from "moment";
import estilos from "./CardPreviewStyles";

const FormCardPreview = ({ navigation }) => {
  const eventInfo = useSelector((state) => state.eventForm);

  const diff = moment(moment.now()).diff(eventInfo.start.date, "hours");
  const isToday = diff < 24 && diff >= 0;

  const handleAccept = async () => {
    Event.create(eventInfo);
    navigation.replace("Home")
  }
  return (
    <SafeAreaView style={estilos.container}>
      <LinearProgress color="lightgreen" variant="determinate" value={0.9} />
      <View style={(estilos.textAndImg)}>
        <Text h4 style={estilos.titleText}>
          Preview del Evento
        </Text>
        <Image source={require("../../assets/Logo.png")} style={estilos.logoImage} />
      </View>
      
      <View style={estilos.cardContainer}>
      {/*CARD PREVIEW*/}
      
        <View style={estilos.card_header}>
        <View style={estilos.cardItems}>
          <Text style={estilos.card_header_title}>{eventInfo.title} TITULO</Text>
          <Text numberOfLines={3} style={estilos.card_header_description}> {eventInfo.description} DESCRIPCION </Text>
        </View>
        <View style={estilos.card_body}>
          <Image source={{ uri: eventInfo.photo }} style={estilos.card_body_image} resizeMode={"cover"} />
          <Text style={[estilos.card_body_date, isToday ? estilos.card_body_date_active : ""]}>{moment(eventInfo.start.date).toNow()}</Text>
        </View>
        </View>
      
      </View>

      <View style={formStyles.btnsContainer}>
        <TouchableOpacity title="Pago" onPress={handleAccept} style={formStyles.btn}>
          <Text style={formStyles.textBtn}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FormCardPreview;
