import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [value, setValue] = useState('random person')
  const [title, setTitle] = useState('name')
  const getPerson = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    const { phone, email } = person
    const { large: image } = person.picture
    const { password } = person.login
    const { first, last } = person.name
    const {
      dob: { age },
    } = person
    const {
      street: { number, name },
    } = person.location

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(() => {
    getPerson()
  }, [])

/* burda bsestpractise ozellik olarak data set kullanilmis... ve custom attribute olusturulup 
o attribute e erisim saglaniyor ve bu islem onMouseover uzerinden yapiliyor
 Yani biz birbirinden cok farkli olan ama her birisinin uzerine gittgimizde o na ait
  datayi almak istedigmzde dinamik bir sekilde ona ait
 olan elementi almak icin...dikkat edelim biz className olarak hepsidne icon kullanmisisz
  ki evet.capturing ozellgini kullanarak ayni alan icinde className i icon ise bunu uygula diyoruz...
  sonrasinda da biz custom olarak data-set uzerinden data-label className i veriyoruz her bir butona ve value olarak da biz
 obje iicnde property olarak ne bekliyorsak onlari atiyoruz ki hangisinn uzerine gelirsek o obje icindeki 
 ona karsilik gelen degere erisebilelim diye
 */
 
  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      //icon class i na sahip olan elementler uzerinde gezindgimzde gerceklestir bu islemi
      console.log("e.target.dataset_ ",e.target.dataset);
      console.log("e.target.dataset_ ",e.target.getAttribute("data-label"));//class i icon olan elemntler uzerinde 
      //gezinirken hangi elemntin uzeerinde isek
      // onda ait data-label attribute values ini veriyor...
      const newValue = e.target.dataset.label//dataset objesi olustururyor ve onun icerisinde data-label, 
      //data-text gibi data ile baslayan ismleri property olarak veriyor
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>My {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='street'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
