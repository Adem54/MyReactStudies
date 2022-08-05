import { Formik, Field, Form } from "formik";

const Basic = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
    //bizim form inputlari icin tanimladigmiz state tin initialState hali burasidir
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      //Burda initalValues de hangi propertiesleri belirledi isek hangi isimde propertiesleri belirledi isek, 
      //Field lardaki name lere de ayni isimleri vermeye dikkat etmeliyiz
      onSubmit={ (values) => {
        // await new Promise((r) => setTimeout(r, 500));
        // console.log(JSON.stringify(values, null, 2));
        console.log("values: ", values); //obje buraya  otomatik geliyor
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        {/*Field componenti Formik altindan geliyor, arkada Field bir tane input u generate ediyor */}
        <Field
          id="firstName"
          name="firstName"
          placeholder="Jane"
        />
        <br />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          placeholder="jane@acme.com"
          type="email"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default Basic;
