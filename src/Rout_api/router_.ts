import express from "express"
// import { Post_data_, Get_data_, Get_ID_data_, Put_data_, data_Day_location_, data_Day_, data_Month_, data_Year_, LocationChekeTolocation_, Stations_province } from "../API_Meteorological_/Clou_data_"
import { Location_Post_, Location_get, Location_get_id } from "../API_Meteorological_/Location_data_"
import { Admin_register, Admin_Login_, Show_User, Check_email, Register_user, Login_user, decodeToken } from "../API_Meteorological_/user_data_"
import { locaton_put } from "../API_Meteorological_/Location_data_"
// import { Admin_register } from "../API_Meteorological_/user_data_"
import { So2_SaveApi, Choho_SaveApi, No2_SaveApi, Show_data_Ges} from "../API_Meteorological_/Gas_data_"
import { AirQualityStation_save_Data_, Air4_Pm25_Showdata_All, Pm25_Now, AirPm_showdata_Location, AirPM_Province, AirPm_Put, AirQualityStation_Area_Save, AirPM_NowData, Show_AirQualitystation, getLatestAirQuality} from "../API_Meteorological_/Air4_Pm25_"
import { emailgo } from "../API_Meteorological_/Email_Go_"
import { Save_Station_Weather, Save_3Hours_weather_, Location_Ges_SAVE, showData_Air4Thai, ShowData_Weather_, V, P ,Station_Length, Data_Whather_Now, Show_stationAll_Now} from "../API_Meteorological_/Weather_"


let rou = express.Router()

rou.get('/air4thaidatashow', showData_Air4Thai)
rou.get('/latest', getLatestAirQuality)

rou.post('/location_ges_SAVE', Location_Ges_SAVE)

rou.post('/weather', Save_Station_Weather)
rou.post('/3Hoursweather', Save_3Hours_weather_)
rou.get('/weather', ShowData_Weather_)
rou.get('/weather/3hoursweather', V)
rou.get('/DataWhatherNow', Data_Whather_Now)


rou.get('/V', P)

rou.get('/station/length', Station_Length)

rou.get('/weatherstationnow', Show_stationAll_Now)

rou.post('/register', Admin_register)
rou.post('/login', Admin_Login_)
rou.post('/register-user', Register_user)
rou.post('/login-user', Login_user)
rou.get('/check-emil/:email', Check_email)
rou.get("/decode-token", decodeToken);

rou.post('/so2save', So2_SaveApi)

rou.post('/chohosave', Choho_SaveApi)

rou.post('/no3save', No2_SaveApi)

// rou.post('/register', Admin_register)

rou.get('/ShowData', Show_data_Ges)

rou.post('/Pm25_apipostair4', AirQualityStation_save_Data_)
rou.get('/airPmshowdata', Air4_Pm25_Showdata_All)
rou.get('/pmshownow', Pm25_Now)

rou.post("/send-email", emailgo);


rou.post('/locationpost', Location_Post_)
rou.get('/locationget', Location_get)
rou.get('/locationget/:id', Location_get_id)
rou.put('/loatonEdit/:id', locaton_put)

rou.get('/user-email/:email', Show_User)

rou.post('/so2save', So2_SaveApi)


rou.post('/chohosave', Choho_SaveApi)

rou.post('/no3save', No2_SaveApi)

// rou.post('/register', Admin_register)

rou.post('/Pm25_apipostair4', AirQualityStation_save_Data_)
rou.get('/airPmshowdata', Air4_Pm25_Showdata_All)
rou.get('/pmshownow', Pm25_Now)
rou.get('/airpm', Show_AirQualitystation)
rou.get('/airpm/nowdata/:id',  AirPM_NowData)
// rou.get('/airpm/:year/:name_location', AirPM_ShowYear)
rou.get('/airpm111/:name_location', AirPM_Province)
rou.get('/airlcation', AirPm_showdata_Location)
rou.put("/airpmEdit/:id", AirPm_Put)
rou.post('/airqualitystation', AirQualityStation_Area_Save) 

export default rou