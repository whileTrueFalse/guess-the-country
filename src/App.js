import { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import CountryDetails from "./components/countryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [options, setOptions] = useState([]);
  const [points, setPoints] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [questionType, setQuestionType] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  //useEffect to fetch RESTcountries data
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((json) => {
        setCountries(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!answered) {
      //pick random country from countries state array
      const pickRandomCountry = () => {
        const randomCountry =
          countries.length > 0
            ? countries[Math.floor(Math.random() * countries.length)]
            : null;
        if (randomCountry) {
          return randomCountry;
        }
      };

      /**
       * Returns a random integer between min (inclusive) and max (inclusive).
       * The value is no lower than min (or the next integer greater than min
       * if min isn't an integer) and no greater than max (or the next integer
       * lower than max if max isn't an integer).
       * Using Math.round() will give you a non-uniform distribution!
       */
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      setQuestionType(getRandomInt(0, 1));

      //Pick one random country and set it to country state
      //It will be the country that will be the correct option
      const randomCountry = pickRandomCountry();
      setCountry(randomCountry);
      const opt = [];
      //Push correct country to options array
      opt.push(randomCountry);
      //Generate options array of 3 random countries + one correct
      while (countries.length > 0 && opt.length < 4) {
        let newCountry = pickRandomCountry();
        //Check if country already exists in options array
        if (!opt.some((option) => option.name === newCountry.name)) {
          opt.push(newCountry);
        }
      }
      /* Randomize array in-place using Durstenfeld shuffle algorithm */
      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
      shuffleArray(opt);
      setOptions(opt);
    }
  }, [countries, answered]);

  return (
    <div className="App w-full h-full">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Main
          country={country}
          options={options}
          points={points}
          setPoints={setPoints}
          answered={answered}
          setAnswered={setAnswered}
          incorrect={incorrect}
          setIncorrect={setIncorrect}
          questionType={questionType}
          setOpenModal={setOpenModal}
        />
      )}
      <CountryDetails
        countries={countries}
        country={country}
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></CountryDetails>
      <Footer></Footer>
    </div>
  );
}

export default App;
