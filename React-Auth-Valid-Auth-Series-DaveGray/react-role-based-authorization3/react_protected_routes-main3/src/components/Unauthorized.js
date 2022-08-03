import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    //HARIKA KULLANIM,BU BIZE LAZM COK LAZM OLACAK...
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized

/*
Bestpractise-navigate(-1) ile kullaniciyi Go Back butonu ile bir onceki sayfaya geri dondurme


<button onclick="goBack()">Go Back</button>
<script>
function goBack() {
    window.history.back();
}
</script>

Veya 

<button onclick="history.go(-1);">Go back</button>
if we want to more than one step back then increase
For going 2 steps back history.go(-2)
For going 3 steps back history.go(-3)
For going 4 steps back history.go(-4)
and so on.......
*/