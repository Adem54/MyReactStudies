import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
     domain={process.env.REACT_APP_AUTH0_DOMAIN}
     clientId={process.env.REACT_APP_AUTH0_CLIENTID} 
     redirectUri={window.location.origin} 
     >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);


/*
Auth0 yu kullanabilmek icin
1-Auth0 sitesine gidip birhesap olusturuz sonra application dan yeni bir application olusturup
react i seceriz ardindan da 

AllowedCallback URLs,AllowedLogout URLs,AllowedWebOrigins
bunlarin 3 une de asagidaki uygulamamizin calisacagi localhost adresi girip en alttaki kaydet 
butonundan bunu kaydederiz
http://localhost:3000

2-Uygulamamizin altbilesenlerinin Auth0 yu tanimasi icin uygulamamizi bir provider a icine almamiz gerekiyor
Bunun icinde npm i @auth0/auth0-react paketini yuklememiz gerekiyor
bu yukledigmiz paketten gelecek olan Provider componentini yukledigmiz paketten alip
uygulamamizin en ust seviyesini bu component ile sarmalariz

import { Auth0Provider } from '@auth0/auth0-react';
 <Auth0Provider>
    <App />
    </Auth0Provider>
    Bu sekilde sarmalayacagiz ama 3 adet degere ihtiyacimiz var
    redirectUrl={}=>uygulamamizin calisacagi adres window.location.origin verebiliriz
    clientId ve domain ise bize Auth0 siteisnde olusturdugmuz uygulamadan alacagimzi degerlerdir
    Domain:dev-2v-an29e.us.auth0.com
    ClientId:NIYIGZkRpL0nzeOmpDK1q4jGZF0tMYAJ
    Bunlari olusturdugmuz projede otomatik biziim icin olusturuluyor
    Bu datalar hassas oldugu icin tabi ki bunlari .env dosyasina koymaliyiz

REACT_APP_AUTH0_DOMAIN=dev-2v-an29e.us.auth0.com
REACT_APP_AUTH0_CLIENTID=NIYIGZkRp

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
     domain={process.env.REACT_APP_AUTH0_DOMAIN}
     clientId={process.env.REACT_APP_AUTH0_CLIENTID} 
     redirectUri={window.location.origin} 
     >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);

Bu islemi yaptiktan sonra., Auth0Provider dan gelen verilere uygulamamda componentlerimde erisebilecegiz
Burda cok dikkat edelim, domain,clientId veya redirectUri den herhangi bir harf bile eksik girsek hata aliriz
*/