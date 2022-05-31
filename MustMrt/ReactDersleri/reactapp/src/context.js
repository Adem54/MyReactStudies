import React, {Component} from 'react';
import axios from 'axios';
const UserContext=React.createContext();
//Bu build-in bir yapidir bize 1 tane Provider,(sayesinde veriyi aliriz) 1 tane de Consumer(tuketici,veriyi kullaniriz) verir
//Tum uygulamayi sarmalayarak state verilerine tum uygulamadan erisilmesni saglyacak sonr ada geriye kullanma isi kaliyor onu da Consumer araciligi ile yapacagiz
const reducer=(state,action)=>{
  console.log("reducer2");
  switch (action.type) {
    case "DELETE_USER":
          const newState= {
            ...state,
            users:state.users.filter(user=>action.payload !== user.id)//silme islemi yapacagimiz id esit olmadigi surece liste icinde kalacak ancak esit oldugu durumda ise user listesinden o id ye ait objeyi cikaracagiz..
          }
          return newState;
          case "ADD_USER":
            return {
              ...state,
              //users:state.users.push(action.payload) push methodu array donmez array icindeki son elemena saysini doner
              users:[...state.users,action.payload]
            }
 
          //yanlis bir type yazilmissa yani olmayan bir type o zaman da default ta eski sateteimizi aliriz
    default:
      return state;
  }
}
export class UserProvider extends Component {
    state={
        users:[
          
        ],
        dispatch:action=>{          
          this.setState=(state =>reducer(state,action))
          console.log("action ",action);
        }
      }
      /*
      dispatch: (action) => {
      const newState = reducer(this.state, action);
      this.setState(newState);
    }

      */
     componentDidMount= async()=> {
       //await bize sunu sagliyor bizim apiden verilerimiz gelen e kadar beklememizi sagliyor veriyi almadan devam etmiyor asagi dogru inmiyor javascript yapimiz burda
       //Asenkron yapilarda ki en buyuk handkapimz biz apilerden veri cekerken biraz zaman gecmesi , javascriptin kendi yapisi senkrion ve o yapilar bu asenkron yapilari beklemedikleri icin biz apiden veriyi almadan listeleme islemlerimiz calisirsa olmayan veriyi gostermeye calisacaklar ve biz veriyi listeleyememis olacagiz ondan dolay biz asyn-await ile bu olayi kontrol ediyoruz...cok yaygin bir kullanimdir
      const response=await axios.get("http://localhost:3004/users")
      console.log(response.data);//responsumuzun yapisi bir obje dir ve bizim verilerimiz obje icinde data isminde bir property icerisindedir
      this.setState({
        users:response.data
      })
     }     
    render() {
        return (
         //Burda biz UserContext in bize sagladigi proveri kullanmak icin div icinde degil provider i donmemiz gerekecek
         //Biz ilerde UserProvider altina App yani ana componentimizi koyacagimiz icin onu temsil etmesi acisindan icerisne this.props
         //Simdi biz buraya henuz bir props gondermedikki diye dusunebiliriz dogal oalrak ancak reactta otomatik olarak children propsu gonderiliyor, bu UserProvider in cocuklarini gosteren yapimizdir
         //Bizim bu uygulamaya bir tane stateimizi gondermeliyiz o zaman biz App.js icine yazdigimiz state artik ordan kaldiririz cunku state artik UserProvider contexti icerisijnde olacak
         //Bizim uygulamanin alt kisimlairna value diye bir prop gecirmemiz gerekiyor yani statei value olarak verecegimz bir prop olacak <UserContext.Provider attributu yazidigmiz yerde value={this.state} props a users statimizi value ismi ile atadik..Artik bundan sonra componentlerimizin bu props u kullanabilmeleri icin yine Context in icindeki consumer i olusturmamiz gerekiyor...Normal bir degisken gibi olustururlur
         <UserContext.Provider value={this.state}>
             {this.props.children}
         </UserContext.Provider>
        )
    }
}
const UserConsumer=UserContext.Consumer;
export default UserConsumer;
//Tam olarak mantik da budur...
//UserProvider UserContext in icindeki Provider i return ediyor
//Yaptigimiz islem aslinda tam olarak su UserProvide ile App main, ana componentimizi sarmaliyoruz yani uygulamamizi sarmalamis oluyoruz, UserProvider dan biz value olarak state i gonderdik ve artik biz uygulamamiizin isteidigmiz herhangi bir  yerinde herhangi bir component icinde UserConsumer yoluyla, UserConsujmer kullanarak kullanabilecegiz...
// {this.props.children} Bu ana compoenent olan App componentini simgeliyor ve React tarafindan otomatik gonderilen bir yapidir bu sayede biz Contextimiz ile App componentimizi sarmalamis oluyoruz...