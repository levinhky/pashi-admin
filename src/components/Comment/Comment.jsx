import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Comment = () => {
    return (
    <div>
        <Carousel>
            <div>
                <img src="https://product.hstatic.net/1000370235/product/z3733404476863_7e275dd6543a97bf749afe1bb2388233_958df4b2b6924c7e8498de2eb72e685b_grande.jpg" />
            </div>
            <div>
                <img src="https://product.hstatic.net/1000370235/product/z3733404438658_38f684f7557d33335564cfa27c5e9982_d8354b4432fa4fefbb6b108621246afa_grande.jpg" />
            </div>
            <div>
                <img src="https://product.hstatic.net/1000370235/product/bf2d335d-5fd8-4403-a506-20aeea7c6818_aec9e80d0d3240ec9716e664bccdbdba_grande.jpg" />
            </div>
            <div>
                <img src="https://product.hstatic.net/1000370235/product/bf2d335d-5fd8-4403-a506-20aeea7c6818_aec9e80d0d3240ec9716e664bccdbdba_grande.jpg" />
            </div>
        </Carousel>
    </div>
    );
}

export  default  Comment;