import { Formik,Field,Form} from "formik";

const FormikEvent = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
    //bizim form Fieldlari icin tanimladigmiz state tin initialState hali burasidir
      initialValues={{
        firstName: "",
        lastname: "",
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
      {//Formik handleSubmit, handleChange yi veriyor
      //Biz Form ve Field lari kaldirdigimz icin Field u koydgumz icin sadece oralarda Form ve Field in otomatik 
      //yaptigi onChange ve onSubmit i bizim yazmamiz gerekiyor
        ({handleSubmit,handleChange})=>{
         return <Form onSubmit={handleSubmit}>
         <label htmlFor="firstName">First Name</label>
         {/*Field componenti Formik altindan geliyor, arkada Field bir tane Field u generate ediyor */}
         <Field
           id="firstName"
           name="firstName"
           onChange={handleChange}
           placeholder="Jane"
         />
         <br />
         <br />
         <label htmlFor="lastName">Last Name</label>
         
         <Field id="lastName" name="lastname" placeholder="Doe" 
           onChange={handleChange}
         />
         <br />
         <br />
         <label htmlFor="email">Email</label>
         
         <Field id="email" name="email" 
           onChange={handleChange} />
         {/* <label htmlFor="email">Email</label>
         <Field id="email" name="email" 
           onChange={handleChange}
         /> */}
         <button type="submit">Submit</button>
       </Form> 
        }
      }
    </Formik>
  </div>
);

export default FormikEvent;
