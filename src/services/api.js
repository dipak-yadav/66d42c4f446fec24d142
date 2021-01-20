import axios from "axios";
import * as Constant from '../constants/constant' 
class nasaServices {
  getNasaDetailsById(id) {
    return axios
    .get(
      `${Constant.BASE_URL}/${id}?api_key=${Constant.NASA_API_KEY}`
    )
    
  }

  getNasaDetails(){
    return axios
    .get(
      `${Constant.BASE_URL}/browse?api_key=DEMO_KEY`
    )
  }

}

export default new nasaServices();