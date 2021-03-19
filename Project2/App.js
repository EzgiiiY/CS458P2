// App.js


import React, { Component } from 'react';
import { Dimensions, TextInput, Text, Button, Alert, View, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as yup from 'yup'
import { Formik, yupToFormErrors } from 'formik'
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements'
import DatePicker from 'react-native-date-picker'
import SelectInput from '@tele2/react-native-select-input';
import testID from 'react-native-testid'



var radio_props = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 1 },
];

export default class App extends Component {

  state = {
    value: 0,
    initial: true,
    selectedLanguage: 'java',
    date: ''
  }

  render() {
    const inputStyle = {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#ffffff',
      padding: 12,
      marginBottom: 5,
      color: "#ffffff"
    };


    return (
      <Formik
        initialValues={{
          name: '',
          surname: '',
          city: '',
          birthDate: '',
          vaccine: '',
          sideEffect: '',
        }}
        onSubmit={values => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .matches(/^[A-Za-z]+$/, { message: "Please enter a valid firstname !", excludeEmptyString: true })
            .required('Please, provide your name!'),
          surname: yup
            .string()
            .matches(/^[A-Za-z]+$/, { message: "Please enter a valid surname !", excludeEmptyString: true })
            .required('Please, provide your surname!'),
          city: yup
            .string()
            .matches(/^[A-Za-z]+$/, { message: "Please enter a valid cityname !", excludeEmptyString: true })
            .required('Please, provide your city!'),
          birthDate: yup
            .string()
            .matches(/^(0[1-9]|[12][0-9]|3[01])[. /.](0[1-9]|1[012])[. /.](19|20)\d\d$/, { message: "Please enter a valid birth date.(in dd.mm.yyyy format) !", excludeEmptyString: true })
            .required('Please, provide your birthdate!'),
          vaccine: yup
            .string()
            .required('Please, provide the applied vaccine type'),
          sideEffect: yup
            .string()
            .required('Please, provide the side effects, if no side effects, enter -')
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, dirty }) => (

          <View accessibilityLabel="app-root" testID="app-root"  style={{flex:1}} >
            <Header
              backgroundColor='#3CB371'
              centerComponent={{ text: 'COVID-19 VACCINE SURVEY', style: { color: '#fff', fontWeight: "bold" } }}
            />
            <ScrollView accessibilityLabel="scroll-view" testID="scroll-view">
            <View style={styles.formContainer} accessibilityLabel="app-root2" testID="app-root2" >
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 4, fontWeight: "bold" }}>Firstname</Text>
                <TextInput style={{ marginBottom: 7 }}
                  accessibilityLabel="name" testID="name"
                  value={values.name}
                  style={inputStyle}
                  placeholderTextColor="#FFF"
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  placeholder="Firstname"
                />
                {touched.name && errors.name &&
                  <Text accessible={true} style={{ fontSize: 12, color: '#F28500', fontWeight: "bold" }} accessibilityLabel="nameError" testID="nameError">{errors.name}</Text>
                }
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 4, fontWeight: "bold" }}>Surname</Text>
                <TextInput style={{ marginBottom: 7 }}
                  accessibilityLabel="surname" testID="surname"
                  value={values.surname}
                  style={inputStyle}
                  placeholderTextColor="#FFF"
                  onChangeText={handleChange('surname')}
                  onBlur={() => setFieldTouched('surname')}
                  placeholder="Surname"
                />
                {touched.surname && errors.surname &&
                  <Text style={{ fontSize: 12, color: '#F28500', fontWeight: "bold" }}>{errors.surname}</Text>
                }
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 4, fontWeight: "bold" }}>Birth Date</Text>
                <TextInput style={{ marginBottom: 7 }}
                  accessibilityLabel="birth-date" testID="birth-date"
                  value={values.birthDate}
                  style={inputStyle}
                  placeholderTextColor="#FFF"
                  onChangeText={handleChange('birthDate')}
                  onBlur={() => setFieldTouched('birthDate')}
                  placeholder="dd.mm.yyyy"
                />
                {touched.birthDate && errors.birthDate &&
                  <Text testID="birthDateError" accessibilityLabel="birthDateError" style={{ fontSize: 12, color: '#F28500', fontWeight: "bold" }}>{errors.birthDate}</Text>
                }
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 4, fontWeight: "bold" }}>City</Text>
                <TextInput style={{ marginBottom: 10 }}
                  accessibilityLabel="city" testID="city"
                  value={values.city}
                  style={inputStyle}
                  placeholderTextColor="#FFF"
                  onChangeText={handleChange('city')}
                  onBlur={() => setFieldTouched('city')}
                  placeholder="City"
                />
                {touched.city && errors.city &&
                  <Text style={{ fontSize: 12, color: '#F28500', fontWeight: "bold" }}>{errors.city}</Text>
                }
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 4, fontWeight: "bold" }}>Gender</Text>
                <View style={{ marginBottom: 5 }}>
                  <RadioForm
                    accessible={true}
                    accessibilityLabel="radio-button"
                    testID="radio-button"
                    formHorizontal={true}
                    radio_props={radio_props}
                    buttonColor={'#F28500'}
                    labelColor={'#fff'}
                    buttonOuterColor={'#F28500'}
                    buttonInnerColor={'#F28500'}
                    initial={0}
                    onPress={(value) => { this.setState({ value: value }) }}
                  />
                </View>
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 4, fontWeight: "bold", marginTop: 5 }}>Applied Vaccine Type</Text>
                <TextInput style={{ marginBottom: 10 }} 
                  accessibilityLabel="vaccine" testID="vaccine"
                  value={values.vaccine}
                  style={inputStyle}
                  placeholderTextColor="#FFF"
                  onChangeText={handleChange('vaccine')}
                  onBlur={() => setFieldTouched('vaccine')}
                  placeholder="Vaccine Type"
                />
                {touched.vaccine && errors.vaccine &&
                  <Text testID="vaccineError" accessibilityLabel="vaccineError" style={{ fontSize: 12, color: '#F28500', fontWeight: "bold" }}>{errors.vaccine}</Text>
                }
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 4, fontWeight: "bold", marginTop: 5  }}>Side Effects </Text>
                <TextInput style={{ marginBottom: 7}} 
                  accessibilityLabel="side-effects" testID="side-effects"
                  value={values.sideEffect}
                  style={inputStyle}
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#FFF"
                  onChangeText={handleChange('sideEffect')}
                  onBlur={() => setFieldTouched('sideEffect')}
                  placeholder="If no side effects are experienced, please, enter '-' "
                />
                {touched.sideEffect && errors.sideEffect &&
                  <Text testID="sideEffectError" accessibilityLabel="sideEffectError" style={{ fontSize: 12, color: '#F28500', fontWeight: "bold" }}>{errors.sideEffect}</Text>
                }
                {(isValid && dirty) ?
                  <Button accessibilityLabel="sendButton" testID="sendButton"
                    style={{borderRadius: 40, marginBottom: 10, fontWeight: "bold"}}
                    color="#F28500"
                    title='Send'
                    onPress={handleSubmit}
                  /> : null
                }
            </View>
            </ScrollView>
          </View>

        )
        }
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 50,
    backgroundColor: "#2E8B57",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 100,
   
    
  },
  selectInput: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
    height: 10,
  },
  selectInputLabel: {
    fontSize: 16,
    color: '#000',
  },
  selectInputInnerContainer: {
    borderBottomColor: '#ea5906',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
});

console.disableYellowBox = true;