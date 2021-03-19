// App.js


import React, { Component } from 'react';
import { Dimensions, TextInput, Text, Button, Alert, View, StyleSheet } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
  ];

export default class SurveyScreen extends Component {

    state = {
        value: 0
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
                    gender: '',
                    email: '',
                    password: '',
                }}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                validationSchema={yup.object().shape({
                    name: yup
                        .string()
                        .matches(/[a-zA-Z]/, { message: "Please enter a valid firstname !", excludeEmptyString: true })
                        .required('Please, provide your name!'),
                    surname: yup
                        .string()
                        .matches(/[a-zA-Z]/, { message: "Please enter a valid surname !", excludeEmptyString: true })
                        .required('Please, provide your surname!'),
                    city: yup
                        .string()
                        .matches(/[a-zA-Z]/, { message: "Please enter a valid cityname !", excludeEmptyString: true })
                        .required('Please, provide your city!'),
                    gender: yup
                        .string()
                        .required('Please, provide your gender!'),
                    email: yup
                        .string()
                        .email()
                        .required(),
                    password: yup
                        .string()
                        .min(4)
                        .max(10, 'Password should not excced 10 chars.')
                        .required(),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <View style={styles.formContainer} accessibilityLabel="app-root" >
                        <TextInput accessibilityLabel="name"
                            value={values.name}
                            style={inputStyle}
                            placeholderTextColor="#FFF"
                            onChangeText={handleChange('name')}
                            onBlur={() => setFieldTouched('name')}
                            placeholder="Name"
                        />
                        {touched.name && errors.name &&
                            <Text style={{ fontSize: 12, color: '#F28500', fontWeight: "bold" }}>{errors.name}</Text>
                        }
                        <TextInput
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
                        <TextInput
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
                        <TextInput
                            value={values.email}
                            style={inputStyle}
                            placeholderTextColor="#FFF"
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholder="E-mail"
                        />
                        {touched.email && errors.email &&
                            <Text style={{ fontSize: 12, color: '#FF0D10'}}>{errors.email}</Text>
                        }
                        <TextInput
                            value={values.password}
                            style={inputStyle}
                            placeholderTextColor="#FFF"
                            onChangeText={handleChange('password')}
                            placeholder="Password"
                            onBlur={() => setFieldTouched('password')}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                        }
                        <View>
                            <RadioForm
                                formHorizontal= {true}
                                radio_props={radio_props}
                                initial={0}
                                onPress={(value) => { this.setState({ value: value }) }}
                            />
                        </View>
                        { isValid ?
                            <Button
                            color="#3740FE"
                            title='Submit'
                            onPress={handleSubmit}
                        /> : null
                        }
                    </View>
                )}
            </Formik>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 50,
        backgroundColor: "#2E8B57",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

console.disableYellowBox = true;