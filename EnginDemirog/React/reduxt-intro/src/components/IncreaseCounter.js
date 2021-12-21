import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increaseCounter } from '../redux/actions/counterActions';
function IncreaseCounter(props) {
    return (
        <div>
            <button onClick={e=>{
                props.dispatch(increaseCounter())
            }} > 
            1 arttir
            </button>
        </div>
    )
}
//Dikkat edelim biz aksiyonlarimizdan sonra yani eventlarimizdan sonra fonksiyonalrimidan sonra props uzerinden veriyi dispatch yolu ile aliriz yani reducer dan gelen state componente props objesi altinda dipspatch fonksiyon propertiisi ile gellir ve bu dispath in parametresinde ise action fonksiyonumuz mevcuttur...yani bizim bindActionCreaotres da bagladigmiz action
const  mapDispatchToProps=(dispatch)=>{
    return {actions:bindActionCreators(increaseCounter,dispatch)}
}
    
    
    //actions i baglamak icin redux tan gelen bir fonksiyon kullanacagiz bindActionCreators hangi aksiyondan gelen veriyi almak istedgimizi yazariz..Biz burda hangi action i calistirmak isteidigimizi burda u sekilde redux tan gelen fonksiyon icine parametre olara veriyoruz
export default connect(mapDispatchToProps)(IncreaseCounter);
