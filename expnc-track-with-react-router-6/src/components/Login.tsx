import { Button, Checkbox, Form, Input,Result } from 'antd';
import api from '../utils/api';
import { showError } from '../utils/showError';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm, UserDispatch } from '../types/user';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userAction';
import { AppState } from '../store';
import { useEffect } from 'react';
import showSuccess from '../utils/showSuccess';

interface StateType{
    newSignUp?:boolean;
}
const Login = () => {

    const navigate=useNavigate();
    const {data,loading,error}=useSelector((state:AppState)=>state.user);
    const dispatch=useDispatch<UserDispatch>();
    const onFinish = (values: LoginForm) => {
      dispatch(login(values));
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', {errorInfo});
        showError(errorInfo);
      };

      const {state}=useLocation();
      useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
         navigate("/");
        }
       },[data]);



       useEffect(() => {
        error && showError(error)
      }, [error])
      //kullanici giris yaptiginda bizim data icine degerlerimiz gelmis olmalidir, eger data da username var ise o zaman demekki veriler gelmis ve kullanici giris yapmis demektir.Yapmak istedigmiz islem kullaniciya successfull logged in mesaji vermek ondan dolayi bu islemi yaparken burayi kullaniriiz.Bu islemi de yine useEffect ile yapacagiz.Ant desing dan message dan success message yi alip showSuccess fonksiyonunda kullanalim,utils klasoru icinde
    
    useEffect(() => {
      data.username && showSuccess("You have successfully logged in!")
    }, [data.username])
    //Bu islemi biz login.tsx de yapiyoruz ama biz login olur olmaz, login componentinden ayrilacagiz ondan dolayi burda bir problem yasanabilir onu da tekrar ele alacagiz
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
        <h2 style={{textAlign:"center",marginBottom:"20px"}}>Please login</h2>
        {(state as StateType)?.newSignUp ? 
         <Result
         status="success"
         title="Successfully signed up! Please login using your credentials"
       />
        : ""}
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
  }
export default Login