import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

export default function Button({title, onPress, icon, color}) {
  return (
    // Display the button with the icon and title
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Entypo name={icon} size={28} color={color ? color: '#f1f1f1'} />
        {title ? <Text style={styles.text}>{title}</Text> : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 'max-content',
    },
    text:
    {
        fontWeight: 'bold',
        color: '#f1f1f1',
        fontSize: 16,
        marginLeft: 10,
    }
})