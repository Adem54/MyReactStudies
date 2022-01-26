import React, {useState } from "react";

const ContactList = ({ contacts }) => {
  const [search, setSearch] = useState("");

  const searchHandle = (e) => {
    setSearch(e.target.value);
  };

 
  const resultSearch = contacts.filter(
    (contact) =>
      contact.fullname.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone_number.includes(search.toString().toLowerCase())
  );

//   const filterResult = contacts.filter((contact) => {
//     return Object.values(contact).some((item) =>
//       item.toString().toLowerCase().includes(search.toString().toLowerCase())
//     );
//   });

  const filterContacts = () => {
    return resultSearch.map(({ fullname, phone_number }, index) => (
      <li key={index}>
        {" "}
        <span>{fullname}</span> <span>{phone_number}</span>{" "}
      </li>
    ));
  };



  return (
    <div  >
      <input
        name="search"
        placeholder="Search"
        value={search}
        onChange={searchHandle}
      />
      <ul  className="list">{filterContacts()}</ul>
      <p style={{textAlign:"left"}}>Total Contacts:{resultSearch.length}</p>
    </div>
  );
};

export default ContactList;
