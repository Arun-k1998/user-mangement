import { useDispatch, useSelector } from "react-redux";
import getCookies from "../../../helpers/getCookies";
import axios from '../../../axios'
import { userActions } from "../../../redux/userAuthentification";
const HomeVerification = ({children})=>{
    const dispatch = useDispatch()
    const user = useSelector(store=>store.user.userName)
    const cookies = getCookies()
    if (!user && !cookies['id'] && !cookies['token']) {
        console.log('not user');
        return children;
      }else if(user){
        console.log('user exit');
        return children
      }
      else if(cookies && cookies['id'] && cookies['token']){
        console.log('cookie exit');
        console.log('user');
        axios
        .get("/userProfile")
        .then((response) => {
          if (!response.data.user) throw new Error();
          dispatch(
            userActions.userLogin({
              name: response.data.user.name,
              _id: response.data.user._id,
            })
          );
          return children
        })
        .catch((error) => {
          console.log(error.message);
          
        });
  
        
      }
}

export default HomeVerification