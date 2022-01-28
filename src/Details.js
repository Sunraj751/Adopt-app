import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext"
import Modal from "./Modal";

// not required to write in class API here to expalin the concept, cause it have it's own benefits 

class Details extends Component{ //every class component extends React.Component
  //------------------------------Method 1--------------------------------
    // //every class component have a render method, to print out stuff
    // constructor(){
    //     super(); // If you have a constructor, you have to do the super(props) to make sure that the props are passed up to React so React can keep track of them.
    //     this.state = { loading: true }; // we need to track loading if we want to show user, that the API request has been sent
    //}                                 // and they need to wait for it.  using this loading variable we can do stuff that we did on line 38
 //-------------------------------Method 2-------------------------------
    state = {loading:true, showModal: false }; //this works when you upgrade some babel and eslint. Basically removing constructor and '}' 
    
    async componentDidMount(){ //called after the first rendering is completed. 
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        );
        const json = await res.json();
        this.setState(
            Object.assign(
                {
                    loading: false,
                }, 
                json.pets[0]
            )
        );
    /*the above code can be written like this too, for better understanding 
    this.setState({
        loading: false,
        name: json.pets[0].name,
        breed: json.pets[0].breed,
        animal: json.pets[0].animal 
    })*/
    }
    toggleModal = () => this.setState({showModal: !this.state.showModal});
    adopt = () => (window.location = "http://bit.ly/pet-adopt"); 
    // here we will have some logic to call API, and let the shelter know that the pet has been adopted
    
    render (){
        console.log(this.state);
        if (this.state.loading){
            return <h2>loading...</h2>;
        }

        const {
            animal, 
            breed, 
            city, 
            state, 
            description, 
            name, 
            images, 
            showModal} = this.state;
        return(
            <div className="details">
                <Carousel images={images}/>
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${city},${state}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button onClick= {this.toggleModal} 
                            style={{ backgroundColor: theme }}
                            >   
                            Adopt {name}
                            </button>
                        )}
                    </ThemeContext.Consumer>;
                    <p>{description}</p>
                        {showModal?(
                            <Modal>
                                <div>
                                    <h1>Would you like to adop {name}</h1>
                                    <div className="buttons">
                                        <button onClick = {this.adopt}>Yes</button>
                                        <button onClick = {this.toggleModal}> No</button>
                                    </div>
                                </div>
                            </Modal>
                        ): null}
                </div>
            </div>
        );
    }
}
const DetailsWithRouter = withRouter(Details);

export default function DetailswithErrorBoundary(){
    return (
        <ErrorBoundary>
            <DetailsWithRouter/>
        </ErrorBoundary>
    )
}
