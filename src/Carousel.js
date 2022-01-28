import { Component } from "react";

class Carousel extends Component{
    state = {
        active: 0, 
    };

    static defaultProps = { // this is for time when you don't receive anything from props. KIND OF LIKE A BACKUP
        images:["http://pets-images.dev-apis.com/pets/none.jpg"],
    }
    
    handleIndexClick=(event)=>{ //if this is written in normal function 'this' will give error. So instead make it an arrow function. 
        this.setState({
            active: +event.target.dataset.index // this is browser stuff. The '+' sign makes it a number instead of string that we get back from DOM
        });
    }

    render(){
        const { active } = this.state;
        const { images } = this.props;
        
        return(
            <div className="carousel">
                <img src={images[active]} alt = "animal"/>
                <div className="carousel-smaller">
                    {images.map((photo, index)=> (
                        //eslint-disable-next-line

                        //this whole thing should be a button cause it is getting clicked on
                        <img 
                            key={photo}
                            src={photo}
                            data-index={index}
                            onClick={this.handleIndexClick}
                            className={index === active ? "active" : "" }
                            alt="animal thumbnail"
                            />
                        ))}
                </div>
            </div>
        );
    }
}
export default Carousel;
