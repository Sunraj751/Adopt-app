/* only make custom hooks if you are repeating the code  again and again in the code
 *example: in this case we need list of breeds based on which animal is selected 
 * if we do it normally we need to re-write it again and again.
 * But if i create a hook which just sees what animal is selected and gives
 * a list of breed it will prevent me from re-writing the same code again and again */
// LAST OPTION IS CUSTOM HOOKS, DON'T USE UNLESS REQUIRED

import {useState, useEffect} from 'react'

const localCache = {}; // this will prevent the app to re-request API for already searched animal breed

export default function useBreedList(animal){
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus]= useState('unloaded');

    useEffect(()=>{
        if(!animal){ // if there is no animal i can't give any list of breeds
            setBreedList([])
        }
        else if (localCache[animal]){ // if animal has already been requested before, show that list the one which was previously requested
        setBreedList(localCache[animal])
        }
        else{ // if the animal is searched right now, and not before, go to the API and search for the list 
            requestBreedList();
        }
        async function requestBreedList(){
            setBreedList([]); 
            setStatus('loading');
    
            const res = await fetch(
                `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
            )
            const json = await res.json();
            localCache[animal] = json.breeds // saved result in animal, so that if the same animal is searched the list can be shown, without re-requesting
            setBreedList(localCache[animal]);
            setStatus('loaded')
        }
    }, [animal])/*
//NOW WHEN DOES THIS EFFECT RUN? => whenever we get new animal from uer  
*this animal is exactly for this purpose */
return [breedList, status]; // the braces can also be {}, instead of [], it is just a REACT CONVENTION, nothing else. it works in both ways
}
