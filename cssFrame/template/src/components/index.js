import {Layout, Header, Aside, Content, Footer,Main} from './layout';
// import Category from './category';
// import FootNav from './foot-nav';
import Col from 'vant/lib/col';
import 'vant/lib/col/index.css';
import Row from 'vant/lib/row';
import 'vant/lib/row/index.css';


const components = {
  Layout,
  Header,
  Aside,
  Footer,
  Main,
  Content,
  CRow: Row,
  CCol: Col,
}

const install = (app) => {
  Object.keys(components).forEach(key => {
    if(key === 'CRow' || key === 'CCol') {
      app.component(key, components[key]) //是否是第三方库的代码
    }else{
      app.component(components[key]['name'], components[key])
    }
  });
}

const mgjUI = {
  install
}

export default mgjUI
