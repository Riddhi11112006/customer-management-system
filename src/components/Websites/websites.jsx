import React from 'react';
import uidai from './assets/uidai.png';
import digitalseva from './assets/Digitalseva.png';
import Pancard from './assets/Pancard.png';
import Safar from './assets/Safar.png';
import Admission from'./assets/Admission.png'

const websites = [
  {
    name: "UIDAI",
    image: uidai,
    link: "https://uidai.gov.in/en/"
  },

  {
    name: "PAN CARD",
    image: Pancard,
    link: "https://egovcsc.csccloud.in/nsdl/"
  },
  {
    name: "Digital Seva",
    image: digitalseva,
    link: "https://edistrict.delhigovt.nic.in/Account/CSCURLRedirect"
  },
  {
    name: "Safar",
    image: Safar,
    link: "https://cscsafar.in/"
  },
  {
    name: "Admission",
    image: Admission,
    link: "https://examinationservices.nic.in/ExaminationServices/"
  }
];

function Websites() {

  return (

    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        marginTop: '30px'
      }}
    >

      {websites.map((site, index) => (

        <a
          key={index}
          href={site.link}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: 'none',
            color: 'black'
          }}
        >

          <div
            style={{
              width: '180px',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              textAlign: 'center',
              background: 'white'
            }}
          >

            <img
              src={site.image}
              alt={site.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain'
              }}
            />

            <h3>{site.name}</h3>

          </div>

        </a>

      ))}

    </div>

  );
}

export default Websites;