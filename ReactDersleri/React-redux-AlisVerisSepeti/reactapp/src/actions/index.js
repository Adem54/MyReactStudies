
export const addToCart=book=>{
    return {
        type:"ADD_TO_CART",
        payload:book
    }
}

//Actioncreater larimiz action objesi donerler, type ve payload proertylerine sahip olan ve de reducer lara parametre olarak dipstach tarafindan gonderilirler redux tarafindan otomatik olarak,ama eger biz sideeffect api den veri alma gibi islemler yapar ve redux-thunk gibi middleware kullanirsak o zaman bu disptach islmeini bizim manuel olarak yapømamiz gerekir