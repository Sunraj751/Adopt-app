import { Link } from "react-router-dom"; //MAKE SURE ABOUT Link and link (Capital L is needed)

const Pet = (props) => {const {name, animal,breed,images,location,id} = props;

let hero = 'https://pets-images.dev-apis.com/pets/none.jpg';
if(images.length){
  hero = images[0];
}
// Link makes the things clickable, and instead of shifting user to a whole new page
// it sends the user to a different page which is doesn't create a new complete app
  return ( //this is major part of writing in react
    <Link to= {`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name}/>
      </div>
      <div className = "info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;


