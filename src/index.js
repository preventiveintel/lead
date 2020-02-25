import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Row,
  Col,
  Layout,
  Card,
  Icon,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  notification
} from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import "./styles.css";

const { Header, Content, Footer } = Layout;
const requestConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
const clx_url = "https://services.jamessantiagophotography.com";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please use a valid email")
    .required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  phone: Yup.string().required("Required")
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
  }

  render() {
    return (
      <Layout>
        <Content style={{ paddingTop: "80px" }}>
          <Card
            title="Book your photo shoot today!"
            style={{
              maxWidth: 400,
              minWidth: 400,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {this.state.errors &&
              this.state.errors.map(error => {
                return (
                  <Alert
                    description={error}
                    type="error"
                    style={{ marginBottom: 10 }}
                    closable
                  />
                );
              })}

            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone: ""
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, actions) => {
                let formData = new FormData();
                formData.append("first_name", values.first_name);
                formData.append("last_name", values.last_name);
                formData.append("email", values.email);
                formData.append("phone", values.phone);
                axios
                  .post(
                    clx_url + "/?ng=api/create-lead",
                    formData,
                    requestConfig
                  )
                  .then(response => {
                    if (response.data.success) {
                      notification["success"]({
                        message: "Success",
                        description: "Thanks for singing up!"
                      });
                    } else {
                      this.setState({
                        errors: response.data.errors
                      });
                    }

                    actions.setSubmitting(false);
                  })
                  .catch(function(response) {
                    actions.setSubmitting(false);
                    console.log(response);
                  });
              }}
              render={props => (
                <Form className="signup-form" onSubmit={props.handleSubmit}>
                  <Form.Item
                    {...(props.errors.first_name && props.touched.first_name
                      ? {
                          validateStatus: "error",
                          help: props.errors.first_name
                        }
                      : {})}
                  >
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="First name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.first_name}
                      name="first_name"
                    />
                  </Form.Item>

                  <Form.Item
                    {...(props.errors.last_name && props.touched.last_name
                      ? {
                          validateStatus: "error",
                          help: props.errors.last_name
                        }
                      : {})}
                  >
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Last name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.last_name}
                      name="last_name"
                    />
                  </Form.Item>

                  <Form.Item
                    {...(props.errors.email && props.touched.email
                      ? { validateStatus: "error", help: props.errors.email }
                      : {})}
                  >
                    <Input
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Email"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      name="email"
                    />
                  </Form.Item>

                  <Form.Item
                    {...(props.errors.phone && props.touched.phone
                      ? { validateStatus: "error", help: props.errors.username }
                      : {})}
                  >
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Phone Number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone}
                      name="phone"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="signup-form-button"
                      loading={props.isSubmitting}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              )}
            />
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>©2020 PI Digital Agency</Footer>
      </Layout>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
