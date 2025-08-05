import express from "express"
import { Post_data_, Get_data_, Get_ID_data_, Put_data_, data_Day_location_, data_Day_, data_Month_, data_Year_, LocationChekeTolocation_, Stations_province } from "../API_Meteorological_/Clou_data_"
import { Location_Post_, Location_get, Location_get_id } from "../API_Meteorological_/Location_data_"
import { User_data_register, User_Login_, Show_User, isTokenshow } from "../API_Meteorological_/user_data_"
import { locaton_put } from "../API_Meteorological_/Location_data_"
// import { User_data_register } from "../API_Meteorological_/user_data_"
import { So2_SaveApi, Choho_SaveApi, No2_SaveApi, Separate_yearmoth, Show_data_so2, So2_Year, So2_Day, so2_ShowData, Choho_Day_Data, Data_locationname, Choho_Month_Data, Choho_Year_Data, Chohho_ShowData, No2_Day_Data, No2_Month_Data, No2_Year_Data, No2_ShowData } from "../API_Meteorological_/Gas_data_"
import { AirQualityStation_save_Data_, Air4_Pm25_Showdata_All, Pm25_Now, Show_datalocation, AirPM_ShowMonth, AirPM_ShowYear, AirPm_showdata_Location, AirPM_Province, AirPm_Put} from "../API_Meteorological_/Air4_Pm25_"
import { emailgo } from "../API_Meteorological_/Email_Go_"


let rou = express.Router()

rou.post('/postdataclou', Post_data_)
rou.get('/getdataclou', Get_data_)
rou.get('/getdataclou/:id', Get_ID_data_)
rou.put("/putdataclou/:id", Put_data_)


// rou.post('/locationpost', Location_Post_)
// rou.get('/locationget', Location_get)
// rou.get('/locationget/:id', Location_get_id)

rou.post('/register', User_data_register)
rou.post('/login', User_Login_)
rou.get('/user-email/:email', Show_User)
rou.get('/user-token/:token', isTokenshow)

rou.post('/so2save', So2_SaveApi)
rou.get('/Separate', Separate_yearmoth)
rou.get('/gesso2/:year/:month/:location_id', Show_data_so2)
rou.get('/gesso2/:year/:month/:day/:location_id', So2_Day)
rou.get('/gesso2/:year/:location_id', So2_Year)
rou.get('/gesso2/:name_location',so2_ShowData)

rou.post('/chohosave', Choho_SaveApi)
rou.get('/geslocationname', Data_locationname)
rou.get('/geschoho/:year/:month/:day/:location_id', Choho_Day_Data)
rou.get('/geschoho/:year/:month/:location_id', Choho_Month_Data)
rou.get('/geschoho/:year/:location_id', Choho_Year_Data)
rou.get('/choholocationname/:name_location', Chohho_ShowData)

rou.post('/no3save', No2_SaveApi)
rou.get('/geslocationname', Data_locationname)
rou.get('/gesno2/:year/:month/:day/:location_id', No2_Day_Data)
rou.get('/gesno2/:year/:month/:location_id', No2_Month_Data)
rou.get('/gesno2/:year/:location_id', No2_Year_Data)
rou.get('/gesno2/:name_location',No2_ShowData)

// rou.post('/register', User_data_register)

rou.post('/Pm25_apipostair4', AirQualityStation_save_Data_)
rou.get('/airPmshowdata', Air4_Pm25_Showdata_All)
rou.get('/pmshownow', Pm25_Now)

rou.post('/send-email', emailgo)

rou.post('/postdataclou', Post_data_)
rou.get('/getdataclou', Get_data_)
rou.get('/getdataclou/:id', Get_ID_data_)
rou.put("/putdataclou/:id", Put_data_)
rou.get("/climate/:name_location", Stations_province)
rou.get('/climate/:year/:month/:name_location', data_Month_)
rou.get('/climate/:year/:month/:day/:name_location', data_Day_)
rou.get('/climate/:year/:name_location', data_Year_)
rou.get('/climatedata', LocationChekeTolocation_)

rou.post('/locationpost', Location_Post_)
rou.get('/locationget', Location_get)
rou.get('/locationget/:id', Location_get_id)
rou.put('/loatonEdit/:id', locaton_put)

rou.post('/register', User_data_register)
rou.post('/login', User_Login_)
rou.get('/user-email/:email', Show_User)

rou.post('/so2save', So2_SaveApi)
rou.get('/Separate', Separate_yearmoth)
rou.get('/gesso2/:year/:month/:location_id', Show_data_so2)
rou.get('/gesso2/:year/:month/:day/:location_id', So2_Day)
rou.get('/gesso2/:year/:location_id', So2_Year)
rou.get('/gesso2/:name_location',so2_ShowData)


rou.post('/chohosave', Choho_SaveApi)

rou.post('/no3save', No2_SaveApi)

// rou.post('/register', User_data_register)

rou.post('/Pm25_apipostair4', AirQualityStation_save_Data_)
rou.get('/airPmshowdata', Air4_Pm25_Showdata_All)
rou.get('/pmshownow', Pm25_Now)
rou.get('/airpm/:year/:month/:day/:id', Show_datalocation)
rou.get('/airpm/:year/:month/:name_location',  AirPM_ShowMonth)
rou.get('/airpm/:year/:name_location', AirPM_ShowYear)
rou.get('/airpm111/:name_location', AirPM_Province)
rou.get('/airlcation', AirPm_showdata_Location)
rou.put("/airpmEdit/:id", AirPm_Put)

export default rou