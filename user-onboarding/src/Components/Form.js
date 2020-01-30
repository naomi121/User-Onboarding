import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Form1({ values, errors, touched,  status }) {


    const [users, setUsers] = useState([]);

    useEffect(() => {
       status && setUsers(users => [...users, status]); 
    }, [status]);

    return (
        <div className="user-form">
            <div className="div1">
            <Form >
                   <Field type="text" name="username" placeholder="Username" />
                   {touched.username && errors.username && <p className="errors"> {errors.username}</p>}
                   
                    <Field type="password" name="password" placeholder="Password" />
                    {touched.password && errors.password && <p className="errors">{errors.password}</p>}
                    
                    <Field type="email" name="email" placeholder="Email" />
                    {touched.email && errors.email && <p className="errors">{errors.email}</p>}

                <label className="checkbox-container">
                    <Field type="checkbox" name="tos" checked={values.tos} />
                    Accept Terms
                    {touched.tos && errors.tos && <p className="errors">{errors.tos}</p>}
                    <span className="checkmark" />
                </label>
                <br />
                <button type="submit"> SignUp </button>
            </Form>
            </div>

            <div className="div2">
            {users.map(user =>  { 
                return(
                    <div className ="user-card" key={user.id}>
                        <h4>User Name: {user.username}</h4>
                        <h4>Email: {user.email}</h4>
                    </div>
                )
           })}
           </div>
        </div>
    );
};
const FormikForm = withFormik({
    mapPropsToValues(props) {
        return {
            username: props.username || "",
            password: props.password || "",
            email: props.email || "",
            tos: props.tos || false,
           
        };
    },
    
    
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .min(4, "Username must be 8 characters minimum")
            .max(15, 'Too Long!')
            .required("User Name is required"),
        email: Yup.string()
            .email("Incorrect Email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters minimum")
            .max(10, 'Too Long!')
            .required("Password is required"),
        profession:Yup.string(),
         tos: Yup.boolean()
        .oneOf([true], 'Must Accept Terms and Conditions')
    }),
   

    handleSubmit(values, { resetForm ,setStatus}) {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log("This is the Response", res); 
                    resetForm();
                    setStatus(res.data);
                })
                .catch(err => {
                    console.log(err); 
                });
            }
        }
    )(Form1);

export default FormikForm;