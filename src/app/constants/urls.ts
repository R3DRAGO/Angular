import {environment} from "../../environments/environment";

const {API} = environment;

const cars = `${API}/cars`

const urls = {
  cars:{
    base: cars,
    byId:(id:number)=>`$/cars/${id}`,
  }
}

export {
  urls
}
