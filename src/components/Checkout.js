import { useContext } from "react";
import classes from "./Checkout.module.css";
import { FoodCartContent } from "./Context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useInput from "../hooks/use-input";
//import * as Yup from "yup";

// const CheckoutSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Name Required"),
//   address: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Address Required"),
//   zip: Yup.string()
//     .length(5)
//     .matches(/^[0-9]{5}/)
//     .required(),
// });

export const Checkout = (props) => {
  const cxt = useContext(FoodCartContent);
  return (
    <Formik
      initialValues={{ name: "", address: "", zip: "" }}
      // validationSchema={CheckoutSchema}
      validate={(values, props) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        } else if (values.name.trim().length < 2) {
          errors.name = "Name too short";
        }

        if (!values.address) {
          errors.address = "Required";
        } else if (values.address.trim().length < 2) {
          errors.address = "Address too short";
        }

        if (!values.zip) {
          errors.zip = "Required";
        } else if (!(values.zip.trim().length === 5)) {
          errors.zip = "Invalid Zip";
        }
        return errors;
      }}
      onSubmit={(values) => {
        props.httpRequest(
          {
            url: "https://food-order-1b58a-default-rtdb.firebaseio.com/Orders.json",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInfo: values, itemInfo: cxt.items }),
          },
          () => {
            props.setSubmitted(true);
          }
        );
      }}
    >
      <Form>
        <div className={classes.control}>
          <label htmlFor="name">Name:</label>
          <Field name="name" type="text"></Field>
          <ErrorMessage name="name" />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address: </label>
          <Field name="address" type="text"></Field>
          <ErrorMessage name="address" />
        </div>
        <div className={classes.control}>
          <label htmlFor="zip">Zip code: </label>
          <Field name="zip" type="text"></Field>
          <ErrorMessage name="zip" />
        </div>
        <div className={classes.actions}>
          <button type="submit">Confirm</button>
          <button onClick={props.onClose}>Cancel</button>
        </div>
      </Form>
    </Formik>
  );
};

const isValid = (prop) => {
  return prop.trim().length > 0;
};
export const Checkout_Orig = (props) => {
  const cxt = useContext(FoodCartContent);
  const {
    value: nameValue,
    valid: nameValid,
    error: nameError,
    onChanged: onNameChanged,
    onBlur: onNameBlur,
  } = useInput((name) => {
    return isValid(name);
  });

  const {
    value: addressValue,
    valid: addressValid,
    error: addressError,
    onChanged: onAddressChanged,
    onBlur: onAddressBlur,
  } = useInput((name) => {
    return isValid(name);
  });

  const {
    value: zipValue,
    valid: zipValid,
    error: zipError,
    onChanged: onZipChanged,
    onBlur: onZipBlur,
  } = useInput((name) => {
    return name.trim().length === 5;
  });

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        onZipBlur(e);
        onNameBlur(e);
        onAddressBlur(e);
        e.preventDefault();
        if (!nameValid || !addressValid || !zipValid) return;
        console.log({ name: nameValue, address: addressValue, zip: zipValue });
        props.onClose();
        cxt.emptyCart();
      }}
    >
      <div className={`${nameError ? classes.invalid : classes.control}`}>
        <label htmlFor="name">Your Name: </label>
        <input id="name" onChange={onNameChanged} onBlur={onNameBlur}></input>
      </div>
      <div className={`${addressError ? classes.invalid : classes.control}`}>
        <label htmlFor="address">Address: </label>
        <input
          id="address"
          onChange={onAddressChanged}
          onBlur={onAddressBlur}
        ></input>
      </div>
      <div className={`${zipError ? classes.invalid : classes.control}`}>
        <label htmlFor="zip">Zip code:</label>
        <input id="zip" onChange={onZipChanged} onBlur={onZipBlur}></input>
      </div>
      <div className={classes.actions}>
        <button>Confirm</button>
        <button onClick={props.onClose}>Cancel</button>
      </div>
    </form>
  );
};
