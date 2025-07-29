export function ges_no2(data?: any, ges_save?: any, no2_orm?: any){
    console.log(data.no2[0])
    const _no2 = data.no2[0]
    const data_no2: {
            no2_name: string;
            no2: number;
            aod: number;
            o3: number;
            flag: number;
            ges_id: any;
            } = {
            no2_name: _no2.no2_name,
            no2: _no2.no2,
            aod: _no2.aod,
            o3: _no2.o3,
            flag: _no2.flag,
            ges_id: ges_save.id!,
        };
    return no2_orm.save(data_no2)
}

export function ges_choho(data?: any, ges_save?: any, choho_orm?: any){
    const _choho =data.choho[0]
    const data_choho: {
        choho_name: string;
        choho: number;
        aod: number;
        o3: number;
        flag: number;
        ges_id: any;
        } = {
        choho_name: _choho.choho_name,
        choho: _choho.choho,
        aod: _choho.aod,
        o3: _choho.o3,
        flag: _choho.flag,
        ges_id: ges_save.id!,
    };

    return choho_orm.save(data_choho)
}


export function ges_so2(data?: any, ges_save?: any, so2_orm?: any){
    const _so2 = data.so2[0]
    const data_so2: {
        so2_name: string;
        so2: number;
        aod: number;
        o3: number;
        flag: number;
        ges_id: any;
        } = {
        so2_name: _so2.so2_name,
        so2: _so2.so2,
        aod: _so2.aod,
        o3: _so2.o3,
        flag: _so2.flag,
        ges_id: ges_save.id!,
    }
    
    return so2_orm.save(data_so2)
}