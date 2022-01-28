import {useState,useEffect,useContext} from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from './Results';



const ANIMLAS = ["bird", "cat", "dog", "reptile"];
const breeds = [];

const SearchParams = () => {
    const[location,setLocation] = useState("");
    const[animal,setAnimal] = useState("");
    const[breed, setBreed] = useState("");
    const[pets, setPets] = useState([]); // as an array    
    const[breeds]=useBreedList(animal); //custom hook called
    const[theme,setTheme] = useContext (ThemeContext);

    // instead of using arrow function in onChange, this is how it would have been done
    //    function updateLocation(e){
    //        return setLocation(e.target.value);
    //    }
//calling this function with onChange 
    // onChange = {updateLocation}, on change is the event i think, which trigers the function


    useEffect(() => {
        requestPets();
    },[]) //eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets(){
       const res = await fetch(
           `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
       )
       const json = await res.json();
       setPets(json.pets);
    }

    // above 3 are STATE VARIABLES named as location, animal and breed
    // and useState is a built in State Hook

    return ( // this return statment forms the HTMl code for the form and the above is the forms fucitonality
       
        
       <div className = "search-params">
            <form
            onSubmit={e=>{ // this is not written on submit button cause, user can also press "enter" to submit instead of clicking on submit. 
                //this way we cover both "enter", and submit button 
                e.preventDefault();  // prevents for reloading the default HTML page.
                requestPets();
            }}
            > 

                <label htmlFor="location"> location
                    <input  //box made cause we used form, and some CSS
                        id ="location" 
                        onChange={e => setLocation(e.target.value)} 
                        value = {location} 
                        placeholder = "Location"
                    />
                </label>

                <label htmlFor = "animal"> Animal
                    <select
                        id ="animal"
                        value ={animal}
                        onChange={e => setAnimal(e.target.value)} // function to update as per user wants
                        onBlur={e => setAnimal(e.target.value)}
                    >    
                    <option value = ""> </option>
                    {
                        ANIMLAS.map(animal => ( // basically a return statement without actually writing return seperately
                          <option value ={animal} key = {animal}>
                              {animal}
                          </option>  
                        ))
                    }
                    </select>

                </label>
                <label htmlFor = "breed">
                    Breed
                    <select
                        id ="breed"
                        value ={breed}
                        onChange={e => setBreed(e.target.value)}
                        onBlur={e => setBreed(e.target.value)}
                    >    
                    <option value = ""> </option>
                    {
                        breeds.map(breed => ( // basically a return statement without actually writing return seperately
                          <option value ={breed} key = {breed}>
                            {breed}
                          </option>  
                        ))
                    }
                    </select>
                </label>
                    <label htmlFor="theme">
                        Theme
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        onBlur={(e) => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;