import { StyleSheet, Text, View,StatusBar, Platform } from 'react-native'
import React from 'react'

const CustomStatusBar = (props) => {
  // console.log(props.color)
  return (
    <StatusBar
        animated={true}
        backgroundColor={props.color}
        barStyle={`dark-content`}
      />
  )
}

export default CustomStatusBar

const styles = StyleSheet.create({})