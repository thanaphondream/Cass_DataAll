export const Pm10 = (pm_data?: any, pm_id?: Number) => {
  return pm_data.findOne({ where: { air_id: { id: pm_id } } })
}

export const Pm25 = (pm_data?: any, pm_id?: Number) => {
  return pm_data.findOne({ where: { air_id: { id: pm_id } } })
}

export const Pm25_save = (pm_data?: any, air_id?: Number, pm_dataPm25?: any) => {
  const pm_set_0 = pm_dataPm25.pm25[0]
  const pm_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    air_id: any
  } = {
    color_id: pm_set_0.color_id,
    aqi: pm_set_0.aqi,
    value: pm_set_0.value,
    air_id: air_id
  }
  return pm_data.save(pm_type)
}

export const Pm10_save = (pm_data?: any, air_id?: Number, pm_dataPm25?: any) => {
  const pm_set_0 = pm_dataPm25.pm10[0] 
  const pm_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    air_id: any
  } = {
    color_id: pm_set_0.color_id,
    aqi: pm_set_0.aqi,
    value: pm_set_0.value,
    air_id: air_id
  }
  return pm_data.save(pm_type)
}

export const Pm_save_10_25 = async(pm25_data?: any, pm10_data?: any, air_id?: Number, pm_dataPm25?: any, pm_dataPm10?: any) => {
  const pm25_set_0 = pm_dataPm25.pm25[0]
  const pm10_set_0 = pm_dataPm10.pm10[0]
  const pm25_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    air_id: any,
  } = {
    color_id: pm25_set_0.color_id,
    aqi: pm25_set_0.aqi,
    value: pm25_set_0.value,
    air_id: air_id
  }
  const pm10_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    air_id: any
  } = {
    color_id: pm10_set_0.color_id,
    aqi: pm10_set_0.aqi,
    value: pm10_set_0.value,
    air_id: air_id
  }
   const pm25_saved_data = await pm25_data.save(pm25_type); 
    const pm10_saved_data = await pm10_data.save(pm10_type);

    return {
        pm25_saved_data,
        pm10_saved_data
    };
}