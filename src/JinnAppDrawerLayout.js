import { openWcLogo } from './open-wc-logo.js';

export class JinnAppDrawerLayout extends HTMLElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }


  constructor() {
    super();
    this.title = 'My app';
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(){
    const style = `
        @import "./src/pure-min.min.css";
        .pure-toggle-label{
          border:none;
          // width:45px;
          // height:45px;
        }
        .pure-toggle-label .pure-toggle-icon, .pure-toggle-label .pure-toggle-icon::before, .pure-toggle-label .pure-toggle-icon::after{
          background:var(--jinn-drawer-icon);
        }
        .pure-toggle-label:hover .pure-toggle-icon, .pure-toggle-label:hover .pure-toggle-icon:before, .pure-toggle-label:hover .pure-toggle-icon:after {
          background:var(--jinn-drawer-icon-hover);
          color:var(--jinn-drawer-icon);
        }
        .visible{
          visibility:visible;
          opacity:1;
          transition: opacity 1s easeIn;
        }
        .hidden{
          visibility:hidden;
          opacity:0;
          transition:opacity 1s easeOut;
        }
    `;

    this.shadowRoot.innerHTML = `
        <style>
          ${style}
        </style>
      ${this.render()}
    `;

    window.addEventListener('load', ()=>{
      console.log('loaded');
      const icon = this.shadowRoot.querySelector('.pure-toggle-label');
      // const drawer = this.shadowRoot.querySelector('.pure-drawer');
      // drawer.style.visibility='visible';
      // document.body.style.visibility = 'visible';
      document.body.style.visibility = 'visible';

      setTimeout(()=>{
        // icon.style.visibility='visible';
        const hidden = this.shadowRoot.querySelector('.hidden');
        hidden.classList.replace('hidden', 'visible');
      },400);
    });

    // this.effect = this.hasAttribute('effect')?this.getAttribute('effect'):'pure-pusher'
  }


  render() {
    return `
        <div class="pure-container" data-effect="pure-effect-scaleRotate">
            <input type="checkbox" id= "pure-toggle-left" class="pure-toggle" data-toggle="left"/>
            <label class="pure-toggle-label hidden" for="pure-toggle-left" data-toggle-label="left"><span class="pure-toggle-icon"></span></label>
    
            <nav  class="pure-drawer" data-position="left">
                <p style="padding: 3rem 0; margin: 0;">
                    <slot name="drawer"></slot>
                </p>
            </nav>   
            
            <div class="pure-pusher-container">
                <div class="pure-pusher">
                    <p style="width: 300px; height: 1800px; margin: 100px auto;">
                        <slot></slot>
                    </p>
                </div>
            </div>
            
            <label class="pure-overlay" for="pure-toggle-left" data-overlay="left"></label> 
        </div>
    `;
  }
}
