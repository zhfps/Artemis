import config from '@/config'
import request from '@/utils/axios'
import { v4 as uuidv4 } from 'uuid'

export async function productListByPns(pns: any[]) {
    let values = ''
    for (let index = 0; index < pns.length; index++) {
      const item = pns[index]
      values+=`<value>${item.cr2f3_pn}</value>`
    }
    const fetchXml = `
    <fetch version="1.0" mapping="logical" returntotalrecordcount="true" no-lock="false">
    <entity name="cr2f3_guboproductshop">
    <attribute name="cr2f3_pn" />
    <attribute name="cr2f3_guboproductshopid" />
      <filter type="and">
         <condition attribute="statecode" operator="eq" value="0"/>
         <condition attribute="cr2f3_pn" operator="in">
         ${values}
       </condition>
      </filter>
    </entity>
  </fetch>
  `
    return request<IResponse<any>>({
      url: '/cr2f3_guboproductshops',
      headers: config.headers,
      method: 'get',
      params: {
        fetchXml: fetchXml.replace(/^\s*[\r\n]/gm, '')
      }
    })
  }

  export async function upDateProduct(list: any[]) {
    const bactchId = uuidv4()
    const changesetId = uuidv4()
    let index = 1
    let batch = ''
    batch += `--batch_${bactchId}
    Content-Type: multipart/mixed; boundary="changeset_${changesetId}"`
    //1.写入信息
    list.map((item) => {
        if(item.id && item.cr2f3_discount && item.cr2f3_direction ){
        batch += `
  
        --changeset_${changesetId}
        Content-Type: application/http
        Content-Transfer-Encoding: binary
        Content-ID: ${index++}
  
        PATCH /api/data/v9.2/cr2f3_guboproductshops(${item.id}) HTTP/1.1
        Content-Type: application/json; type=entry
  
        {
            "cr2f3_discount": ${item.cr2f3_discount},
            "cr2f3_direction": ${item.cr2f3_direction}    
        }
        `
       }else if(item.id && item.cr2f3_discount){
        batch += `
  
        --changeset_${changesetId}
        Content-Type: application/http
        Content-Transfer-Encoding: binary
        Content-ID: ${index++}
  
        PATCH /api/data/v9.2/cr2f3_guboproductshops(${item.id}) HTTP/1.1
        Content-Type: application/json; type=entry
  
        {
            "cr2f3_discount": ${item.cr2f3_discount}   
        }
        `
       }
    })
    //4.添加结尾
    batch += `
    --changeset_${changesetId}--
  
    --batch_${bactchId}--
    `
    return request({
        url: '/$batch',
        headers: {
            'Content-Type': `multipart/mixed;boundary=batch_${bactchId}`,
            Accept: 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0'
        },
        method: 'post',
        data: batch.replace(/ {2,}/g, '')
    })
}