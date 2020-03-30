import React from 'react';
import {View, Text,TouchableOpacity, Image, Linking} from 'react-native';
import { Feather } from "@expo/vector-icons";
import styles from './styles';
import logoImg from "../../assets/logo.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from 'expo-mail-composer';

export default ()=> {

    const navigation = useNavigation();
    const route= useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gotaria de ajudar no caso "${incident.title}", com valor de ${Intl.NumberFormat('pt-BR',{style:'currency',currency: 'BRL'}).format(incident.value)} `;

    function sendMail(){
        MailComposer.composeAsync({
            subject:`erói do caso: ${incident.title}`,
            recipients:[incident.email],
            body:message,
        })
    }

    function sendWhatsapp(){
        //Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
        alert('já instalou o whatsapp?');
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
               <Image source={logoImg}/>
               <TouchableOpacity onPress={()=>navigation.goBack()}>
                   <Feather name="arrow-left" size={28} color="#E82041"/>
               </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty,{marginTop: 0} ]}>Ong:</Text>
                    <Text style={styles.incidentValue}>
                    {incident.name} de "{incident.city}/{incident.uf}"
                    </Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR',
                        {style:'currency',currency: 'BRL'}).format(incident.value)}
                    </Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity 
                        style={styles.action}
                        onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.action}
                        onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>    
                    </TouchableOpacity>
                        
                </View>
            </View>
        </View>
    );
}