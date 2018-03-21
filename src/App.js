import React, { Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import { FacebookButton, FacebookCount } from 'react-social';
import bgimage from './bg.jpg';
// require('../../scss/style.scss');
 


const politicalHeros = [
    'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201612/modi_148218765575_647x404_122016062723_0.png',
    'http://india.tamilnews.com/wp-content/uploads/2018/03/stalin.jpg',
    'https://timesofindia.indiatimes.com/thumb/msid-55885301,width-400,resizemode-4/55885301.jpg',
    'http://3.bp.blogspot.com/-ZWppvHY8y1A/UETqvl5uffI/AAAAAAAAKJY/t5eH5encU-s/s1600/kamal-hassan-pic-722447.jpg',
    'https://images.ietamil.com/uploads/2017/12/edappadi-750x506.gif',
    'https://cdn.shopify.com/s/files/1/1284/2827/products/seeman_bike_medium.png?v=1501911211',
    'http://www.anbumani4cm.com/wp-content/uploads/2016/01/logo-new.png',
    'http://ippodhu.com/wp-content/uploads/2016/03/vaiko.png',
    'https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/sarathkumar%20FB.jpg?itok=IW14N69O',
    'https://pbs.twimg.com/profile_images/932593536821690373/Hn9_XsLD_400x400.jpg'
]
export class App extends Component {
    constructor() {
      super();
      this.state = {
        profilePic: null
      }
      this.shareUrl = null;
      this.componentClicked = this.componentClicked.bind(this);
      this.responseFacebook = this.responseFacebook.bind(this);
      this.shareImage = this.shareImage.bind(this);
      this.canvas = null;
      this.ctx = null;
      this.shareUrl = null;
    }
    shareImage(){
 
    this.shareUrl = new Image();
    try {
          this.src = this.canvas.toDataURL();        
        } catch (e) {
          console.log(e);
        } 
  this.shareUrl.crossOrigin = "Anonymous";

  this.shareUrl.onload = ()=> {
      this.canvas.width = this.shareUrl.width;
      this.canvas.height = this.shareUrl.height;
      this.ctx.drawImage( this.shareUrl, 0, 0 );
      localStorage.setItem( "savedImageData", this.canvas.toDataURL("image/png") );
  }
  this.shareUrl.src = this.src;
  // make sure the load event fires for cached images too
  if ( this.shareUrl.complete || this.shareUrl.complete === undefined ) {
      this.shareUrl.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      this.shareUrl.src = this.src;
  }
    } 
  
    componentDidMount() {
      this.canvas = document.getElementById('political-hero');
      this.ctx = this.canvas.getContext('2d');
      const bgImage = new Image(); 
      bgImage.width = 600;
      bgImage.height = 300;
      bgImage.src = bgimage;     
      bgImage.onload = () =>{
        this.ctx.drawImage(bgImage, 0, 0, 600, 300); 
      } 
    }
    responseFacebook(data) {
      console.log(data);
      const { accessToken } = data;

     this.setState(
       { profilePic: 'http://graph.facebook.com/'+data.userID+'/picture?type=large' }
     );

     const base_image = new Image();
     const polImage = new Image();
     polImage.src = politicalHeros[Math.abs(Math.round((Math.random(10) * 10)))];
     base_image.src = this.state.profilePic;
     base_image.width = 300;
     base_image.height = 300;
   
      base_image.onload = () => {
        this.ctx.drawImage(base_image, 50, 50, 200, 200);
      }
     const fillText = (text, x, y, font, color) => {
       this.ctx.font = font ;
       this.ctx.fillText(text, x, y); 
       this.ctx.fillStyle = color; 
     } 
     polImage.onload = () => {
        this.ctx.drawImage(polImage, 300, 0, 300, 260);
        fillText('Hey '+data.name, 50, 30, "30px Cursive", 'red');
        fillText('the political leader reflects your personality', 50, 290, "25px Impact", 'orange');
        let img = new Image();
        try {
          img.src = this.canvas.toDataURL();        
        } catch (e) {
          console.log(e);
        }
        this.shareUrl = img.src;
        console.log(this.shareUrl );
        
     }
    }
    componentClicked(data) {
      console.log(data);
    }
    render() {
        return (
            <div onClick={() =>{this.shareImage()}}>
                <div id={'parent'}>
                  <FacebookLogin
                    appId="1944913869157859"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    size={1000}
                   />
                  <canvas id="political-hero" width="600" height="300" style={{ backgroundColor: 'black' }}/>
                 <FacebookButton url={this.shareUrl} appId={'1944913869157859'}>
                    <FacebookCount url={this.shareUrl} />
                    {" Share " + this.shareUrl}
                </FacebookButton>
                </div>
                <img onClick={() => this.shareImage()}crossOrigin="Anonymous" src={this.shareUrl}></img>
            </div>
        );
    }

}

export default App;
