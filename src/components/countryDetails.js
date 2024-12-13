import React from "react";

const countryDetails = ({ country, countries, openModal, setOpenModal }) => {
  let modal = document.getElementById("myModal");
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      setOpenModal(false);
    }
  };

  const allCountries = countries;
  let newCountries = [];

  return (
    <>
      <div
        id="myModal"
        className={`modal `}
        style={openModal ? { display: "block" } : { display: "none" }}
      >
        <div class="modal-content flex flex-wrap">
          <img
            className="w-full lg:w-5/12 border-gray-200 border"
            src={country?.flag}
            alt="country flag"
          ></img>
          <div className="details w-full lg:w-7/12 lg:pl-8 pb-4 flex flex-col gap-2">
            <h2 className="font-extrabold text-3xl pb-3 pt-6 text-center lg:text-left">
              {country?.name}
            </h2>
            <p className="w-full">
              <span className="font-bold">Native Name: </span>
              <span>{country?.nativeName}</span>
            </p>
            <p className="w-full">
              <span className="font-bold">Capital: </span>
              <span>{country?.capital}</span>
            </p>
            <p className="w-full">
              <span className="font-bold">Population: </span>
              <span>{country?.population}</span>
            </p>
            <p className="w-full">
              <span className="font-bold">Region: </span>
              <span>{country?.region}</span>
            </p>
            <p className="w-full">
              <span className="font-bold">Sub Region: </span>
              <span>{country?.subregion}</span>
            </p>
            {country?.borders ? (
              <p className="w-full">
                <span className="font-bold">Border countries: </span>
                {/*Check if country has borders*/}
                {country?.borders?.forEach((border, i) => {
                  /*Then check if returned border list codes match country, if so then push it to newCountries array*/
                  allCountries.forEach((c) => {
                    if (c.alpha3Code === border) {
                      newCountries.push(c.name);
                    }
                  });
                })}
                {/*Finally map new array for display*/}

                {newCountries.map((country, i) => (
                  <span key={i}>{`${country}, `}</span>
                ))}
              </p>
            ) : (
              ""
            )}
            <p className="w-full">
              <span className="font-bold">Currencies: </span>
              <span>
                {country?.currencies?.map((currency, i) => (
                  <span
                    key={i}
                  >{`${currency.symbol} - ${currency.name}, `}</span>
                ))}
              </span>
            </p>
            <p className="w-full">
              <span className="font-bold">Languages: </span>
              <span>
                {country?.languages?.map((language, i) => (
                  <span
                    key={i}
                  >{`${language.name} - ${language.nativeName}, `}</span>
                ))}
              </span>
            </p>
          </div>
          <button
            className="btn-selected w-full"
            onClick={() => setOpenModal(false)}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
};

export default countryDetails;
