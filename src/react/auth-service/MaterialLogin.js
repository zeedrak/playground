import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

// Synchronous validation
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

let fields = [
  {
    type: "email",
    name: "email",
    placeholder: "Email",
    required: true
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    required: true
  }
];

export const Login = ({
  onChange,
  onSubmit,
  onProviderAuth,
  onRegister,
  classes
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            onSubmit(values)
              .then(() => {
                actions.setSubmitting(false);
              })
              .catch(err => {

              });
          }}
          validationSchema={LoginSchema}
          render={({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                {fields.map((field, index) => {
                  return (
                    <div key={index}>
                      <TextField
                        id={field.name}
                        label={field.placeholder}
                        type={field.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maegin="normal"
                        required={field.required}
                        onKeyPress={event =>
                          event.key === 13 ? handleSubmit(event) : ""
                        }
                      />
                      {errors[field.name] &&
                        touched[field.name] && <div>{errors[field.name]}</div>}
                    </div>
                  );
                })}
                <Button
                  size="small"
                  color="primary"
                  onClick={onSubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </form>
            );
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={onRegister}>
          You don't have an account? register here
        </Button>
      </CardActions>
      <div>
        <Button onClick={() => onProviderAuth("google")} size="large" fullWidth>
          Login with Google
        </Button>
        <Button
          onClick={() => onProviderAuth("facebook")}
          size="large"
          fullWidth
        >
          Login with facebook
        </Button>
        <Button
          onClick={() => onProviderAuth("twitter")}
          size="large"
          fullWidth
        >
          Login with twitter
        </Button>
      </div>
    </Card>
  );
};

export default withStyles(styles)(Login);