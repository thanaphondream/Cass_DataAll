export const Pm10 = (pm_data?: any, pm_id?: Number) => {
  return pm_data.findOne({ where: { lastaqi_id: {air_id: {id: Number(pm_id)}} } })
}

export const Pm25 = (pm_data?: any, pm_id?: Number) => {
  return pm_data.findOne({ where: { lastaqi_id: {air_id: {id: Number(pm_id)}} } })
}

export const Pm25_save = (pm_data?: any, air_id?: Number, pm_dataPm25?: any) => {
  const pm_set_0 = pm_dataPm25.pm25[0]
  const pm_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: pm_set_0.color_id,
    aqi: pm_set_0.aqi,
    value: pm_set_0.value,
    lastaqi_id: air_id
  }
  return pm_data.save(pm_type)
}

export const Pm10_save = (pm_data?: any, air_id?: Number, pm_dataPm25?: any) => {
  const pm_set_0 = pm_dataPm25.pm10[0]
  const pm_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: pm_set_0.color_id,
    aqi: pm_set_0.aqi,
    value: pm_set_0.value,
    lastaqi_id: air_id
  }
  return pm_data.save(pm_type)
}

export const o3_save = (o3_data?: any, air_id?: number, o3_dataO3?: any) => {
  const o3_set_0 = o3_dataO3.o3[0]
  const o3_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: o3_set_0.color_id,
    aqi: o3_set_0.aqi,
    value: o3_set_0.value,
    lastaqi_id: air_id
  }
  return o3_data.save(o3_type)
}

export const co_save = (co_data?: any, air_id?: number, co_dataCo?: any) => {
  const co_set_0 = co_dataCo.co[0]
  const co_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: co_set_0.color_id,
    aqi: co_set_0.aqi,
    value: co_set_0.value,
    lastaqi_id: air_id
  }
  return co_data.save(co_type)
}

export const no2_save = (no2_data?: any, air_id?: number, no2_dataNo2?: any) => {
  const no2_set_0 = no2_dataNo2.no2[0]
  const no2_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: no2_set_0.color_id,
    aqi: no2_set_0.aqi,
    value: no2_set_0.value,
    lastaqi_id: air_id
  }
  return no2_data.save(no2_type)
}

export const so2_save = (so2_data?: any, air_id?: number, so2_dataSo2?: any) => {
  const so2_set_0 = so2_dataSo2.so2[0]
  const so2_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: so2_set_0.color_id,
    aqi: so2_set_0.aqi,
    value: so2_set_0.value,
    lastaqi_id: air_id
  }
  return so2_data.save(so2_type)
}

export const aqi_save = (aqi_data?: any, air_id?: number, aqi_dataAqi?: any) => {
  const aqi_set_0 = aqi_dataAqi.aqi[0]
  const aqi_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: aqi_set_0.color_id,
    aqi: aqi_set_0.aqi,
    value: aqi_set_0.value,
    lastaqi_id: air_id
  }
  return aqi_data.save(aqi_type)
}

export const Pm_save_10_25 = async(pm25_data?: any, pm10_data?: any, pm_dataPm25?: any, pm_dataPm10?: any, o3?: any, co?: any, no2?: any,  so2?: any, api?: any, O3_data?: any, Co_data?: any, No2_data?: any, So2_data?: any, aqi_data?: any, air_id?: number) => {
  console.log("ddaa", pm_dataPm25, pm_dataPm10, o3.o3[0], co, no2, so2, api)
  const pm25_set_0 = pm_dataPm25.pm25[0]
  const pm10_set_0 = pm_dataPm10.pm10[0]
  const o3_set_0 = o3.o3[0]
  const co_set_0 = co.co[0]
  const no2_set_0 = no2.no2[0]
  const so2_set_0 = so2.so2[0]
  const aqi_set_0 = api.aqi[0]

  console.log("ddf", pm25_set_0, pm10_set_0, o3_set_0, co_set_0, no2_set_0, so2_set_0, aqi_set_0)

  const pm25_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lestaqi_id: any,
  } = {
    color_id: pm25_set_0.color_id,
    aqi: pm25_set_0.aqi,
    value: pm25_set_0.value,
    lestaqi_id: air_id
  }
  const pm10_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: pm10_set_0.color_id,
    aqi: pm10_set_0.aqi,
    value: pm10_set_0.value,
    lastaqi_id: air_id
  }
  const o3_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: o3_set_0.color_id,
    aqi: o3_set_0.aqi,
    value: o3_set_0.value,
    lastaqi_id: air_id
  }
  const co_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: co_set_0.color_id,
    aqi: co_set_0.aqi,
    value: co_set_0.value,
    lastaqi_id: air_id
  }
  const no2_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
   color_id: no2_set_0.color_id,
   aqi: no2_set_0.aqi,
   value: no2_set_0.value,
   lastaqi_id: air_id 
  }
  const so2_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id: any
  } = {
    color_id: so2_set_0.color_id,
    aqi: so2_set_0.aqi,
    value: so2_set_0.value,
    lastaqi_id: air_id
  }
  const aqi_type: {
    color_id: Number,
    aqi: Number,
    value: Number,
    lastaqi_id:  any
  } = {
    color_id: aqi_set_0.color_id,
    aqi: aqi_set_0.aqi,
    value: aqi_set_0.value,
    lastaqi_id: air_id
  }
  
   const pm25_saved_data = await pm25_data.save(pm25_type); 
    const pm10_saved_data = await pm10_data.save(pm10_type);
    const o3_saved_data = await O3_data.save(o3_type);
    const co_saved_data = await Co_data.save(co_type);
    const no2_saved_data = await No2_data.save(no2_type);
    const so2_saved_data = await So2_data.save(so2_type);
    const api_saved_data = await aqi_data.save(aqi_type);


    return {
      pm25_saved_data,
      pm10_saved_data,
      o3_saved_data,
      co_saved_data,
      no2_saved_data,
      so2_saved_data,
      api_saved_data
    };
}