import * as  yup from 'yup'


export const signUpSchema = yup.object({
name: yup.string().min(2).max(30).required("Plesae enter your Name"),
email: yup.string().email().required("Please enter your Email"),
password: yup.string().min(6).required("Please enter your Password")
})

export const logInschema = yup.object({
    email:yup.string().email().required("Email is requird"),
password: yup.string().min(6).required("Please enter your Password")
})